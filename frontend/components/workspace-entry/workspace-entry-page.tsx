"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { PageShell, SectionContainer, GlassCard, TextInput } from "@/components/common";
import { HistoryTaskList } from "@/components/workspace-entry/history-task-list";
import { ModuleSelector } from "@/components/workspace-entry/module-selector";
import { PrecheckPanel } from "@/components/workspace-entry/precheck-panel";
import {
  mockPrecheckResult,
  workspaceHistoryTasks,
  workspaceModuleOptions,
  type WorkspaceModule,
} from "@/mocks/workspace-entry.mock";

const moduleRouteMap: Record<WorkspaceModule, string> = {
  competitor: "竞品分析",
  research: "市场调研",
  intel: "市场情报推送",
};

export function WorkspaceEntryPage() {
  const router = useRouter();
  const [selectedModule, setSelectedModule] = useState<WorkspaceModule>("competitor");
  const [query, setQuery] = useState("");

  const hasInput = useMemo(() => query.trim().length > 0, [query]);

  const jumpToPage2 = (mode: "competitor-only" | "research-first") => {
    const params = new URLSearchParams({
      mode,
      module: moduleRouteMap[selectedModule],
      source: "workspace-entry",
    });
    router.push(`/data-prep?${params.toString()}`);
  };

  const openHistoryTask = (taskId: string) => {
    router.push(`/analysis-report?taskId=${taskId}&from=workspace-entry`);
  };

  return (
    <PageShell>
      <SectionContainer className="max-w-6xl space-y-5">
        <header className="glass-card flex items-center justify-between px-6 py-3.5">
          <p className="text-sm font-semibold tracking-wide text-primary">Market Analysis Platform</p>
          <div className="rounded-full border bg-white/70 px-3 py-1.5 text-xs text-secondary">用户信息占位 · Iris</div>
        </header>

        <GlassCard className="space-y-6 px-6 py-6">
          <div>
            <p className="text-sm text-secondary">你现在想做什么？</p>
            <h1 className="mt-1">开始一次市场分析任务</h1>
          </div>

          <ModuleSelector
            modules={workspaceModuleOptions}
            selectedModule={selectedModule}
            onSelect={setSelectedModule}
          />

          <section className="space-y-2.5">
            <p className="text-sm font-medium">输入需求</p>
            <TextInput
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="例如：帮我分析这个 ASIN 的核心竞品，或者直接粘贴商品链接 / 店铺链接"
            />
          </section>

          {hasInput ? (
            <PrecheckPanel
              result={mockPrecheckResult}
              onCompetitorOnly={() => jumpToPage2("competitor-only")}
              onResearchFirst={() => jumpToPage2("research-first")}
            />
          ) : null}
        </GlassCard>

        <HistoryTaskList tasks={workspaceHistoryTasks} onOpenTask={openHistoryTask} />
      </SectionContainer>
    </PageShell>
  );
}
