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
        <span className="bg-[linear-gradient(120deg,#744dff_0%,#8d6dff_52%,#a17cff_100%)] bg-clip-text text-transparent drop-shadow-[0_2px_6px_rgba(133,102,235,0.25)]">
          开始一次市场分析任务
        </span>
      </h1>

      <div className="mt-10 ml-0.5 flex max-w-[960px] flex-col gap-5">
        {options.map((option) => (
          <FeatureEntryButton key={option.key} option={option} onClick={() => onSelect(option.key)} />
        ))}
      </div>
    </section>
  );
}
