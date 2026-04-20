import type { HistoryTask } from "@/mocks/workspace-entry.mock";
import { cn } from "@/components/ui/utils";

type HistoryTaskListProps = {
  tasks: HistoryTask[];
  onOpenTask: (taskId: string) => void;
};

const statusStyleMap: Record<HistoryTask["status"], string> = {
  已完成: "bg-[color:var(--success-soft)] text-[color:var(--success-text)]",
  进行中: "bg-[color:var(--accent-secondary)] text-[color:var(--accent-primary)]",
  待处理: "bg-[color:var(--risk-soft)] text-[color:var(--risk-text)]",
};

export function HistoryTaskList({ tasks, onOpenTask }: HistoryTaskListProps) {
  return (
    <section className="glass-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold">历史任务</h3>
        <span className="text-xs text-secondary">最近 {tasks.length} 条</span>
      </div>

      <div className="space-y-2.5">
        {tasks.map((task) => (
          <button
            key={task.id}
            type="button"
            onClick={() => onOpenTask(task.id)}
            className="surface-card w-full rounded-2xl p-4 text-left transition hover:bg-white"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-secondary">{task.type}</span>
              <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", statusStyleMap[task.status])}>
                {task.status}
              </span>
            </div>
            <p className="mt-2 text-sm font-medium text-primary">{task.title}</p>
            <p className="mt-1 text-xs text-secondary">{task.createdAt}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
