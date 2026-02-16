
export interface FunctionalIngredient {
  ingredient: string;
  purpose: string;
}

export interface AllergenInfo {
  name: string;
  severity: 'Confirmed' | 'Possible' | 'Trace';
  details: string;
}

export interface DietaryCompatibility {
  diet: string;
  compatible: boolean;
  reason: string;
}

export interface NutritionInfo {
  calories?: string;
  protein?: string;
  carbs?: string;
  fat?: string;
  fiber?: string;
  sugar?: string;
  sodium?: string;
}

export interface HealthRisk {
  score: number;
  level: 'Low' | 'Moderate' | 'High' | 'Critical';
  factors: string[];
}

export interface EnvironmentalImpact {
  score: number;
  level: 'Excellent' | 'Good' | 'Moderate' | 'Poor';
  factors: string[];
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
  // New enhanced fields
  allergens?: AllergenInfo[];
  dietaryCompatibility?: DietaryCompatibility[];
  nutrition?: NutritionInfo;
  healthRisk?: HealthRisk;
  environmentalImpact?: EnvironmentalImpact;
  alternatives?: string[];
  comparisonData?: {
    category: string;
    benchmark: string;
    vsAverage: string;
  };
}

export interface AnalysisState {
  isLoading: boolean;
  error: string | null;
  result: ProductAnalysis | null;
}

export interface AnalysisHistoryItem {
  id: string;
  timestamp: number;
  inputText: string;
  result: ProductAnalysis;
}

export type InputMode = 'text' | 'voice' | 'camera';

export type Theme = 'light' | 'dark' | 'system';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}
