"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);

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

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleEntries.length === 0) {
          return;
        }

        const firstVisible = visibleEntries[0];
        const index = Number(firstVisible.target.getAttribute("data-step-index"));

        if (!Number.isNaN(index)) {
          setActiveStepIndex(index);
        }
      },
      {
        root: container,
        threshold: [0.45, 0.7],
      },
    );

    stepRefs.current.forEach((node) => {
      if (node) {
        observer.observe(node);
      }
    });

    return () => observer.disconnect();
  }, [steps.length]);

  return (
    <PageShell className="h-screen overflow-hidden px-5 pt-2 lg:px-8 lg:pt-3 xl:px-12">
      <SectionContainer className="flex h-full flex-col space-y-3">
        <div className="mx-auto flex w-full max-w-[1820px] items-center justify-between gap-3 px-6 lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-4 lg:px-8">
          <h1 className="shrink-0 whitespace-nowrap text-[34px] font-semibold leading-none tracking-tight text-[#4a3f63]">数据准备</h1>
          <header className="glass-card flex min-w-0 flex-1 items-center justify-between rounded-[24px] px-4 py-2 lg:px-7">
            <SecondaryButton onClick={() => router.push("/")}>← 返回工作台</SecondaryButton>
            <span className="rounded-full bg-[color:var(--accent-secondary)] px-3 py-1 text-xs text-[color:var(--accent-primary)]">
              进度 {completedCount}/3
            </span>
          </header>
          <PrimaryButton className="shrink-0 lg:justify-self-end" onClick={jumpToPage3}>
            开始分析
          </PrimaryButton>
        </div>

        <GlassCard className="mx-auto mt-2 flex min-h-0 w-full max-w-[1820px] flex-1 flex-col space-y-5 overflow-hidden p-6 pt-4 lg:p-8 lg:pt-5">
          <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[72px_minmax(0,1fr)]">
            <aside className="hidden lg:sticky lg:top-1 lg:block lg:self-start">
              <div className="flex justify-center pt-2">
                <div className="relative flex h-[84vh] max-h-[720px] min-h-[500px] w-10 items-center justify-center">
                  <div className="h-full w-[4px] rounded-full bg-[#d8d2e0]" />
                  {steps.map((step, index) => (
                    <div
                      key={step.id}
                      className={cn(
                        "absolute left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-colors",
                        step.completed
                          ? "border-[color:var(--accent-primary)] bg-[color:var(--accent-primary)]"
                          : index === activeStepIndex
                            ? "border-[color:var(--accent-primary)] bg-[color:var(--accent-secondary)]"
                            : "border-[#cdbfe0] bg-white",
                      )}
                      style={{ top: `${(index / Math.max(steps.length - 1, 1)) * 100}%` }}
                    />
                  ))}
                </div>
              </div>
            </aside>

            <div ref={scrollContainerRef} className="min-h-0 overflow-y-auto pr-2">
              <div className="space-y-3 pb-1">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    ref={(node) => {
                      stepRefs.current[index] = node;
                    }}
                    data-step-index={index}
                  >
                    <StepCard
                      index={index}
                      step={step}
                      note={note}
                      onToggleComplete={toggleStepCompleted}
                      onNoteChange={setNote}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="shrink-0 pt-1 lg:hidden">
            <PrimaryButton onClick={jumpToPage3}>开始分析</PrimaryButton>
          </div>
        </GlassCard>
      </SectionContainer>
    </PageShell>
  );
}
