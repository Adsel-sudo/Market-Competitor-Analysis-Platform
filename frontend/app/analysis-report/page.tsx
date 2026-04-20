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
  const targetName = searchParams?.target || "Pet Grooming Brush";
  const statusText = "分析完成，待决策确认";

  return <AnalysisReportPage taskTitle={taskTitle} targetName={targetName} statusText={statusText} />;
}
