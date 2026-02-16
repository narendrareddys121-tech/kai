
import React from 'react';
import { DietaryCompatibility } from '../types';

interface Props {
  compatibilities: DietaryCompatibility[];
}

const DietaryBadges: React.FC<Props> = ({ compatibilities }) => {
  if (!compatibilities || compatibilities.length === 0) {
    return null;
  }

  const getDietIcon = (diet: string) => {
    const icons: { [key: string]: string } = {
      'Vegan': '🌱',
      'Vegetarian': '🥕',
      'Keto': '🥑',
      'Paleo': '🍖',
      'Halal': '☪️',
      'Kosher': '✡️',
      'Gluten-Free': '🌾',
      'Dairy-Free': '🥛',
      'Low-Carb': '📉',
      'Low-Fat': '💧',
      'Low-Sodium': '🧂'
    };
    return icons[diet] || '🍽️';
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
      <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 flex items-center">
        🍽️ Dietary Compatibility
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {compatibilities.map((item, index) => (
          <div
            key={index}
            className={`rounded-xl p-3 border-2 transition-all ${
              item.compatible
                ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
                : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-600 opacity-60'
            }`}
          >
            <div className="flex items-center space-x-2 mb-1">
              {item.compatible ? (
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              <span className="text-lg">{getDietIcon(item.diet)}</span>
            </div>
            <div className="font-bold text-sm mb-1">{item.diet}</div>
            <div className="text-xs opacity-75 leading-tight">{item.reason}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DietaryBadges;
