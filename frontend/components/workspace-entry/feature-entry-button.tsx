import type { WorkspaceModuleOption } from "@/mocks/workspace-entry.mock";

type FeatureEntryButtonProps = {
  option: WorkspaceModuleOption;
  isHighlighted?: boolean;
  onClick: () => void;
};

export function FeatureEntryButton({ option, isHighlighted = false, onClick }: FeatureEntryButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "group w-full rounded-2xl border px-6 py-5 text-left transition duration-200",
        isHighlighted
          ? "border-[#c3b8eb] bg-[linear-gradient(135deg,#8578d9_0%,#9b8fe3_100%)] shadow-[0_10px_22px_rgba(108,91,176,0.16)] hover:-translate-y-0.5 hover:border-[#b3a6e3] hover:shadow-[0_12px_24px_rgba(108,91,176,0.2)]"
          : "border-[#e2dcf1] bg-[#ffffff] hover:-translate-y-0.5 hover:border-[#a79be0] hover:bg-[#faf7ff] hover:shadow-[0_10px_22px_rgba(108,91,176,0.12)]",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className={["text-[20px] font-semibold leading-snug tracking-tight", isHighlighted ? "text-white" : "text-[#2d2a42]"].join(" ")}>
            {option.title}
          </p>
          <p className={["mt-1 text-sm leading-6", isHighlighted ? "text-white/90" : "text-[#665e8e]"].join(" ")}>
            {option.description}
          </p>
        </div>
        <span
          className={[
            "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-lg transition",
            isHighlighted
              ? "border-white/70 text-white group-hover:border-white group-hover:bg-white/10"
              : "border-[#cdc4e9] text-[#6e62ba] group-hover:border-[#8f7bde] group-hover:bg-white",
          ].join(" ")}
        >
          →
        </span>
      </div>
    </button>
  );
}
