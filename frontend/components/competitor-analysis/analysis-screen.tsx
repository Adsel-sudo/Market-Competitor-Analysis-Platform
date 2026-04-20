import type { AnalysisScreen as AnalysisScreenData } from "@/components/competitor-analysis/types";

type AnalysisScreenProps = {
  screen: AnalysisScreenData;
};

export function AnalysisScreen({ screen }: AnalysisScreenProps) {
  return (
    <section className="surface-card h-full w-full shrink-0 p-5">
      <header className="mb-4">
        <h3 className="text-lg font-semibold text-primary">{screen.title}</h3>
        <p className="mt-1 text-sm text-secondary">{screen.subtitle}</p>
      </header>

      <div className="grid h-[calc(100%-4.5rem)] grid-cols-2 grid-rows-2 gap-4">
        {screen.cards.map((card) => (
          <article key={card.title} className="rounded-2xl border border-[color:var(--border-soft)] bg-white/70 p-4 shadow-sm">
            <h4 className="text-sm font-semibold text-primary">{card.title}</h4>
            <p className="mt-1 text-xs leading-5 text-secondary">{card.summary}</p>

            <dl className="mt-4 space-y-2">
              {card.metrics.map((metric) => (
                <div key={metric.label} className="flex items-center justify-between gap-2 text-xs">
                  <dt className="text-secondary">{metric.label}</dt>
                  <dd className="font-medium text-primary">{metric.value}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
