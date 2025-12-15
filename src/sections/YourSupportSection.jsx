import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Color palette - nature/animal welfare inspired (matching other sections)
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
  '#7CAF9B', '#8FBFAB', '#A1CFBA', '#B3D9C9', '#C5E4D8',
  '#7C9A8E', '#A3C4B5', '#5D8A7D', '#9DB5AC'
];

// Q10 Data - Engagement Methods (sorted by count)
const q10Data = [
  { label: 'Subscribed to emails', fullLabel: "I'm subscribed to read emails", count: 3948, pct: 77.1 },
  { label: 'Sign petitions/actions', fullLabel: 'I take actions and sign petitions lobbying decision-makers', count: 3487, pct: 68.1 },
  { label: 'Donate to appeals', fullLabel: 'I donate to fundraising appeals', count: 2590, pct: 50.6 },
  { label: 'Read postal publications', fullLabel: 'I read postal publications, such as the Supporter Update', count: 2212, pct: 43.2 },
  { label: 'Social media updates', fullLabel: 'I keep up to date via social media', count: 1383, pct: 27.0 },
  { label: 'Visit AA website', fullLabel: 'I visit the Animals Australia website', count: 1251, pct: 24.4 },
  { label: 'Share social content', fullLabel: 'I share social media content', count: 992, pct: 19.4 },
  { label: 'Pledges & resources', fullLabel: 'I take pledges and order supportive resources', count: 831, pct: 16.2 },
  { label: 'Purchase merchandise', fullLabel: 'I purchase merchandise', count: 797, pct: 15.6 },
  { label: 'Watch YouTube videos', fullLabel: 'I watch YouTube videos', count: 378, pct: 7.4 },
  { label: 'Membership portal', fullLabel: 'I access the My Animals Australia membership portal', count: 372, pct: 7.3 },
  { label: 'Other', fullLabel: 'Other (free-text responses)', count: 234, pct: 4.6 },
  { label: 'Phone support team', fullLabel: 'I contact the Supporter Services team via phone', count: 93, pct: 1.8 },
  { label: 'Hold fundraisers', fullLabel: 'I hold fundraisers', count: 19, pct: 0.4 },
];

// Q10 "Other" breakdown - categorised from 234 free-text responses
// Note: 148 responses (63%) duplicated existing options or were general statements
const q10OtherData = [
  { label: 'Prefer to avoid distressing content', count: 21 },
  { label: 'Word of mouth & personal advocacy', count: 18 },
  { label: 'Bequest/legacy giving', count: 16 },
  { label: 'Direct political action (MPs, letters)', count: 12 },
  { label: 'Wildlife rescue/volunteering', count: 6 },
  { label: 'Feedback/suggestions', count: 5 },
  { label: 'Other minor responses', count: 8 },
];

// Q11 Data - Monthly donor consideration (sorted by count)
const q11Data = [
  { label: 'Already a monthly donor', fullLabel: "I'm already a proud monthly donor", count: 2000, pct: 39.1 },
  { label: 'Prefer one-off gifts', fullLabel: 'I currently prefer to give one-off gifts', count: 1888, pct: 36.9 },
  { label: 'Not right now', fullLabel: 'Not right now', count: 1060, pct: 20.7 },
  { label: 'Yes, would like to help', fullLabel: "Yes, I'd like to help animals all year round", count: 97, pct: 1.9 },
  { label: 'Want more info first', fullLabel: 'I would like some more information first', count: 69, pct: 1.3 },
];

