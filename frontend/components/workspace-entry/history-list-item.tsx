import { cn } from "@/components/ui/utils";
import type { HistoryTask } from "@/mocks/workspace-entry.mock";

type HistoryListItemProps = {
  task: HistoryTask;
  onOpen: () => void;
  isActive?: boolean;
};

const statusStyleMap: Record<HistoryTask["status"], string> = {
  已完成: "bg-[#edf7f1] text-[#4c745f]",
  进行中: "bg-[#edf2fb] text-[#4d678b]",
  待处理: "bg-[#fdf2ea] text-[#936a53]",
};

export function HistoryListItem({ task, onOpen, isActive = false }: HistoryListItemProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "w-full rounded-xl border border-transparent px-3.5 py-3 text-left transition-colors duration-150",
        "hover:border-black/5 hover:bg-[#f5f4f8]",
        isActive && "border-black/5 bg-[#f2f1f6]",
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
