
import React, { useState } from 'react';
import { AnalysisHistoryItem } from '../types';
import { formatDate, formatTime, truncateText } from '../utils';

interface Props {
  history: AnalysisHistoryItem[];
  onSelect: (item: AnalysisHistoryItem) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
  onClose: () => void;
}

const AnalysisHistory: React.FC<Props> = ({ 
  history, 
  onSelect, 
  onDelete, 
  onClear,
  onClose 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredHistory = searchQuery
    ? history.filter(item => 
        item.inputText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.result.productIdentity.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : history;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-slate-200 dark:border-slate-800 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Analysis History
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search history..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-500"
          />
          <svg className="w-5 h-5 absolute left-3 top-2.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <svg className="w-16 h-16 text-slate-300 dark:text-slate-700 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              {searchQuery ? 'No matching results' : 'No analysis history yet'}
            </p>
            <p className="text-sm text-slate-400 dark:text-slate-600 mt-2">
              {searchQuery ? 'Try a different search term' : 'Your past analyses will appear here'}
            </p>
          </div>
        ) : (
          filteredHistory.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors cursor-pointer group"
              onClick={() => onSelect(item)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 truncate">
                    {item.result.productIdentity.category}
                  </h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {formatDate(item.timestamp)}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-600">•</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {formatTime(item.timestamp)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(item.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/30 text-rose-600 dark:text-rose-400 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                {truncateText(item.inputText, 100)}
              </p>
              
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Score: {item.result.score.value}/100
                </span>
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium group-hover:underline">
                  View →
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {history.length > 0 && (
        <div className="flex-shrink-0 border-t border-slate-200 dark:border-slate-800 p-4">
          <button
            onClick={onClear}
            className="w-full px-4 py-2 bg-rose-100 dark:bg-rose-900/30 hover:bg-rose-200 dark:hover:bg-rose-900/50 text-rose-700 dark:text-rose-400 font-semibold rounded-xl transition-colors text-sm"
          >
            Clear All History
          </button>
        </div>
      )}
    </div>
  );
};

export default AnalysisHistory;
