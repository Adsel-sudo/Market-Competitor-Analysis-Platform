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
      className={[
        "group w-full rounded-[20px] border border-[#e3e0e8] bg-[#fffdf9] px-7 py-6 text-left transition duration-200",
        "hover:-translate-y-0.5 hover:border-[#b8abeb] hover:bg-[#faf7ff] hover:shadow-[0_12px_24px_rgba(108,91,176,0.12)]",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[20px] font-semibold leading-snug tracking-tight text-[#26213b]">{option.title}</p>
          <p className="mt-2 text-[15px] leading-7 text-[#6a6389]">{option.description}</p>
        </div>
        <span
          className={[
            "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#cdc4e9] text-lg text-[#6e62ba] transition",
            "group-hover:border-[#8f7bde] group-hover:bg-white",
          ].join(" ")}
        >
          →
        </span>
      </div>
    </button>
  );
}
