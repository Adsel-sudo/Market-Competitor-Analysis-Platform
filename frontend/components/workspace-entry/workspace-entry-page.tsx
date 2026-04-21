"use client";

import { useRouter } from "next/navigation";

import { PageShell, SectionContainer } from "@/components/common";
import { FeatureEntryPanel } from "@/components/workspace-entry/feature-entry-panel";
import { HistorySidebar } from "@/components/workspace-entry/history-sidebar";
import { WorkspaceHeader } from "@/components/workspace-entry/workspace-header";
import {
  workspaceHistoryTasks,
  workspaceModuleOptions,
  type WorkspaceModule,
} from "@/mocks/workspace-entry.mock";

const moduleRouteMap: Record<WorkspaceModule, string> = {
  competitor: "competitor-analysis",
  research: "market-research",
  intel: "insight-push",
};

export function WorkspaceEntryPage() {
  const router = useRouter();

  const jumpToDataPrep = (module: WorkspaceModule) => {
    const params = new URLSearchParams({
      module: moduleRouteMap[module],
    });
    router.push(`/data-prep?${params.toString()}`);
  };

  const openHistoryTask = (taskId: string) => {
    router.push(`/analysis-report?taskId=${taskId}&from=workspace-entry`);
  };

  return (
    <PageShell className="min-h-screen bg-[#f7f6f4] px-0 py-0">
      <WorkspaceHeader />

      <SectionContainer className="flex min-h-[calc(100vh-60px)] w-full max-w-[1560px] flex-col px-5 py-8 lg:px-10 xl:px-14">
        <div className="grid h-full flex-1 grid-cols-1 gap-10 lg:grid-cols-[minmax(0,67fr)_minmax(320px,33fr)] lg:gap-8 xl:gap-10">
          <div className="lg:pl-8 xl:pl-14">
            <FeatureEntryPanel options={workspaceModuleOptions} onSelect={jumpToDataPrep} />
          </div>

          <div className="w-full max-w-none">
            <HistorySidebar tasks={workspaceHistoryTasks} onOpenTask={openHistoryTask} />
          </div>
        </div>
      </SectionContainer>
    </PageShell>
  );
}
