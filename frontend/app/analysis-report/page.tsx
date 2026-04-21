import { AnalysisReportPage } from "@/components/analysis-report";

type AnalysisReportRouteProps = {
  searchParams?: {
    taskId?: string;
    module?: string;
    target?: string;
  };
};

export default function AnalysisReportRoute({ searchParams }: AnalysisReportRouteProps) {
  const taskTitle = searchParams?.taskId ? `任务报告 · ${searchParams.taskId}` : "北美宠物梳竞品分析报告";

  return <AnalysisReportPage taskTitle={taskTitle} />;
}
