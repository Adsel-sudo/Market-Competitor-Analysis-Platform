import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto w-full max-w-3xl space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight">Market Competitor Analysis (MVP)</h1>
        <p className="text-sm text-slate-600">
          当前前端仅包含竞品分析详情页的 UI 原型数据展示。
        </p>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-700">入口：</p>
          <Link
            href="/competitor-analysis/demo"
            className="mt-2 inline-flex text-sm font-medium text-blue-600 hover:underline"
          >
            打开竞品分析详情页（mock）
          </Link>
        </div>
      </div>
    </main>
  );
}

