import logging

from sqlalchemy.orm import Session

from app.models.task_models import CompetitorSnapshot

logger = logging.getLogger(__name__)


def save_competitors(db: Session, task_id: int, data: list[dict]) -> None:
    objects: list[CompetitorSnapshot] = []

    for item in data:
        if not isinstance(item, dict):
            continue

        asin = (item.get("asin") or "").strip()
        if not asin:
            continue

        objects.append(
            CompetitorSnapshot(
                task_id=task_id,
                asin=asin,
                title=item.get("title") or "",
                price=item.get("price"),
                rating=item.get("rating"),
                review_count=item.get("review_count"),
                brand=item.get("brand"),
            )
        )

    if not objects:
        logger.info("No competitor data to write: task_id=%s, inserted=0", task_id)
        return

    db.bulk_save_objects(objects)
    db.flush()
    logger.info("Competitor snapshots inserted: task_id=%s, inserted=%s", task_id, len(objects))
