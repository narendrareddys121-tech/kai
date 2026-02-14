
export interface FunctionalIngredient {
  ingredient: string;
  purpose: string;
}

export interface ProductAnalysis {
  productIdentity: {
    category: string;
    confidence: 'High' | 'Medium' | 'Low';
    elements: string[];
  };
  positiveAttributes: string[];
  tradeoffs: string[];
  functionalIngredients: FunctionalIngredient[];
  qualitySignals: string;
  awarenessFlags: string[];
  smartUsage: string;
  executiveSummary: string;
  score: {
    value: number;
    interpretation: string;
  };
  proactiveSuggestion: string;
  generatedImageUrl?: string;
  visualPrompt?: string;
}

export interface AnalysisState {
  isLoading: boolean;
  error: string | null;
  result: ProductAnalysis | null;
}
