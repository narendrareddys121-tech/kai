
import React from 'react';
import { NutritionInfo } from '../types';
import { calculatePercentage } from '../utils';

interface Props {
  nutrition: NutritionInfo;
}

const NutritionChart: React.FC<Props> = ({ nutrition }) => {
  if (!nutrition || Object.keys(nutrition).length === 0) {
    return null;
  }

  const nutritionData = [
    { label: 'Calories', value: nutrition.calories, color: 'bg-purple-500 dark:bg-purple-400' },
    { label: 'Protein', value: nutrition.protein, color: 'bg-blue-500 dark:bg-blue-400' },
    { label: 'Carbs', value: nutrition.carbs, color: 'bg-amber-500 dark:bg-amber-400' },
    { label: 'Fat', value: nutrition.fat, color: 'bg-rose-500 dark:bg-rose-400' },
    { label: 'Fiber', value: nutrition.fiber, color: 'bg-green-500 dark:bg-green-400' },
    { label: 'Sugar', value: nutrition.sugar, color: 'bg-pink-500 dark:bg-pink-400' },
    { label: 'Sodium', value: nutrition.sodium, color: 'bg-orange-500 dark:bg-orange-400' }
  ].filter(item => item.value); // Only show items with values

  if (nutritionData.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
      <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 flex items-center">
        📊 Nutritional Breakdown
      </h3>
      
      <div className="space-y-4">
        {nutritionData.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {item.label}
              </span>
              <span className="font-bold text-slate-900 dark:text-slate-100">
                {item.value}
              </span>
            </div>
            <div className="relative h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className={`absolute inset-y-0 left-0 ${item.color} rounded-full transition-all duration-700 ease-out`}
                style={{ 
                  width: '100%',
                  animation: 'slideIn 0.7s ease-out'
                }}
              />
            </div>
          </div>
        ))}
      </div>
      
      <style>{`
        @keyframes slideIn {
          from {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
};

export default NutritionChart;
