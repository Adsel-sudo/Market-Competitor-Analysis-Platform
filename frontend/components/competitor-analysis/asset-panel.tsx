import Image from "next/image";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { CompetitorAnalysisDetail } from "@/components/competitor-analysis/types";

type AssetPanelProps = {
  assets: CompetitorAnalysisDetail["assets"];
};

function LinkList({ title, description, items }: { title: string; description: string; items: { label: string; url?: string; note?: string }[] }) {
  return (
    <Card>
      <CardHeader className="border-b border-slate-100">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 p-4">
        {items.map((item) => (
          <div key={item.label} className="rounded-lg border border-slate-100 p-3">
            <p className="text-xs text-slate-500">{item.label}</p>
            {item.url ? (
              <a href={item.url} target="_blank" rel="noreferrer" className="mt-1 block text-sm text-blue-600 hover:underline">
                {item.url}
              </a>
            ) : (
              <p className="mt-1 text-sm text-slate-700">{item.note}</p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function ImageList({ title, items }: { title: string; items: { label: string; image?: string }[] }) {
  return (
    <Card>
      <CardHeader className="border-b border-slate-100">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 p-4">
        {items.map((item) => (
          <div key={item.label} className="space-y-2">
            <p className="text-xs text-slate-500">{item.label}</p>
            {item.image ? (
              <div className="overflow-hidden rounded-lg border border-slate-200">
                <Image
                  src={item.image}
                  alt={item.label}
                  width={640}
                  height={360}
                  className="h-36 w-full object-cover"
                />
              </div>
            ) : null}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function AssetPanel({ assets }: AssetPanelProps) {
  return (
    <aside className="sticky top-6 h-[calc(100vh-3rem)] overflow-auto space-y-4">
      <p className="px-1 text-xs font-semibold uppercase tracking-wide text-slate-500">参考资产区</p>
      <LinkList title="商品链接" description="竞品访问入口和历史走势。" items={assets.productLinks} />
      <ImageList title="主图 / 截图" items={assets.mainImages} />
      <ImageList title="A+ 截图" items={assets.aPlusImages} />
      <LinkList title="参考素材" description="内部可复用材料。" items={assets.references} />
    </aside>
  );
}
