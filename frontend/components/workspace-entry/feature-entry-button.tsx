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
      className="group w-full rounded-2xl border border-[#e2dcf1] bg-[#ffffff] px-6 py-5 text-left transition duration-200 hover:-translate-y-0.5 hover:border-[#a79be0] hover:bg-[#faf7ff] hover:shadow-[0_10px_22px_rgba(108,91,176,0.12)]"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[20px] font-semibold leading-snug tracking-tight text-[#2d2a42]">{option.title}</p>
          <p className="mt-1 text-sm leading-6 text-[#665e8e]">{option.description}</p>
        </div>
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#cdc4e9] text-lg text-[#6e62ba] transition group-hover:border-[#8f7bde] group-hover:bg-white">
          →
        </span>
      </div>
    </button>
  );
}
