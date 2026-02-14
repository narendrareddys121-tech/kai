
import React, { useState, useCallback } from 'react';
import { analyzeProductLabel } from './services/geminiService';
import { AnalysisState } from './types';
import AnalysisResult from './components/AnalysisResult';

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [state, setState] = useState<AnalysisState>({
    isLoading: false,
    error: null,
    result: null,
  });

  const getFriendlyErrorMessage = (err: any): string => {
    const message = err.message || String(err);
    
    if (message.includes('429') || message.toLowerCase().includes('quota') || message.toLowerCase().includes('rate limit')) {
      return "Engine is cooling down. You've reached the request limit. Please wait a minute before trying again.";
    }
    
    if (message.toLowerCase().includes('network') || message.toLowerCase().includes('fetch') || message.toLowerCase().includes('failed to fetch')) {
      return "Connectivity issue. Please check your internet connection and try again.";
    }
    
    if (message.toLowerCase().includes('safety') || message.toLowerCase().includes('blocked')) {
      return "Analysis restricted. The content provided was flagged by kai's safety filters.";
    }

    if (message.toLowerCase().includes('api key') || message.includes('403') || message.includes('401')) {
      return "Intelligence access denied. There is an issue with the engine's authentication.";
    }

    if (message.toLowerCase().includes('parse') || message.toLowerCase().includes('json')) {
      return "Cognitive overload. kai had trouble structuring the analysis. Try simplifying the text.";
    }

    return "Unexpected error: kai encountered a problem while analyzing this label. Please try a different text.";
  };

  const handleAnalyze = async () => {
    const trimmedInput = inputText.trim();
    if (!trimmedInput) {
      setState(prev => ({ ...prev, error: "Input required. Please paste or type product label text first." }));
      return;
    }

    if (trimmedInput.length < 10) {
       setState(prev => ({ ...prev, error: "Insufficient data. The text provided is too short for a meaningful analysis." }));
       return;
    }

    setState({ isLoading: true, error: null, result: null });
    try {
      const analysis = await analyzeProductLabel(trimmedInput);
      setState({ isLoading: false, error: null, result: analysis });
    } catch (err) {
      const friendlyMessage = getFriendlyErrorMessage(err);
      setState({ isLoading: false, error: friendlyMessage, result: null });
    }
  };

  const handleClear = () => {
    setInputText('');
    setState({ isLoading: false, error: null, result: null });
  };

  const handleExample = () => {
    const example = `Ingredients: Carbonated Water, High Fructose Corn Syrup, Caramel Color, Phosphoric Acid, Natural Flavors, Caffeine. Contains no juice. Low sodium. 150 calories per serving.`;
    setInputText(example);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200">
              k
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">
              kai <span className="text-indigo-600 font-normal">v2.0</span>
            </h1>
          </div>
          <div className="hidden sm:flex items-center space-x-4 text-sm font-medium text-slate-500">
            <span className="flex items-center"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>Intelligence Online</span>
            <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-400">Gemini 2.0 Flash</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-10 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            See beyond the label.
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Paste raw ingredient text or nutrition labels below. kai will transform them into clear, actionable intelligence.
          </p>
        </div>

        {/* Input Section */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 mb-10">
          <div className="relative">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2 px-1">
              Raw Product Label (OCR Output)
            </label>
            <textarea
              className={`w-full h-48 p-4 bg-slate-50 border rounded-2xl focus:ring-4 focus:ring-indigo-100 transition-all outline-none resize-none text-slate-800 placeholder:text-slate-400 mono text-sm leading-relaxed ${state.error ? 'border-rose-200 focus:border-rose-400' : 'border-slate-200 focus:border-indigo-500'}`}
              placeholder="Example: Water, Sugar, Citric Acid, Sodium Benzoate, Red 40..."
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                if (state.error) setState(prev => ({ ...prev, error: null }));
              }}
            />
            {inputText && (
              <button 
                onClick={() => setInputText('')}
                className="absolute top-10 right-4 p-1 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-500 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={handleAnalyze}
              disabled={state.isLoading || !inputText.trim()}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold py-4 px-8 rounded-2xl shadow-lg shadow-indigo-100 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2"
            >
              {state.isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  <span>Consulting kai...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  <span>Analyze with kai</span>
                </>
              )}
            </button>
            {!state.result && !state.isLoading && (
              <button
                onClick={handleExample}
                className="px-6 py-4 border-2 border-slate-100 text-slate-500 font-bold rounded-2xl hover:bg-slate-50 transition-colors"
              >
                Load Example
              </button>
            )}
            {state.result && (
              <button
                onClick={handleClear}
                className="px-6 py-4 border-2 border-slate-100 text-slate-500 font-bold rounded-2xl hover:bg-slate-50 transition-colors"
              >
                New Analysis
              </button>
            )}
          </div>
        </section>

        {/* Error State */}
        {state.error && (
          <div className="bg-rose-50 border border-rose-100 text-rose-700 px-6 py-4 rounded-2xl mb-10 flex items-start animate-in fade-in slide-in-from-top-2 duration-300">
            <svg className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <div>
              <p className="font-bold text-sm mb-1 uppercase tracking-wider">Analysis Blocked</p>
              <p className="text-sm opacity-90 leading-relaxed">{state.error}</p>
            </div>
          </div>
        )}

        {/* Loading Skeleton Simulation */}
        {state.isLoading && (
           <div className="space-y-6 animate-pulse">
              <div className="h-32 bg-slate-200 rounded-2xl w-full"></div>
              <div className="h-48 bg-slate-200 rounded-2xl w-full"></div>
              <div className="grid grid-cols-2 gap-6">
                <div className="h-40 bg-slate-200 rounded-2xl"></div>
                <div className="h-40 bg-slate-200 rounded-2xl"></div>
              </div>
           </div>
        )}

        {/* Results Section */}
        {state.result && (
          <section className="pb-20">
            <AnalysisResult data={state.result} />
          </section>
        )}

        {/* Footer Info */}
        {!state.result && !state.isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 opacity-60">
            <div className="text-center space-y-2">
              <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04c0 4.833 1.858 9.135 4.904 12.336L12 21l3.714-2.679a11.959 11.959 0 004.904-12.336z" /></svg>
              </div>
              <h4 className="text-sm font-bold">Safety Verified</h4>
              <p className="text-xs">Neutral awareness-based analysis of every component.</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.547 2.188a2 2 0 00.75 2.106l1.761 1.257a2 2 0 002.328-.112l1.458-1.25a2 2 0 00.547-1.022l.477-2.387a2 2 0 00-1.414-1.96l-2.188-.547z" /></svg>
              </div>
              <h4 className="text-sm font-bold">Scientific Context</h4>
              <p className="text-xs">Functional insights into why chemicals are used.</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h4 className="text-sm font-bold">Visual Synthesis</h4>
              <p className="text-xs">Advanced image generation for product context.</p>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-8 px-4 text-center">
        <p className="text-slate-400 text-xs">
          © 2025 kai Cognitive Intelligence. Non-medical guidance only. Use responsibly.
        </p>
      </footer>
    </div>
  );
};

export default App;
