export type DataPreparationStep = {
  id: "step-1" | "step-2" | "step-3";
  title: string;
  description: string;
  type: "upload" | "note";
  completed: boolean;
};

export const dataPreparationStepsMock: DataPreparationStep[] = [
  {
    id: "step-1",
    title: "上传 BSR Excel",
    description: "上传卖家精灵导出的 BSR 数据文件",
    type: "upload",
    completed: false,
  },
  {
    id: "step-2",
    title: "上传页面 HTML 或截图",
    description: "上传商品详情页保存的 HTML 或补充截图",
    type: "upload",
    completed: false,
  },
  {
    id: "step-3",
    title: "补充说明（可选）",
    description: "可填写补充背景、特殊关注点、分析备注",
    type: "note",
    completed: false,
  },
];
