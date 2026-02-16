
import React from 'react';
import { FunctionalIngredient } from '../types';

interface Props {
  ingredients: FunctionalIngredient[];
  awarenessFlags?: string[];
}

const IngredientHeatmap: React.FC<Props> = ({ ingredients, awarenessFlags = [] }) => {
  if (!ingredients || ingredients.length === 0) return null;

  // Determine risk level based on awareness flags
  const getRiskLevel = (ingredient: string): 'safe' | 'caution' | 'concern' => {
    const lowerIngredient = ingredient.toLowerCase();
    const hasFlag = awarenessFlags.some(flag => 
      flag.toLowerCase().includes(lowerIngredient) ||
      lowerIngredient.includes('artificial') ||
      lowerIngredient.includes('color') ||
      lowerIngredient.includes('preservative') ||
      lowerIngredient.includes('high fructose') ||
      lowerIngredient.includes('hydrogenated')
    );
    
    if (hasFlag) return 'concern';
    
    // Additional caution indicators
    if (
      lowerIngredient.includes('sodium') ||
      lowerIngredient.includes('sugar') ||
      lowerIngredient.includes('syrup')
    ) {
      return 'caution';
    }
    
    return 'safe';
  };

  const getRiskColor = (risk: 'safe' | 'caution' | 'concern') => {
    switch (risk) {
      case 'safe':
        return 'bg-emerald-50 dark:bg-emerald-950 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300';
      case 'caution':
        return 'bg-amber-50 dark:bg-amber-950 border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-300';
      case 'concern':
        return 'bg-rose-50 dark:bg-rose-950 border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300';
    }
  };

  const getRiskIcon = (risk: 'safe' | 'caution' | 'concern') => {
    switch (risk) {
      case 'safe':
        return '✓';
      case 'caution':
        return '⚡';
      case 'concern':
        return '⚠️';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
      <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 flex items-center">
        🔬 Ingredient Risk Assessment
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {ingredients.map((item, index) => {
          const risk = getRiskLevel(item.ingredient);
          return (
            <div
              key={index}
              className={`rounded-xl p-3 border-2 ${getRiskColor(risk)}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm">{getRiskIcon(risk)}</span>
                    <h4 className="font-bold text-sm truncate">
                      {item.ingredient}
                    </h4>
                  </div>
                  <p className="text-xs opacity-80 leading-tight">
                    {item.purpose}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-slate-600 dark:text-slate-400">Safe</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-slate-600 dark:text-slate-400">Moderate</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
            <span className="text-slate-600 dark:text-slate-400">Concern</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientHeatmap;
