from copy import deepcopy

_COMPETITOR_ANALYSIS_MOCK: dict = {
    "basic_info": {
        "asin": "B0MOCK1234",
        "title": "Mock Competitor Product",
        "brand": "DemoBrand",
        "category": "Home & Kitchen",
        "price": 29.99,
        "rating": 4.3,
        "review_count": 1284,
    },
    "market_position": {
        "price_band": "mid",
        "estimated_market_share": "12%",
        "rank_estimation": "Top 20 in sub-category",
        "target_audience": "Small families and first-time buyers",
    },
    "selling_points": [
        "Affordable bundle with practical accessories",
        "Simple setup and beginner-friendly instructions",
        "Strong rating consistency in recent 90 days",
    ],
    "title_analysis": {
        "keyword_coverage": "Good",
        "readability": "High",
        "issues": ["Core material keyword appears too late"],
    },
    "bullet_analysis": {
        "clarity_score": 8.4,
        "feature_coverage": "Medium-High",
        "issues": ["Differentiation against premium competitors is weak"],
    },
    "a_plus_analysis": {
        "status": "present",
        "content_depth": "Medium",
        "issues": ["Scenario storytelling could be more specific"],
    },
    "image_analysis": {
        "image_count": 7,
        "white_background_compliance": "pass",
        "issues": ["Lack of close-up texture detail image"],
    },
    "review_analysis": {
        "positive_topics": ["Easy to use", "Good value", "Fast shipping"],
        "negative_topics": ["Durability concerns", "Packaging damage"],
        "sentiment": "Mostly positive",
    },
    "summary": {
        "overall_assessment": "This competitor is strong on value and usability.",
        "opportunity": "Win with clearer premium positioning and proof-driven images.",
    },
    "risks": [
        "Aggressive discounting may pressure conversion",
        "Rapid review growth can reduce visibility for new entrants",
    ],
    "highlight_points": [
        "Consistent review sentiment on convenience",
        "Balanced price-performance perception",
    ],
    "avoid_points": [
        "Do not overuse generic claims without evidence",
        "Avoid title keyword stuffing that hurts readability",
    ],
    "improvement_suggestions": [
        "Add comparison chart to improve differentiation",
        "Include durability proof points in bullets and images",
    ],
    "next_actions": [
        "Validate top 5 negative topics against your product roadmap",
        "Prepare A/B test plan for title and main image",
    ],
}


def get_mock_competitor_analysis(task_id: int) -> dict:
    """Return mock competitor analysis data for the given task.

    `task_id` is reserved for future real-data lookup integration.
    """
    response = deepcopy(_COMPETITOR_ANALYSIS_MOCK)
    response["basic_info"]["task_id"] = task_id
    return response
