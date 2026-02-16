
import React from 'react';

interface Props {
  score: number;
  max?: number;
  label: string;
  size?: 'sm' | 'md' | 'lg';
  colorClass?: string;
}

const ScoreGauge: React.FC<Props> = ({ 
  score, 
  max = 100, 
  label, 
  size = 'md',
  colorClass 
}) => {
  const percentage = Math.min(100, Math.max(0, (score / max) * 100));
  const rotation = (percentage / 100) * 180; // Semi-circle gauge
  
  // Size configurations
  const sizeConfig = {
    sm: { size: 'w-24 h-24', text: 'text-2xl', label: 'text-xs' },
    md: { size: 'w-32 h-32', text: 'text-3xl', label: 'text-sm' },
    lg: { size: 'w-40 h-40', text: 'text-4xl', label: 'text-base' }
  };
  
  const config = sizeConfig[size];
  
  // Determine color based on score if not provided
  const getColor = () => {
    if (colorClass) return colorClass;
    if (percentage >= 80) return 'text-emerald-600 dark:text-emerald-400';
    if (percentage >= 60) return 'text-amber-600 dark:text-amber-400';
    return 'text-rose-600 dark:text-rose-400';
  };
  
  const color = getColor();

  return (
    <div className="flex flex-col items-center">
      <div className={`relative ${config.size}`}>
        {/* Background circle */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-slate-200 dark:text-slate-700"
            strokeDasharray="125.6 251.2"
            strokeDashoffset="0"
            transform="rotate(-90 50 50)"
          />
          {/* Animated progress circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className={`${color} transition-all duration-1000 ease-out`}
            strokeDasharray="125.6 251.2"
            strokeDashoffset={125.6 - (125.6 * percentage) / 100}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
        </svg>
        
        {/* Score display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`${config.text} font-bold ${color}`}>
            {Math.round(score)}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            / {max}
          </div>
        </div>
      </div>
      
      {/* Label */}
      <div className={`${config.label} font-semibold text-slate-700 dark:text-slate-300 mt-2 text-center`}>
        {label}
      </div>
    </div>
  );
};

export default ScoreGauge;
