"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { GlassCard, PageShell, PrimaryButton, SectionContainer, SecondaryButton } from "@/components/common";
import { StepCard } from "@/components/data-preparation/step-card";
import { cn } from "@/components/ui/utils";
import { dataPreparationStepsMock } from "@/mocks/data-preparation.mock";

type DataPreparationPageProps = {
  moduleName: string;
  targetObject: string;
};

export function DataPreparationPage({ moduleName, targetObject }: DataPreparationPageProps) {
  const router = useRouter();
  const [steps, setSteps] = useState(dataPreparationStepsMock);
  const [note, setNote] = useState("");

  const completedCount = useMemo(() => steps.filter((step) => step.completed).length, [steps]);

  const toggleStepCompleted = (id: (typeof dataPreparationStepsMock)[number]["id"]) => {
    setSteps((previous) =>
      previous.map((step) => (step.id === id ? { ...step, completed: !step.completed } : step)),
    );
  };

  const jumpToPage3 = () => {
    const params = new URLSearchParams({
      from: "data-prep",
      module: moduleName,
      target: targetObject,
    });
    router.push(`/analysis-report?${params.toString()}`);
  };

  return (
    <PageShell className="px-5 pt-3 lg:px-8 lg:pt-4 xl:px-12">
      <SectionContainer className="space-y-4">
        <header className="glass-card mx-auto flex w-full max-w-[1360px] items-center justify-between rounded-[30px] px-6 py-3 lg:px-8">
          <SecondaryButton onClick={() => router.push("/")}>← 返回工作台</SecondaryButton>
          <span className="rounded-full bg-[color:var(--accent-secondary)] px-2.5 py-1 text-xs text-[color:var(--accent-primary)]">
            当前状态：等待数据准备
          </span>
        </header>

        <GlassCard className="mx-auto w-full max-w-[1820px] space-y-6 p-6 lg:p-8">
          <div className="flex items-start justify-between">
            <h1 className="text-[42px] leading-none">数据准备</h1>
            <span className="rounded-full bg-white/70 px-3 py-1 text-xs text-secondary">进度 {completedCount}/3</span>
          </div>

          <div className="grid gap-5 lg:grid-cols-[74px_minmax(0,1fr)]">
            <aside className="hidden lg:flex lg:justify-center">
              <div className="relative mt-2 flex h-full min-h-[520px] w-10 items-start justify-center">
                <div className="h-full w-[4px] rounded-full bg-[#d8d2e0]" />
                <div className="absolute left-1/2 top-5 h-5 w-5 -translate-x-1/2 rounded-full border-4 border-white bg-[color:var(--accent-primary)] shadow-[0_0_0_4px_rgba(117,102,216,0.2)]" />
                {steps.slice(1).map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full",
                      index === 0 ? "top-[35%] bg-[#c7bfce]" : "top-[67%] bg-[#c7bfce]",
                    )}
                  />
                ))}
              </div>
            </aside>

            <div className="space-y-3">
              {steps.map((step, index) => (
                <StepCard
                  key={step.id}
                  index={index}
                  step={step}
                  note={note}
                  onToggleComplete={toggleStepCompleted}
                  onNoteChange={setNote}
                />
              ))}
            </div>
          </div>

          <div className="pt-1">
            <PrimaryButton onClick={jumpToPage3}>开始分析</PrimaryButton>
          </div>
        </GlassCard>
      </SectionContainer>
    </PageShell>
  );
}
