from datetime import datetime
from decimal import Decimal
from enum import Enum

from sqlalchemy import DateTime, Enum as SqlEnum, ForeignKey, Integer, JSON, Numeric, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.db import Base


class TaskStatus(str, Enum):
    CREATED = "created"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"


class TaskInputType(str, Enum):
    ASIN = "asin"
    PRODUCT_URL = "product_url"


class ParseStatus(str, Enum):
    PENDING = "pending"
    PARSED = "parsed"
    FAILED = "failed"


class AnalysisTask(Base):
    __tablename__ = "analysis_task"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    task_type: Mapped[str] = mapped_column(String(64), default="competitor_analysis", nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    status: Mapped[TaskStatus] = mapped_column(
        SqlEnum(TaskStatus, native_enum=False),
        default=TaskStatus.CREATED,
        nullable=False,
    )
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )

    inputs: Mapped[list["TaskInput"]] = relationship(
        back_populates="task",
        cascade="all, delete-orphan",
    )
    imported_files: Mapped[list["ImportedFile"]] = relationship(
        back_populates="task",
        cascade="all, delete-orphan",
    )
    competitor_snapshots: Mapped[list["CompetitorSnapshot"]] = relationship(
        back_populates="task",
        cascade="all, delete-orphan",
    )
    analysis_result: Mapped["AnalysisResult | None"] = relationship(
        back_populates="task",
        uselist=False,
        cascade="all, delete-orphan",
    )


class TaskInput(Base):
    __tablename__ = "task_input"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    task_id: Mapped[int] = mapped_column(ForeignKey("analysis_task.id", ondelete="CASCADE"), nullable=False)
    input_type: Mapped[TaskInputType] = mapped_column(SqlEnum(TaskInputType, native_enum=False), nullable=False)
    input_value: Mapped[str] = mapped_column(Text, nullable=False)

    task: Mapped[AnalysisTask] = relationship(back_populates="inputs")


class ImportedFile(Base):
    __tablename__ = "imported_file"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    task_id: Mapped[int] = mapped_column(ForeignKey("analysis_task.id", ondelete="CASCADE"), nullable=False)
    file_name: Mapped[str] = mapped_column(String(255), nullable=False)
    file_path: Mapped[str] = mapped_column(String(500), nullable=False)
    parse_status: Mapped[ParseStatus] = mapped_column(
        SqlEnum(ParseStatus, native_enum=False),
        default=ParseStatus.PENDING,
        nullable=False,
    )

    task: Mapped[AnalysisTask] = relationship(back_populates="imported_files")


class CompetitorSnapshot(Base):
    __tablename__ = "competitor_snapshot"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    task_id: Mapped[int] = mapped_column(ForeignKey("analysis_task.id", ondelete="CASCADE"), nullable=False)
    asin: Mapped[str] = mapped_column(String(20), nullable=False)
    title: Mapped[str] = mapped_column(String(500), nullable=False)
    price: Mapped[Decimal | None] = mapped_column(Numeric(10, 2), nullable=True)
    rating: Mapped[Decimal | None] = mapped_column(Numeric(3, 2), nullable=True)
    review_count: Mapped[int | None] = mapped_column(Integer, nullable=True)
    monthly_sales: Mapped[int | None] = mapped_column(Integer, nullable=True)
    brand: Mapped[str | None] = mapped_column(String(255), nullable=True)

    task: Mapped[AnalysisTask] = relationship(back_populates="competitor_snapshots")


class AnalysisResult(Base):
    __tablename__ = "analysis_result"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    task_id: Mapped[int] = mapped_column(
        ForeignKey("analysis_task.id", ondelete="CASCADE"),
        nullable=False,
        unique=True,
    )
    summary_cards_json: Mapped[dict] = mapped_column(JSON, nullable=False)
    report_json: Mapped[dict] = mapped_column(JSON, nullable=False)

    task: Mapped[AnalysisTask] = relationship(back_populates="analysis_result")
