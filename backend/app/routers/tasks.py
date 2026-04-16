import logging

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session, selectinload

from app.core.db import get_db
from app.models.task_models import AnalysisTask, TaskInput, TaskStatus
from app.schemas.task import (
    TaskCreateRequest,
    TaskCreateResponse,
    TaskDetailResponse,
    TaskInputResponse,
)

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


@router.get("/{task_id}", response_model=TaskDetailResponse)
def get_task_detail(task_id: int, db: Session = Depends(get_db)) -> TaskDetailResponse:
    try:
        statement = (
            select(AnalysisTask)
            .options(selectinload(AnalysisTask.inputs))
            .where(AnalysisTask.id == task_id)
        )
        task = db.execute(statement).scalar_one_or_none()

        if task is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")

        return TaskDetailResponse(
            id=task.id,
            title=task.title,
            status=task.status,
            task_type=task.task_type,
            inputs=[
                TaskInputResponse(input_type=item.input_type, input_value=item.input_value)
                for item in task.inputs
            ],
            created_at=task.created_at,
            updated_at=task.updated_at,
        )
    except HTTPException:
        raise
    except SQLAlchemyError:
        logger.exception("Failed to fetch task detail: id=%s", task_id)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch task detail",
        )
