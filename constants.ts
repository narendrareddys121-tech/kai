
// Example product label templates for different categories
export const EXAMPLE_TEMPLATES = {
  food: `Ingredients: Carbonated Water, High Fructose Corn Syrup, Caramel Color, Phosphoric Acid, Natural Flavors, Caffeine. Contains no juice. Low sodium. 150 calories per serving.`,
  
  cosmetics: `Ingredients: Water, Glycerin, Dimethicone, Niacinamide, Titanium Dioxide, Ethylhexyl Methoxycinnamate, Sodium Hyaluronate, Tocopherol, Fragrance, Methylparaben, Propylparaben. SPF 30. Oil-free formula.`,
  
  medicine: `Active Ingredients: Acetaminophen 500mg, Diphenhydramine HCl 25mg. Inactive Ingredients: Corn Starch, Croscarmellose Sodium, Magnesium Stearate, Microcrystalline Cellulose. For relief of minor aches and pains with nighttime sleep aid.`,
  
  cleaning: `Ingredients: Water, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Sodium Chloride, Citric Acid, Methylisothiazolinone, Methylchloroisothiazolinone, Fragrance, Blue 1. Biodegradable surfactants.`
};

// Common allergens list
export const COMMON_ALLERGENS = [
  'Gluten', 'Wheat', 'Dairy', 'Milk', 'Eggs', 
  'Peanuts', 'Tree Nuts', 'Soy', 'Fish', 'Shellfish',
  'Sesame', 'Sulfites', 'Mustard', 'Celery', 'Lupin'
];

// Dietary categories
export const DIETARY_CATEGORIES = [
  'Vegan', 'Vegetarian', 'Keto', 'Paleo', 
  'Halal', 'Kosher', 'Gluten-Free', 'Dairy-Free',
  'Low-Carb', 'Low-Fat', 'Low-Sodium'
];

// Potentially harmful additives (research-backed concerns)
export const HARMFUL_ADDITIVES = [
  'Artificial Colors', 'Red 40', 'Yellow 5', 'Yellow 6',
  'BHA', 'BHT', 'TBHQ', 'Sodium Benzoate', 'Potassium Benzoate',
  'Artificial Flavors', 'High Fructose Corn Syrup', 'Partially Hydrogenated Oil',
  'Sodium Nitrite', 'Sodium Nitrate', 'Carrageenan', 'MSG'
];

// Keyboard shortcuts
export const KEYBOARD_SHORTCUTS = {
  analyze: 'Ctrl+Enter',
  clear: 'Ctrl+K',
  example: 'Ctrl+E',
  toggleTheme: 'Ctrl+D',
  export: 'Ctrl+S',
  voice: 'Ctrl+M'
};

// Analysis progress steps
export const ANALYSIS_STEPS = [
  'Analyzing text structure...',
  'Identifying ingredients...',
  'Detecting allergens...',
  'Evaluating health risks...',
  'Assessing environmental impact...',
  'Generating insights...',
  'Creating visual representation...',
  'Finalizing analysis...'
];

// Toast durations (ms)
export const TOAST_DURATION = {
  short: 2000,
  medium: 4000,
  long: 6000
};

// Max history items
export const MAX_HISTORY_ITEMS = 50;

// Local storage keys
export const STORAGE_KEYS = {
  theme: 'kai-theme',
  history: 'kai-analysis-history',
  user: 'kai-user',
  bookmarks: 'kai-bookmarks',
  preferences: 'kai-preferences'
};

// Score thresholds
export const SCORE_THRESHOLDS = {
  excellent: 80,
  good: 60,
  moderate: 40,
  poor: 0
};

// Animation durations (ms)
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500
};
