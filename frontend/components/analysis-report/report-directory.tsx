import { cn } from "@/components/ui/utils";
import type { ReportDirectoryItem } from "@/mocks/analysis-report-view.mock";

type ReportDirectoryProps = {
  items: ReportDirectoryItem[];
  activeItemId: string;
  onSelect: (item: ReportDirectoryItem) => void;
};

export function ReportDirectory({ items, activeItemId, onSelect }: ReportDirectoryProps) {
  return (
    <aside className="glass-card h-full p-4">
      <h3 className="text-sm font-semibold">目录</h3>
      <div className="mt-4 space-y-2">
        {items.map((item) => {
          const active = item.id === activeItemId;
          return (
            <button
              type="button"
              key={item.id}
              onClick={() => onSelect(item)}
              className={cn(
                "w-full rounded-xl px-3 py-2 text-left text-sm transition",
                active
                  ? "bg-[color:var(--accent-primary)] text-white"
                  : "text-secondary hover:bg-white/70 hover:text-primary",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
