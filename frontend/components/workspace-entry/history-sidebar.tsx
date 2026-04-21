import type { HistoryTask } from "@/mocks/workspace-entry.mock";

import { HistoryListItem } from "@/components/workspace-entry/history-list-item";

type HistorySidebarProps = {
  tasks: HistoryTask[];
  onOpenTask: (taskId: string) => void;
};

export function HistorySidebar({ tasks, onOpenTask }: HistorySidebarProps) {
  return (
    <aside className="rounded-3xl bg-white/52 p-4 shadow-[0_10px_24px_rgba(65,44,84,0.05)] backdrop-blur-sm">
      <div className="mb-2 px-1">
        <h2 className="text-base font-semibold">历史分析</h2>
        <p className="text-xs text-secondary">最近 {tasks.length} 条</p>
      </div>

      <div className="space-y-1">
        {tasks.map((task) => (
          <HistoryListItem key={task.id} task={task} onOpen={() => onOpenTask(task.id)} />
        ))}
      </div>
    </aside>
  );
}
