import logging

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.core.db import get_db
from app.models.task_models import AnalysisTask, TaskInput, TaskStatus
from app.schemas.task import TaskCreateRequest, TaskCreateResponse

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/tasks", tags=["Tasks"])


@router.post("", response_model=TaskCreateResponse, status_code=status.HTTP_201_CREATED)
def create_task(payload: TaskCreateRequest, db: Session = Depends(get_db)) -> TaskCreateResponse:
    try:
        task = AnalysisTask(
            title=payload.title,
            task_type=payload.task_type,
            status=TaskStatus.CREATED,
        )
        db.add(task)
        db.flush()

        for item in payload.inputs:
            db.add(
                TaskInput(
                    task_id=task.id,
                    input_type=item.input_type,
                    input_value=item.input_value,
                )
            )

        db.commit()
        db.refresh(task)
        logger.info("Task created successfully: id=%s", task.id)

        return TaskCreateResponse(id=task.id, status=task.status)
    except SQLAlchemyError:
        db.rollback()
        logger.exception("Failed to create task")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create task",
        )
