import logging

from fastapi import FastAPI

from app.core.config import get_settings
from app.routers.tasks import router as task_router
from app.routers.uploads import router as upload_router

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    debug=settings.debug,
)


def register_routers() -> None:
    """Register all API routers under the /api prefix."""
    app.include_router(task_router, prefix="/api")
    app.include_router(upload_router, prefix="/api")
    logger.info("Tasks router registered at /api/tasks")
    logger.info("Uploads router registered at /api/tasks/{task_id}/upload")


register_routers()


@app.get("/health", tags=["Health"])
def health_check() -> dict[str, str]:
    logger.info("Health check requested")
    return {"status": "ok"}
