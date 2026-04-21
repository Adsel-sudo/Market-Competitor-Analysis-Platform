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
      className="group w-full rounded-2xl bg-white/68 px-5 py-4 text-left shadow-[0_8px_20px_rgba(73,52,90,0.06)] transition hover:-translate-y-0.5 hover:bg-white/88"
    >
      <p className="text-lg font-semibold leading-snug text-[#3a3542]">{option.title}</p>
      <p className="mt-1.5 text-sm text-[#736c80]">{option.description}</p>
    </button>
  );
}
