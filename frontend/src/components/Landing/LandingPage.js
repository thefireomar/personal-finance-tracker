import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <div className="logo">FinanceTracker</div>
        <div className="nav-buttons">
          <button className="nav-btn" onClick={() => navigate('/login')}>Login</button>
          <button className="nav-btn primary" onClick={() => navigate('/register')}>Sign Up</button>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-content">
          <h1>Take Control of Your Finances</h1>
          <p className="hero-subtitle">Track expenses, set goals, and make smarter financial decisions</p>
          <div className="cta-buttons">
            <button className="cta-button primary" onClick={() => navigate('/register')}>
              Start For Free
            </button>
            <button className="cta-button secondary" onClick={() => navigate('/login')}>
              View Demo
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Active Users</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">$2M+</span>
              <span className="stat-label">Tracked Money</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">98%</span>
              <span className="stat-label">Satisfaction</span>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>Smart Features for Better Finance</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Expense Tracking</h3>
            <p>Monitor your spending habits with detailed categorization and insights</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Goal Setting</h3>
            <p>Set and track financial goals with progress monitoring</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Visual Reports</h3>
            <p>Clear visualizations of your financial data and trends</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure & Private</h3>
            <p>Bank-level security to protect your financial data</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Start?</h2>
        <p>Join thousands of users who are taking control of their finances</p>
        <button className="cta-button primary large" onClick={() => navigate('/register')}>
          Create Free Account
        </button>
      </section>
    </div>
  );
};

export default LandingPage;
