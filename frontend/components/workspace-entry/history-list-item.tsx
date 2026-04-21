import { cn } from "@/components/ui/utils";
import type { HistoryTask } from "@/mocks/workspace-entry.mock";

type HistoryListItemProps = {
  task: HistoryTask;
  onOpen: () => void;
};

const statusStyleMap: Record<HistoryTask["status"], string> = {
  已完成: "bg-[color:var(--success-soft)] text-[color:var(--success-text)]",
  进行中: "bg-[color:var(--accent-secondary)] text-[color:var(--accent-primary)]",
  待处理: "bg-[color:var(--risk-soft)] text-[color:var(--risk-text)]",
};

export function HistoryListItem({ task, onOpen }: HistoryListItemProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="w-full rounded-xl px-3 py-3 text-left transition hover:bg-white/75"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] text-secondary">{task.type}</span>
        <span className={cn("rounded-full px-2 py-0.5 text-[11px]", statusStyleMap[task.status])}>{task.status}</span>
      </div>
      <p className="mt-1.5 text-sm font-medium text-primary">{task.title}</p>
      <p className="mt-1 text-[11px] text-secondary">{task.createdAt}</p>
    </button>
  );
}
