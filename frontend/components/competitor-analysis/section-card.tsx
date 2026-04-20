import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { InfoItem } from "@/components/competitor-analysis/types";

type SectionCardProps = {
  id?: string;
  title: string;
  description: string;
  items: InfoItem[];
};

export function SectionCard({ id, title, description, items }: SectionCardProps) {
  return (
    <Card id={id} className="scroll-mt-20">
      <CardHeader className="border-b border-slate-100">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 p-5">
        {items.map((item) => (
          <div key={item.label} className="grid gap-1 rounded-lg border border-slate-100 bg-slate-50 p-3">
            <p className="text-xs text-slate-500">{item.label}</p>
            <p className="text-sm font-medium text-slate-900">{item.value}</p>
            {item.hint ? <p className="text-xs text-slate-400">{item.hint}</p> : null}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
