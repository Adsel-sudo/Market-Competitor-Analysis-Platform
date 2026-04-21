import type { WorkspaceModuleOption } from "@/mocks/workspace-entry.mock";

type FeatureEntryButtonProps = {
  option: WorkspaceModuleOption;
  onClick: () => void;
};

export function FeatureEntryButton({ option, onClick }: FeatureEntryButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-2xl border border-black/5 bg-[#fcfcfb] px-6 py-5 text-left transition hover:-translate-y-0.5 hover:bg-[#f4f4f2]"
    >
      <p className="text-2xl font-semibold leading-snug text-primary">{option.title}</p>
      <p className="mt-1.5 text-sm text-secondary">{option.description}</p>
    </button>
  );
}
