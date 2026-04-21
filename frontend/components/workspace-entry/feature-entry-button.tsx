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
      className="w-full max-w-[760px] rounded-2xl border border-black/10 bg-[#fbfbfa] px-6 py-4.5 text-left transition-colors duration-150 hover:bg-[#f4f3f8]"
    >
      <p className="text-2xl font-semibold leading-snug tracking-tight text-primary">{option.title}</p>
      <p className="mt-1 text-sm leading-6 text-secondary">{option.description}</p>
    </button>
  );
}
