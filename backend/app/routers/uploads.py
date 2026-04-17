import logging
from datetime import datetime
from pathlib import Path
import shutil

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.core.db import get_db
from app.models.task_models import AnalysisTask, ImportedFile, ParseStatus
from app.schemas.task import UploadFileResponse
from app.services.competitor_service import save_competitors
from app.services.parser_sellersprite_bsr import parse_bsr

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/tasks", tags=["Uploads"])

BASE_DIR = Path(__file__).resolve().parents[2]
UPLOADS_ROOT = (BASE_DIR / "uploads").resolve()


@router.post("/{task_id}/upload", response_model=UploadFileResponse)
def upload_task_file(
    task_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
) -> UploadFileResponse:
    safe_original_name = Path(file.filename or "").name
    if not safe_original_name:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid file name")

    if Path(safe_original_name).suffix.lower() != ".xlsx":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Only .xlsx files are supported")

    saved_file_path: Path | None = None

    try:
        # 1. 校验 task 是否存在
        task = db.get(AnalysisTask, task_id)
        if task is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")

        # 2. 保存上传文件到 uploads/{task_id}/
        task_upload_dir = (UPLOADS_ROOT / str(task_id)).resolve()
        task_upload_dir.mkdir(parents=True, exist_ok=True)

        timestamp = datetime.utcnow().strftime("%Y%m%d%H%M%S")
        source_path = Path(safe_original_name)
        new_file_name = f"{source_path.stem}_{timestamp}{source_path.suffix.lower()}"
        saved_file_path = (task_upload_dir / new_file_name).resolve()

        try:
            saved_file_path.relative_to(UPLOADS_ROOT)
        except ValueError as exc:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid upload path") from exc

        with saved_file_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        relative_file_path = saved_file_path.relative_to(BASE_DIR)

        # 3. 插入 imported_file，初始 parse_status = pending
        imported_file = ImportedFile(
            task_id=task_id,
            file_name=new_file_name,
            file_path=str(relative_file_path),
            parse_status=ParseStatus.PENDING,
        )
        db.add(imported_file)
        db.commit()
        db.refresh(imported_file)

        # 4. 根据文件名判断并触发 BSR 解析
        if "bsr" in safe_original_name.lower():
            logger.info(
                "开始解析 BSR 文件: task_id=%s file_id=%s file_name=%s file_path=%s",
                task_id,
                imported_file.id,
                safe_original_name,
                saved_file_path,
            )
            try:
                parsed_data = parse_bsr(str(saved_file_path))
                if not parsed_data:
                    raise ValueError("parse_bsr returned empty data")

                save_competitors(db=db, task_id=task_id, data=parsed_data)
                imported_file.parse_status = ParseStatus.PARSED
                db.add(imported_file)
                db.commit()
                db.refresh(imported_file)
                logger.info(
                    "BSR 文件解析成功: task_id=%s file_id=%s 写入 competitor 数据=%s",
                    task_id,
                    imported_file.id,
                    len(parsed_data),
                )
            except Exception:
                db.rollback()
                imported_file.parse_status = ParseStatus.FAILED
                db.add(imported_file)
                db.commit()
                db.refresh(imported_file)
                logger.exception("BSR 文件解析失败: task_id=%s file_id=%s", task_id, imported_file.id)

        logger.info("File uploaded successfully: task_id=%s file_id=%s", task_id, imported_file.id)

        # 5. 返回 file_id / file_name / parse_status
        return UploadFileResponse(
            file_id=imported_file.id,
            file_name=imported_file.file_name,
            parse_status=imported_file.parse_status,
        )
    except HTTPException:
        raise
    except SQLAlchemyError:
        db.rollback()
        if saved_file_path is not None and saved_file_path.exists():
            saved_file_path.unlink(missing_ok=True)
        logger.exception("Failed to save uploaded file record: task_id=%s", task_id)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to save uploaded file",
        )
    except OSError:
        logger.exception("Failed to store uploaded file locally: task_id=%s", task_id)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to store uploaded file",
        )
    finally:
        file.file.close()
