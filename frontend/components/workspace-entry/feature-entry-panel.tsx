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
        <h1 className="text-[28px] font-semibold leading-[1.2] tracking-tight text-[#000000] lg:text-[34px]">
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