// Section Header Component (matching AboutYouSection format)
const SectionHeader = ({ question, title, subtitle, respondents }) => (
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
          {data.count.toLocaleString()} selections ({data.pct}%)
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
        width={180}
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

// Main Component
const YourSupportSection = () => {
  const [showQ10Other, setShowQ10Other] = useState(false);

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
          Your Support
        </h2>
        <p style={{
          margin: 0,
          fontSize: '15px',
          color: COLORS.textMuted,
        }}>
          How supporters engage with and contribute to Animals Australia
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

        {/* Q10 - Engagement Methods */}
        <div style={{
          background: COLORS.cardBg,
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          border: '1px solid ' + COLORS.quinary,
        }}>
          <SectionHeader
            question="Q10"
            title="How do you like to keep updated and engaged with AA's work?"
            subtitle="Select all that apply"
            respondents={5027}
          />

          {/* Top 3 Stat Cards */}
          <div style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '24px',
            flexWrap: 'wrap',
          }}>
            <StatCard value="77.1%" label="Subscribed to emails" colorType="primary" />
            <StatCard value="68.1%" label="Sign petitions & actions" colorType="secondary" />
            <StatCard value="50.6%" label="Donate to appeals" colorType="accent" />
          </div>

          {/* Bar Chart */}
          <HorizontalBarChart data={q10Data} maxValue={4200} height={520} />

          {/* Other Breakdown Toggle */}
          <div style={{ marginTop: '16px' }}>
            <button
              onClick={() => setShowQ10Other(!showQ10Other)}
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
              {showQ10Other ? '▼' : '▶'} "Other" Breakdown (234 total)
            </button>
            
            {showQ10Other && (
              <div style={{
                marginTop: '12px',
                padding: '16px',
                background: COLORS.background,
                borderRadius: '8px',
              }}>
                {q10OtherData.map((item, index) => (
                  <div key={item.label} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '6px 0',
                    borderBottom: index < q10OtherData.length - 1 ? '1px solid ' + COLORS.quinary : 'none',
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
                  <strong style={{ color: COLORS.primary }}>Insight:</strong> 63% of responses (148) duplicated existing options or were general statements, suggesting the survey options were comprehensive but perhaps unclear. Key unique themes: many supporters actively avoid distressing content due to emotional impact (21), engage in personal word-of-mouth advocacy (18), and have included AA in their wills (16). Bequest/legacy giving represents a notable gap — it's clearly important to supporters but isn't captured as a formal engagement option.
                </p>
              </div>
            )}
          </div>

          {/* Key Insights */}
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
              Email dominates engagement — over three-quarters (77.1%) of supporters stay connected through email subscriptions, making it the single most important communication channel. This aligns with the older demographic profile and suggests email campaigns remain highly effective.
            </p>
            
            <p style={{ margin: '12px 0 0 0' }}>
              Active advocacy is strong — 68.1% take actions and sign petitions, demonstrating that AA supporters are not passive donors but engaged advocates willing to lobby decision-makers. Combined with the 50.6% who donate to appeals, this shows a highly committed supporter base.
            </p>
            
            <p style={{ margin: '12px 0 0 0' }}>
              Traditional channels remain relevant — postal publications reach 43.2% of supporters, reinforcing that print communications still matter for this demographic despite digital alternatives.
            </p>
            
            <p style={{ margin: '12px 0 0 0' }}>
              Untapped potential in digital/community — membership portal (7.3%), YouTube (7.4%), and fundraising (0.4%) show low engagement, suggesting opportunities to grow these channels or reconsider their prominence.
            </p>
          </div>
        </div>

        {/* Q11 - Monthly Donor Consideration */}
        <div style={{
          background: COLORS.cardBg,
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          border: '1px solid ' + COLORS.quinary,
        }}>
          <SectionHeader
            question="Q11"
            title="Would you consider becoming a monthly donor to help support future AA work?"
            subtitle="Select one"
            respondents={5114}
          />

          {/* Top 3 Stat Cards */}
          <div style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '24px',
            flexWrap: 'wrap',
          }}>
            <StatCard value="39.1%" label="Already monthly donors" colorType="primary" />
            <StatCard value="36.9%" label="Prefer one-off gifts" colorType="secondary" />
            <StatCard value="20.7%" label="Not right now" colorType="accent" />
          </div>

          {/* Bar Chart */}
          <HorizontalBarChart data={q11Data} maxValue={2200} height={220} />

          {/* Key Insights */}
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
              Strong existing monthly donor base — 39.1% are already proud monthly donors, indicating AA has successfully converted a significant portion of supporters to recurring giving.
            </p>
            
            <p style={{ margin: '12px 0 0 0' }}>
              One-off giving preference is substantial — 36.9% prefer one-off gifts, suggesting many supporters value flexibility in their giving or may be on fixed incomes (consistent with the older demographic).
            </p>
            
            <p style={{ margin: '12px 0 0 0' }}>
              Conversion opportunity is modest — only 3.2% combined are open to becoming monthly donors (1.9% ready, 1.3% want more info). The 20.7% saying "not right now" may represent future potential with the right timing or approach.
            </p>
            
            <p style={{ margin: '12px 0 0 0' }}>
              Combined giving commitment is high — 76% are either already monthly donors (39.1%) or prefer one-off giving (36.9%), demonstrating strong overall financial support regardless of frequency preference.
            </p>
          </div>
        </div>

        {/* Placeholder for Q12-Q13 */}
        <div style={{
          background: COLORS.cardBg,
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          border: '1px solid ' + COLORS.quinary,
          opacity: 0.5,
        }}>
          <p style={{ margin: 0, fontSize: '14px', color: COLORS.textMuted, textAlign: 'center' }}>
            Q12-Q13 sections will be added here...
          </p>
        </div>
      </div>
    </div>
  );
};

export default YourSupportSection;
