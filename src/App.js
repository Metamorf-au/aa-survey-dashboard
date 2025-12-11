import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import AboutYouSection from './sections/AboutYouSection';
import ValuesViewsSection from './sections/ValuesViewsSection';

const COLORS = {
  primary: '#2D5A47',
  background: '#F8FAF9',
};

// Placeholder components for sections not yet built
const Overview = () => (
  <div style={{ padding: '32px', textAlign: 'center', color: '#64748B' }}>
    <h2>Overview</h2>
    <p>Executive summary coming soon...</p>
  </div>
);

const YourSupport = () => (
  <div style={{ padding: '32px', textAlign: 'center', color: '#64748B' }}>
    <h2>Your Support (Q10-13)</h2>
    <p>Coming soon...</p>
  </div>
);

const YourSatisfaction = () => (
  <div style={{ padding: '32px', textAlign: 'center', color: '#64748B' }}>
    <h2>Your Satisfaction (Q14-18)</h2>
    <p>Coming soon...</p>
  </div>
);

const navItems = [
  { path: '/', label: 'Overview' },
  { path: '/about-you', label: 'About You' },
  { path: '/values-views', label: 'Values & Views' },
  { path: '/your-support', label: 'Your Support' },
  { path: '/satisfaction', label: 'Satisfaction' },
];

const Navigation = () => {
  return (
    <nav style={{
      background: COLORS.primary,
      padding: '0 32px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      height: '56px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <span style={{
        color: 'white',
        fontWeight: 700,
        fontSize: '16px',
        marginRight: '32px',
      }}>
        AA Survey Dashboard
      </span>
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          style={({ isActive }) => ({
            color: isActive ? 'white' : 'rgba(255,255,255,0.7)',
            textDecoration: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: 500,
            background: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
            transition: 'all 0.2s',
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
          <Route path="/your-support" element={<YourSupport />} />
          <Route path="/satisfaction" element={<YourSatisfaction />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
