
import React from 'react';
import { ProductAnalysis } from '../types';

interface Props {
  analysis: ProductAnalysis;
  onExport: (format: 'json' | 'text') => void;
  onCopy: () => void;
  onShare: () => void;
}

const ExportMenu: React.FC<Props> = ({ analysis, onExport, onCopy, onShare }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-semibold rounded-xl transition-colors shadow-lg"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        <span>Export</span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="p-2 space-y-1">
              <button
                onClick={() => {
                  onExport('json');
                  setIsOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-left text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Export as JSON</span>
              </button>
              
              <button
                onClick={() => {
                  onExport('text');
                  setIsOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-left text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Export as Text</span>
              </button>
              
              <div className="h-px bg-slate-200 dark:bg-slate-700 my-1" />
              
              <button
                onClick={() => {
                  onCopy();
                  setIsOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-left text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Copy Summary</span>
              </button>
              
              <button
                onClick={() => {
                  onShare();
                  setIsOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-left text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span>Share via...</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExportMenu;
