import { useEffect } from "react";

import { ReportCard } from "@/components/analysis-report/report-card";
import type { ReportScreen } from "@/mocks/analysis-report-view.mock";

type ReportCarouselProps = {
  screens: ReportScreen[];
  activeScreen: number;
  onChangeScreen: (index: number) => void;
};

export function ReportCarousel({ screens, activeScreen, onChangeScreen }: ReportCarouselProps) {
  const isFirst = activeScreen === 0;
  const isLast = activeScreen === screens.length - 1;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" && !isFirst) {
        onChangeScreen(activeScreen - 1);
      }
      if (event.key === "ArrowRight" && !isLast) {
        onChangeScreen(activeScreen + 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeScreen, isFirst, isLast, onChangeScreen]);

  return (
    <section className="relative h-full">
      <div className="h-full overflow-hidden rounded-3xl">
        <div
          className="flex h-full transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${activeScreen * 100}%)` }}
        >
          {screens.map((screen) => (
            <div key={screen.id} className="glass-card h-full w-full shrink-0 p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">{screen.title}</h3>
                <p className="mt-1 text-sm text-secondary">{screen.subtitle}</p>
              </div>

              <div className="grid h-[calc(100%-4.2rem)] grid-cols-2 grid-rows-2 gap-3.5">
                {screen.cards.map((card) => (
                  <ReportCard key={card.id} card={card} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        disabled={isFirst}
        onClick={() => onChangeScreen(activeScreen - 1)}
        className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border bg-white/85 text-secondary transition hover:bg-white disabled:opacity-40"
      >
        ←
      </button>
      <button
        type="button"
        disabled={isLast}
        onClick={() => onChangeScreen(activeScreen + 1)}
        className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border bg-white/85 text-secondary transition hover:bg-white disabled:opacity-40"
      >
        →
      </button>
    </section>
  );
}
