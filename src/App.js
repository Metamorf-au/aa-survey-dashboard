import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import AboutYouSection from './sections/AboutYouSection';
import ValuesViewsSection from './sections/ValuesViewsSection';
import YourSupportSection from './sections/YourSupportSection';

const COLORS = {
  primary: '#2D5A47',
  background: '#F8FAF9',
  cardBg: '#FFFFFF',
  text: '#1E293B',
  textMuted: '#64748B',
  quinary: '#B3D9C9',
};

// Placeholder components for sections not yet built
const PlaceholderSection = ({ title, questions }) => (
  <div style={{
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    background: COLORS.background,
    minHeight: '100vh',
    padding: '32px',
  }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 700, color: COLORS.text, margin: 0 }}>
        {title}
      </h1>
      <p style={{ fontSize: '15px', color: COLORS.textMuted, margin: '8px 0 24px' }}>
        {questions}
      </p>
      <div style={{
        background: COLORS.cardBg,
        borderRadius: '16px',
        padding: '48px',
        textAlign: 'center',
        border: '1px solid ' + COLORS.quinary,
      }}>
        <p style={{ fontSize: '18px', color: COLORS.textMuted }}>
          🚧 Coming Soon
        </p>
      </div>
    </div>
  </div>
);

const Overview = () => (
  <PlaceholderSection 
    title="Overview" 
    questions="Executive summary and key findings across all sections"
  />
);

const YourSatisfaction = () => (
  <PlaceholderSection 
    title="Your Satisfaction" 
    questions="Questions 14-18"
  />
);

// Navigation component
const Navigation = () => {
  const navItems = [
    { path: '/', label: 'Overview' },
    { path: '/about-you', label: 'About You' },
    { path: '/values-views', label: 'Values & Views' },
    { path: '/your-support', label: 'Your Support' },
    { path: '/satisfaction', label: 'Satisfaction' },
  ];

  return (
    <nav style={{
      background: COLORS.primary,
      padding: '16px 32px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      flexWrap: 'wrap',
    }}>
      <div style={{
        color: 'white',
        fontSize: '18px',
        fontWeight: 700,
        marginRight: '32px',
      }}>
        AA Survey Dashboard
      </div>
      {navItems.map(item => (
        <NavLink
          key={item.path}
          to={item.path}
          style={({ isActive }) => ({
            textDecoration: 'none',
            padding: '12px 20px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 500,
            transition: 'all 0.2s ease',
            background: isActive ? 'rgba(255,255,255,0.2)' : 'transparent',
            color: isActive ? 'white' : 'rgba(255,255,255,0.8)',
          })}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', background: COLORS.background }}>
        <Navigation />
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/about-you" element={<AboutYouSection />} />
          <Route path="/values-views" element={<ValuesViewsSection />} />
          <Route path="/your-support" element={<YourSupportSection />} />
          <Route path="/satisfaction" element={<YourSatisfaction />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
