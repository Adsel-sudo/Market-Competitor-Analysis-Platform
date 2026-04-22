"use client";

import { useMemo, useState } from "react";

import { cn } from "@/components/ui/utils";
import type { DataPreparationStep } from "@/mocks/data-preparation.mock";

type StepCardProps = {
  index: number;
  step: DataPreparationStep;
  note: string;
  isActive: boolean;
  onActivate: () => void;
  onToggleComplete: (id: DataPreparationStep["id"]) => void;
  onNoteChange: (value: string) => void;
};

export function StepCard({ index, step, note, isActive, onActivate, onToggleComplete, onNoteChange }: StepCardProps) {
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
        tabIndex={0}
        onClick={onActivate}
        onFocus={onActivate}
        className={cn(
          "surface-card rounded-2xl p-5 transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(118,96,197,0.28)]",
          step.completed
            ? "border-[rgba(111,89,188,0.26)] bg-white ring-1 ring-[rgba(111,89,188,0.12)] hover:border-[rgba(111,89,188,0.34)] hover:shadow-[0_8px_22px_rgba(98,76,130,0.08)]"
            : isActive
              ? "border-[rgba(118,96,197,0.24)] bg-[rgba(255,255,255,0.96)] shadow-[0_8px_20px_rgba(98,76,130,0.07)]"
              : "border-[rgba(88,64,104,0.1)] bg-[rgba(255,255,255,0.88)] hover:-translate-y-[1px] hover:border-[rgba(118,96,197,0.2)] hover:bg-[rgba(255,255,255,0.95)] hover:shadow-[0_8px_22px_rgba(98,76,130,0.07)]",
        )}
      >
        {step.type === "upload" ? (
          <div className="grid items-center gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(240px,0.9fr)_minmax(280px,1fr)_minmax(290px,1.05fr)] lg:gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)_minmax(320px,1fr)_minmax(330px,1.05fr)]">
            <div className="shrink-0 text-left">
              <p className="text-xs font-medium uppercase tracking-wide text-secondary">Step {index + 1}</p>
              <h3 className="mt-1 text-lg font-semibold text-primary">{step.title}</h3>
              <p className="mt-1 text-sm text-secondary">{step.description}</p>
              {step.completed ? (
                <span className="mt-2 inline-flex rounded-full bg-[color:var(--success-soft)] px-2.5 py-1 text-xs font-medium text-[color:var(--success-text)]">
                  已完成
                </span>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="group relative flex h-28 w-full min-w-[240px] max-w-[360px] items-center justify-center overflow-hidden rounded-xl border border-[rgba(118,96,197,0.16)] bg-white"
              aria-label={`${previewTitle}，点击查看大图`}
            >
              <div className="h-[78%] w-[86%] rounded-lg border border-[rgba(118,96,197,0.2)] bg-[rgba(246,242,255,0.45)]" />
            </button>

            <p className="max-w-[360px] text-xs leading-6 text-secondary">
              点击示意图可查看大图，确认文件格式和字段结构后，再上传右侧文件。
            </p>

            <button
              type="button"
              onClick={() => onToggleComplete(step.id)}
              className="flex h-28 w-full min-w-[290px] max-w-[370px] flex-col justify-center rounded-xl border border-dashed border-[#cdc4da] bg-white/80 px-4 text-left transition hover:bg-white"
            >
              <p className="text-sm font-medium text-primary">点击或拖拽上传</p>
              <div className="mt-3 w-full rounded-lg bg-[#f7f5ff] px-3 py-2">
                <p className="text-[11px] uppercase tracking-wide text-[#9184a4]">已选择文件</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-sm">📎</span>
                  <span className="truncate text-xs text-secondary">{uploadedFileName}</span>
                </div>
              </div>
            </button>
          </div>
        ) : (
          <div className="mt-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-secondary">Step {index + 1}</p>
              <h3 className="mt-1 text-lg font-semibold text-primary">{step.title}</h3>
              <p className="mt-1 text-sm text-secondary">{step.description}</p>
              {step.completed ? (
                <span className="mt-2 inline-flex rounded-full bg-[color:var(--success-soft)] px-2.5 py-1 text-xs font-medium text-[color:var(--success-text)]">
                  已完成
                </span>
              ) : null}
            </div>
            <textarea
              value={note}
              onChange={(event) => onNoteChange(event.target.value)}
              placeholder="例如：重点关注价格策略变化和差评集中问题"
              rows={4}
              className="ui-input mt-4 resize-none"
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
