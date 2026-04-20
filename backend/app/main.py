import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import get_settings
from app.routers.competitor_analysis import router as competitor_analysis_router
from app.routers.tasks import router as task_router
from app.routers.uploads import router as upload_router

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    debug=settings.debug,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def register_routers() -> None:
    """Register all API routers under the /api prefix."""
    app.include_router(task_router, prefix="/api")
    app.include_router(upload_router, prefix="/api")
    app.include_router(competitor_analysis_router, prefix="/api")
    logger.info("Tasks router registered at /api/tasks")
    logger.info("Uploads router registered at /api/tasks/{task_id}/upload")
    logger.info("Competitor analysis router registered at /api/competitor-analysis/{task_id}")


register_routers()


@app.get("/health", tags=["Health"])
def health_check() -> dict[str, str]:
    logger.info("Health check requested")
    return {"status": "ok"}
