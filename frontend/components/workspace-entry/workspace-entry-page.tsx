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

      <SectionContainer className="flex min-h-[calc(100vh-60px)] w-full max-w-none flex-col px-5 py-8 lg:px-10">
        <div className="flex h-full flex-1 flex-col gap-10 lg:flex-row lg:gap-10">
          <div className="flex-1 lg:basis-4/5">
            <FeatureEntryPanel options={workspaceModuleOptions} onSelect={jumpToDataPrep} />
          </div>

          <div className="w-full lg:w-[320px] lg:basis-1/5">
            <HistorySidebar tasks={workspaceHistoryTasks} onOpenTask={openHistoryTask} />
          </div>
        </div>
      </SectionContainer>
    </PageShell>
  );
}
