"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { GlassCard, PageShell, PrimaryButton, SectionContainer, SecondaryButton } from "@/components/common";
import { StepCard } from "@/components/data-preparation/step-card";
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
    <PageShell>
      <SectionContainer className="max-w-5xl space-y-5">
        <header className="glass-card flex flex-wrap items-center justify-between gap-3 px-6 py-3.5">
          <SecondaryButton onClick={() => router.push("/")}>← 返回工作台</SecondaryButton>
          <div className="flex flex-wrap items-center gap-2 text-xs text-secondary">
            <span className="rounded-full bg-white/70 px-2.5 py-1">当前功能：{moduleName}</span>
            <span className="rounded-full bg-white/70 px-2.5 py-1">当前对象：{targetObject}</span>
            <span className="rounded-full bg-[color:var(--accent-secondary)] px-2.5 py-1 text-[color:var(--accent-primary)]">
              当前状态：等待数据准备
            </span>
          </div>
        </header>

        <GlassCard className="space-y-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary">Step-by-step guide</p>
              <h1 className="mt-1 text-2xl">数据准备</h1>
            </div>
            <span className="rounded-full bg-white/70 px-3 py-1 text-xs text-secondary">进度 {completedCount}/3</span>
          </div>

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

          <div className="pt-1">
            <PrimaryButton onClick={jumpToPage3}>开始分析</PrimaryButton>
          </div>
        </GlassCard>
      </SectionContainer>
    </PageShell>
  );
}
