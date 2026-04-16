from collections.abc import Generator
import logging
import os

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

from app.core.config import get_settings

settings = get_settings()
logger = logging.getLogger(__name__)


class Base(DeclarativeBase):
    pass


database_url = os.getenv("DATABASE_URL", settings.database_url)
is_sqlite = "sqlite" in database_url.lower()

if is_sqlite:
    logger.info("Using SQLite database: %s", database_url)
    engine = create_engine(
        database_url,
        pool_pre_ping=True,
        connect_args={"check_same_thread": False},
    )
else:
    logger.info("Using PostgreSQL database: %s", database_url)
    engine = create_engine(
        database_url,
        pool_pre_ping=True,
    )

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def create_all_tables() -> None:
    # Ensure model metadata is imported before create_all
    import app.models  # noqa: F401

    Base.metadata.create_all(bind=engine)
