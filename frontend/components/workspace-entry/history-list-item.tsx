import { cn } from "@/components/ui/utils";
import type { HistoryTask } from "@/mocks/workspace-entry.mock";

type HistoryListItemProps = {
  task: HistoryTask;
  onOpen: () => void;
  isActive?: boolean;
};

const statusStyleMap: Record<HistoryTask["status"], string> = {
  已完成: "bg-[#edf7f1] text-[#4c745f]",
  进行中: "bg-[#eeeafb] text-[#6352a6]",
  待处理: "bg-[#fdf2ea] text-[#936a53]",
};

export function HistoryListItem({ task, onOpen, isActive = false }: HistoryListItemProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "w-full rounded-lg px-3 py-3 text-left transition-all duration-150",
        "bg-transparent hover:-translate-y-0.5 hover:bg-[#faf7ff] hover:shadow-[0_10px_20px_rgba(108,91,176,0.1)]",
        isActive && "bg-[linear-gradient(135deg,#7566d8_0%,#8b7de5_100%)] text-white shadow-[0_10px_20px_rgba(109,93,187,0.24)]",
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className={cn("text-[11px]", isActive ? "text-white/85" : "text-secondary")}>{task.type}</span>
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-[11px] font-medium",
            isActive ? "bg-white/25 text-white" : statusStyleMap[task.status],
          )}
        >
          {task.status}
        </span>
      </div>
      <p className={cn("mt-1.5 line-clamp-2 text-sm font-medium", isActive ? "text-white" : "text-primary")}>{task.title}</p>
      <p className={cn("mt-1 text-[11px]", isActive ? "text-white/80" : "text-secondary")}>{task.createdAt}</p>
    </button>
  );
}
