from fastapi import APIRouter

from app.services.competitor_analysis_mock import get_mock_competitor_analysis

router = APIRouter(prefix="/competitor-analysis", tags=["Competitor Analysis"])


@router.get("/{task_id}")
def get_competitor_analysis(task_id: int) -> dict:
    """Get competitor analysis result by task_id.

    Currently returns mock data; real parsing result integration will be added later.
    """
    return get_mock_competitor_analysis(task_id=task_id)
