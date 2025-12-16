import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Color palette - updated branding
const COLORS = {
  primary: '#2D5A47',
  secondary: '#4A7C6F',
  tertiary: '#6B9E8C',
  quaternary: '#8FBFAB',
  quinary: '#B3D9C9',
  accent: '#E8724A',
  accentLight: '#F4A382',
  neutral: '#64748B',
  neutralLight: '#94A3B8',
  background: '#f8f3e8',
  cardBg: '#FFFFFF',
  text: '#1E293B',
  textMuted: '#64748B',
};

const CHART_COLORS = [
  '#2D5A47', '#3D6B56', '#4A7C6F', '#5A8D7E', '#6B9E8C',
  '#7CAF9B', '#8FBFAB', '#A1CFBA', '#B3D9C9', '#C5E4D8'
];

// Q14 Data - Donation effectiveness agreement (sorted by count descending)
// Valid respondents: 4,378 (excludes 44 invalid multi-select, 124 no response, and 573 N/A)
const q14Data = [
  { label: 'Strongly Agree', fullLabel: 'Strongly Agree', count: 2694, pct: 61.5 },
  { label: 'Agree', fullLabel: 'Agree', count: 1449, pct: 33.1 },
  { label: 'Neutral', fullLabel: 'Neutral', count: 183, pct: 4.2 },
  { label: 'Strongly Disagree', fullLabel: 'Strongly Disagree', count: 39, pct: 0.9 },
  { label: 'Disagree', fullLabel: 'Disagree', count: 13, pct: 0.3 },
];

// Section Header Component
const SectionHeader = ({ question, title, subtitle, respondents }) => (
  <div style={{ marginBottom: '16px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
      <span style={{
        background: COLORS.primary,
        color: 'white',
        padding: '4px 10px',
        borderRadius: '6px',
        fontSize: '13px',
        fontWeight: '600',
      }}>
        {question}
      </span>
      {respondents && (
        <span style={{
          fontSize: '13px',
          color: COLORS.textMuted,
        }}>
          {respondents.toLocaleString()} respondents
        </span>
      )}
    </div>
    <h3 style={{
      margin: 0,
      fontSize: '18px',
      fontWeight: '600',
      color: COLORS.text,
    }}>
      {title}
    </h3>
    {subtitle && (
      <p style={{
        margin: '4px 0 0',
        fontSize: '14px',
        color: COLORS.textMuted,
        fontStyle: 'italic',
      }}>
        {subtitle}
      </p>
    )}
  </div>
);

// Stat Card Component - with distinct colours for accessibility
const StatCard = ({ value, label, colorType }) => {
  const colorMap = {
    primary: '#2D5A47',
    secondary: '#1E7B8C',
    accent: '#E8724A',
  };
  const bgColor = colorMap[colorType] || colorMap.primary;

  return (
    <div style={{
      background: bgColor,
      color: 'white',
      padding: '16px 20px',
      borderRadius: '10px',
      textAlign: 'center',
      minWidth: '140px',
    }}>
      <div style={{ fontSize: '28px', fontWeight: '700' }}>{value}</div>
      <div style={{ fontSize: '12px', opacity: 0.9, marginTop: '4px' }}>{label}</div>
    </div>
  );
};

// Custom Tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{
        background: 'white',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        maxWidth: '300px',
      }}>
        <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: COLORS.text, fontWeight: '500' }}>
          {data.fullLabel || data.label}
        </p>
        <p style={{ margin: 0, fontSize: '14px', color: COLORS.primary, fontWeight: '600' }}>
          {data.count.toLocaleString()} respondents ({data.pct}%)
        </p>
      </div>
    );
  }
  return null;
};

// Horizontal Bar Chart Component
const HorizontalBarChart = ({ data, maxValue, height = 400 }) => (
  <ResponsiveContainer width="100%" height={height}>
    <BarChart
      data={data}
      layout="vertical"
      margin={{ top: 5, right: 60, left: 10, bottom: 5 }}
    >
      <XAxis type="number" domain={[0, maxValue]} hide />
      <YAxis
        type="category"
        dataKey="label"
        width={140}
        tick={{ fontSize: 13, fill: COLORS.text }}
        axisLine={false}
        tickLine={false}
      />
      <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
      <Bar dataKey="count" radius={[0, 4, 4, 0]}>
        {data.map((entry, index) => (
          <Cell key={'cell-' + index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

// Key Insight Component
const KeyInsight = ({ children }) => (
  <div style={{
    fontSize: '13px',
    color: COLORS.textMuted,
    marginTop: '16px',
    padding: '12px',
    background: COLORS.background,
    borderRadius: '8px',
    borderLeft: '3px solid ' + COLORS.accent,
  }}>
    <span style={{ color: COLORS.primary }}>Key Insights:</span>
    <div style={{ marginTop: '8px', lineHeight: '1.6' }}>{children}</div>
  </div>
);

// Main Component
const YourSatisfactionSection = () => {
  return (
    <div style={{
      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      background: COLORS.background,
      minHeight: '100vh',
      padding: '32px',
    }}>
      {/* Section Header */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto 32px',
      }}>
        <h2 style={{
          margin: '0 0 8px 0',
          fontSize: '28px',
          fontWeight: '700',
          color: COLORS.primary,
        }}>
          Your Satisfaction
        </h2>
        <p style={{
          margin: 0,
          fontSize: '15px',
          color: COLORS.textMuted,
        }}>
          Donor satisfaction and perceptions of organisational effectiveness
        </p>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}>

        {/* Q14 - Donation Effectiveness */}
        <div style={{
          background: COLORS.cardBg,
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          border: '1px solid ' + COLORS.quinary,
        }}>
          <SectionHeader
            question="Q14"
            title="Do you agree that donations are used effectively and make a real difference?"
            subtitle="Donors only, single select"
            respondents={4378}
          />

          {/* Top 3 Stat Cards */}
          <div style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '24px',
            flexWrap: 'wrap',
          }}>
            <StatCard
              value="2,694"
              label="Strongly Agree (61.5%)"
              colorType="primary"
            />
            <StatCard
              value="1,449"
              label="Agree (33.1%)"
              colorType="secondary"
            />
            <StatCard
              value="183"
              label="Neutral (4.2%)"
              colorType="accent"
            />
          </div>

          {/* Bar Chart */}
          <HorizontalBarChart
            data={q14Data}
            maxValue={3000}
            height={220}
          />

          {/* Key Insights */}
          <KeyInsight>
            <p style={{ margin: '0 0 12px 0' }}>
              94.6% of donors (4,143 of 4,378) agree or strongly agree that their donations are used effectively — an exceptionally strong vote of confidence in the organisation's stewardship.
            </p>
            <p style={{ margin: '0 0 12px 0' }}>
              Only 1.2% expressed disagreement (52 respondents), indicating minimal concerns about donation effectiveness among active donors.
            </p>
            <p style={{ margin: 0 }}>
              The 4.2% neutral responses (183) may represent newer donors still forming opinions or those seeking more transparency about impact reporting.
            </p>
          </KeyInsight>
        </div>

        {/* Placeholder for Q15-Q18 */}

      </div>
    </div>
  );
};

export default YourSatisfactionSection;
