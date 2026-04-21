import type { WorkspaceModule, WorkspaceModuleOption } from "@/mocks/workspace-entry.mock";

import { FeatureEntryButton } from "@/components/workspace-entry/feature-entry-button";

type FeatureEntryPanelProps = {
  options: WorkspaceModuleOption[];
  onSelect: (module: WorkspaceModule) => void;
};

export function FeatureEntryPanel({ options, onSelect }: FeatureEntryPanelProps) {
  return (
    <section className="flex h-full items-center pt-4 lg:pt-6">
      <div className="mx-auto w-[90%] max-w-[864px]">
        <h1 className="bg-[linear-gradient(120deg,#251f32_0%,#4f4371_60%,#6f62a2_100%)] bg-clip-text text-[30px] font-semibold leading-[1.15] tracking-[-0.02em] text-transparent drop-shadow-[0_3px_10px_rgba(95,74,140,0.15)] lg:text-[38px]">
          开始一次市场分析任务
        </h1>

        <div className="mt-10 flex flex-col gap-5">
          {options.map((option) => (
            <FeatureEntryButton key={option.key} option={option} onClick={() => onSelect(option.key)} />
          ))}
        </div>
      </div>
    </section>
  );
}
