
import React from 'react';
import { ProductAnalysis } from '../types';

interface Props {
  data: ProductAnalysis;
}

const AnalysisResult: React.FC<Props> = ({ data }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600 border-emerald-200 bg-emerald-50';
    if (score >= 60) return 'text-amber-600 border-amber-200 bg-amber-50';
    return 'text-rose-600 border-rose-200 bg-rose-50';
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Product Image & Key Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Identity */}
        {data.generatedImageUrl && (
          <div className="lg:col-span-5 bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 relative group">
            <img 
              src={data.generatedImageUrl} 
              alt={data.productIdentity.category}
              className="w-full h-full object-cover aspect-square sm:aspect-video lg:aspect-square transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4">
              <span className="px-2 py-1 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-md border border-white/20">
                AI Visual Synthesis
              </span>
            </div>
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-white text-xs font-medium italic opacity-90">
                Artistic representation of {data.productIdentity.category.toLowerCase()}
              </p>
            </div>
          </div>
        )}

        {/* Identity & Score */}
        <div className={`${data.generatedImageUrl ? 'lg:col-span-7' : 'lg:col-span-12'} flex flex-col gap-6`}>
           {/* Identity Card */}
           <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex-1">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">🧾 Product Identity</h3>
                <div className="text-2xl font-bold text-slate-900 leading-tight">{data.productIdentity.category}</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Confidence</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  data.productIdentity.confidence === 'High' ? 'bg-emerald-100 text-emerald-700' : 
                  data.productIdentity.confidence === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                }`}>
                  {data.productIdentity.confidence} Level
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.productIdentity.elements.map((el, i) => (
                <span key={i} className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-sm text-slate-600 font-medium">
                  {el}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className={`rounded-2xl p-4 shadow-sm border flex flex-col items-center justify-center text-center ${getScoreColor(data.score.value)}`}>
              <h3 className="text-[10px] font-bold uppercase tracking-widest mb-1">📊 Intelligence Score</h3>
              <div className="text-4xl font-black mb-1">{data.score.value}</div>
              <div className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/50 border border-current/20">
                {data.score.interpretation}
              </div>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex flex-col items-center justify-center text-center text-indigo-700">
               <h3 className="text-[10px] font-bold uppercase tracking-widest mb-1">Elements</h3>
               <div className="text-4xl font-black mb-1">{data.productIdentity.elements.length}</div>
               <div className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/50 border border-indigo-200/50">
                Detected Items
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center">
          <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
          ⭐ Executive Summary
        </h3>
        <p className="text-lg text-slate-800 font-medium leading-relaxed italic">
          "{data.executiveSummary}"
        </p>
      </div>

      {/* Positive Attributes & Tradeoffs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-4 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            ✨ Positive Attributes
          </h3>
          <ul className="space-y-3">
            {data.positiveAttributes.map((attr, i) => (
              <li key={i} className="flex items-start text-slate-700 text-sm">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                {attr}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-4 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            ⚖ Tradeoffs & Limitations
          </h3>
          <ul className="space-y-3">
            {data.tradeoffs.map((item, i) => (
              <li key={i} className="flex items-start text-slate-700 text-sm">
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Functional Ingredients */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">🧪 Functional Role of Ingredients</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.functionalIngredients.map((item, i) => (
            <div key={i} className="flex flex-col p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-sm font-bold text-slate-800">{item.ingredient}</span>
              <span className="text-xs text-slate-500 mt-1">{item.purpose}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Formulation Signals & Flags */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">🏆 Formulation & Quality Signals</h3>
          <p className="text-sm text-slate-700 leading-relaxed">{data.qualitySignals}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-xs font-bold text-rose-500 uppercase tracking-widest mb-3">🚩 Awareness Flags</h3>
          <div className="space-y-2">
            {data.awarenessFlags.map((flag, i) => (
              <div key={i} className="text-sm font-medium text-rose-700 bg-rose-50 px-3 py-2 rounded-lg border border-rose-100">
                {flag}
              </div>
            ))}
            {data.awarenessFlags.length === 0 && <div className="text-sm text-slate-400 italic">No significant flags detected.</div>}
          </div>
        </div>
      </div>

      {/* Usage & Suggestion */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-indigo-600 rounded-2xl p-6 shadow-lg shadow-indigo-100 text-white">
          <h3 className="text-xs font-bold text-indigo-200 uppercase tracking-widest mb-3 flex items-center">
             <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             📅 Smart Usage Perspective
          </h3>
          <p className="text-sm leading-relaxed text-indigo-50 font-medium">
            {data.smartUsage}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-dashed border-indigo-200 flex flex-col items-start">
          <h3 className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            🧠 Proactive Suggestion
          </h3>
          <p className="text-sm text-slate-700 italic">
            "{data.proactiveSuggestion}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
