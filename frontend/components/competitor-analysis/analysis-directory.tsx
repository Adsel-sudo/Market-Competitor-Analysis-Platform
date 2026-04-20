import type { AnalysisScreen } from "@/components/competitor-analysis/types";
import { cn } from "@/components/ui/utils";

type AnalysisDirectoryProps = {
  screens: AnalysisScreen[];
  activeScreen: number;
  onSelect: (index: number) => void;
};

export function AnalysisDirectory({ screens, activeScreen, onSelect }: AnalysisDirectoryProps) {
  return (
    <aside className="surface-card flex h-full flex-col p-4">
      <h2 className="text-sm font-semibold text-primary">目录</h2>
      <p className="mt-1 text-xs text-secondary">共 {screens.length} 屏</p>

      <div className="mt-5 space-y-2">
        {screens.map((screen, index) => {
          const active = index === activeScreen;

          return (
            <button
              type="button"
              key={screen.id}
              onClick={() => onSelect(index)}
              className={cn(
                "w-full rounded-2xl border px-3 py-2.5 text-left transition",
                active
                  ? "border-transparent bg-[color:var(--accent-primary)] text-white shadow-sm"
                  : "border-transparent bg-white/50 text-secondary hover:border-[color:var(--border-soft)] hover:bg-white/85",
              )}
              aria-current={active ? "page" : undefined}
            >
              <p className={cn("text-sm font-medium", active ? "text-white" : "text-primary")}>{screen.title}</p>
              <p className={cn("mt-1 text-xs", active ? "text-white/80" : "text-secondary")}>{screen.subtitle}</p>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
