import type { HistoryTask } from "@/mocks/workspace-entry.mock";

import { HistoryListItem } from "@/components/workspace-entry/history-list-item";

type HistorySidebarProps = {
  tasks: HistoryTask[];
  onOpenTask: (taskId: string) => void;
};

export function HistorySidebar({ tasks, onOpenTask }: HistorySidebarProps) {
  return (
    <aside className="h-full rounded-[24px] border border-[#e3e0e8] bg-[#ffffff] p-5 lg:p-6">
      <div className="mb-3 border-b border-[#e6e1eb] pb-4">
        <h2 className="text-base font-semibold text-[#302a3a]">历史分析</h2>
        <p className="text-xs text-[#6f6891]">最近 {tasks.length} 条</p>
      </div>

      <div className="mt-1">
        {tasks.map((task, index) => (
          <div key={task.id} className={index === tasks.length - 1 ? "" : "border-b border-[#ebe7f0] pb-1.5"}>
            <HistoryListItem task={task} onOpen={() => onOpenTask(task.id)} />
          </div>
        ))}
      </div>
    </aside>
  );
}
