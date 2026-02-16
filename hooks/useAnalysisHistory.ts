
import { useState, useEffect, useCallback } from 'react';
import { AnalysisHistoryItem, ProductAnalysis } from '../types';
import { STORAGE_KEYS, MAX_HISTORY_ITEMS } from '../constants';
import { generateId } from '../utils';

export function useAnalysisHistory() {
  const [history, setHistory] = useState<AnalysisHistoryItem[]>(() => {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.history);
      if (stored) {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch (error) {
      console.error('Failed to load history from localStorage:', error);
    }
    
    return [];
  });

  // Save to localStorage whenever history changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(history));
    } catch (error) {
      console.error('Failed to save history to localStorage:', error);
    }
  }, [history]);

  const addToHistory = useCallback((inputText: string, result: ProductAnalysis) => {
    const item: AnalysisHistoryItem = {
      id: generateId(),
      timestamp: Date.now(),
      inputText,
      result
    };

    setHistory(prev => {
      const newHistory = [item, ...prev];
      // Keep only the most recent MAX_HISTORY_ITEMS entries
      return newHistory.slice(0, MAX_HISTORY_ITEMS);
    });
  }, []);

  const removeFromHistory = useCallback((id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const getHistoryItem = useCallback((id: string) => {
    return history.find(item => item.id === id);
  }, [history]);

  const searchHistory = useCallback((query: string) => {
    if (!query.trim()) return history;
    
    const lowerQuery = query.toLowerCase();
    return history.filter(item => 
      item.inputText.toLowerCase().includes(lowerQuery) ||
      item.result.productIdentity.category.toLowerCase().includes(lowerQuery) ||
      item.result.executiveSummary.toLowerCase().includes(lowerQuery)
    );
  }, [history]);

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
    getHistoryItem,
    searchHistory
  };
}
