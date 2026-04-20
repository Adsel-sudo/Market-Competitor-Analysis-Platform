import { AnchorNav } from "@/components/competitor-analysis/anchor-nav";
import { AssetPanel } from "@/components/competitor-analysis/asset-panel";
import { SectionCard } from "@/components/competitor-analysis/section-card";
import type { CompetitorAnalysisDetail } from "@/components/competitor-analysis/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type AnalysisDetailPageProps = {
  data: CompetitorAnalysisDetail;
};

const analysisAnchorItems = [
  "basic-info",
  "market-position",
  "selling-points",
  "title-analysis",
  "five-points",
  "a-plus",
  "image-analysis",
  "review-analysis",
];

export function AnalysisDetailPage({ data }: AnalysisDetailPageProps) {
  const firstScreenBlocks = data.analysisBlocks.filter((block) => analysisAnchorItems.includes(block.id));

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 lg:px-6">
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-4 lg:grid-cols-[220px_minmax(0,1fr)_320px]">
        <AnchorNav
          groups={[
            {
              title: "第一屏：分析层",
              items: firstScreenBlocks.map((item) => ({ href: `#${item.id}`, label: item.title })),
            },
            {
              title: "第二屏：结论层",
              items: [{ href: "#conclusion", label: "结论总览", hint: "必读" }],
            },
            {
              title: "第三屏：决策层",
              items: [{ href: "#decision", label: "行动建议", hint: "输出" }],
            },
          ]}
        />

        <section className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="blue">竞品分析详情页</Badge>
                <Badge>{data.category}</Badge>
              </div>
              <CardTitle className="text-lg">{data.taskName}</CardTitle>
              <CardDescription>
                ASIN：{data.asin} · 最近更新：{data.lastUpdatedAt} · 负责人：{data.owner}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="border-b border-slate-100">
              <CardTitle>第一屏：分析层</CardTitle>
              <CardDescription>聚焦分析依据，尽量完整展开，为后续结论与决策提供证据。</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 p-4">
              {firstScreenBlocks.map((block) => (
                <SectionCard
                  key={block.id}
                  id={block.id}
                  title={block.title}
                  description={block.description}
                  items={block.items}
                />
              ))}
            </CardContent>
          </Card>

          <Card id="conclusion" className="scroll-mt-20">
            <CardHeader className="border-b border-slate-100">
              <CardTitle>第二屏：结论层</CardTitle>
              <CardDescription>把分析信息聚合成可判断的结论，明确可参考程度与风险。</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 p-4 md:grid-cols-2">
              <SectionCard
                title="是否值得参考"
                description="优先给出结论，便于业务快速判断。"
                items={[{ label: "评估结果", value: data.conclusion.worthReference }]}
              />
              <SectionCard
                title="竞品定位"
                description="定义该竞品在市场中的角色。"
                items={[{ label: "定位", value: data.conclusion.positioning }]}
              />
              <SectionCard
                title="核心原因"
                description="结论成立的关键证据。"
                items={data.conclusion.coreReasons.map((reason, index) => ({
                  label: `原因 ${index + 1}`,
                  value: reason,
                }))}
              />
              <SectionCard
                title="主要风险"
                description="执行层必须提前规避的问题。"
                items={data.conclusion.majorRisks.map((risk, index) => ({
                  label: `风险 ${index + 1}`,
                  value: risk,
                }))}
              />
            </CardContent>
          </Card>

          <Card id="decision" className="scroll-mt-20">
            <CardHeader className="border-b border-slate-100">
              <CardTitle>第三屏：决策层</CardTitle>
              <CardDescription>将结论转为动作，强调“可借鉴、要规避、下一步怎么做”。</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 p-4 md:grid-cols-2">
              <SectionCard
                title="可借鉴点"
                description="建议优先保留并快速验证。"
                items={data.decision.learnings.map((learning, index) => ({
                  label: `借鉴点 ${index + 1}`,
                  value: learning,
                }))}
              />
              <SectionCard
                title="不建议学习点"
                description="避免复制高风险做法。"
                items={data.decision.avoidings.map((avoiding, index) => ({
                  label: `规避点 ${index + 1}`,
                  value: avoiding,
                }))}
              />
              <SectionCard
                title="改款 / 改花色建议"
                description="偏产品与视觉方向的落地建议。"
                items={data.decision.redesignSuggestions.map((suggestion, index) => ({
                  label: `建议 ${index + 1}`,
                  value: suggestion,
                }))}
              />
              <SectionCard
                title="下一步建议"
                description="明确责任和时间，推动闭环。"
                items={data.decision.nextSteps.map((step, index) => ({
                  label: `下一步 ${index + 1}`,
                  value: step,
                }))}
              />
            </CardContent>
          </Card>
        </section>

        <AssetPanel assets={data.assets} />
      </div>
    </main>
  );
}
