import type { HistoryTask } from "@/mocks/workspace-entry.mock";

import { HistoryListItem } from "@/components/workspace-entry/history-list-item";

type HistorySidebarProps = {
  tasks: HistoryTask[];
  onOpenTask: (taskId: string) => void;
};

export function HistorySidebar({ tasks, onOpenTask }: HistorySidebarProps) {
  return (
    <aside className="h-full border-l border-black/5 pl-4 lg:pl-6">
      <div className="mb-2">
        <h2 className="text-base font-semibold">历史分析</h2>
        <p className="text-xs text-secondary">最近 {tasks.length} 条</p>
      </div>

      <div className="mt-3 space-y-1">
        {tasks.map((task, index) => (
          <HistoryListItem key={task.id} task={task} onOpen={() => onOpenTask(task.id)} isActive={index === 0} />
        ))}
      </div>
    </aside>
  );
}
