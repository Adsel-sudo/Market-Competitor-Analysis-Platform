"use client";

import { useState } from "react";

import { AnalysisCarousel } from "@/components/competitor-analysis/analysis-carousel";
import { AnalysisDirectory } from "@/components/competitor-analysis/analysis-directory";
import { ModuleTabs } from "@/components/competitor-analysis/module-tabs";
import type { CompetitorAnalysisViewModel, ModuleKey } from "@/components/competitor-analysis/types";

type AnalysisDetailPageProps = {
  data: CompetitorAnalysisViewModel;
};

export function AnalysisDetailPage({ data }: AnalysisDetailPageProps) {
  const [activeModule, setActiveModule] = useState<ModuleKey>("competitor-analysis");
  const [activeScreen, setActiveScreen] = useState(0);

  const showPlaceholder = activeModule !== "competitor-analysis";

  return (
    <main className="relative h-screen overflow-hidden px-4 py-4 text-primary lg:px-6">
      <div className="relative mx-auto flex h-full w-full max-w-[1600px] flex-col gap-4">
        <header className="surface-card flex shrink-0 items-center justify-between px-5 py-3">
          <div>
            <h1 className="text-base font-semibold tracking-tight text-primary">{data.taskName}</h1>
            <p className="mt-1 text-xs text-secondary">
              ASIN {data.asin} · {data.category} · 更新于 {data.updatedAt} · {data.owner}
            </p>
          </div>
          <ModuleTabs tabs={data.modules} activeKey={activeModule} onChange={setActiveModule} />
        </header>

        {showPlaceholder ? (
          <section className="surface-card flex flex-1 items-center justify-center border-dashed">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-primary">
                {activeModule === "market-research" ? "市场调研" : "市场情报推送"}
              </h2>
              <p className="mt-2 text-sm text-secondary">页面建设中，当前先保留空页面占位。</p>
            </div>
          </section>
        ) : (
          <div className="grid h-[calc(100%-5.25rem)] min-h-0 grid-cols-[260px_minmax(0,1fr)] gap-4">
            <AnalysisDirectory screens={data.screens} activeScreen={activeScreen} onSelect={setActiveScreen} />
            <AnalysisCarousel screens={data.screens} activeScreen={activeScreen} onChange={setActiveScreen} />
          </div>
        )}
      </div>
    </main>
  );
}
