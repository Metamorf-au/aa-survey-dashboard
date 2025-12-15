// Shared color palette for the entire dashboard
// All sections should import from here to ensure consistency

export const COLORS = {
  // Primary brand colors
  primary: '#2D5A47',       // Dark green - main brand color
  secondary: '#1E7B8C',     // Teal - secondary accent (color-blind friendly)
  accent: '#E8724A',        // Orange - accent color
  
  // Navigation colors
  navBackground: '#f1823d', // Orange navigation background
  navText: '#ffffff',       // White navigation text
  navHighlight: '#5c5c5c',  // Grey highlight for active nav
  
  // Background colors
  background: '#f8f3e8',    // Warm cream page background
  cardBg: '#FFFFFF',        // White card background
  
  // Text colors
  text: '#1E293B',          // Dark text
  textMuted: '#64748B',     // Muted/secondary text
  
  // Accent variations
  tertiary: '#6B9E8C',
  quaternary: '#8FBFAB',
  quinary: '#B3D9C9',
  accentLight: '#F4A382',
  neutral: '#64748B',
  neutralLight: '#94A3B8',
};

// Chart colors array for consistent data visualization
export const CHART_COLORS = [
  '#2D5A47', '#4A7C6F', '#6B9E8C', '#8FBFAB', '#B3D9C9',
  '#E8724A', '#F4A382', '#64748B', '#94A3B8', '#CBD5E1'
];

// Stat card colors (color-blind friendly trio)
export const STAT_CARD_COLORS = {
  first: '#2D5A47',   // Dark green
  second: '#1E7B8C',  // Teal
  third: '#E8724A',   // Orange
};

export default COLORS;
