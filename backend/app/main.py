import logging

from fastapi import FastAPI

from app.core.config import get_settings
from app.routers.tasks import router as task_router

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    debug=settings.debug,
)

app.include_router(task_router, prefix="/api")
logger.info("Tasks router registered at /api/tasks")


@app.get("/health", tags=["Health"])
def health_check() -> dict[str, str]:
    logger.info("Health check requested")
    return {"status": "ok"}
