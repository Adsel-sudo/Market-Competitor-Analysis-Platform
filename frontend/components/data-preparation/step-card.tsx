import { cn } from "@/components/ui/utils";
import { SecondaryButton } from "@/components/common";
import type { DataPreparationStep } from "@/mocks/data-preparation.mock";

type StepCardProps = {
  index: number;
  step: DataPreparationStep;
  note: string;
  onToggleComplete: (id: DataPreparationStep["id"]) => void;
  onNoteChange: (value: string) => void;
};

export function StepCard({ index, step, note, onToggleComplete, onNoteChange }: StepCardProps) {
  return (
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
        <div className="mt-4">
          <SecondaryButton onClick={() => onToggleComplete(step.id)}>
            {step.completed ? "重新上传（占位）" : "上传文件（占位）"}
          </SecondaryButton>
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
  );
}
