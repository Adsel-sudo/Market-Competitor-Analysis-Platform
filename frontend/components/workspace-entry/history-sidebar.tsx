import type { HistoryTask } from "@/mocks/workspace-entry.mock";

import { HistoryListItem } from "@/components/workspace-entry/history-list-item";

type HistorySidebarProps = {
  tasks: HistoryTask[];
  onOpenTask: (taskId: string) => void;
};

export function HistorySidebar({ tasks, onOpenTask }: HistorySidebarProps) {
  return (
    <aside className="h-full rounded-3xl border border-[#e2ddee] bg-white/65 p-4 backdrop-blur-sm lg:p-5">
      <div className="mb-3 border-b border-[#e7e2f2] pb-3">
        <h2 className="text-base font-semibold text-[#302a3a]">历史分析</h2>
        <p className="text-xs text-[#7d7692]">最近 {tasks.length} 条</p>
      </div>

      <div className="mt-2 space-y-1.5">
        {tasks.map((task, index) => (
          <HistoryListItem key={task.id} task={task} onOpen={() => onOpenTask(task.id)} isActive={index === 0} />
        ))}
      </div>
    </aside>
  );
}
