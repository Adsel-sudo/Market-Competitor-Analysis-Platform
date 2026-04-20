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

export type CompetitorAnalysisDetail = {
  taskName: string;
  asin: string;
  category: string;
  lastUpdatedAt: string;
  owner: string;
  analysisBlocks: AnalysisBlock[];
  conclusion: Conclusion;
  decision: Decision;
  assets: {
    productLinks: AssetItem[];
    mainImages: AssetItem[];
    aPlusImages: AssetItem[];
    references: AssetItem[];
  };
};
