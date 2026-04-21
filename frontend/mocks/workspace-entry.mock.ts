export type WorkspaceModule = "competitor" | "research" | "intel";

export type WorkspaceModuleOption = {
  key: WorkspaceModule;
  title: string;
  description: string;
};

export type HistoryTask = {
  id: string;
  type: string;
  title: string;
  status: "进行中" | "已完成" | "待处理";
  createdAt: string;
};

export const workspaceModuleOptions: WorkspaceModuleOption[] = [
  {
    key: "competitor",
    title: "竞品分析",
    description: "分析 3 个以内竞品链接，快速识别定位与差异。",
  },
  {
    key: "research",
    title: "市场调研",
    description: "研究类目整体状态，建立价格带与需求认知。",
  },
  {
    key: "intel",
    title: "情报推送",
    description: "获取近期市场动向，持续跟踪重点信号。",
  },
];

export const workspaceHistoryTasks: HistoryTask[] = [
  {
    id: "task-2401",
    type: "竞品分析",
    title: "北美宠物梳竞品结构分析",
    status: "已完成",
    createdAt: "2026-04-18 14:10",
  },
  {
    id: "task-2402",
    type: "市场调研",
    title: "宠物清洁用品价格带扫描",
    status: "进行中",
    createdAt: "2026-04-19 09:30",
  },
  {
    id: "task-2403",
    type: "情报推送",
    title: "Top Seller 变化监控 - Grooming",
    status: "待处理",
    createdAt: "2026-04-20 08:45",
  },
];


export type PrecheckResult = {
  detectedObject: string;
  inferredCategory: string;
  recommendedAction: string;
  needsResearchFirst: string;
};

export const mockPrecheckResult: PrecheckResult = {
  detectedObject: "宠物梳商品链接",
  inferredCategory: "宠物清洁用品",
  recommendedAction: "竞品分析",
  needsResearchFirst: "建议先补充轻量市场调研（价格带 + 人群分层）",
};
