import { Badge } from "@/components/ui/badge";

type NavItem = {
  href: string;
  label: string;
  hint?: string;
};

type AnchorNavProps = {
  groups: {
    title: string;
    items: NavItem[];
  }[];
};

export function AnchorNav({ groups }: AnchorNavProps) {
  return (
    <aside className="sticky top-6 h-[calc(100vh-3rem)] overflow-auto rounded-xl border border-slate-200 bg-white p-4">
      <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-slate-500">任务导航 / 锚点</p>
      <div className="space-y-5">
        {groups.map((group) => (
          <div key={group.title} className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              <p className="text-sm font-medium text-slate-800">{group.title}</p>
            </div>
            <div className="space-y-1 pl-3">
              {group.items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between rounded-md px-2 py-1.5 text-xs text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                >
                  <span>{item.label}</span>
                  {item.hint ? <Badge tone="default">{item.hint}</Badge> : null}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
