
import React from 'react';

interface ComparisonData {
  category: string;
  benchmark: string;
  vsAverage: string;
}

interface Props {
  data: ComparisonData;
}

const ComparisonPanel: React.FC<Props> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-6 border-2 border-indigo-200 dark:border-indigo-900">
      <h3 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-4 flex items-center">
        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Category Comparison
      </h3>
      
      <div className="space-y-4">
        <div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1 uppercase tracking-wide">
            Product Category
          </div>
          <div className="text-base font-bold text-slate-900 dark:text-slate-100">
            {data.category}
          </div>
        </div>
        
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-indigo-100 dark:border-slate-700">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-2 uppercase tracking-wide">
            Industry Benchmark
          </div>
          <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {data.benchmark}
          </div>
        </div>
        
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-indigo-100 dark:border-slate-700">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-2 uppercase tracking-wide">
            vs Category Average
          </div>
          <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            {data.vsAverage}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonPanel;
