export type ReportDirectoryItem = {
  id: string;
  label: string;
  screenIndex: number;
};

export type ReportCard = {
  id: string;
  title: string;
  summary: string;
  bullets: string[];
};

export type ReportScreen = {
  id: string;
  title: string;
  subtitle: string;
  cards: ReportCard[];
};

export const analysisReportDirectoryMock: ReportDirectoryItem[] = [
  { id: "basic-info", label: "基础信息", screenIndex: 0 },
  { id: "market-position", label: "市场位置", screenIndex: 0 },
  { id: "traffic-ops", label: "流量与运营", screenIndex: 0 },
  { id: "selling-points", label: "卖点分析", screenIndex: 1 },
  { id: "title-analysis", label: "标题分析", screenIndex: 1 },
  { id: "bullet-analysis", label: "五点分析", screenIndex: 1 },
  { id: "a-plus", label: "A+分析", screenIndex: 1 },
  { id: "image-analysis", label: "图片分析", screenIndex: 2 },
  { id: "review-analysis", label: "评论分析", screenIndex: 2 },
  { id: "conclusion-summary", label: "结论摘要", screenIndex: 3 },
  { id: "decision-plan", label: "决策建议", screenIndex: 3 },
];

export const analysisReportScreensMock: ReportScreen[] = [
  {
    id: "foundation-market",
    title: "基础与市场",
    subtitle: "先理解对象和市场位置，明确分析背景。",
    cards: [
      {
        id: "basic-info",
        title: "基础信息",
        summary: "快速对齐对象属性与基础销售表现。",
        bullets: ["品牌：PetNova", "价格带：$16.99 - $21.99", "评分：4.5 / 5", "评论量：12.8k"],
      },
      {
        id: "market-position",
        title: "市场位置",
        summary: "判断其在当前细分市场中的段位。",
        bullets: ["细分类目：宠物清洁用品", "竞争段位：中高位", "目标人群：中大型犬用户", "市场成熟度：高"],
      },
      {
        id: "traffic-ops",
        title: "流量与运营",
        summary: "观察主要流量入口和运营动作。",
        bullets: ["广告依赖：中", "促销频率：月度节奏", "自然流量占比：较高", "主推关键词稳定"],
      },
      {
        id: "reference-links",
        title: "参考链接",
        summary: "用于复核分析结论的外部入口。",
        bullets: ["Amazon 商品页", "Keepa 价格趋势", "BSR 历史截图", "品牌店铺首页"],
      },
    ],
  },
  {
    id: "page-expression",
    title: "页面表达",
    subtitle: "检查详情页表达是否形成完整说服链。",
    cards: [
      {
        id: "selling-points",
        title: "卖点分析",
        summary: "核心卖点是否真实可感知。",
        bullets: ["一键退毛为主锚点", "痛点直达：不伤皮肤", "场景化表达完整", "卖点重叠度低"],
      },
      {
        id: "title-analysis",
        title: "标题分析",
        summary: "关键词覆盖与可读性平衡。",
        bullets: ["核心词前置", "字符长度适中", "利益点明确", "避免堆词"],
      },
      {
        id: "bullet-analysis",
        title: "五点分析",
        summary: "结构完整性与信息重复度。",
        bullets: ["结构：功能-证据-结果", "第2/3点轻微重复", "用户收益表达清晰", "保障信息放在末位"],
      },
      {
        id: "a-plus",
        title: "A+分析",
        summary: "图文叙事是否强化转化。",
        bullets: ["顺序：痛点→方案→保障", "对比图数量适中", "品牌感统一", "模块密度舒适"],
      },
    ],
  },
  {
    id: "visual-feedback",
    title: "视觉与用户反馈",
    subtitle: "结合视觉表达和用户声音识别风险。",
    cards: [
      {
        id: "image-analysis",
        title: "图片分析",
        summary: "主图、场景图与信息图协同度。",
        bullets: ["主图主体清晰", "场景图可信度高", "对比图中规中矩", "细节图可读性好"],
      },
      {
        id: "review-analysis",
        title: "评论分析",
        summary: "好评与差评聚焦点提炼。",
        bullets: ["好评关键词：easy clean", "差评关键词：pin bent", "负向集中于耐久性", "星级分布健康"],
      },
      {
        id: "style-color",
        title: "花色 / 风格",
        summary: "视觉偏好与家庭场景适配性。",
        bullets: ["主色：白底 + 蓝绿", "家居友好度：高", "风格偏中性", "材质感表达稳定"],
      },
      {
        id: "risk-alert",
        title: "风险提示",
        summary: "当前可见的执行风险。",
        bullets: ["文案绝对化需规避", "耐久争议需验证", "价格战敏感", "功能创新不足"],
      },
    ],
  },
  {
    id: "conclusion-decision",
    title: "结论与决策",
    subtitle: "收束证据，输出可执行策略。",
    cards: [
      {
        id: "conclusion-summary",
        title: "结论摘要",
        summary: "是否值得对标与投入。",
        bullets: ["参考价值：7.8 / 10", "适合作为基础盘对标", "短期可借鉴空间明确", "中期需差异化"],
      },
      {
        id: "success-logic",
        title: "成功逻辑",
        summary: "当前成功的关键路径。",
        bullets: ["表达链条完整", "核心卖点持续一致", "评论口碑稳定", "流量结构健康"],
      },
      {
        id: "learning-points",
        title: "可借鉴点 / 不建议学习点",
        summary: "明确可复制与高风险做法。",
        bullets: ["可借鉴：痛点-结果表达", "可借鉴：一键退毛锚点", "不建议：绝对化承诺", "不建议：高频促销依赖"],
      },
      {
        id: "decision-plan",
        title: "改款 / 改花色建议 / 下一步建议",
        summary: "形成可执行的行动计划。",
        bullets: ["改款：加强针头结构", "改花色：暖灰+薄荷绿", "下一步：补采中差评样本", "下一步：输出新版线框"],
      },
    ],
  },
];
