import type { PrecheckResult } from "@/mocks/workspace-entry.mock";

import { PrimaryButton, SecondaryButton, Tag } from "@/components/common";

type PrecheckPanelProps = {
  result: PrecheckResult;
  onCompetitorOnly: () => void;
  onResearchFirst: () => void;
};

export function PrecheckPanel({ result, onCompetitorOnly, onResearchFirst }: PrecheckPanelProps) {
  return (
    <section className="surface-card p-6">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-base font-semibold">前置问题识别（模拟 LLM）</h3>
        <Tag>Mock Output</Tag>
      </div>

      <dl className="mt-4 grid gap-3.5 sm:grid-cols-2">
        <div className="surface-card rounded-xl p-3">
          <dt className="text-xs text-secondary">已识别对象</dt>
          <dd className="mt-1 text-sm font-medium">{result.detectedObject}</dd>
        </div>
        <div className="surface-card rounded-xl p-3">
          <dt className="text-xs text-secondary">推测类目</dt>
          <dd className="mt-1 text-sm font-medium">{result.inferredCategory}</dd>
        </div>
        <div className="surface-card rounded-xl p-3">
          <dt className="text-xs text-secondary">建议执行</dt>
          <dd className="mt-1 text-sm font-medium">{result.recommendedAction}</dd>
        </div>
        <div className="surface-card rounded-xl p-3">
          <dt className="text-xs text-secondary">是否需要先补充市场调研</dt>
          <dd className="mt-1 text-sm font-medium text-[color:var(--risk-text)]">{result.needsResearchFirst}</dd>
        </div>
      </dl>

      <div className="mt-5 flex flex-wrap gap-2">
        <PrimaryButton onClick={onCompetitorOnly}>仅做竞品分析</PrimaryButton>
        <SecondaryButton onClick={onResearchFirst}>先做市场调研</SecondaryButton>
      </div>
    </section>
  );
}
