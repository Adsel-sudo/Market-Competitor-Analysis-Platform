import type { WorkspaceModule, WorkspaceModuleOption } from "@/mocks/workspace-entry.mock";

import { FeatureEntryButton } from "@/components/workspace-entry/feature-entry-button";

type FeatureEntryPanelProps = {
  options: WorkspaceModuleOption[];
  onSelect: (module: WorkspaceModule) => void;
};

export function FeatureEntryPanel({ options, onSelect }: FeatureEntryPanelProps) {
  return (
    <section className="h-full">
      <p className="text-sm font-medium tracking-wide text-[#7a7590]">工作台入口</p>
      <h1 className="mt-1 text-[30px] font-semibold leading-[1.2] tracking-tight text-[#2f2937] lg:text-[38px]">
        开始一次市场分析任务
      </h1>
      <p className="mt-2 max-w-[760px] text-sm text-[#736d85]">选择合适的分析模式后进入数据准备，流程与历史任务保持一致，仅优化视觉风格与信息可读性。</p>

      <div className="mt-7 flex max-w-[900px] flex-col gap-3.5">
        {options.map((option) => (
          <FeatureEntryButton key={option.key} option={option} onClick={() => onSelect(option.key)} />
        ))}
      </div>
    </section>
  );
}
