import React, { useState } from 'react';
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

// Q6 Data - How AA inspired changes (sorted by count descending)
const q6Data = [
  { label: 'Expanded understanding', fullLabel: 'Expanded my understanding of the issues impacting animals', count: 3335, pct: 65.1 },
  { label: 'Hopeful for animals', fullLabel: 'Made me feel more hopeful about the future for animals', count: 2779, pct: 54.3 },
  { label: 'Individual actions matter', fullLabel: 'Given me hope that my individual actions can lead to meaningful change', count: 2720, pct: 53.1 },
  { label: 'Dietary choices', fullLabel: 'Influenced my dietary choices (towards eating more or all animal-friendly foods)', count: 2615, pct: 51.1 },
  { label: 'Do my bit', fullLabel: 'Inspired me to do my bit to make the world a kinder place', count: 2487, pct: 48.6 },
  { label: 'Shopping habits', fullLabel: 'Influenced my shopping habits beyond eating more animal-friendly foods', count: 2343, pct: 45.8 },
  { label: 'Inspire others', fullLabel: 'Helped me inspire friends or family to make choices that are kinder for animals', count: 1792, pct: 35.0 },
  { label: 'Reflect on impact', fullLabel: 'Made me reflect on the kind of impact I want to have in the world', count: 1780, pct: 34.8 },
  { label: 'Think differently', fullLabel: 'Inspired me to think differently about animals and how we treat them', count: 1377, pct: 26.9 },
  { label: 'Other', fullLabel: 'Other', count: 330, pct: 6.4 },
];

// Q6 Other breakdown data
const q6OtherData = [
  { label: 'Already vegan/vegetarian before AA', count: 52 },
  { label: 'All of the above / wanted more options', count: 36 },
  { label: 'Trust/credibility/professionalism', count: 24 },
  { label: 'Political/legal advocacy', count: 14 },
  { label: 'Live export focus', count: 13 },
  { label: 'Inspired personal advocacy', count: 12 },
  { label: 'Reasonable/non-militant approach', count: 9 },
  { label: 'Other minor responses', count: 170 },
];

// Section Header Component
const SectionHeader = ({ question, title, respondents, subtitle }) => (
  <div style={{ marginBottom: '20px' }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '4px',
    }}>
      <span style={{
        background: COLORS.primary,
        color: 'white',
        padding: '4px 10px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 600,
      }}>
        {question}
      </span>
      <span style={{
        fontSize: '13px',
        color: COLORS.textMuted,
      }}>
        {respondents.toLocaleString()} respondents
      </span>
    </div>
    <h3 style={{
      fontSize: '18px',
      fontWeight: 600,
      color: COLORS.text,
      margin: 0,
    }}>
      {title}
    </h3>
    {subtitle && (
      <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: COLORS.textMuted, fontStyle: 'italic' }}>
        {subtitle}
      </p>
    )}
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
  const [showQ6Other, setShowQ6Other] = useState(false);

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

        {/* Q6 - How AA Inspired Changes */}
        <div style={{
          background: COLORS.cardBg,
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          border: '1px solid ' + COLORS.quinary,
        }}>
          <SectionHeader
            question="Q6"
            title="How have the efforts of AA inspired you to make changes towards helping animals?"
            subtitle="Respondents could select any that apply"
            respondents={5050}
          />

          <div style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '24px',
            flexWrap: 'wrap',
          }}>
            <StatCard value="65.1%" label="Expanded understanding" colorType="primary" />
            <StatCard value="54.3%" label="Hopeful for animals" colorType="secondary" />
            <StatCard value="51.1%" label="Dietary choices" colorType="accent" />
          </div>

          <HorizontalBarChart data={q6Data} maxValue={3500} height={420} />

          {/* Other Breakdown Toggle */}
          <div style={{ marginTop: '16px' }}>
            <button
              onClick={() => setShowQ6Other(!showQ6Other)}
              style={{
                padding: '8px 16px',
                background: 'transparent',
                border: '1px solid ' + COLORS.tertiary,
                borderRadius: '6px',
                fontSize: '13px',
                color: COLORS.secondary,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {showQ6Other ? '▼' : '▶'} "Other" Breakdown (330 total)
            </button>
            
            {showQ6Other && (
              <div style={{
                marginTop: '12px',
                padding: '16px',
                background: COLORS.background,
                borderRadius: '8px',
              }}>
                {q6OtherData.map((item, index) => (
                  <div key={item.label} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '6px 0',
                    borderBottom: index < q6OtherData.length - 1 ? '1px solid ' + COLORS.quinary : 'none',
                  }}>
                    <span style={{ fontSize: '13px', color: COLORS.text }}>{item.label}</span>
                    <span style={{ fontSize: '13px', color: COLORS.textMuted }}>{item.count}</span>
                  </div>
                ))}
                <p style={{
                  fontSize: '13px',
                  color: COLORS.textMuted,
                  margin: '12px 0 0',
                  padding: '12px',
                  background: COLORS.cardBg,
                  borderRadius: '8px',
                }}>
                  <strong style={{ color: COLORS.primary }}>Insight:</strong> The largest "Other" group (52) were already vegan/vegetarian before discovering AA - they support AA because it aligns with existing values, not because AA changed them. Additionally, 36 respondents expressed frustration with the option limit, indicating high engagement across all choices.
                </p>
              </div>
            )}
          </div>

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
              Expanded understanding (65.1%) tops the list - AA's primary impact is raising awareness and education about animal issues.
            </p>
            
            <p style={{ margin: '12px 0 0 0' }}>
              Hope is powerful: Two "hope" statements rank 2nd and 3rd (54.3% and 53.1%) - the emotional and motivational impact of AA's work resonates strongly.
            </p>
            
            <p style={{ margin: '12px 0 0 0' }}>
              Tangible behaviour change: Over half have changed dietary choices (51.1%) and nearly half have changed shopping habits (45.8%) - demonstrating real-world impact beyond awareness.
            </p>
            
            <p style={{ margin: '12px 0 0 0' }}>
              Social influence is harder: "Inspiring friends/family" ranks lower at 35% - personal change is more common than advocacy to others.
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
            Q7-Q9 sections will be added here...
          </p>
        </div>
      </div>
    </div>
  );
};

export default ValuesViewsSection;
