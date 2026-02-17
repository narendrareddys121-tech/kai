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
    rememberMe: false,
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
    <div className="cyberpunk-login">
      {/* Background with grid and scanlines */}
      <div className="cyberpunk-bg">
        <div className="grid-overlay"></div>
        <div className="scanlines"></div>
        <div className="glow-orb glow-orb-1"></div>
        <div className="glow-orb glow-orb-2"></div>
        <div className="glow-orb glow-orb-3"></div>
      </div>

      {/* Main Container */}
      <div className="cyberpunk-container">
        {/* Logo/Brand */}
        <div className="cyberpunk-logo">
          <div className="logo-icon">
            <span className="logo-text">K</span>
            <div className="logo-glow"></div>
          </div>
          <h1 className="brand-title">
            <span className="title-main">KAI</span>
            <span className="title-sub">INTELLIGENCE</span>
          </h1>
          <div className="brand-line"></div>
        </div>

        {/* Login Card */}
        <div className="cyberpunk-card">
          {/* Corner decorations */}
          <div className="corner-decoration corner-tl"></div>
          <div className="corner-decoration corner-tr"></div>
          <div className="corner-decoration corner-bl"></div>
          <div className="corner-decoration corner-br"></div>

          {/* Tab Switch */}
          <div className="tab-switch">
            <button
              onClick={() => {
                setIsLogin(true);
                setError(null);
              }}
              className={`tab-btn ${isLogin ? 'active' : ''}`}
            >
              <span>LOGIN</span>
              <div className="tab-glow"></div>
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setError(null);
              }}
              className={`tab-btn ${!isLogin ? 'active' : ''}`}
            >
              <span>REGISTER</span>
              <div className="tab-glow"></div>
            </button>
            <div className={`tab-slider ${!isLogin ? 'slide-right' : ''}`}></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="cyberpunk-form">
            {!isLogin && (
              <div className="form-group">
                <label className="form-label">
                  <span className="label-icon">👤</span>
                  FULL NAME
                </label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="cyberpunk-input"
                    placeholder="Enter your name"
                    required={!isLogin}
                  />
                  <div className="input-border"></div>
                  <div className="input-glow"></div>
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">📧</span>
                EMAIL ADDRESS
              </label>
              <div className="input-wrapper">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="cyberpunk-input"
                  placeholder="user@example.com"
                  required
                />
                <div className="input-border"></div>
                <div className="input-glow"></div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">🔒</span>
                PASSWORD
              </label>
              <div className="input-wrapper">
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="cyberpunk-input"
                  placeholder="••••••••"
                  required
                />
                <div className="input-border"></div>
                <div className="input-glow"></div>
              </div>
            </div>

            {isLogin && (
              <div className="form-options">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                    className="cyber-checkbox"
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">REMEMBER ME</span>
                </label>
                <a href="#" className="forgot-password">
                  FORGOT PASSWORD?
                </a>
              </div>
            )}

            {error && (
              <div className="error-message">
                <span className="error-icon">⚠</span>
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="cyberpunk-btn cyberpunk-btn-primary"
            >
              {isLoading ? (
                <>
                  <span className="btn-loader"></span>
                  <span>PROCESSING...</span>
                </>
              ) : (
                <>
                  <span>{isLogin ? 'ACCESS SYSTEM' : 'CREATE ACCOUNT'}</span>
                  <span className="btn-arrow">→</span>
                </>
              )}
              <div className="btn-glow"></div>
            </button>
          </form>

          {/* Divider */}
          <div className="divider">
            <span>OR CONTINUE WITH</span>
          </div>

          {/* Social Login */}
          <div className="social-login">
            <button className="social-btn" title="Google">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
              </svg>
            </button>
            <button className="social-btn" title="Facebook">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M12,2C6.477,2,2,6.477,2,12c0,5.013,3.693,9.153,8.505,9.876V14.65H8.031v-2.629h2.474v-1.749c0-2.896,1.411-4.167,3.818-4.167c1.153,0,1.762,0.085,2.051,0.124v2.294h-1.642c-1.022,0-1.379,0.969-1.379,2.061v1.437h2.995l-0.406,2.629h-2.588v7.247C18.235,21.236,22,17.062,22,12C22,6.477,17.523,2,12,2z"/>
              </svg>
            </button>
            <button className="social-btn" title="GitHub">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"/>
              </svg>
            </button>
            <button className="social-btn" title="Twitter">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.70,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z"/>
              </svg>
            </button>
          </div>

          {/* Demo Login */}
          <button
            onClick={handleDemoLogin}
            disabled={isLoading}
            className="cyberpunk-btn cyberpunk-btn-secondary"
          >
            <span className="demo-icon">🚀</span>
            <span>DEMO ACCESS</span>
            <div className="btn-glow"></div>
          </button>

          {/* Footer Info */}
          <div className="card-footer">
            <p className="demo-info">Demo: demo@kai.app / demo123</p>
            <p className="terms">
              By continuing, you agree to our{' '}
              <a href="#">Terms</a> & <a href="#">Privacy Policy</a>
            </p>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="cyberpunk-footer">
          <div className="footer-line"></div>
          <p>SECURED BY QUANTUM ENCRYPTION</p>
        </div>
      </div>

      <style>{`
        /* Reset and Base Styles */
        .cyberpunk-login {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Arial', 'Helvetica', sans-serif;
          overflow: hidden;
          position: relative;
        }

        .cyberpunk-login * {
          box-sizing: border-box;
        }

        /* Background */
        .cyberpunk-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #0a0e27 0%, #1a0b2e 50%, #0f0f1e 100%);
          z-index: -1;
        }

        /* Grid Overlay */
        .grid-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridMove 20s linear infinite;
        }

        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }

        /* Scanlines */
        .scanlines {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.15) 1px,
            transparent 1px,
            transparent 2px
          );
          pointer-events: none;
          animation: scanlineMove 8s linear infinite;
        }

        @keyframes scanlineMove {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(100%);
          }
        }

        /* Glowing Orbs */
        .glow-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.3;
          animation: float 8s ease-in-out infinite;
        }

        .glow-orb-1 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #00ffff 0%, transparent 70%);
          top: -100px;
          left: -100px;
        }

        .glow-orb-2 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, #ff00ff 0%, transparent 70%);
          bottom: -50px;
          right: -50px;
          animation-delay: -2s;
        }

        .glow-orb-3 {
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, #ff006a 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: -4s;
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(30px, 30px);
          }
        }

        /* Container */
        .cyberpunk-container {
          width: 100%;
          max-width: 450px;
          padding: 20px;
          z-index: 1;
        }

        /* Logo */
        .cyberpunk-logo {
          text-align: center;
          margin-bottom: 40px;
        }

        .logo-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 20px;
          position: relative;
          display: inline-block;
        }

        .logo-text {
          display: block;
          font-size: 48px;
          font-weight: 900;
          color: #00ffff;
          text-shadow: 
            0 0 10px #00ffff,
            0 0 20px #00ffff,
            0 0 30px #00ffff,
            0 0 40px #00ffff;
          animation: logoPulse 2s ease-in-out infinite;
        }

        @keyframes logoPulse {
          0%, 100% {
            text-shadow: 
              0 0 10px #00ffff,
              0 0 20px #00ffff,
              0 0 30px #00ffff,
              0 0 40px #00ffff;
          }
          50% {
            text-shadow: 
              0 0 20px #00ffff,
              0 0 30px #00ffff,
              0 0 40px #00ffff,
              0 0 50px #00ffff,
              0 0 60px #00ffff;
          }
        }

        .brand-title {
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
        }

        .title-main {
          font-size: 42px;
          font-weight: 900;
          letter-spacing: 8px;
          color: #ffffff;
          text-shadow: 
            0 0 10px #00ffff,
            0 0 20px #00ffff,
            0 0 30px #00ffff;
        }

        .title-sub {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 4px;
          color: #ff00ff;
          text-shadow: 0 0 10px #ff00ff;
        }

        .brand-line {
          width: 100px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #00ffff, transparent);
          margin: 15px auto 0;
          box-shadow: 0 0 10px #00ffff;
        }

        /* Card */
        .cyberpunk-card {
          background: rgba(10, 14, 39, 0.8);
          backdrop-filter: blur(10px);
          border: 2px solid #00ffff;
          border-radius: 20px;
          padding: 40px;
          position: relative;
          box-shadow: 
            0 0 20px rgba(0, 255, 255, 0.3),
            0 0 40px rgba(0, 255, 255, 0.1),
            inset 0 0 60px rgba(0, 255, 255, 0.05);
        }

        /* Corner Decorations */
        .corner-decoration {
          position: absolute;
          width: 20px;
          height: 20px;
          border: 2px solid #ff00ff;
        }

        .corner-tl {
          top: -2px;
          left: -2px;
          border-right: none;
          border-bottom: none;
          box-shadow: -5px -5px 10px rgba(255, 0, 255, 0.5);
        }

        .corner-tr {
          top: -2px;
          right: -2px;
          border-left: none;
          border-bottom: none;
          box-shadow: 5px -5px 10px rgba(255, 0, 255, 0.5);
        }

        .corner-bl {
          bottom: -2px;
          left: -2px;
          border-right: none;
          border-top: none;
          box-shadow: -5px 5px 10px rgba(255, 0, 255, 0.5);
        }

        .corner-br {
          bottom: -2px;
          right: -2px;
          border-left: none;
          border-top: none;
          box-shadow: 5px 5px 10px rgba(255, 0, 255, 0.5);
        }

        /* Tab Switch */
        .tab-switch {
          display: flex;
          gap: 10px;
          margin-bottom: 30px;
          position: relative;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 10px;
          padding: 5px;
          border: 1px solid rgba(0, 255, 255, 0.2);
        }

        .tab-btn {
          flex: 1;
          padding: 15px;
          background: transparent;
          border: none;
          color: #888;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 2px;
          cursor: pointer;
          position: relative;
          z-index: 2;
          transition: all 0.3s ease;
        }

        .tab-btn.active {
          color: #00ffff;
          text-shadow: 0 0 10px #00ffff;
        }

        .tab-slider {
          position: absolute;
          top: 5px;
          left: 5px;
          width: calc(50% - 5px);
          height: calc(100% - 10px);
          background: linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(255, 0, 255, 0.2));
          border-radius: 8px;
          border: 1px solid #00ffff;
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
          transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          z-index: 1;
        }

        .tab-slider.slide-right {
          left: calc(50% + 0px);
        }

        /* Form */
        .cyberpunk-form {
          margin-bottom: 25px;
        }

        .form-group {
          margin-bottom: 25px;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
          color: #00ffff;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          text-shadow: 0 0 5px #00ffff;
        }

        .label-icon {
          font-size: 16px;
        }

        .input-wrapper {
          position: relative;
        }

        .cyberpunk-input {
          width: 100%;
          padding: 15px 20px;
          background: rgba(0, 0, 0, 0.6);
          border: 2px solid rgba(0, 255, 255, 0.3);
          border-radius: 10px;
          color: #ffffff;
          font-size: 16px;
          font-weight: 500;
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
        }

        .cyberpunk-input:focus {
          outline: none;
          border-color: #00ffff;
          box-shadow: 
            0 0 20px rgba(0, 255, 255, 0.4),
            inset 0 0 20px rgba(0, 255, 255, 0.1);
        }

        .cyberpunk-input::placeholder {
          color: #666;
        }

        .input-border {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 10px;
          pointer-events: none;
        }

        .cyberpunk-input:focus + .input-border {
          animation: borderGlow 1.5s ease-in-out infinite;
        }

        @keyframes borderGlow {
          0%, 100% {
            box-shadow: 0 0 5px #00ffff, 0 0 10px #00ffff;
          }
          50% {
            box-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff;
          }
        }

        /* Form Options */
        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
        }

        .remember-me {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          user-select: none;
        }

        .cyber-checkbox {
          display: none;
        }

        .checkbox-custom {
          width: 20px;
          height: 20px;
          border: 2px solid #00ffff;
          border-radius: 4px;
          position: relative;
          transition: all 0.3s ease;
          background: rgba(0, 0, 0, 0.6);
        }

        .cyber-checkbox:checked + .checkbox-custom {
          background: #00ffff;
          box-shadow: 0 0 10px #00ffff;
        }

        .cyber-checkbox:checked + .checkbox-custom::after {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #000;
          font-size: 14px;
          font-weight: bold;
        }

        .checkbox-label {
          color: #aaa;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1px;
        }

        .forgot-password {
          color: #ff00ff;
          text-decoration: none;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1px;
          text-shadow: 0 0 5px #ff00ff;
          transition: all 0.3s ease;
        }

        .forgot-password:hover {
          color: #ff66ff;
          text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff;
        }

        /* Error Message */
        .error-message {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 15px;
          background: rgba(255, 0, 106, 0.1);
          border: 1px solid #ff006a;
          border-radius: 10px;
          color: #ff006a;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 20px;
          box-shadow: 0 0 10px rgba(255, 0, 106, 0.3);
        }

        .error-icon {
          font-size: 20px;
        }

        /* Buttons */
        .cyberpunk-btn {
          width: 100%;
          padding: 18px;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 2px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .cyberpunk-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .cyberpunk-btn-primary {
          background: linear-gradient(135deg, #00ffff 0%, #00aaaa 100%);
          color: #000;
          border: 2px solid #00ffff;
          box-shadow: 
            0 0 20px rgba(0, 255, 255, 0.5),
            inset 0 0 20px rgba(255, 255, 255, 0.1);
          margin-bottom: 15px;
        }

        .cyberpunk-btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 
            0 0 30px rgba(0, 255, 255, 0.8),
            inset 0 0 30px rgba(255, 255, 255, 0.2);
        }

        .cyberpunk-btn-secondary {
          background: rgba(255, 0, 255, 0.1);
          color: #ff00ff;
          border: 2px solid #ff00ff;
          box-shadow: 0 0 10px rgba(255, 0, 255, 0.3);
        }

        .cyberpunk-btn-secondary:hover:not(:disabled) {
          background: rgba(255, 0, 255, 0.2);
          box-shadow: 0 0 20px rgba(255, 0, 255, 0.6);
        }

        .btn-arrow {
          font-size: 20px;
          transition: transform 0.3s ease;
        }

        .cyberpunk-btn-primary:hover:not(:disabled) .btn-arrow {
          transform: translateX(5px);
        }

        .btn-loader {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(0, 0, 0, 0.3);
          border-top-color: #000;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .demo-icon {
          font-size: 20px;
        }

        /* Divider */
        .divider {
          display: flex;
          align-items: center;
          margin: 30px 0;
          color: #666;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1px;
        }

        .divider::before,
        .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, #00ffff, transparent);
        }

        .divider span {
          padding: 0 15px;
        }

        /* Social Login */
        .social-login {
          display: flex;
          gap: 15px;
          margin-bottom: 25px;
        }

        .social-btn {
          flex: 1;
          padding: 15px;
          background: rgba(0, 0, 0, 0.6);
          border: 2px solid rgba(0, 255, 255, 0.3);
          border-radius: 10px;
          color: #00ffff;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .social-btn:hover {
          border-color: #00ffff;
          background: rgba(0, 255, 255, 0.1);
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.4);
          transform: translateY(-2px);
        }

        .social-btn svg {
          filter: drop-shadow(0 0 5px currentColor);
        }

        /* Card Footer */
        .card-footer {
          margin-top: 25px;
          text-align: center;
        }

        .demo-info {
          color: #888;
          font-size: 12px;
          margin-bottom: 15px;
          font-family: 'Courier New', monospace;
        }

        .terms {
          color: #666;
          font-size: 11px;
          line-height: 1.6;
        }

        .terms a {
          color: #00ffff;
          text-decoration: none;
          text-shadow: 0 0 5px #00ffff;
        }

        .terms a:hover {
          color: #66ffff;
        }

        /* Footer */
        .cyberpunk-footer {
          margin-top: 40px;
          text-align: center;
        }

        .footer-line {
          width: 200px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #ff00ff, transparent);
          margin: 0 auto 15px;
          box-shadow: 0 0 10px #ff00ff;
        }

        .cyberpunk-footer p {
          color: #666;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 3px;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .cyberpunk-container {
            padding: 15px;
          }

          .cyberpunk-card {
            padding: 30px 20px;
          }

          .title-main {
            font-size: 36px;
            letter-spacing: 6px;
          }

          .tab-btn {
            padding: 12px;
            font-size: 12px;
          }

          .social-login {
            gap: 10px;
          }

          .social-btn {
            padding: 12px;
          }
        }

        /* Additional Glow Effects */
        @keyframes neonPulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .cyberpunk-btn-primary::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          transform: rotate(45deg);
          animation: shine 3s infinite;
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
