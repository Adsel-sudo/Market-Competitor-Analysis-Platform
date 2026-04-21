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
    <PageShell className="min-h-screen bg-[linear-gradient(180deg,#fcf6f4_0%,#f8f4f8_100%)] px-0 py-0">
      <WorkspaceHeader />

      <SectionContainer className="flex min-h-[calc(100vh-62px)] w-full max-w-[1660px] flex-col px-5 py-6 lg:px-8 xl:px-12">
        <div className="grid h-full flex-1 grid-cols-1 gap-4 lg:grid-cols-[minmax(0,72fr)_minmax(350px,28fr)] lg:gap-4">
          <div className="rounded-[24px] border border-[#e3e0e8] bg-[#ffffff] p-7 shadow-[0_10px_24px_rgba(68,50,105,0.05)] lg:p-8 xl:p-9">
            <FeatureEntryPanel options={workspaceModuleOptions} onSelect={jumpToDataPrep} />
          </div>

          <div className="p-0.5 lg:p-1">
            <HistorySidebar tasks={workspaceHistoryTasks} onOpenTask={openHistoryTask} />
          </div>
        </div>
      </SectionContainer>
    </PageShell>
  );
}
