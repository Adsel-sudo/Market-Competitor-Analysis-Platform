import type { WorkspaceModule, WorkspaceModuleOption } from "@/mocks/workspace-entry.mock";

import { FeatureEntryButton } from "@/components/workspace-entry/feature-entry-button";

type FeatureEntryPanelProps = {
  options: WorkspaceModuleOption[];
  onSelect: (module: WorkspaceModule) => void;
};

export function FeatureEntryPanel({ options, onSelect }: FeatureEntryPanelProps) {
  return (
    <section className="h-full">
      <h1 className="text-[30px] font-semibold leading-[1.2] tracking-tight text-[#1f1731] lg:text-[38px]">
        开始一次市场分析任务
      </h1>

      <div className="mt-7 flex max-w-[900px] flex-col gap-3.5">
        {options.map((option) => (
          <FeatureEntryButton
            key={option.key}
            option={option}
            isHighlighted={option.key === "competitor"}
            onClick={() => onSelect(option.key)}
          />
        ))}
      </div>
    </section>
  );
}
