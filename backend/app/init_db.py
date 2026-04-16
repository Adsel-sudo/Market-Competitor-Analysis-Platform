"""Database initialization script.

Run from backend directory:
    python app/init_db.py
"""

from sqlalchemy.exc import SQLAlchemyError

from app.core.db import Base, engine


def init_db() -> None:
    """Create all database tables registered in SQLAlchemy metadata."""
    # 确保加载所有 models，保证 metadata 完整
    import app.models  # noqa: F401

    is_sqlite = engine.url.get_backend_name() == "sqlite"
    db_type = "SQLite" if is_sqlite else "PostgreSQL"

    print(f"[init_db] 当前数据库类型: {db_type}")
    if is_sqlite:
        print(f"[init_db] SQLite 数据库文件路径: {engine.url.database}")

    print("[init_db] 正在创建表...")
    try:
        Base.metadata.create_all(bind=engine)
        print("[init_db] 创建成功")
    except SQLAlchemyError as exc:
        print(f"[init_db] 数据库连接或建表失败: {exc}")
    except Exception as exc:
        print(f"[init_db] 创建表时发生未知错误: {exc}")


if __name__ == "__main__":
    init_db()
