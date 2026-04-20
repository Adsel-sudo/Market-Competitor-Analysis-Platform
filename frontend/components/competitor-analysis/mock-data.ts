import type { CompetitorAnalysisViewModel } from "@/components/competitor-analysis/types";

export const competitorAnalysisMock: CompetitorAnalysisViewModel = {
  taskName: "北美宠物刷子竞品分析 · C01",
  asin: "B0CCX9A91K",
  category: "Pet Grooming Brushes",
  updatedAt: "2026-04-20 09:30 UTC",
  owner: "市场分析组 / Iris",
  modules: [
    { key: "competitor-analysis", label: "竞品分析" },
    { key: "market-research", label: "市场调研" },
    { key: "market-intel", label: "市场情报推送" },
  ],
  screens: [
    {
      id: "foundation-market",
      title: "基础与市场",
      subtitle: "对齐基础画像与市场位置，判断竞品所处竞争段位。",
      cards: [
        {
          title: "基础信息",
          summary: "识别品牌、价格带与体量状态，建立分析基线。",
          metrics: [
            { label: "品牌", value: "PetNova" },
            { label: "价格", value: "$18.99" },
            { label: "评分", value: "4.5 / 5" },
          ],
        },
        {
          title: "市场段位",
          summary: "判定目标人群、主战价格区间与稳定性。",
          metrics: [
            { label: "价格段", value: "中端" },
            { label: "目标人群", value: "中大型犬主" },
            { label: "段位", value: "Top 10 稳定选手" },
          ],
        },
        {
          title: "关键词覆盖",
          summary: "观察标题关键词和需求意图匹配程度。",
          metrics: [
            { label: "核心词", value: "Dog Brush" },
            { label: "功能词", value: "Self Cleaning" },
            { label: "意图词", value: "Deshedding" },
          ],
        },
        {
          title: "供给压力",
          summary: "追踪同类竞品密度与促销压力。",
          metrics: [
            { label: "近30天上新", value: "37 款" },
            { label: "均价波动", value: "±4.8%" },
            { label: "促销强度", value: "中等" },
          ],
        },
      ],
    },
    {
      id: "page-expression",
      title: "页面表达",
      subtitle: "拆解页面叙事结构，评估转化信息是否连贯。",
      cards: [
        {
          title: "标题表达",
          summary: "重点检查利益点是否前置、语言是否直接。",
          metrics: [
            { label: "利益点前置", value: "是" },
            { label: "句长", value: "适中" },
            { label: "可读性", value: "良好" },
          ],
        },
        {
          title: "五点结构",
          summary: "判断五点是否覆盖痛点、结果和保障信息。",
          metrics: [
            { label: "结构完整度", value: "85%" },
            { label: "重复度", value: "中低" },
            { label: "证据充分性", value: "中" },
          ],
        },
        {
          title: "A+ 叙事",
          summary: "观察模块顺序是否贴合用户决策路径。",
          metrics: [
            { label: "叙事顺序", value: "痛点→方案→保障" },
            { label: "视觉密度", value: "舒适" },
            { label: "品牌一致性", value: "高" },
          ],
        },
        {
          title: "信息层级",
          summary: "检查重要信息是否快速可见，减少理解负担。",
          metrics: [
            { label: "首屏可读", value: "高" },
            { label: "关键承诺", value: "清晰" },
            { label: "CTA 强度", value: "中" },
          ],
        },
      ],
    },
    {
      id: "visual-feedback",
      title: "视觉与用户反馈",
      subtitle: "结合图像表达与评论反馈，识别体验强弱项。",
      cards: [
        {
          title: "主图与场景图",
          summary: "评估图片可信度与信息承载效率。",
          metrics: [
            { label: "主图可辨识", value: "高" },
            { label: "场景真实感", value: "较高" },
            { label: "对比信息", value: "中" },
          ],
        },
        {
          title: "视觉风格",
          summary: "检查颜色、构图与卖点标签的协调性。",
          metrics: [
            { label: "风格一致", value: "高" },
            { label: "色彩策略", value: "白底+蓝绿" },
            { label: "专业感", value: "稳定" },
          ],
        },
        {
          title: "好评反馈",
          summary: "提炼能稳定驱动好评的产品体验点。",
          metrics: [
            { label: "高频词", value: "easy clean" },
            { label: "体验焦点", value: "省力" },
            { label: "满意度", value: "高" },
          ],
        },
        {
          title: "差评风险",
          summary: "定位负向反馈中可被工程优化的问题。",
          metrics: [
            { label: "争议点", value: "针头耐久性" },
            { label: "负向集中度", value: "中" },
            { label: "修复优先级", value: "高" },
          ],
        },
      ],
    },
    {
      id: "conclusion-decision",
      title: "结论与决策",
      subtitle: "聚合可执行结论，沉淀可借鉴与规避方向。",
      cards: [
        {
          title: "综合结论",
          summary: "判断该竞品是否值得作为核心参考对象。",
          metrics: [
            { label: "参考价值", value: "7.8 / 10" },
            { label: "定位", value: "中端功能稳定型" },
            { label: "适配场景", value: "基础盘对标" },
          ],
        },
        {
          title: "可借鉴点",
          summary: "提炼短期可复制且风险较低的策略。",
          metrics: [
            { label: "功能锚点", value: "一键退毛" },
            { label: "表达顺序", value: "痛点→结果" },
            { label: "证据呈现", value: "加强耐久验证" },
          ],
        },
        {
          title: "规避项",
          summary: "避免复用高风险表达或不稳定设计。",
          metrics: [
            { label: "合规风险", value: "弱化绝对化表达" },
            { label: "视觉风险", value: "减少贴片堆叠" },
            { label: "价格风险", value: "避免价格战" },
          ],
        },
        {
          title: "下一步动作",
          summary: "明确验证节奏，推进项目闭环。",
          metrics: [
            { label: "T+2", value: "材料可行性评估" },
            { label: "T+3", value: "中差评再采样" },
            { label: "T+5", value: "新版线框输出" },
          ],
        },
      ],
    },
  ],
};
