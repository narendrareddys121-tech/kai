import React, { useState } from 'react';
import { ProductAnalysis } from '../types';
import { analyzeProductLabel } from '../services/geminiService';

interface ComparisonToolProps {
  theme?: 'light' | 'dark';
}

const ComparisonTool: React.FC<ComparisonToolProps> = ({ theme = 'dark' }) => {
  const [products, setProducts] = useState<{ text: string; result: ProductAnalysis | null; loading: boolean }[]>([
    { text: '', result: null, loading: false },
    { text: '', result: null, loading: false },
  ]);
  const [activeProduct, setActiveProduct] = useState<number>(0);

  const addProduct = () => {
    if (products.length < 4) {
      setProducts([...products, { text: '', result: null, loading: false }]);
    }
  };

  const removeProduct = (index: number) => {
    if (products.length > 2) {
      setProducts(products.filter((_, i) => i !== index));
      if (activeProduct >= products.length - 1) {
        setActiveProduct(products.length - 2);
      }
    }
  };

  const analyzeProduct = async (index: number) => {
    const product = products[index];
    if (!product.text.trim()) return;

    const newProducts = [...products];
    newProducts[index] = { ...product, loading: true };
    setProducts(newProducts);

    try {
      const result = await analyzeProductLabel(product.text);
      newProducts[index] = { ...product, result, loading: false };
      setProducts(newProducts);
    } catch (error) {
      newProducts[index] = { ...product, loading: false };
      setProducts(newProducts);
      console.error('Analysis failed:', error);
    }
  };

  const getComparisonWinner = (metric: 'score' | 'health' | 'environmental'): number | null => {
    let bestIndex: number | null = null;
    let bestValue = -1;

    products.forEach((product, index) => {
      if (!product.result) return;
      
      let value = 0;
      if (metric === 'score') {
        value = product.result.score.value;
      } else if (metric === 'health' && product.result.healthRisk) {
        value = 100 - product.result.healthRisk.score; // Invert: lower risk = better
      } else if (metric === 'environmental' && product.result.environmentalImpact) {
        value = product.result.environmentalImpact.score;
      }

      if (value > bestValue) {
        bestValue = value;
        bestIndex = index;
      }
    });

    return bestIndex;
  };

  const isDark = theme === 'dark';

  return (
    <div className={`space-y-6 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Compare Products</h2>
          <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
            Analyze and compare up to 4 products side-by-side
          </p>
        </div>
        {products.length < 4 && (
          <button
            onClick={addProduct}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all flex items-center space-x-2"
          >
            <span>+</span>
            <span>Add Product</span>
          </button>
        )}
      </div>

      {/* Product Input Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {products.map((product, index) => (
          <button
            key={index}
            onClick={() => setActiveProduct(index)}
            className={`flex-shrink-0 px-6 py-3 rounded-xl font-medium transition-all relative ${
              activeProduct === index
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                : isDark
                ? 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Product {index + 1}
            {products.length > 2 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeProduct(index);
                }}
                className="ml-2 text-red-400 hover:text-red-300"
              >
                ×
              </button>
            )}
            {product.result && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></div>
            )}
          </button>
        ))}
      </div>

      {/* Active Product Input */}
      <div className={`rounded-2xl p-6 ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200'}`}>
        <textarea
          value={products[activeProduct].text}
          onChange={(e) => {
            const newProducts = [...products];
            newProducts[activeProduct].text = e.target.value;
            setProducts(newProducts);
          }}
          placeholder="Paste product label text here..."
          className={`w-full h-32 p-4 rounded-xl font-mono text-sm resize-none ${
            isDark
              ? 'bg-slate-900 border border-slate-700 text-slate-200'
              : 'bg-slate-50 border border-slate-300 text-slate-900'
          } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={() => analyzeProduct(activeProduct)}
            disabled={products[activeProduct].loading || !products[activeProduct].text.trim()}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {products[activeProduct].loading ? 'Analyzing...' : 'Analyze Product'}
          </button>
        </div>
      </div>

      {/* Comparison Results */}
      {products.some(p => p.result) && (
        <div className="space-y-6">
          {/* Score Comparison */}
          <div className={`rounded-2xl p-6 ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200'}`}>
            <h3 className="text-xl font-bold mb-4">Overall Score Comparison</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map((product, index) => {
                const isWinner = getComparisonWinner('score') === index;
                return product.result ? (
                  <div
                    key={index}
                    className={`p-4 rounded-xl ${
                      isWinner
                        ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500'
                        : isDark ? 'bg-slate-900 border border-slate-700' : 'bg-slate-50 border border-slate-200'
                    }`}
                  >
                    {isWinner && (
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-xl">🏆</span>
                        <span className="text-sm font-bold text-green-400">Best Score</span>
                      </div>
                    )}
                    <div className="text-sm text-slate-400 mb-1">Product {index + 1}</div>
                    <div className="text-4xl font-bold mb-2">{product.result.score.value}/100</div>
                    <div className="text-sm text-slate-400">{product.result.score.interpretation}</div>
                  </div>
                ) : (
                  <div key={index} className={`p-4 rounded-xl ${isDark ? 'bg-slate-900' : 'bg-slate-50'} opacity-50`}>
                    <div className="text-sm text-slate-400 mb-1">Product {index + 1}</div>
                    <div className="text-lg text-slate-500">Not analyzed</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Health Risk Comparison */}
          {products.some(p => p.result?.healthRisk) && (
            <div className={`rounded-2xl p-6 ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200'}`}>
              <h3 className="text-xl font-bold mb-4">Health Risk Comparison</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {products.map((product, index) => {
                  const isWinner = getComparisonWinner('health') === index;
                  return product.result?.healthRisk ? (
                    <div
                      key={index}
                      className={`p-4 rounded-xl ${
                        isWinner
                          ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500'
                          : isDark ? 'bg-slate-900 border border-slate-700' : 'bg-slate-50 border border-slate-200'
                      }`}
                    >
                      {isWinner && (
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-xl">🏆</span>
                          <span className="text-sm font-bold text-green-400">Safest</span>
                        </div>
                      )}
                      <div className="text-sm text-slate-400 mb-1">Product {index + 1}</div>
                      <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold mb-2 ${
                        product.result.healthRisk.level === 'Low' ? 'bg-green-500/20 text-green-400' :
                        product.result.healthRisk.level === 'Moderate' ? 'bg-yellow-500/20 text-yellow-400' :
                        product.result.healthRisk.level === 'High' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {product.result.healthRisk.level} Risk
                      </div>
                      <div className="text-sm text-slate-400">Score: {product.result.healthRisk.score}/100</div>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}

          {/* Category Comparison Table */}
          <div className={`rounded-2xl overflow-hidden ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200'}`}>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Detailed Comparison</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={isDark ? 'bg-slate-900' : 'bg-slate-50'}>
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Attribute</th>
                    {products.map((_, index) => (
                      <th key={index} className="px-6 py-3 text-left text-sm font-semibold">
                        Product {index + 1}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium">Category</td>
                    {products.map((product, index) => (
                      <td key={index} className="px-6 py-4 text-sm">
                        {product.result?.productIdentity.category || '-'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium">Confidence</td>
                    {products.map((product, index) => (
                      <td key={index} className="px-6 py-4 text-sm">
                        {product.result?.productIdentity.confidence || '-'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium">Allergens</td>
                    {products.map((product, index) => (
                      <td key={index} className="px-6 py-4 text-sm">
                        {product.result?.allergens?.length || 0}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparisonTool;
