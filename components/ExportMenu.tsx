
import React from 'react';
import { ProductAnalysis } from '../types';

interface Props {
  analysis: ProductAnalysis;
  onExport: (format: 'json' | 'text' | 'csv' | 'markdown' | 'html') => void;
  onCopy: (type: 'summary' | 'full') => void;
  onShare: () => void;
  onPrint: () => void;
  onDownloadImage: () => void;
  onEmail: () => void;
}

const ExportMenu: React.FC<Props> = ({ 
  analysis, 
  onExport, 
  onCopy, 
  onShare, 
  onPrint,
  onDownloadImage,
  onEmail
}) => {
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
        <span>Export & Tools</span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200 max-h-[80vh] overflow-y-auto">
            <div className="p-2 space-y-1">
              {/* Download Section */}
              <div className="px-3 py-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Download</span>
              </div>
              
              <button
                onClick={() => {
                  onExport('json');
                  setIsOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-left text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors"
              >
                <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div className="flex-1">
                  <div>Export as JSON</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Structured data format</div>
                </div>
              </button>
              
              <button
                onClick={() => {
                  onExport('text');
                  setIsOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-left text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors"
              >
                <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div className="flex-1">
                  <div>Export as Text</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Plain text report</div>
                </div>
              </button>

              <button
                onClick={() => {
                  onExport('csv');
                  setIsOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-left text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors"
              >
                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <div className="flex-1">
                  <div>Export as CSV</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Spreadsheet format</div>
                </div>
              </button>

              <button
                onClick={() => {
                  onExport('markdown');
                  setIsOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-left text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors"
              >
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <div className="flex-1">
                  <div>Export as Markdown</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Developer friendly</div>
                </div>
              </button>

              <button
                onClick={() => {
                  onExport('html');
                  setIsOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-left text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors"
              >
                <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <div className="flex-1">
                  <div>Export as HTML</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Standalone webpage</div>
                </div>
              </button>

              {analysis.generatedImageUrl && (
                <button
                  onClick={() => {
                    onDownloadImage();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-left text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors"
                >
                  <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div className="flex-1">
                    <div>Download Image</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Save AI-generated image</div>
                  </div>
                </button>
              )}
              
              <div className="h-px bg-slate-200 dark:bg-slate-700 my-1" />
              
              {/* Copy Section */}
              <div className="px-3 py-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Copy</span>
              </div>
              
              <button
                onClick={() => {
                  onCopy('summary');
                  setIsOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-left text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors"
              >
                <svg className="w-5 h-5 text-cyan-600 dark:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <div className="flex-1">
                  <div>Copy Summary</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Quick executive summary</div>
                </div>
              </button>

              <button
                onClick={() => {
                  onCopy('full');
                  setIsOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-left text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors"
              >
                <svg className="w-5 h-5 text-cyan-600 dark:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div className="flex-1">
                  <div>Copy Full Report</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Complete analysis text</div>
                </div>
              </button>
              
              <div className="h-px bg-slate-200 dark:bg-slate-700 my-1" />
              
              {/* Share & Actions Section */}
              <div className="px-3 py-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Share & Actions</span>
              </div>

              <button
                onClick={() => {
                  onPrint();
                  setIsOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-left text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors"
              >
                <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                <div className="flex-1">
                  <div>Print Report</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Print or save as PDF</div>
                </div>
              </button>
              
              <button
                onClick={() => {
                  onShare();
                  setIsOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-left text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors"
              >
                <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <div className="flex-1">
                  <div>Share via...</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Use native share menu</div>
                </div>
              </button>

              <button
                onClick={() => {
                  onEmail();
                  setIsOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-left text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors"
              >
                <svg className="w-5 h-5 text-rose-600 dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div className="flex-1">
                  <div>Email Report</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Open in email client</div>
                </div>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExportMenu;
