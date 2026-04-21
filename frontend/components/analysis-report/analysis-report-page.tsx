"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { PageShell, PrimaryButton, SectionContainer, SecondaryButton } from "@/components/common";
import { ReportCarousel } from "@/components/analysis-report/report-carousel";
import { ReportDirectory } from "@/components/analysis-report/report-directory";
import { analysisReportDirectoryMock, analysisReportScreensMock, type ReportDirectoryItem } from "@/mocks/analysis-report-view.mock";

type AnalysisReportPageProps = {
  taskTitle: string;
};

const firstItemByScreen: Record<number, string> = analysisReportDirectoryMock.reduce<Record<number, string>>((acc, item) => {
  if (!acc[item.screenIndex]) {
    acc[item.screenIndex] = item.id;
  }
  return acc;
}, {});

export function AnalysisReportPage({ taskTitle }: AnalysisReportPageProps) {
  const router = useRouter();
  const [activeScreen, setActiveScreen] = useState(0);
  const [activeItemId, setActiveItemId] = useState(analysisReportDirectoryMock[0].id);

  const onSelectDirectory = (item: ReportDirectoryItem) => {
    setActiveItemId(item.id);
    setActiveScreen(item.screenIndex);
  };

  const onChangeScreen = (nextScreen: number) => {
    setActiveScreen(nextScreen);
    setActiveItemId(firstItemByScreen[nextScreen]);
  };

  return (
    <PageShell className="h-screen overflow-hidden px-4 pb-3 pt-2 lg:px-8 lg:pt-3">
      <SectionContainer className="flex h-full max-w-[1840px] flex-col gap-3">
        <div className="flex items-center justify-between">
          <SecondaryButton onClick={() => router.push("/")}>← 返回首页</SecondaryButton>
          <PrimaryButton onClick={() => router.push("/data-prep")}>返回数据准备</PrimaryButton>
        </div>

        <header className="glass-card shrink-0 px-6 py-3">
          <h1 className="text-2xl">{taskTitle}</h1>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-[248px_minmax(0,1fr)] gap-4">
          <ReportDirectory items={analysisReportDirectoryMock} activeItemId={activeItemId} onSelect={onSelectDirectory} />
          <ReportCarousel screens={analysisReportScreensMock} activeScreen={activeScreen} onChangeScreen={onChangeScreen} />
        </div>
      </SectionContainer>
    </PageShell>
  );
}
