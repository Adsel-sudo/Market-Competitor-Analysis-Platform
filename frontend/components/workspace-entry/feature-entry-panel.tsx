import type { WorkspaceModule, WorkspaceModuleOption } from "@/mocks/workspace-entry.mock";

import { FeatureEntryButton } from "@/components/workspace-entry/feature-entry-button";

type FeatureEntryPanelProps = {
  options: WorkspaceModuleOption[];
  onSelect: (module: WorkspaceModule) => void;
};

export function FeatureEntryPanel({ options, onSelect }: FeatureEntryPanelProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#fffdfb] via-[#fff5f6] to-[#f4f1ff] p-7 shadow-[0_16px_34px_rgba(80,58,105,0.08)]">
      <div className="pointer-events-none absolute -left-16 top-14 h-44 w-44 rounded-full bg-[#ffdfe2]/70 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-[#e7ddff]/65 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-64px] right-16 h-40 w-40 rounded-full bg-white/80 blur-3xl" />

      <div className="relative">
        <p className="text-sm text-secondary">你现在想做什么？</p>
        <h1 className="mt-1 text-[2rem]">开始一次市场分析任务</h1>

        <div className="mt-7 flex max-w-2xl flex-col gap-3">
          {options.map((option) => (
            <FeatureEntryButton key={option.key} option={option} onClick={() => onSelect(option.key)} />
          ))}
        </div>
      </div>
    </section>
  );
}
