import type { AnalysisScreen as AnalysisScreenData } from "@/components/competitor-analysis/types";
import { cn } from "@/components/ui/utils";

import { AnalysisScreen } from "@/components/competitor-analysis/analysis-screen";

type AnalysisCarouselProps = {
  screens: AnalysisScreenData[];
  activeScreen: number;
  onChange: (index: number) => void;
};

export function AnalysisCarousel({ screens, activeScreen, onChange }: AnalysisCarouselProps) {
  const isFirst = activeScreen === 0;
  const isLast = activeScreen === screens.length - 1;

  return (
    <div className="relative h-full">
      <div className="h-full overflow-hidden rounded-3xl">
        <div
          className="flex h-full transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${activeScreen * 100}%)` }}
        >
          {screens.map((screen) => (
            <AnalysisScreen key={screen.id} screen={screen} />
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-[color:var(--border-soft)] bg-white/75 px-3 py-1.5 backdrop-blur-sm">
        {screens.map((screen, index) => (
          <button
            key={screen.id}
            type="button"
            className={cn(
              "pointer-events-auto h-2.5 w-2.5 rounded-full transition",
              index === activeScreen ? "bg-[color:var(--accent-primary)]" : "bg-[#d5cfe8] hover:bg-[#b9aed7]",
            )}
            onClick={() => onChange(index)}
            aria-label={`切换到${screen.title}`}
          />
        ))}
      </div>

      <button
        type="button"
        disabled={isFirst}
        onClick={() => onChange(activeScreen - 1)}
        className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[color:var(--border-soft)] bg-white/90 text-secondary shadow-sm backdrop-blur-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="上一屏"
      >
        ←
      </button>

      <button
        type="button"
        disabled={isLast}
        onClick={() => onChange(activeScreen + 1)}
        className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[color:var(--border-soft)] bg-white/90 text-secondary shadow-sm backdrop-blur-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="下一屏"
      >
        →
      </button>
    </div>
  );
}
