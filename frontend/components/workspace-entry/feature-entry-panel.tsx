import type { WorkspaceModule, WorkspaceModuleOption } from "@/mocks/workspace-entry.mock";

import { FeatureEntryButton } from "@/components/workspace-entry/feature-entry-button";

type FeatureEntryPanelProps = {
  options: WorkspaceModuleOption[];
  onSelect: (module: WorkspaceModule) => void;
};

export function FeatureEntryPanel({ options, onSelect }: FeatureEntryPanelProps) {
  return (
    <section className="h-full">
      <p className="text-sm text-secondary">你现在想做什么？</p>
      <h1 className="mt-1 text-[30px] font-semibold leading-tight">开始一次市场分析任务</h1>

      <div className="mt-8 flex max-w-3xl flex-col gap-3.5">
        {options.map((option) => (
          <FeatureEntryButton key={option.key} option={option} onClick={() => onSelect(option.key)} />
        ))}
      </div>
    </section>
  );
}
