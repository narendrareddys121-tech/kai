
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { analyzeProductLabel } from './services/geminiService';
import { 
  exportAsJSON, 
  exportAsText, 
  exportAsCSV, 
  exportAsMarkdown, 
  exportAsHTML,
  copyExecutiveSummary, 
  copyFullReport,
  shareAnalysis,
  printReport,
  downloadImage,
  emailReport
} from './services/exportService';
import { AnalysisState, ToastMessage, InputMode } from './types';
import { EXAMPLE_TEMPLATES, ANALYSIS_STEPS } from './constants';
import { generateId } from './utils';
import { useTheme } from './hooks/useTheme';
import { useVoiceInput } from './hooks/useVoiceInput';
import { useAnalysisHistory } from './hooks/useAnalysisHistory';
import AnalysisResult from './components/AnalysisResult';
import Toast from './components/Toast';
import ThemeToggle from './components/ThemeToggle';
import LoadingSkeleton from './components/LoadingSkeleton';
import CameraCapture from './components/CameraCapture';
import AnalysisHistory from './components/AnalysisHistory';
import ExportMenu from './components/ExportMenu';

const App: React.FC = () => {
  const { theme, resolvedTheme, toggleTheme } = useTheme();
  const { transcript, isListening, startListening, stopListening, resetTranscript } = useVoiceInput();
  const { history, addToHistory, removeFromHistory, clearHistory } = useAnalysisHistory();

  const [inputText, setInputText] = useState<string>('');
  const [state, setState] = useState<AnalysisState>({
    isLoading: false,
    error: null,
    result: null,
  });
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [inputMode, setInputMode] = useState<InputMode>('text');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [selectedTemplate, setSelectedTemplate] = useState<keyof typeof EXAMPLE_TEMPLATES | null>(null);

  const charCount = inputText.length;
  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;

  const addToast = useCallback((type: ToastMessage['type'], message: string, duration?: number) => {
    const id = generateId();
    setToasts(prev => [...prev, { id, type, message, duration }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

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

  const handleAnalyze = useCallback(async () => {
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
    setCurrentStep(0);

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev < ANALYSIS_STEPS.length - 1 ? prev + 1 : prev));
    }, 800);

    try {
      const analysis = await analyzeProductLabel(trimmedInput);
      clearInterval(stepInterval);
      setState({ isLoading: false, error: null, result: analysis });
      addToHistory(trimmedInput, analysis);
      addToast('success', 'Analysis complete! Results ready below.', 4000);
    } catch (err) {
      clearInterval(stepInterval);
      const friendlyMessage = getFriendlyErrorMessage(err);
      setState({ isLoading: false, error: friendlyMessage, result: null });
      addToast('error', friendlyMessage, 6000);
    }
  }, [inputText, addToHistory, addToast]);

  const handleClear = useCallback(() => {
    setInputText('');
    setState({ isLoading: false, error: null, result: null });
    setSelectedTemplate(null);
    addToast('info', 'Input cleared. Ready for new analysis.', 2000);
  }, [addToast]);

  const handleLoadTemplate = useCallback((template: keyof typeof EXAMPLE_TEMPLATES) => {
    setInputText(EXAMPLE_TEMPLATES[template]);
    setSelectedTemplate(template);
    setInputMode('text');
    addToast('info', `${template.charAt(0).toUpperCase() + template.slice(1)} template loaded.`, 2000);
  }, [addToast]);

  const handleVoiceToggle = useCallback(() => {
    if (isListening) {
      stopListening();
      if (transcript) {
        setInputText(prev => prev + (prev ? ' ' : '') + transcript);
        resetTranscript();
        addToast('success', 'Voice input added to text.', 2000);
      }
    } else {
      startListening();
      addToast('info', 'Listening... Speak now.', 2000);
    }
  }, [isListening, transcript, startListening, stopListening, resetTranscript, addToast]);

  const handleCameraCapture = useCallback((imageData: string) => {
    setShowCamera(false);
    // TODO: Implement OCR using Gemini Vision API with imageData
    addToast('info', 'Image captured. Note: OCR requires Gemini Vision API integration.', 4000);
  }, [addToast]);

  const handleHistorySelect = useCallback((item: any) => {
    setInputText(item.inputText);
    setState({ isLoading: false, error: null, result: item.result });
    setShowHistory(false);
    addToast('info', 'Historical analysis loaded.', 2000);
  }, [addToast]);

  const handleExport = useCallback(async (format: 'json' | 'text' | 'csv' | 'markdown' | 'html') => {
    if (!state.result) return;
    
    try {
      switch (format) {
        case 'json':
          exportAsJSON(state.result);
          addToast('success', 'Analysis exported as JSON.', 2000);
          break;
        case 'text':
          exportAsText(state.result);
          addToast('success', 'Analysis exported as TXT.', 2000);
          break;
        case 'csv':
          exportAsCSV(state.result);
          addToast('success', 'Analysis exported as CSV.', 2000);
          break;
        case 'markdown':
          exportAsMarkdown(state.result);
          addToast('success', 'Analysis exported as Markdown.', 2000);
          break;
        case 'html':
          exportAsHTML(state.result);
          addToast('success', 'Analysis exported as HTML.', 2000);
          break;
      }
    } catch (err) {
      addToast('error', 'Export failed. Please try again.', 3000);
    }
  }, [state.result, addToast]);

  const handleCopy = useCallback(async (type: 'summary' | 'full') => {
    if (!state.result) return;
    try {
      const success = type === 'summary' 
        ? await copyExecutiveSummary(state.result)
        : await copyFullReport(state.result);
      
      if (success) {
        addToast('success', `${type === 'summary' ? 'Summary' : 'Full report'} copied to clipboard.`, 2000);
      } else {
        addToast('error', 'Copy failed. Please try again.', 3000);
      }
    } catch (err) {
      addToast('error', 'Copy failed. Please try again.', 3000);
    }
  }, [state.result, addToast]);

  const handleShare = useCallback(async () => {
    if (!state.result) return;
    try {
      const success = await shareAnalysis(state.result);
      if (success) {
        addToast('success', 'Analysis shared successfully.', 2000);
      } else {
        addToast('info', 'Share cancelled or not supported.', 2000);
      }
    } catch (err) {
      addToast('error', 'Share failed. Please try again.', 3000);
    }
  }, [state.result, addToast]);

  const handlePrint = useCallback(() => {
    printReport();
    addToast('info', 'Opening print dialog...', 2000);
  }, [addToast]);

  const handleDownloadImage = useCallback(() => {
    if (!state.result?.generatedImageUrl) return;
    try {
      downloadImage(state.result.generatedImageUrl);
      addToast('success', 'Image download started.', 2000);
    } catch (err) {
      addToast('error', 'Image download failed.', 3000);
    }
  }, [state.result, addToast]);

  const handleEmail = useCallback(() => {
    if (!state.result) return;
    try {
      emailReport(state.result);
      addToast('info', 'Opening email client...', 2000);
    } catch (err) {
      addToast('error', 'Email action failed.', 3000);
    }
  }, [state.result, addToast]);

  // Update input text when voice mode is active and transcript changes
  useEffect(() => {
    if (transcript && inputMode === 'voice' && !isListening) {
      // Only update when voice has stopped (to avoid continuous updates)
      setInputText(prev => prev + (prev ? ' ' : '') + transcript);
      resetTranscript();
    }
  }, [isListening, transcript, inputMode, resetTranscript]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'enter':
            e.preventDefault();
            if (!state.isLoading && inputText.trim()) {
              handleAnalyze();
            }
            break;
          case 'k':
            e.preventDefault();
            handleClear();
            break;
          case 'd':
            e.preventDefault();
            toggleTheme();
            break;
          case 'm':
            e.preventDefault();
            setInputMode('voice');
            handleVoiceToggle();
            break;
        }
      }
      if (e.key === 'Escape') {
        setShowCamera(false);
        setShowHistory(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputText, state.isLoading, handleAnalyze, handleClear, handleVoiceToggle, toggleTheme]);

  return (
    <div className={`min-h-screen flex flex-col ${resolvedTheme === 'dark' ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b ${resolvedTheme === 'dark' ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 border-slate-200'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200 dark:shadow-indigo-900/50">
              k
            </div>
            <h1 className={`text-xl font-bold tracking-tight ${resolvedTheme === 'dark' ? 'text-slate-100' : 'text-slate-800'}`}>
              kai <span className="text-indigo-600 font-normal">v1.2</span>
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className={`hidden sm:flex items-center space-x-4 text-sm font-medium ${resolvedTheme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              <span className="flex items-center"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>Intelligence Online</span>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${resolvedTheme === 'dark' ? 'bg-slate-700 text-slate-500' : 'bg-slate-100 text-slate-400'}`}>Gemini Pro V3</span>
            </div>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-10 space-y-3">
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${resolvedTheme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
            See beyond the label.
          </h2>
          <p className={`text-lg max-w-xl mx-auto ${resolvedTheme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            Paste raw ingredient text or nutrition labels below. kai will transform them into clear, actionable intelligence.
          </p>
        </div>

        {/* Input Section */}
        <section className={`rounded-3xl p-6 sm:p-8 shadow-xl border mb-10 ${resolvedTheme === 'dark' ? 'bg-slate-800 border-slate-700 shadow-slate-900/50' : 'bg-white border-slate-100 shadow-slate-200/50'}`}>
          {/* Input Mode Tabs */}
          <div className="flex space-x-2 mb-6">
            <button
              onClick={() => setInputMode('text')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-all ${inputMode === 'text' ? 'bg-indigo-600 text-white shadow-lg' : resolvedTheme === 'dark' ? 'bg-slate-700 text-slate-400 hover:bg-slate-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              <svg className="w-4 h-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Text
            </button>
            <button
              onClick={() => { setInputMode('voice'); }}
              className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-all ${inputMode === 'voice' ? 'bg-indigo-600 text-white shadow-lg' : resolvedTheme === 'dark' ? 'bg-slate-700 text-slate-400 hover:bg-slate-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              <svg className="w-4 h-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
              Voice
            </button>
            <button
              onClick={() => { setInputMode('camera'); setShowCamera(true); }}
              className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-all ${inputMode === 'camera' ? 'bg-indigo-600 text-white shadow-lg' : resolvedTheme === 'dark' ? 'bg-slate-700 text-slate-400 hover:bg-slate-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              <svg className="w-4 h-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Camera
            </button>
          </div>

          {/* Voice Input Interface */}
          {inputMode === 'voice' && (
            <div className={`mb-6 p-4 rounded-2xl border ${resolvedTheme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-sm font-medium ${resolvedTheme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                  {isListening ? 'Listening...' : 'Voice Input Ready'}
                </span>
                <button
                  onClick={handleVoiceToggle}
                  className={`p-3 rounded-full transition-all ${isListening ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-indigo-600 hover:bg-indigo-700'} text-white shadow-lg`}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                </button>
              </div>
              {transcript && (
                <p className={`text-sm italic ${resolvedTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>"{transcript}"</p>
              )}
            </div>
          )}

          {/* Text Input */}
          <div className="relative">
            <label className={`text-xs font-bold uppercase tracking-widest block mb-2 px-1 ${resolvedTheme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
              Raw Product Label (OCR Output)
            </label>
            <textarea
              className={`w-full h-48 p-4 border rounded-2xl focus:ring-4 transition-all outline-none resize-none placeholder:text-slate-400 mono text-sm leading-relaxed ${state.error ? 'border-rose-400 focus:border-rose-500' : resolvedTheme === 'dark' ? 'bg-slate-900 border-slate-700 text-slate-200 focus:border-indigo-500 focus:ring-indigo-900/50' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500 focus:ring-indigo-100'}`}
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
                className={`absolute top-10 right-4 p-1 rounded-full transition-colors ${resolvedTheme === 'dark' ? 'bg-slate-700 hover:bg-slate-600 text-slate-400' : 'bg-slate-200 hover:bg-slate-300 text-slate-500'}`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            )}
          </div>

          {/* Character/Word Count */}
          {inputText && (
            <div className={`flex justify-end space-x-4 mt-2 text-xs ${resolvedTheme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
              <span>{charCount} characters</span>
              <span>{wordCount} words</span>
            </div>
          )}

          {/* Example Templates */}
          <div className="mt-6 flex flex-wrap gap-2">
            <span className={`text-xs font-semibold ${resolvedTheme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Quick Examples:</span>
            {Object.keys(EXAMPLE_TEMPLATES).map((key) => (
              <button
                key={key}
                onClick={() => handleLoadTemplate(key as keyof typeof EXAMPLE_TEMPLATES)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${selectedTemplate === key ? 'bg-indigo-600 text-white' : resolvedTheme === 'dark' ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={handleAnalyze}
              disabled={state.isLoading || !inputText.trim()}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold py-4 px-8 rounded-2xl shadow-lg shadow-indigo-100 dark:shadow-indigo-900/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2"
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
            {state.result && (
              <button
                onClick={handleClear}
                className={`px-6 py-4 border-2 font-bold rounded-2xl transition-colors ${resolvedTheme === 'dark' ? 'border-slate-700 text-slate-400 hover:bg-slate-700' : 'border-slate-100 text-slate-500 hover:bg-slate-50'}`}
              >
                New Analysis
              </button>
            )}
          </div>
        </section>

        {/* Error State */}
        {state.error && (
          <div className={`border px-6 py-4 rounded-2xl mb-10 flex items-start animate-in fade-in slide-in-from-top-2 duration-300 ${resolvedTheme === 'dark' ? 'bg-rose-950 border-rose-900 text-rose-300' : 'bg-rose-50 border-rose-100 text-rose-700'}`}>
            <svg className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <div>
              <p className="font-bold text-sm mb-1 uppercase tracking-wider">Analysis Blocked</p>
              <p className="text-sm opacity-90 leading-relaxed">{state.error}</p>
            </div>
          </div>
        )}

        {/* Loading State with Progress Steps */}
        {state.isLoading && (
          <LoadingSkeleton steps={ANALYSIS_STEPS} currentStep={currentStep} />
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
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto ${resolvedTheme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'}`}>
                <svg className={`w-5 h-5 ${resolvedTheme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04c0 4.833 1.858 9.135 4.904 12.336L12 21l3.714-2.679a11.959 11.959 0 004.904-12.336z" /></svg>
              </div>
              <h4 className="text-sm font-bold">Safety Verified</h4>
              <p className="text-xs">Neutral awareness-based analysis of every component.</p>
            </div>
            <div className="text-center space-y-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto ${resolvedTheme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'}`}>
                <svg className={`w-5 h-5 ${resolvedTheme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.547 2.188a2 2 0 00.75 2.106l1.761 1.257a2 2 0 002.328-.112l1.458-1.25a2 2 0 00.547-1.022l.477-2.387a2 2 0 00-1.414-1.96l-2.188-.547z" /></svg>
              </div>
              <h4 className="text-sm font-bold">Scientific Context</h4>
              <p className="text-xs">Functional insights into why chemicals are used.</p>
            </div>
            <div className="text-center space-y-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto ${resolvedTheme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'}`}>
                <svg className={`w-5 h-5 ${resolvedTheme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h4 className="text-sm font-bold">Visual Synthesis</h4>
              <p className="text-xs">Advanced image generation for product context.</p>
            </div>
          </div>
        )}
      </main>

      {/* Floating Action Buttons */}
      {state.result && (
        <div className="fixed bottom-8 right-8 flex flex-col space-y-4 z-40">
          <ExportMenu
            analysis={state.result}
            onExport={handleExport}
            onCopy={handleCopy}
            onShare={handleShare}
            onPrint={handlePrint}
            onDownloadImage={handleDownloadImage}
            onEmail={handleEmail}
          />
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="w-14 h-14 bg-slate-700 hover:bg-slate-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all transform hover:scale-110"
            title="Analysis History"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </button>
        </div>
      )}

      {/* History Sidebar */}
      {showHistory && (
        <AnalysisHistory
          history={history}
          onSelect={handleHistorySelect}
          onDelete={removeFromHistory}
          onClear={clearHistory}
          onClose={() => setShowHistory(false)}
        />
      )}

      {/* Camera Modal */}
      {showCamera && (
        <CameraCapture
          onCapture={handleCameraCapture}
          onClose={() => setShowCamera(false)}
        />
      )}

      {/* Toast Notifications */}
      <Toast toasts={toasts} onRemove={removeToast} />

      <footer className={`border-t py-8 px-4 text-center ${resolvedTheme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <p className={`text-xs ${resolvedTheme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
          © 2025 kai Cognitive Intelligence. Non-medical guidance only. Use responsibly.
        </p>
      </footer>
    </div>
  );
};

export default App;
