import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Color palette - nature/animal welfare inspired (consistent with About You section)
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
  background: '#F8FAF9',
  cardBg: '#FFFFFF',
  text: '#1E293B',
  textMuted: '#64748B',
};

const CHART_COLORS = [
  '#2D5A47', '#3D6B56', '#4A7C6F', '#5A8D7E', '#6B9E8C',
  '#7CAF9B', '#8FBFAB', '#A1CFBA', '#B3D9C9', '#C5E4D8'
];

// Q4 Data - Causes for donation (sorted by count descending)
const q4Data = [
  { label: 'Exposing factory farming cruelty', fullLabel: 'Exposing and sparing animals from the cruelty of factory farming', count: 3507, pct: 68.5 },
  { label: 'Ending live animal export', fullLabel: 'Ending all live animal export', count: 3026, pct: 59.1 },
  { label: 'Exposing slaughterhouse cruelty', fullLabel: 'Exposing slaughterhouse cruelty', count: 2241, pct: 43.8 },
  { label: "Animals in 'entertainment'", fullLabel: "Uncovering the suffering of animals used for 'entertainment'", count: 1602, pct: 31.3 },
  { label: 'Protecting Australian wildlife', fullLabel: 'Protecting Australian wildlife, including ending kangaroo and duck shooting', count: 1334, pct: 26.1 },
  { label: 'Reducing food system suffering', fullLabel: 'Reducing the number of animals suffering in our food system', count: 949, pct: 18.5 },
  { label: 'Exposing dairy industry cruelty', fullLabel: 'Exposing cruelty in the dairy industry', count: 923, pct: 18.0 },
  { label: 'Strategic legal actions', fullLabel: 'Defending animals in the courts through strategic legal actions', count: 910, pct: 17.8 },
  { label: 'Emergency disaster grants', fullLabel: 'Providing emergency grants to help animals in times of disaster', count: 649, pct: 12.7 },
  { label: 'Fish farm cruelty', fullLabel: 'Exposing and ending cruelty on industrial fish farms, such as salmon farms', count: 242, pct: 4.7 },
];

// Q5 Data - What inspires you to support AA (sorted by count descending)
const q5Data = [
  { label: 'Achieving results', fullLabel: 'They are committed to achieving results for animals', count: 3375, pct: 65.9 },
  { label: 'Courage', fullLabel: 'They show courage, and bear witness where others will not go', count: 3363, pct: 65.7 },
  { label: 'Inspire me', fullLabel: 'They inspire me with their vision, and give me hope a kinder world is possible', count: 2136, pct: 41.7 },
  { label: 'Global impact', fullLabel: 'They have global impact, helping animals both here in Australia, and worldwide', count: 1542, pct: 30.1 },
  { label: 'Step up', fullLabel: 'They are always the first to step up when animals need help', count: 1335, pct: 26.1 },
  { label: 'Offer hope', fullLabel: 'They offer hope by transforming the food system and healing the animal-human relationship', count: 1243, pct: 24.3 },
  { label: 'Innovative', fullLabel: 'They use innovative approaches, addressing the root causes of animal suffering', count: 1218, pct: 23.8 },
];

// Section Header Component
const SectionHeader = ({ question, title, respondents, subtitle }) => (
  <div style={{ marginBottom: '20px' }}>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '4px' }}>
      <span style={{
        background: COLORS.primary,
        color: 'white',
        padding: '4px 10px',
        borderRadius: '4px',
        fontSize: '13px',
        fontWeight: '600',
      }}>
        {question}
      </span>
      <h3 style={{ margin: 0, fontSize: '18px', color: COLORS.text, fontWeight: '600' }}>
        {title}
      </h3>
    </div>
    {subtitle && (
      <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: COLORS.textMuted, fontStyle: 'italic' }}>
        {subtitle}
      </p>
    )}
    <p style={{ margin: '8px 0 0 0', fontSize: '13px', color: COLORS.textMuted }}>
      {respondents.toLocaleString()} respondents
    </p>
  </div>
);

// Custom Tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{
        background: 'white',
        border: '1px solid ' + COLORS.quinary,
        borderRadius: '8px',
        padding: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        maxWidth: '300px',
      }}>
        <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: COLORS.text, fontWeight: '500' }}>
          {data.fullLabel || data.label}
        </p>
        <p style={{ margin: 0, fontSize: '14px', color: COLORS.primary, fontWeight: '600' }}>
          {data.count.toLocaleString()} selections ({data.pct}%)
        </p>
      </div>
    );
  }
  return null;
};

