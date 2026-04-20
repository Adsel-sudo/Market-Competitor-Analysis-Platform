import type { ReportCard as ReportCardData } from "@/mocks/analysis-report-view.mock";

type ReportCardProps = {
  card: ReportCardData;
};

export function ReportCard({ card }: ReportCardProps) {
  return (
    <article className="surface-card rounded-2xl p-4">
      <h4 className="text-sm font-semibold text-primary">{card.title}</h4>
      <p className="mt-1.5 text-xs text-secondary">{card.summary}</p>
      <ul className="mt-3.5 space-y-1.5 text-xs text-primary">
        {card.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent-primary)]" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
