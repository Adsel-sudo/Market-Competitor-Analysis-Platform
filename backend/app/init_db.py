"""Database initialization script.

Run from backend directory:
    python app/init_db.py
"""

from sqlalchemy.exc import SQLAlchemyError

from app.core.db import Base, engine
from app.models.task_models import (  # noqa: F401
    AnalysisResult,
    AnalysisTask,
    CompetitorSnapshot,
    ImportedFile,
    ParseStatus,
    TaskInput,
    TaskInputType,
    TaskStatus,
)


def init_db() -> None:
    """Create all database tables registered in SQLAlchemy metadata."""
    print("[init_db] 正在创建表...")
    try:
        Base.metadata.create_all(bind=engine)
        print("[init_db] 创建成功。")
    except SQLAlchemyError as exc:
        print(f"[init_db] 数据库连接或建表失败: {exc}")
    except Exception as exc:
        print(f"[init_db] 创建表时发生未知错误: {exc}")


if __name__ == "__main__":
    init_db()
