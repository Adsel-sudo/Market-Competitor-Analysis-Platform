from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field, StringConstraints, field_validator
from typing_extensions import Annotated

from app.models.task_models import ParseStatus, TaskInputType, TaskStatus

NonEmptyStr = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1)]
ALLOWED_INPUT_TYPE_VALUES = tuple(item.value for item in TaskInputType)
ALLOWED_INPUT_TYPES = ", ".join(ALLOWED_INPUT_TYPE_VALUES)


class TaskInputCreate(BaseModel):
    input_type: TaskInputType
    input_value: NonEmptyStr

    @field_validator("input_type", mode="before")
    @classmethod
    def validate_input_type(cls, value: object) -> TaskInputType:
        if isinstance(value, TaskInputType):
            return value
        if isinstance(value, str) and value in ALLOWED_INPUT_TYPE_VALUES:
            return TaskInputType(value)
        raise ValueError(f"input_type must be one of: {ALLOWED_INPUT_TYPES}")


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
