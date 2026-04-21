import type { HistoryTask } from "@/mocks/workspace-entry.mock";

import { HistoryListItem } from "@/components/workspace-entry/history-list-item";

type HistorySidebarProps = {
  tasks: HistoryTask[];
  onOpenTask: (taskId: string) => void;
};

export function HistorySidebar({ tasks, onOpenTask }: HistorySidebarProps) {
  return (
    <aside className="h-full rounded-3xl border border-[#e4ddf3] bg-[#f6f3ff] p-4 lg:p-5">
      <div className="mb-3 border-b border-[#e8e1f4] pb-3">
        <h2 className="text-base font-semibold text-[#302a3a]">历史分析</h2>
        <p className="text-xs text-[#6f6891]">最近 {tasks.length} 条</p>
      </div>

      <div className="mt-2 space-y-1.5">
        {tasks.map((task, index) => (
          <HistoryListItem key={task.id} task={task} onOpen={() => onOpenTask(task.id)} isActive={index === 0} />
        ))}
      </div>
    </aside>
  );
}
