import React from 'react';
import { useAuth } from '../hooks/useAuth';

interface DashboardProps {
  onNavigate: (view: 'analyzer' | 'compare' | 'bookmarks' | 'profile') => void;
  currentView: string;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate, currentView }) => {
  const { user } = useAuth();

  const stats = [
    { label: 'Analyses', value: '127', icon: '🔍', color: 'from-blue-500 to-cyan-500' },
    { label: 'Bookmarks', value: '34', icon: '⭐', color: 'from-purple-500 to-pink-500' },
    { label: 'Comparisons', value: '12', icon: '⚖️', color: 'from-green-500 to-emerald-500' },
    { label: 'Streak', value: '7d', icon: '🔥', color: 'from-orange-500 to-red-500' },
  ];

  const tools = [
    {
      id: 'analyzer',
      title: 'Product Analyzer',
      description: 'Analyze product labels with AI',
      icon: '🔬',
      gradient: 'from-indigo-500 to-purple-500',
      active: currentView === 'analyzer'
    },
    {
      id: 'compare',
      title: 'Compare Products',
      description: 'Side-by-side comparison',
      icon: '⚖️',
      gradient: 'from-cyan-500 to-blue-500',
      active: currentView === 'compare'
    },
    {
      id: 'bookmarks',
      title: 'My Bookmarks',
      description: 'Saved analyses',
      icon: '⭐',
      gradient: 'from-pink-500 to-rose-500',
      active: currentView === 'bookmarks'
    },
    {
      id: 'profile',
      title: 'Profile',
      description: 'Settings & preferences',
      icon: '👤',
      gradient: 'from-emerald-500 to-teal-500',
      active: currentView === 'profile'
    },
  ];

  const recentActivity = [
    { type: 'analysis', product: 'Organic Green Tea', time: '2 hours ago' },
    { type: 'bookmark', product: 'Natural Face Cream', time: '5 hours ago' },
    { type: 'comparison', product: 'Energy Drinks', time: '1 day ago' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">
            Welcome back, {user?.name}! 👋
          </h2>
          <p className="text-indigo-100 text-lg">
            Ready to analyze products and make informed decisions?
          </p>
          {user?.subscription === 'pro' && (
            <div className="mt-4 inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-yellow-300">⭐</span>
              <span className="font-semibold">PRO Member</span>
            </div>
          )}
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 p-6 hover:border-slate-600/50 transition-all hover:scale-105"
          >
            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-20 rounded-full -mr-10 -mt-10`}></div>
            <div className="relative z-10">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tools Grid */}
      <div>
        <h3 className="text-xl font-bold text-slate-200 mb-4">Quick Access Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => onNavigate(tool.id as any)}
              className={`relative overflow-hidden rounded-2xl p-6 text-left transition-all hover:scale-105 group ${
                tool.active
                  ? 'bg-gradient-to-br from-indigo-600 to-purple-600 border-2 border-indigo-400 shadow-lg shadow-indigo-500/50'
                  : 'bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/50'
              }`}
            >
              <div className="relative z-10">
                <div className="text-4xl mb-3">{tool.icon}</div>
                <h4 className="text-lg font-bold text-white mb-2">{tool.title}</h4>
                <p className="text-sm text-slate-300">{tool.description}</p>
              </div>
              {!tool.active && (
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
              )}
              {tool.active && (
                <div className="absolute top-2 right-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Recent Activity</h3>
          <button className="text-sm text-indigo-400 hover:text-indigo-300 font-medium">
            View All →
          </button>
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-4 rounded-xl bg-slate-900/50 border border-slate-700/30 hover:border-slate-600/50 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                {activity.type === 'analysis' ? '🔍' : activity.type === 'bookmark' ? '⭐' : '⚖️'}
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">{activity.product}</p>
                <p className="text-sm text-slate-400">
                  {activity.type === 'analysis' ? 'Analyzed' : activity.type === 'bookmark' ? 'Bookmarked' : 'Compared'}
                </p>
              </div>
              <span className="text-sm text-slate-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="rounded-2xl bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 p-6">
        <div className="flex items-start space-x-4">
          <div className="text-3xl">💡</div>
          <div>
            <h4 className="text-lg font-bold text-white mb-2">Pro Tip</h4>
            <p className="text-slate-300">
              Use the Compare tool to analyze multiple products side-by-side and find the healthiest option for your needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
