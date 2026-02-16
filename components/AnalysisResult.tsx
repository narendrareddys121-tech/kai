
import React from 'react';
import { ProductAnalysis } from '../types';
import { getScoreColorClass } from '../utils';
import ScoreGauge from './ScoreGauge';
import AllergenPanel from './AllergenPanel';
import DietaryBadges from './DietaryBadges';
import NutritionChart from './NutritionChart';
import IngredientHeatmap from './IngredientHeatmap';
import ComparisonPanel from './ComparisonPanel';

interface Props {
  data: ProductAnalysis;
}

const AnalysisResult: React.FC<Props> = ({ data }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Product Image & Key Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Identity */}
        {data.generatedImageUrl && (
          <div className="lg:col-span-5 bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 relative group">
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

        {/* Identity & Quick Stats */}
        <div className={`${data.generatedImageUrl ? 'lg:col-span-7' : 'lg:col-span-12'} flex flex-col gap-6`}>
           {/* Identity Card */}
           <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex-1">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">🧾 Product Identity</h3>
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 leading-tight">{data.productIdentity.category}</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1">Confidence</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  data.productIdentity.confidence === 'High' ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' : 
                  data.productIdentity.confidence === 'Medium' ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300' : 
                  'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                }`}>
                  {data.productIdentity.confidence} Level
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.productIdentity.elements.map((el, i) => (
                <span key={i} className="px-3 py-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 font-medium">
                  {el}
                </span>
              ))}
            </div>
          </div>

          {/* Score Gauges Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center">
              <ScoreGauge 
                score={data.score.value} 
                label="Intelligence" 
                size="sm"
              />
            </div>
            
            {data.healthRisk && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                <ScoreGauge 
                  score={100 - data.healthRisk.score} 
                  label="Health Safety" 
                  size="sm"
                  colorClass={data.healthRisk.score < 30 ? 'text-emerald-600 dark:text-emerald-400' : 
                             data.healthRisk.score < 60 ? 'text-amber-600 dark:text-amber-400' : 
                             'text-rose-600 dark:text-rose-400'}
                />
              </div>
            )}
            
            {data.environmentalImpact && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                <ScoreGauge 
                  score={data.environmentalImpact.score} 
                  label="Eco Score" 
                  size="sm"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 flex items-center">
          <span className="w-2 h-2 bg-indigo-500 dark:bg-indigo-400 rounded-full mr-2"></span>
          ⭐ Executive Summary
        </h3>
        <p className="text-lg text-slate-800 dark:text-slate-200 font-medium leading-relaxed italic">
          "{data.executiveSummary}"
        </p>
      </div>

      {/* Allergen Detection */}
      {data.allergens && data.allergens.length > 0 && (
        <AllergenPanel allergens={data.allergens} />
      )}

      {/* Dietary Compatibility */}
      {data.dietaryCompatibility && data.dietaryCompatibility.length > 0 && (
        <DietaryBadges compatibilities={data.dietaryCompatibility} />
      )}

      {/* Nutrition & Health Risk */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {data.nutrition && <NutritionChart nutrition={data.nutrition} />}
        
        {data.healthRisk && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">
              🏥 Health Risk Assessment
            </h3>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Risk Level</span>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                data.healthRisk.level === 'Low' ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' :
                data.healthRisk.level === 'Moderate' ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300' :
                data.healthRisk.level === 'High' ? 'bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300' :
                'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
              }`}>
                {data.healthRisk.level}
              </span>
            </div>
            <div className="space-y-2">
              {data.healthRisk.factors.map((factor, i) => (
                <div key={i} className="flex items-start text-sm text-slate-600 dark:text-slate-400">
                  <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-600 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                  {factor}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Environmental Impact */}
      {data.environmentalImpact && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">
            🌍 Environmental Impact
          </h3>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Impact Level</span>
            <span className={`px-3 py-1 rounded-full text-sm font-bold ${
              data.environmentalImpact.level === 'Excellent' ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' :
              data.environmentalImpact.level === 'Good' ? 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300' :
              data.environmentalImpact.level === 'Moderate' ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300' :
              'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
            }`}>
              {data.environmentalImpact.level}
            </span>
          </div>
          <div className="space-y-2">
            {data.environmentalImpact.factors.map((factor, i) => (
              <div key={i} className="flex items-start text-sm text-slate-600 dark:text-slate-400">
                <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-600 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                {factor}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Positive Attributes & Tradeoffs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-4 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            ✨ Positive Attributes
          </h3>
          <ul className="space-y-3">
            {data.positiveAttributes.map((attr, i) => (
              <li key={i} className="flex items-start text-slate-700 dark:text-slate-300 text-sm">
                <span className="w-1.5 h-1.5 bg-emerald-400 dark:bg-emerald-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                {attr}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-4 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            ⚖ Tradeoffs & Limitations
          </h3>
          <ul className="space-y-3">
            {data.tradeoffs.map((item, i) => (
              <li key={i} className="flex items-start text-slate-700 dark:text-slate-300 text-sm">
                <span className="w-1.5 h-1.5 bg-amber-400 dark:bg-amber-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Ingredient Heatmap */}
      <IngredientHeatmap 
        ingredients={data.functionalIngredients} 
        awarenessFlags={data.awarenessFlags}
      />

      {/* Formulation Signals & Flags */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">🏆 Formulation & Quality Signals</h3>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{data.qualitySignals}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-xs font-bold text-rose-500 dark:text-rose-400 uppercase tracking-widest mb-3">🚩 Awareness Flags</h3>
          <div className="space-y-2">
            {data.awarenessFlags.map((flag, i) => (
              <div key={i} className="text-sm font-medium text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950 px-3 py-2 rounded-lg border border-rose-100 dark:border-rose-800">
                {flag}
              </div>
            ))}
            {data.awarenessFlags.length === 0 && <div className="text-sm text-slate-400 dark:text-slate-600 italic">No significant flags detected.</div>}
          </div>
        </div>
      </div>

      {/* Comparison Panel */}
      {data.comparisonData && (
        <ComparisonPanel data={data.comparisonData} />
      )}

      {/* Alternatives */}
      {data.alternatives && data.alternatives.length > 0 && (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-6 border-2 border-purple-200 dark:border-purple-900">
          <h3 className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-4 flex items-center">
            💡 Alternative Suggestions
          </h3>
          <ul className="space-y-2">
            {data.alternatives.map((alt, i) => (
              <li key={i} className="flex items-start text-sm text-slate-700 dark:text-slate-300">
                <span className="text-purple-600 dark:text-purple-400 font-bold mr-3">{i + 1}.</span>
                {alt}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Usage & Suggestion */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-indigo-600 dark:bg-indigo-700 rounded-2xl p-6 shadow-lg shadow-indigo-100 dark:shadow-none text-white">
          <h3 className="text-xs font-bold text-indigo-200 dark:text-indigo-300 uppercase tracking-widest mb-3 flex items-center">
             <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             📅 Smart Usage Perspective
          </h3>
          <p className="text-sm leading-relaxed text-indigo-50 dark:text-indigo-100 font-medium">
            {data.smartUsage}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border-2 border-dashed border-indigo-200 dark:border-indigo-800 flex flex-col items-start">
          <h3 className="text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest mb-2 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            🧠 Proactive Suggestion
          </h3>
          <p className="text-sm text-slate-700 dark:text-slate-300 italic">
            "{data.proactiveSuggestion}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
