"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { PageShell, PrimaryButton, SectionContainer, SecondaryButton } from "@/components/common";
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
        root: null,
        rootMargin: "-22% 0px -50% 0px",
        threshold: [0.15, 0.45],
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
    <PageShell className="px-5 pt-3 lg:px-8 xl:px-12">
      <SectionContainer className="mx-auto w-full max-w-[1820px]">
        <header className="sticky top-3 z-20 mb-5 rounded-3xl border bg-[rgba(255,255,255,0.88)] px-4 py-3 backdrop-blur-sm lg:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3 lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-4">
            <h1 className="shrink-0 whitespace-nowrap text-[34px] font-semibold leading-none tracking-tight text-[#4a3f63]">数据准备</h1>
            <div className="flex min-w-0 items-center justify-between gap-3 rounded-2xl bg-white/75 px-3 py-2 lg:px-5">
              <SecondaryButton onClick={() => router.push("/")}>← 返回工作台</SecondaryButton>
              <span className="rounded-full bg-[color:var(--accent-secondary)] px-3 py-1 text-xs text-[color:var(--accent-primary)]">
                进度 {completedCount}/3
              </span>
            </div>
            <PrimaryButton className="shrink-0 lg:justify-self-end" onClick={jumpToPage3}>
              开始分析
            </PrimaryButton>
          </div>
        </header>

        <main className="pb-8">
          <div className="space-y-4">
            {steps.map((step, index) => {
              const isLast = index === steps.length - 1;
              const isActive = index === activeStepIndex;

              return (
                <section
                  key={step.id}
                  ref={(node) => {
                    stepRefs.current[index] = node;
                  }}
                  data-step-index={index}
                  className="grid grid-cols-[28px_minmax(0,1fr)] gap-3 lg:grid-cols-[42px_minmax(0,1fr)] lg:gap-5"
                >
                  <div className="flex justify-center pt-2">
                    <div className="flex min-h-full w-4 flex-col items-center gap-2">
                      <span
                        className={cn(
                          "w-[2px] flex-1 rounded-full bg-[#ddd4e6]",
                          index === 0 ? "opacity-0" : "opacity-100",
                        )}
                        aria-hidden
                      />
                      <span
                        className={cn(
                          "h-3.5 w-3.5 rounded-full border-2 transition-colors",
                          step.completed
                            ? "border-[color:var(--accent-primary)] bg-[color:var(--accent-primary)]"
                            : isActive
                              ? "border-[color:var(--accent-primary)] bg-[color:var(--accent-secondary)]"
                              : "border-[#cfbfdc] bg-white",
                        )}
                      />
                      <span
                        className={cn(
                          "w-[2px] flex-1 rounded-full bg-[#ddd4e6]",
                          isLast ? "opacity-0" : "opacity-100",
                        )}
                        aria-hidden
                      />
                    </div>
                  </div>

                  <StepCard
                    index={index}
                    step={step}
                    note={note}
                    isActive={isActive}
                    onToggleComplete={toggleStepCompleted}
                    onNoteChange={setNote}
                  />
                </section>
              );
            })}
          </div>

          <div className="mt-5 lg:hidden">
            <PrimaryButton onClick={jumpToPage3}>开始分析</PrimaryButton>
          </div>
        </main>
      </SectionContainer>
    </PageShell>
  );
}
