import { cn } from "@/components/ui/utils";
import type { HistoryTask } from "@/mocks/workspace-entry.mock";

type HistoryListItemProps = {
  task: HistoryTask;
  onOpen: () => void;
  isActive?: boolean;
};

const statusStyleMap: Record<HistoryTask["status"], string> = {
  已完成: "bg-[#edf7f1] text-[#4b7a61]",
  进行中: "bg-[#ecf2fd] text-[#49668f]",
  待处理: "bg-[#fdf2e9] text-[#9a6a4f]",
};

export function HistoryListItem({ task, onOpen, isActive = false }: HistoryListItemProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "w-full rounded-xl border border-transparent px-3 py-3 text-left transition",
        "hover:bg-[#efefec]",
        isActive && "bg-[#f0f0ee]",
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] text-secondary">{task.type}</span>
        <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-medium", statusStyleMap[task.status])}>
          {task.status}
        </span>
      </div>
      <p className="mt-1.5 line-clamp-2 text-sm font-medium text-primary">{task.title}</p>
      <p className="mt-1 text-[11px] text-secondary">{task.createdAt}</p>
    </button>
  );
}
