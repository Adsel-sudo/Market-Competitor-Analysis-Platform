import { DataPreparationPage } from "@/components/data-preparation/data-preparation-page";

type DataPrepRouteProps = {
  searchParams?: {
    module?: string;
    target?: string;
  };
};

export default function DataPrepRoute({ searchParams }: DataPrepRouteProps) {
  const moduleName = searchParams?.module || "竞品分析";
  const targetObject = searchParams?.target || "Pet Grooming Brush";

  return <DataPreparationPage moduleName={moduleName} targetObject={targetObject} />;
}
