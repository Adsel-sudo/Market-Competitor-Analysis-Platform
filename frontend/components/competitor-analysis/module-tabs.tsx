import type { ModuleTab } from "@/components/competitor-analysis/types";
import { cn } from "@/components/ui/utils";

type ModuleTabsProps = {
  tabs: ModuleTab[];
  activeKey: ModuleTab["key"];
  onChange: (key: ModuleTab["key"]) => void;
};

export function ModuleTabs({ tabs, activeKey, onChange }: ModuleTabsProps) {
  return (
    <div className="inline-flex rounded-2xl border border-[color:var(--border-soft)] bg-white/65 p-1 shadow-sm backdrop-blur">
      {tabs.map((tab) => {
        const active = tab.key === activeKey;

        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={cn(
              "rounded-xl px-4 py-2 text-sm font-medium transition",
              active
                ? "bg-[color:var(--accent-primary)] text-white shadow-sm"
                : "text-secondary hover:bg-white/80 hover:text-primary",
            )}
            aria-pressed={active}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
