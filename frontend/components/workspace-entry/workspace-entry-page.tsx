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
    <PageShell className="min-h-screen bg-[#f4f2f7] px-0 py-0">
      <WorkspaceHeader />

      <SectionContainer className="flex min-h-[calc(100vh-72px)] w-full max-w-[1660px] flex-col px-5 py-8 lg:px-8 xl:px-12">
        <div className="grid h-full flex-1 grid-cols-1 gap-6 lg:grid-cols-[minmax(0,72fr)_minmax(320px,28fr)] lg:gap-6">
          <div className="rounded-[30px] border border-[#d9d4e6] bg-[#f7f5fb] p-6 shadow-[0_12px_28px_rgba(68,50,105,0.08)] lg:p-8 xl:p-10">
            <FeatureEntryPanel options={workspaceModuleOptions} onSelect={jumpToDataPrep} />
          </div>

          <div className="rounded-[30px] border border-[#ddd8ea] bg-[#f9f7fc] p-4 shadow-[0_10px_24px_rgba(68,50,105,0.06)] lg:p-5">
            <HistorySidebar tasks={workspaceHistoryTasks} onOpenTask={openHistoryTask} />
          </div>
        </div>
      </SectionContainer>
    </PageShell>
  );
}