// Horizontal Bar Chart Component
const HorizontalBarChart = ({ data, maxValue, height }) => {
  const chartHeight = height || 400;
  return (
    <ResponsiveContainer width="100%" height={chartHeight}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 60, left: 10, bottom: 5 }}
      >
        <XAxis type="number" domain={[0, maxValue]} hide />
        <YAxis
          type="category"
          dataKey="label"
          width={200}
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
};

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

// Main Component
const ValuesViewsSection = () => {
  return (
    <div style={{
      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      background: COLORS.background,
      minHeight: '100vh',
      padding: '32px',
    }}>
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
          Your Values and Views
        </h2>
        <p style={{ margin: 0, fontSize: '15px', color: COLORS.textMuted }}>
          Understanding what matters most to Animals Australia supporters
        </p>
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}>
        <div style={{
          background: COLORS.cardBg,
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          border: '1px solid ' + COLORS.quinary,
        }}>
          <SectionHeader
            question="Q4"
            title="Select 3 causes you would consider making a donation towards"
            subtitle="Respondents could select up to 3 options"
            respondents={5024}
          />

          <div style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '24px',
            flexWrap: 'wrap',
          }}>
            <StatCard value="68.5%" label="Factory farming" colorType="primary" />
            <StatCard value="59.1%" label="Live export" colorType="secondary" />
            <StatCard value="43.8%" label="Slaughterhouse cruelty" colorType="accent" />
          </div>

          <HorizontalBarChart data={q4Data} maxValue={3800} height={420} />

          <div style={{
            fontSize: '13px',
            color: COLORS.textMuted,
            marginTop: '16px',
            padding: '12px',
            background: COLORS.background,
            borderRadius: '8px',
            borderLeft: '3px solid ' + COLORS.accent,
          }}>
            <strong style={{ color: COLORS.primary }}>Key insights:</strong>
            
            <p style={{ margin: '12px 0 0 0' }}>
              Factory farming (68.5%), live export (59.1%), and slaughterhouse cruelty (43.8%) are the clear top 3 priorities - these high-profile cruelty issues with strong public awareness dominate supporter interest.
            </p>
            
            <p style={{ margin: '12px 0 0 0' }}>
              Fish farm cruelty ranked last at just 4.7%, suggesting a potential awareness gap or lower perceived urgency around aquaculture welfare.
            </p>
            
            <p style={{ margin: '12px 0 0 0' }}>
              The mid-tier causes (food system, dairy, legal actions) cluster tightly around 18%, indicating similar levels of interest.
            </p>
          </div>
        </div>

        {/* Q5 - What Inspires You */}
        <div style={{
          background: COLORS.cardBg,
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          border: '1px solid ' + COLORS.quinary,
        }}>
          <SectionHeader
            question="Q5"
            title="What inspires you to support Animals Australia?"
            subtitle="Respondents could select up to 3 options"
            respondents={5021}
          />

          <div style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '24px',
            flexWrap: 'wrap',
          }}>
            <StatCard value="65.9%" label="Achieving results" colorType="primary" />
            <StatCard value="65.7%" label="Courage" colorType="secondary" />
            <StatCard value="41.7%" label="Inspire me" colorType="accent" />
          </div>

          <HorizontalBarChart data={q5Data} maxValue={3600} height={300} />

          <div style={{
            fontSize: '13px',
            color: COLORS.textMuted,
            marginTop: '16px',
            padding: '12px',
            background: COLORS.background,
            borderRadius: '8px',
            borderLeft: '3px solid ' + COLORS.accent,
          }}>
            <strong style={{ color: COLORS.primary }}>Key insights:</strong>
            
            <p style={{ margin: '12px 0 0 0' }}>
              Achieving results (65.9%) and Courage (65.7%) are virtually tied as the top inspirations - supporters value both tangible outcomes AND the willingness to confront difficult realities.
            </p>
            
            <p style={{ margin: '12px 0 0 0' }}>
              Inspire me (41.7%) ranks third, showing the emotional appeal of vision and hope for a kinder world resonates strongly with supporters.
            </p>
            
            <p style={{ margin: '12px 0 0 0' }}>
              The bottom four options (Global impact, Step up, Offer hope, Innovative) cluster between 23-30%, suggesting these are secondary motivators rather than primary drivers.
            </p>
          </div>
        </div>

        <div style={{
          background: COLORS.cardBg,
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          border: '1px solid ' + COLORS.quinary,
          opacity: 0.5,
        }}>
          <p style={{ margin: 0, fontSize: '14px', color: COLORS.textMuted, textAlign: 'center' }}>
            Q6-Q9 sections will be added here...
          </p>
        </div>
      </div>
    </div>
  );
};

export default ValuesViewsSection;
