import { cn } from "@/components/ui/utils";
import type { WorkspaceModule, WorkspaceModuleOption } from "@/mocks/workspace-entry.mock";

type ModuleSelectorProps = {
  modules: WorkspaceModuleOption[];
  selectedModule: WorkspaceModule;
  onSelect: (key: WorkspaceModule) => void;
};

export function ModuleSelector({ modules, selectedModule, onSelect }: ModuleSelectorProps) {
  return (
    <div className="grid gap-3.5 md:grid-cols-3">
      {modules.map((module) => {
        const active = module.key === selectedModule;

        return (
          <button
            key={module.key}
            type="button"
            onClick={() => onSelect(module.key)}
            className={cn(
              "surface-card rounded-2xl p-4 text-left transition",
              active
                ? "border-transparent bg-[color:var(--accent-primary)] text-white shadow-md"
                : "hover:bg-white",
            )}
          >
            <p className={cn("text-sm font-semibold", active ? "text-white" : "text-primary")}>{module.title}</p>
            <p className={cn("mt-2 text-xs leading-5", active ? "text-white/85" : "text-secondary")}>{module.description}</p>
          </button>
        );
      })}
    </div>
  );
}
