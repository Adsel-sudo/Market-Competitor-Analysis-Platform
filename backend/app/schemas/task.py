from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field, StringConstraints
from typing_extensions import Annotated

from app.models.task_models import ParseStatus, TaskInputType, TaskStatus

NonEmptyStr = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1)]


class TaskInputCreate(BaseModel):
    input_type: TaskInputType
    input_value: NonEmptyStr


class TaskCreateRequest(BaseModel):
    title: Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=255)]
    task_type: Literal["competitor_analysis"] = "competitor_analysis"
    inputs: list[TaskInputCreate] = Field(min_length=1)


class TaskCreateResponse(BaseModel):
    id: int
    status: TaskStatus


class TaskInputResponse(BaseModel):
    input_type: TaskInputType
    input_value: str


class TaskDetailResponse(BaseModel):
    id: int
    title: str
    status: TaskStatus
    task_type: str
    inputs: list[TaskInputResponse]
    created_at: datetime
    updated_at: datetime


class UploadFileResponse(BaseModel):
    file_id: int
    file_name: str
    parse_status: ParseStatus
