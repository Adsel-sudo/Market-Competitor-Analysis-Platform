"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { AnalysisDetailPage } from "@/components/competitor-analysis/analysis-detail-page";
import { competitorAnalysisMock } from "@/components/competitor-analysis/mock-data";
import type { CompetitorAnalysisDetail } from "@/components/competitor-analysis/types";
import { apiFetch } from "@/utils/api";

type BackendCompetitorAnalysisResponse = {
  basic_info?: {
    asin?: string;
    title?: string;
    category?: string;
  };
  market_position?: {
    rank_estimation?: string;
    target_audience?: string;
  };
  selling_points?: string[];
  title_analysis?: {
    keyword_coverage?: string;
    readability?: string;
  };
  bullet_analysis?: {
    feature_coverage?: string;
    clarity_score?: number;
  };
  a_plus_analysis?: {
    status?: string;
    content_depth?: string;
  };
  image_analysis?: {
    image_count?: number;
    white_background_compliance?: string;
  };
  review_analysis?: {
    positive_topics?: string[];
    negative_topics?: string[];
    sentiment?: string;
  };
  summary?: {
    overall_assessment?: string;
  };
  risks?: string[];
  highlight_points?: string[];
  avoid_points?: string[];
  improvement_suggestions?: string[];
  next_actions?: string[];
};

function mapBackendDataToDetail(id: string, backendData: BackendCompetitorAnalysisResponse): CompetitorAnalysisDetail {
  return {
    ...competitorAnalysisMock,
    taskName: backendData.basic_info?.title || `竞品分析任务 - ${id}`,
    asin: backendData.basic_info?.asin || competitorAnalysisMock.asin,
    category: backendData.basic_info?.category || competitorAnalysisMock.category,
    analysisBlocks: [
      {
        id: "basic-info",
        title: "基础信息",
        description: "快速对齐该竞品的类目、价格带与核心销售状态。",
        items: [
          { label: "ASIN", value: backendData.basic_info?.asin || "-" },
          { label: "标题", value: backendData.basic_info?.title || "-" },
          { label: "类目", value: backendData.basic_info?.category || "-" },
        ],
      },
      {
        id: "market-position",
        title: "市场位置",
        description: "判断其在目标细分市场中的段位与人群覆盖。",
        items: [
          { label: "排名估计", value: backendData.market_position?.rank_estimation || "-" },
          { label: "目标人群", value: backendData.market_position?.target_audience || "-" },
        ],
      },
      {
        id: "selling-points",
        title: "卖点分析",
        description: "归纳其高频卖点，识别可复制与不可复制部分。",
        items: (backendData.selling_points || []).map((point, index) => ({
          label: `卖点 ${index + 1}`,
          value: point,
        })),
      },
      {
        id: "title-analysis",
        title: "标题分析",
        description: "拆解关键词顺序、利益点表达与可读性。",
        items: [
          { label: "关键词覆盖", value: backendData.title_analysis?.keyword_coverage || "-" },
          { label: "可读性", value: backendData.title_analysis?.readability || "-" },
        ],
      },
      {
        id: "five-points",
        title: "五点分析",
        description: "观察五点结构是否完整、是否有重复叙述。",
        items: [
          { label: "覆盖度", value: backendData.bullet_analysis?.feature_coverage || "-" },
          { label: "清晰度", value: String(backendData.bullet_analysis?.clarity_score ?? "-") },
        ],
      },
      {
        id: "a-plus",
        title: "A+ 分析",
        description: "识别其品牌叙事与图文排布的说服逻辑。",
        items: [
          { label: "状态", value: backendData.a_plus_analysis?.status || "-" },
          { label: "内容深度", value: backendData.a_plus_analysis?.content_depth || "-" },
        ],
      },
      {
        id: "image-analysis",
        title: "图片分析",
        description: "判断主图、场景图与对比图是否支撑转化。",
        items: [
          { label: "图片数量", value: String(backendData.image_analysis?.image_count ?? "-") },
          { label: "白底合规", value: backendData.image_analysis?.white_background_compliance || "-" },
        ],
      },
      {
        id: "review-analysis",
        title: "评论分析",
        description: "从好评与差评中提炼需求共性与产品风险。",
        items: [
          { label: "情感倾向", value: backendData.review_analysis?.sentiment || "-" },
          { label: "正向主题", value: (backendData.review_analysis?.positive_topics || []).join(" / ") || "-" },
          { label: "负向主题", value: (backendData.review_analysis?.negative_topics || []).join(" / ") || "-" },
        ],
      },
    ],
    conclusion: {
      worthReference: backendData.summary?.overall_assessment || "待评估",
      positioning: backendData.market_position?.rank_estimation || "待补充",
      coreReasons: backendData.highlight_points || [],
      majorRisks: backendData.risks || [],
    },
    decision: {
      learnings: backendData.highlight_points || [],
      avoidings: backendData.avoid_points || [],
      redesignSuggestions: backendData.improvement_suggestions || [],
      nextSteps: backendData.next_actions || [],
    },
  };
}

async function fetchData(id: string): Promise<CompetitorAnalysisDetail> {
  try {
    const response = await apiFetch(`/api/competitor-analysis/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const backendData = (await response.json()) as BackendCompetitorAnalysisResponse;
    return mapBackendDataToDetail(id, backendData);
  } catch (error) {
    console.warn("Failed to fetch competitor analysis, fallback to local mock data.", error);
    return competitorAnalysisMock;
  }
}

export default function CompetitorAnalysisPage() {
  const params = useParams<{ id: string }>();
  const taskId = params?.id ?? "";
  const [data, setData] = useState<CompetitorAnalysisDetail>(competitorAnalysisMock);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!taskId) {
      setData(competitorAnalysisMock);
      setLoading(false);
      return;
    }

    let mounted = true;

    const load = async () => {
      setLoading(true);
      const result = await fetchData(taskId);
      if (mounted) {
        setData(result);
        setLoading(false);
      }
    };

    void load();

    return () => {
      mounted = false;
    };
  }, [taskId]);

  if (loading) {
    return <div className="p-6 text-slate-600">Loading competitor analysis...</div>;
  }

  return <AnalysisDetailPage data={data} />;
}
