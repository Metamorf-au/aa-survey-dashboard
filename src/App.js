import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import AboutYouSection from './sections/AboutYouSection';
import ValuesViewsSection from './sections/ValuesViewsSection';
import YourSupportSection from './sections/YourSupportSection';
import YourSatisfactionSection from './sections/YourSatisfactionSection';
import OverviewSection from './sections/OverviewSection';
import ScrollToTopBottom from './components/ScrollToTopBottom';
import AALogo from './components/AALogo';

// Updated color palette
const COLORS = {
  primary: '#2D5A47',
  navBackground: '#f1823d',      // New orange navigation background
  navText: '#ffffff',            // White text
  navHighlight: '#5c5c5c',       // Grey highlight color
  background: '#f8f3e8',         // New warm cream background
  cardBg: '#FFFFFF',
  text: '#1E293B',
  textMuted: '#64748B',
  quinary: '#B3D9C9',
};

// Download Icon Component
const DownloadIcon = () => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    style={{ marginRight: '6px' }}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

// Navigation component with new styling
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
      background: COLORS.navBackground,
      padding: '12px 32px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      flexWrap: 'wrap',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    }}>
      {/* Logo replacing "AA Survey Dashboard" text */}
      <div style={{
        marginRight: '32px',
        display: 'flex',
        alignItems: 'center',
      }}>
        <AALogo height={44} />
      </div>
      
      {/* Navigation links */}
      {navItems.map(item => (
        <NavLink
          key={item.path}
          to={item.path}
          style={({ isActive }) => ({
            textDecoration: 'none',
            padding: '10px 18px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 500,
            transition: 'all 0.2s ease',
            background: isActive ? COLORS.navHighlight : 'transparent',
            color: COLORS.navText,
          })}
        >
          {item.label}
        </NavLink>
      ))}
      
      {/* Spacer to push download button to the right */}
      <div style={{ flex: 1 }} />
      
      {/* Download PDF Button */}
      <a
        href="/AA_Survey_Report_2025.pdf"
        download="AA_Survey_Report_2025.pdf"
        style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          padding: '10px 18px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: 500,
          background: 'rgba(255,255,255,0.15)',
          color: COLORS.navText,
          border: '1px solid rgba(255,255,255,0.3)',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
        }}
      >
        <DownloadIcon />
        Download PDF
      </a>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', background: COLORS.background }}>
        <Navigation />
        <Routes>
          <Route path="/" element={<OverviewSection />} />
          <Route path="/about-you" element={<AboutYouSection />} />
          <Route path="/values-views" element={<ValuesViewsSection />} />
          <Route path="/your-support" element={<YourSupportSection />} />
          <Route path="/satisfaction" element={<YourSatisfactionSection />} />
        </Routes>
        {/* Floating scroll arrows */}
        <ScrollToTopBottom />
      </div>
    </Router>
  );
}

export default App;
