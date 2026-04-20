import type { CompetitorAnalysisDetail } from "@/components/competitor-analysis/types";

export const competitorAnalysisMock: CompetitorAnalysisDetail = {
  taskName: "北美宠物刷子竞品分析 - C01",
  asin: "B0CCX9A91K",
  category: "Pet Grooming Brushes",
  lastUpdatedAt: "2026-04-20 09:30 UTC",
  owner: "市场分析组 / Iris",
  analysisBlocks: [
    {
      id: "basic-info",
      title: "基础信息",
      description: "快速对齐该竞品的类目、价格带与核心销售状态。",
      items: [
        { label: "品牌", value: "PetNova" },
        { label: "价格", value: "$18.99", hint: "近30天主力价格" },
        { label: "评分", value: "4.5 / 5" },
        { label: "评论量", value: "12,842" },
      ],
    },
    {
      id: "market-position",
      title: "市场位置",
      description: "判断其在目标细分市场中的段位与人群覆盖。",
      items: [
        { label: "价格带", value: "中端" },
        { label: "目标人群", value: "中大型犬主" },
        { label: "竞争段位", value: "Top 10 稳定选手" },
      ],
    },
    {
      id: "selling-points",
      title: "卖点分析",
      description: "归纳其高频卖点，识别可复制与不可复制部分。",
      items: [
        { label: "高频卖点 1", value: "一键退毛 + 不伤皮肤针头" },
        { label: "高频卖点 2", value: "防滑手柄，长时间握持不累" },
        { label: "高频卖点 3", value: "适配长毛/短毛双犬种" },
      ],
    },
    {
      id: "title-analysis",
      title: "标题分析",
      description: "拆解关键词顺序、利益点表达与可读性。",
      items: [
        { label: "关键词布局", value: "Dog Brush / Deshedding / Self Cleaning" },
        { label: "利益点表达", value: "直给“减少掉毛 95%”" },
      ],
    },
    {
      id: "five-points",
      title: "五点分析",
      description: "观察五点结构是否完整、是否有重复叙述。",
      items: [
        { label: "结构", value: "功能 - 痛点 - 结果 - 保障" },
        { label: "重复问题", value: "第2/3点重复强调材质" },
      ],
    },
    {
      id: "a-plus",
      title: "A+ 分析",
      description: "识别其品牌叙事与图文排布的说服逻辑。",
      items: [
        { label: "版块逻辑", value: "场景痛点 → 结构优势 → 品牌保障" },
        { label: "风格", value: "偏白底 + 局部蓝绿强调" },
      ],
    },
    {
      id: "image-analysis",
      title: "图片分析",
      description: "判断主图、场景图与对比图是否支撑转化。",
      items: [
        { label: "主图", value: "白底清晰，主体占比高" },
        { label: "场景图", value: "真人+宠物互动，可信度高" },
        { label: "对比图", value: "竞品对比信息偏保守" },
      ],
    },
    {
      id: "review-analysis",
      title: "评论分析",
      description: "从好评与差评中提炼需求共性与产品风险。",
      items: [
        { label: "好评关键词", value: "easy clean / sturdy / dog loves it" },
        { label: "差评关键词", value: "pin bent / not for cats" },
        { label: "风险聚焦", value: "针头耐久性争议" },
      ],
    },
  ],
  conclusion: {
    worthReference: "值得参考（7.8 / 10）",
    positioning: "中端价位的功能稳定型选手，适合做基础盘对标。",
    coreReasons: [
      "转化链条完整：标题、主图、A+ 信息一致。",
      "评论基数大，正向口碑集中在“省力与易清理”。",
      "价格稳定，促销依赖度低。",
    ],
    majorRisks: [
      "结构创新有限，正面硬碰硬容易进入价格战。",
      "耐久性吐槽较集中，若直接复刻会继承风险。",
    ],
  },
  decision: {
    learnings: [
      "保留“一键退毛”作为核心功能锚点，但补充“针头不易弯折”证据。",
      "借鉴其“场景痛点→结果”的图文顺序，减少功能堆砌。",
    ],
    avoidings: [
      "不建议照搬“95% 减少掉毛”绝对表述，存在合规风险。",
      "不建议使用过多同色块文案贴片，易降低专业感。",
    ],
    redesignSuggestions: [
      "改款：握柄加宽 8%，提高大手用户握持舒适度。",
      "改花色：主色从深蓝改为暖灰 + 薄荷绿点缀，强化中性家居感。",
    ],
    nextSteps: [
      "与产品团队确认针头材料可行性（T+2 天）。",
      "补采 20 条中差评样本，验证耐久性问题真实占比（T+3 天）。",
      "输出新版详情页文案与线框（T+5 天）。",
    ],
  },
  assets: {
    productLinks: [
      { label: "Amazon 商品页", url: "https://www.amazon.com/dp/B0CCX9A91K" },
      { label: "Keepa 价格走势", url: "https://keepa.com/#!product/1-B0CCX9A91K" },
    ],
    mainImages: [
      {
        label: "主图截图",
        image:
          "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80",
      },
      {
        label: "场景图截图",
        image:
          "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80",
      },
    ],
    aPlusImages: [
      {
        label: "A+ 模块截图",
        image:
          "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80",
      },
    ],
    references: [
      { label: "材质验证报告 v2", note: "内部共享盘 /docs/material-report-v2" },
      { label: "用户访谈摘录", note: "内部知识库 /research/pet-grooming-2026" },
    ],
  },
};
