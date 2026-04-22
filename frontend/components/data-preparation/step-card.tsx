"use client";

import { useMemo, useState } from "react";

import { cn } from "@/components/ui/utils";
import type { DataPreparationStep } from "@/mocks/data-preparation.mock";

type StepCardProps = {
  index: number;
  step: DataPreparationStep;
  note: string;
  isActive: boolean;
  onToggleComplete: (id: DataPreparationStep["id"]) => void;
  onNoteChange: (value: string) => void;
};

export function StepCard({ index, step, note, isActive, onToggleComplete, onNoteChange }: StepCardProps) {
  const [showPreview, setShowPreview] = useState(false);
  const uploadedFileName = step.id === "step-1" ? "BSR_data.xlsx" : "listing_snapshot.html";
  const previewTitle = useMemo(() => {
    if (step.id === "step-1") return "BSR 参考图";
    if (step.id === "step-2") return "页面参考图";
    return "说明参考图";
  }, [step.id]);

  return (
    <>
      <article
        className={cn(
          "surface-card rounded-2xl p-5 transition",
          step.completed
            ? "border-[rgba(111,89,188,0.26)] bg-white ring-1 ring-[rgba(111,89,188,0.12)]"
            : isActive
              ? "border-[rgba(118,96,197,0.2)] bg-[rgba(255,255,255,0.94)]"
              : "border-[rgba(88,64,104,0.1)] bg-[rgba(255,255,255,0.88)]",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-secondary">Step {index + 1}</p>
            <h3 className="mt-1 text-lg font-semibold text-primary">{step.title}</h3>
            <p className="mt-1 text-sm text-secondary">{step.description}</p>
          </div>
          {step.completed ? (
            <span className="rounded-full bg-[color:var(--success-soft)] px-2.5 py-1 text-xs font-medium text-[color:var(--success-text)]">
              已完成
            </span>
          ) : null}
        </div>

        {step.type === "upload" ? (
          <div className="mt-3 flex flex-col gap-4 rounded-2xl border bg-white/55 p-4 lg:grid lg:grid-cols-12 lg:items-stretch lg:gap-4">
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="group relative mx-auto flex h-28 w-full max-w-[320px] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[linear-gradient(180deg,#f8f5ff_0%,#efebff_100%)] lg:col-span-4 lg:mx-0 lg:h-auto lg:max-w-none"
              aria-label={`${previewTitle}，点击查看大图`}
            >
              <div className="h-[78%] w-[86%] rounded-lg border bg-[linear-gradient(180deg,#ffffff_0%,#f7f3ff_100%)]" />
            </button>

            <p className="w-full text-xs leading-6 text-secondary lg:col-span-3 lg:max-w-none lg:self-center">
              点击示意图可查看大图，确认文件格式和字段结构后，再上传右侧文件。
            </p>

            <button
              type="button"
              onClick={() => onToggleComplete(step.id)}
              className="flex min-h-[110px] w-full flex-col justify-center rounded-xl border border-dashed border-[#cdc4da] bg-white/80 px-4 text-left transition hover:bg-white lg:col-span-3"
            >
              <p className="text-sm font-medium text-primary">点击或拖拽上传</p>
            </button>

            <div className="flex min-h-[110px] items-center rounded-xl border border-dashed border-[#d8cee5] bg-white/70 px-3 lg:col-span-2">
              <div className="w-full rounded-lg bg-[#f7f5ff] px-3 py-2">
                <p className="text-[11px] uppercase tracking-wide text-[#9184a4]">已选择文件</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-sm">📎</span>
                  <span className="truncate text-xs text-secondary">{uploadedFileName}</span>
                </div>
              </div>
            </div>
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" role="dialog" aria-modal="true">
          <div className="relative w-full max-w-[980px] rounded-sm bg-black p-3">
            <button
              type="button"
              aria-label="关闭预览"
              className="absolute -top-3 -right-4 flex h-8 w-8 items-center justify-center rounded-full bg-black text-lg leading-none text-white transition hover:scale-105"
              onClick={() => setShowPreview(false)}
            >
              ×
            </button>
            <div className="mx-auto h-[520px] w-full bg-[linear-gradient(180deg,#f5f1ff_0%,#e9e3ff_100%)]" />
          </div>
        </div>
      ) : null}
    </>
  );
}
