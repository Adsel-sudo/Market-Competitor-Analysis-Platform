from typing import Literal

from pydantic import BaseModel, Field, StringConstraints
from typing_extensions import Annotated

from app.models.task_models import TaskInputType, TaskStatus

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
