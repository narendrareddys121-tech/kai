
import React from 'react';
import { AllergenInfo } from '../types';
import { getRiskLevelColor } from '../utils';

interface Props {
  allergens: AllergenInfo[];
}

const AllergenPanel: React.FC<Props> = ({ allergens }) => {
  if (!allergens || allergens.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 flex items-center">
          🛡️ Allergen Detection
        </h3>
        <div className="text-sm text-emerald-600 dark:text-emerald-400 font-medium flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>No common allergens detected</span>
        </div>
      </div>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Confirmed':
        return 'bg-rose-50 dark:bg-rose-950 border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300';
      case 'Possible':
        return 'bg-amber-50 dark:bg-amber-950 border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-300';
      case 'Trace':
        return 'bg-yellow-50 dark:bg-yellow-950 border-yellow-300 dark:border-yellow-800 text-yellow-700 dark:text-yellow-300';
      default:
        return 'bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'Confirmed':
        return '⚠️';
      case 'Possible':
        return '⚡';
      case 'Trace':
        return '💡';
      default:
        return '•';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
      <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 flex items-center">
        🛡️ Allergen Detection
      </h3>
      
      <div className="space-y-3">
        {allergens.map((allergen, index) => (
          <div 
            key={index}
            className={`border-2 rounded-xl p-4 ${getSeverityColor(allergen.severity)}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{getSeverityIcon(allergen.severity)}</span>
                <span className="font-bold text-sm">{allergen.name}</span>
              </div>
              <span className="px-2 py-1 rounded-full text-xs font-bold border border-current/30 bg-white/50 dark:bg-black/20">
                {allergen.severity}
              </span>
            </div>
            <p className="text-sm opacity-90 leading-relaxed">
              {allergen.details}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllergenPanel;
