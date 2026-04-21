"use client";

import { useMemo, useState } from "react";

import { cn } from "@/components/ui/utils";
import type { DataPreparationStep } from "@/mocks/data-preparation.mock";

type StepCardProps = {
  index: number;
  step: DataPreparationStep;
  note: string;
  onToggleComplete: (id: DataPreparationStep["id"]) => void;
  onNoteChange: (value: string) => void;
};

export function StepCard({ index, step, note, onToggleComplete, onNoteChange }: StepCardProps) {
  const [showPreview, setShowPreview] = useState(false);

  const previewTitle = useMemo(() => {
    if (step.id === "step-1") return "BSR 参考图";
    if (step.id === "step-2") return "HTML/截图参考图";
    return "说明参考图";
  }, [step.id]);

  return (
    <>
      <article
        className={cn(
          "surface-card rounded-2xl p-5 transition",
          step.completed ? "ring-1 ring-emerald-100" : "ring-1 ring-transparent",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-secondary">Step {index + 1}</p>
            <h3 className="mt-1 text-lg font-semibold text-primary">{step.title}</h3>
            <p className="mt-1 text-sm text-secondary">{step.description}</p>
          </div>
          <span
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-medium",
              step.completed
                ? "bg-[color:var(--success-soft)] text-[color:var(--success-text)]"
                : "bg-white/70 text-secondary",
            )}
          >
            {step.completed ? "已完成" : "未完成"}
          </span>
        </div>

        {step.type === "upload" ? (
          <div className="mt-4 grid items-center gap-4 rounded-2xl bg-white/45 p-4 lg:grid-cols-[minmax(280px,1.2fr)_minmax(250px,0.9fr)]">
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="group relative mx-auto flex h-28 w-full max-w-[360px] items-center justify-center overflow-hidden rounded-xl bg-[linear-gradient(135deg,#f3efff_0%,#ebe5ff_100%)]"
            >
              <div className="h-[78%] w-[86%] rounded-lg bg-[linear-gradient(180deg,#ffffff_0%,#f4f0ff_100%)]" />
            </button>

            <button
              type="button"
              onClick={() => onToggleComplete(step.id)}
              className="flex min-h-[130px] w-full flex-col justify-center rounded-xl border border-dashed border-[#cdc4da] bg-white/70 px-4 text-left transition hover:bg-white"
            >
              <p className="text-sm font-medium text-primary">点击或拖拽上传</p>
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-[#f7f5ff] px-3 py-2">
                <span className="text-sm">📎</span>
                <span className="text-xs text-secondary">{step.id === "step-1" ? "BSR_data.xlsx" : "listing_snapshot.html"}</span>
              </div>
            </button>
          </div>
        ) : (
          <div className="mt-4">
            <textarea
              value={note}
              onChange={(event) => onNoteChange(event.target.value)}
              placeholder="例如：重点关注价格策略变化和差评集中问题"
              rows={4}
              className="ui-input resize-none"
            />
          </div>
        )}
      </article>

      {showPreview ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1330]/55 px-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-[920px] overflow-hidden rounded-2xl bg-white p-4 text-left shadow-2xl">
            <button
              type="button"
              aria-label="关闭预览"
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black text-lg leading-none text-white transition hover:scale-105"
              onClick={() => setShowPreview(false)}
            >
              ×
            </button>
            <div className="mb-2 flex items-center justify-between pr-10">
              <p className="text-sm font-medium text-primary">{previewTitle}</p>
            </div>
            <div className="h-[460px] w-full rounded-xl bg-[linear-gradient(180deg,#f5f1ff_0%,#e9e3ff_100%)]" />
          </div>
        </div>
      ) : null}
    </>
  );
}
