import re
from typing import Any

import pandas as pd

TARGET_FIELDS = [
    "asin",
    "title",
    "price",
    "rating",
    "review_count",
    "brand",
    "seller",
    "monthly_sales",
    "bsr",
    "category",
]

COLUMN_ALIASES = {
    "asin": ["asin", "父asin", "子asin", "asin码"],
    "title": ["title", "标题", "商品标题", "产品标题"],
    "price": ["price", "价格", "售价", "当前价格"],
    "rating": ["rating", "评分", "星级", "平均评分"],
    "review_count": ["review_count", "reviews", "review", "评论数", "评论", "评价数"],
    "brand": ["brand", "品牌"],
    "seller": ["seller", "卖家", "店铺", "店铺名"],
    "monthly_sales": ["monthly_sales", "月销量", "月销", "近30天销量", "30天销量"],
    "bsr": ["bsr", "best sellers rank", "best seller rank", "类目排名", "大类排名", "排名"],
    "category": ["category", "类目", "分类", "节点类目"],
}


def _normalize_text(value: Any) -> str:
    if value is None:
        return ""
    text = str(value).strip().lower()
    text = text.replace("\n", "").replace("\r", "")
    text = re.sub(r"[\s_\-()（）/\\]+", "", text)
    return text


def _find_column_map(df: pd.DataFrame) -> dict[str, str]:
    normalized_cols = {col: _normalize_text(col) for col in df.columns}
    field_to_column: dict[str, str] = {}

    for field, aliases in COLUMN_ALIASES.items():
        normalized_aliases = {_normalize_text(alias) for alias in aliases}
        for original_col, normalized_col in normalized_cols.items():
            if normalized_col in normalized_aliases:
                field_to_column[field] = original_col
                break

    return field_to_column


def _to_float(value: Any) -> float | None:
    if value is None or (isinstance(value, float) and pd.isna(value)):
        return None
    if isinstance(value, (int, float)):
        return float(value)
    text = str(value).strip()
    if not text:
        return None
    match = re.search(r"-?\d+(?:\.\d+)?", text.replace(",", ""))
    if not match:
        return None
    try:
        return float(match.group())
    except ValueError:
        return None


def _to_int(value: Any) -> int | None:
    if value is None or (isinstance(value, float) and pd.isna(value)):
        return None
    if isinstance(value, int):
        return value
    if isinstance(value, float):
        return int(value)
    text = str(value).strip()
    if not text:
        return None
    match = re.search(r"-?\d+", text.replace(",", ""))
    if not match:
        return None
    try:
        return int(match.group())
    except ValueError:
        return None


def _clean_text(value: Any) -> str | None:
    if value is None or (isinstance(value, float) and pd.isna(value)):
        return None
    text = str(value).strip()
    return text or None


def parse_bsr(file_path: str) -> list[dict]:
    sheets = pd.read_excel(file_path, sheet_name=None)
    valid_df = None
    field_map: dict[str, str] = {}

    for sheet_df in sheets.values():
        if sheet_df is None or sheet_df.empty:
            continue
        candidate_map = _find_column_map(sheet_df)
        has_core_columns = "asin" in candidate_map and "title" in candidate_map
        if has_core_columns:
            valid_df = sheet_df
            field_map = candidate_map
            break

    if valid_df is None:
        return []

    rows: list[dict] = []
    for _, row in valid_df.iterrows():
        item = {field: None for field in TARGET_FIELDS}

        for field, column in field_map.items():
            item[field] = row.get(column)

        item["asin"] = _clean_text(item["asin"])
        item["title"] = _clean_text(item["title"])
        item["price"] = _to_float(item["price"])
        item["rating"] = _to_float(item["rating"])
        item["review_count"] = _to_int(item["review_count"])
        item["brand"] = _clean_text(item["brand"])
        item["seller"] = _clean_text(item["seller"])
        item["monthly_sales"] = _to_int(item["monthly_sales"])
        item["bsr"] = _clean_text(item["bsr"])
        item["category"] = _clean_text(item["category"])

        if all(item[field] is None for field in TARGET_FIELDS):
            continue
        rows.append(item)

    return rows
