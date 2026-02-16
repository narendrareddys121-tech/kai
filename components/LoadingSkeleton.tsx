
import React from 'react';

interface Props {
  steps: string[];
  currentStep: number;
}

const LoadingSkeleton: React.FC<Props> = ({ steps, currentStep }) => {
  const progress = Math.min(100, ((currentStep + 1) / steps.length) * 100);
  
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Progress header */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">
            Analyzing...
          </h3>
          <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
            {Math.round(progress)}%
          </span>
        </div>
        
        {/* Progress bar */}
        <div className="relative h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </div>
        </div>
        
        {/* Current step */}
        <div className="mt-4 flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="font-medium">{steps[currentStep]}</span>
        </div>
      </div>
      
      {/* Skeleton placeholders */}
      <div className="space-y-4">
        <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
        <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
        <div className="grid grid-cols-2 gap-4">
          <div className="h-40 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
          <div className="h-40 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
        </div>
        <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
      </div>
    </div>
  );
};

export default LoadingSkeleton;
