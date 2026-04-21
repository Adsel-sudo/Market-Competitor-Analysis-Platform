import type { HistoryTask } from "@/mocks/workspace-entry.mock";

import { HistoryListItem } from "@/components/workspace-entry/history-list-item";

type HistorySidebarProps = {
  tasks: HistoryTask[];
  onOpenTask: (taskId: string) => void;
};

export function HistorySidebar({ tasks, onOpenTask }: HistorySidebarProps) {
  return (
    <aside className="h-full border-l border-black/10 pl-5 lg:pl-7">
      <div className="mb-2.5">
        <h2 className="text-base font-semibold text-primary">历史分析</h2>
        <p className="text-xs text-secondary">最近 {tasks.length} 条</p>
      </div>

      <div className="mt-3 space-y-1.5">
        {tasks.map((task, index) => (
          <HistoryListItem key={task.id} task={task} onOpen={() => onOpenTask(task.id)} isActive={index === 0} />
        ))}
      </div>
    </aside>
  );
}
