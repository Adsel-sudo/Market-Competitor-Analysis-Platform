export type ModuleKey = "competitor-analysis" | "market-research" | "market-intel";

export type ModuleTab = {
  key: ModuleKey;
  label: string;
  disabled?: boolean;
};

export type CarouselCard = {
  title: string;
  summary: string;
  metrics: Array<{
    label: string;
    value: string;
  }>;
};

export type AnalysisScreen = {
  id: string;
  title: string;
  subtitle: string;
  cards: CarouselCard[];
};

export type CompetitorAnalysisViewModel = {
  taskName: string;
  asin: string;
  category: string;
  updatedAt: string;
  owner: string;
  modules: ModuleTab[];
  screens: AnalysisScreen[];
};

// Legacy types kept for compatibility with old prototype components.
export type InfoItem = {
  label: string;
  value: string;
  hint?: string;
};

export type AnalysisBlock = {
  id: string;
  title: string;
  description: string;
  items: InfoItem[];
};

export type Conclusion = {
  worthReference: string;
  positioning: string;
  coreReasons: string[];
  majorRisks: string[];
};

export type Decision = {
  learnings: string[];
  avoidings: string[];
  redesignSuggestions: string[];
  nextSteps: string[];
};

export type AssetItem = {
  label: string;
  url?: string;
  image?: string;
  note?: string;
};


export type CompetitorAnalysisDetail = CompetitorAnalysisViewModel & {
  analysisBlocks?: AnalysisBlock[];
  conclusion?: Conclusion;
  decision?: Decision;
  assets?: {
    productLinks: AssetItem[];
    mainImages: AssetItem[];
    aPlusImages: AssetItem[];
    references: AssetItem[];
  };
};
