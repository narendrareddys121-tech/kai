import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

interface LoginPageProps {
  onSuccess?: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onSuccess }) => {
  const { login, signup } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        if (!formData.name.trim()) {
          throw new Error('Name is required');
        }
        await signup(formData.email, formData.password, formData.name);
      }
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await login('demo@kai.app', 'demo123');
      onSuccess?.();
    } catch (err) {
      setError('Demo login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Login card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Glassmorphism container */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
          {/* Header with gradient */}
          <div className="p-8 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 border-b border-white/10">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-3xl font-bold text-white">k</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-center text-white mb-2">
              Welcome to kai
            </h1>
            <p className="text-center text-slate-200 text-sm">
              Cognitive Product Intelligence Platform
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            {/* Toggle Login/Signup */}
            <div className="flex mb-8 p-1 bg-white/5 rounded-xl border border-white/10">
              <button
                onClick={() => {
                  setIsLogin(true);
                  setError(null);
                }}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                  isLogin
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => {
                  setIsLogin(false);
                  setError(null);
                }}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                  !isLogin
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                    required={!isLogin}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-300 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>{isLogin ? 'Login' : 'Create Account'}</span>
                )}
              </button>
            </form>

            {/* Demo login */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-transparent text-slate-400">Or continue with</span>
                </div>
              </div>

              <button
                onClick={handleDemoLogin}
                disabled={isLoading}
                className="mt-4 w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                🚀 Try Demo Account
              </button>

              <p className="mt-4 text-center text-xs text-slate-400">
                Demo: demo@kai.app / demo123
              </p>
            </div>

            {/* Features */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-xs text-slate-400 text-center mb-4">Why kai?</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl mb-1">🧠</div>
                  <p className="text-xs text-slate-300">AI-Powered</p>
                </div>
                <div>
                  <div className="text-2xl mb-1">⚡</div>
                  <p className="text-xs text-slate-300">Fast Analysis</p>
                </div>
                <div>
                  <div className="text-2xl mb-1">🔒</div>
                  <p className="text-xs text-slate-300">Secure</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer text */}
        <p className="mt-8 text-center text-sm text-slate-400">
          By continuing, you agree to kai's Terms & Privacy Policy
        </p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
