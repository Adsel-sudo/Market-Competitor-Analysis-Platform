import { AnalysisDetailPage } from "@/components/competitor-analysis/analysis-detail-page";
import { competitorAnalysisMock } from "@/components/competitor-analysis/mock-data";

export default function CompetitorAnalysisPage() {
  return <AnalysisDetailPage data={competitorAnalysisMock} />;
}
