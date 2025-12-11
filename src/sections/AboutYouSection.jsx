import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';

// Color palette - nature/animal welfare inspired
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
  '#2D5A47', '#4A7C6F', '#6B9E8C', '#8FBFAB', '#B3D9C9',
  '#E8724A', '#F4A382', '#64748B', '#94A3B8', '#CBD5E1'
];

// Q1 Data - Age Demographics
const ageData = [
  { label: 'Up to 18', count: 2, pct: 0.0 },
  { label: '19-35', count: 128, pct: 3.1 },
  { label: '36-55', count: 927, pct: 22.4 },
  { label: '56-75', count: 2365, pct: 57.1 },
  { label: 'Over 75', count: 718, pct: 17.3 },
];

// Q2 Data - Discovery Channels
const discoveryData = [
  { label: "Don't remember", count: 1690, pct: 33.0 },
  { label: 'TV/News/Media', count: 1599, pct: 31.2 },
  { label: 'Social media', count: 989, pct: 19.3, hasBreakdown: true },
  { label: 'Friend or family', count: 509, pct: 9.9 },
  { label: 'AA Website', count: 388, pct: 7.6 },
  { label: 'Email from AA', count: 353, pct: 6.9 },
  { label: 'Online search', count: 294, pct: 5.7 },
  { label: 'Postal mail', count: 280, pct: 5.5 },
  { label: 'Outdoor ads', count: 263, pct: 5.1 },
  { label: 'Online ad', count: 237, pct: 4.6 },
  { label: 'Other', count: 195, pct: 3.8 },
  { label: 'VegKit', count: 131, pct: 2.6 },
];

const otherDiscoveryData = [
  { label: 'Other Animal Organisations', count: 25 },
  { label: 'Event/Stall/Stand', count: 21 },
  { label: 'Lyn White / Peter Singer', count: 16 },
  { label: 'Live Export Campaign', count: 9 },
  { label: 'Rally/Protest', count: 7 },
  { label: 'Print Materials', count: 7 },
  { label: 'Other minor channels', count: 7 },
];

const socialMediaBreakdown = [
  { label: 'Unspecified', count: 662, pct: 66.9 },
  { label: 'Facebook', count: 211, pct: 21.3 },
  { label: 'Instagram', count: 82, pct: 8.3 },
  { label: 'YouTube', count: 58, pct: 5.9 },
  { label: 'TikTok', count: 6, pct: 0.6 },
];

// Q3 Data - Political Leanings
const politicalData = [
  { label: 'Animal Justice Party', count: 1788, pct: 34.9 },
  { label: 'Greens', count: 1030, pct: 20.1 },
  { label: 'Labor', count: 1010, pct: 19.7 },
  { label: 'Swinging Voter', count: 470, pct: 9.2 },
  { label: 'Independents', count: 301, pct: 5.9 },
  { label: 'Liberal', count: 297, pct: 5.8 },
  { label: "Don't follow politics", count: 200, pct: 3.9 },
  { label: 'Prefer not to say', count: 197, pct: 3.8 },
  { label: 'Nationals', count: 28, pct: 0.5 },
];

const otherPartiesData = [
  { label: 'Socialist/Far Left', count: 36 },
  { label: 'One Nation', count: 34 },
  { label: 'Libertarian/Conservative', count: 20 },
  { label: 'Non-voter', count: 10 },
  { label: 'Sustainable Australia', count: 6 },
  { label: 'Other minor parties', count: 17 },
];

// Custom tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'white',
        padding: '12px 16px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        border: 'none',
      }}>
        <p style={{ margin: 0, fontWeight: 600, color: COLORS.text }}>{payload[0].payload.label}</p>
        <p style={{ margin: '4px 0 0', color: COLORS.textMuted }}>
          {payload[0].value.toLocaleString()} respondents ({payload[0].payload.pct}%)
        </p>
      </div>
    );
  }
  return null;
};

// Stat Card Component
const StatCard = ({ label, value, subtext, accent = false }) => (
  <div style={{
    background: accent ? COLORS.primary : COLORS.cardBg,
    borderRadius: '12px',
    padding: '20px 24px',
    boxShadow: accent ? 'none' : '0 1px 3px rgba(0,0,0,0.08)',
    border: accent ? 'none' : `1px solid ${COLORS.quinary}`,
  }}>
    <div style={{
      fontSize: '32px',
      fontWeight: 700,
      color: accent ? 'white' : COLORS.primary,
      lineHeight: 1.1,
    }}>
      {value}
    </div>
    <div style={{
      fontSize: '14px',
      fontWeight: 500,
      color: accent ? 'rgba(255,255,255,0.9)' : COLORS.text,
      marginTop: '4px',
    }}>
      {label}
    </div>
    {subtext && (
      <div style={{
        fontSize: '12px',
        color: accent ? 'rgba(255,255,255,0.7)' : COLORS.textMuted,
        marginTop: '2px',
      }}>
        {subtext}
      </div>
    )}
  </div>
);

// Section Header Component
const SectionHeader = ({ question, title, respondents }) => (
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
  </div>
);

// Horizontal Bar Chart Component
const HorizontalBarChart = ({ data, maxValue, showPercentage = true }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    {data.map((item, index) => (
      <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '140px',
          fontSize: '13px',
          color: COLORS.text,
          textAlign: 'right',
          flexShrink: 0,
        }}>
          {item.label}
        </div>
        <div style={{
          flex: 1,
          height: '28px',
          background: COLORS.background,
          borderRadius: '4px',
          overflow: 'hidden',
          position: 'relative',
        }}>
          <div style={{
            width: `${(item.count / maxValue) * 100}%`,
            height: '100%',
            background: CHART_COLORS[index % CHART_COLORS.length],
            borderRadius: '4px',
            transition: 'width 0.5s ease-out',
          }} />
        </div>
        <div style={{
          width: '70px',
          fontSize: '13px',
          color: COLORS.textMuted,
          textAlign: 'right',
          flexShrink: 0,
        }}>
          {showPercentage ? `${item.pct}%` : item.count.toLocaleString()}
        </div>
      </div>
    ))}
  </div>
);

export default function AboutYouSection() {
  const [showSocialBreakdown, setShowSocialBreakdown] = useState(false);
  const [showOtherParties, setShowOtherParties] = useState(false);
  const [showOtherDiscovery, setShowOtherDiscovery] = useState(false);

  return (
    <div style={{
      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      background: COLORS.background,
      minHeight: '100vh',
      padding: '32px',
    }}>
      {/* Header */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto 32px',
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 700,
          color: COLORS.text,
          margin: 0,
        }}>
          About You
        </h1>
        <p style={{
          fontSize: '15px',
          color: COLORS.textMuted,
          margin: '8px 0 0',
        }}>
          Demographic profile and background of survey respondents
        </p>
      </div>

      {/* Main Grid - Single column for sequential flow */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}>
        
        {/* Q1 - Age Demographics */}
        <div style={{
          background: COLORS.cardBg,
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          border: `1px solid ${COLORS.quinary}`,
        }}>
          <SectionHeader 
            question="Q1" 
            title="What is your year of birth?" 
            respondents={5119}
          />
          
          {/* Response Rate Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            marginBottom: '24px',
          }}>
            <StatCard label="Valid DOB" value="80.9%" subtext="4,140 respondents" accent />
            <StatCard label="Invalid DOB" value="4.9%" subtext="250 respondents" />
            <StatCard label="Not provided" value="14.2%" subtext="729 respondents" />
          </div>

          {/* Age Distribution */}
          <div style={{ marginTop: '16px' }}>
            <h4 style={{
              fontSize: '14px',
              fontWeight: 600,
              color: COLORS.text,
              margin: '0 0 16px',
            }}>
              Age Distribution
            </h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={ageData} layout="vertical" margin={{ left: 60, right: 40 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: COLORS.text }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {ageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p style={{
              fontSize: '13px',
              color: COLORS.textMuted,
              margin: '12px 0 0',
              padding: '12px',
              background: COLORS.background,
              borderRadius: '8px',
            }}>
              <strong style={{ color: COLORS.primary }}>Key insight:</strong> 74.4% of respondents are aged 56 or older, indicating a mature supporter base.
            </p>
          </div>
        </div>

        {/* Q2 - Discovery Channels */}
        <div style={{
          background: COLORS.cardBg,
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          border: `1px solid ${COLORS.quinary}`,
        }}>
          <SectionHeader 
            question="Q2" 
            title="How did you first learn about Animals Australia?" 
            respondents={5119}
          />
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '32px',
          }}>
            {/* Left: Bar Chart */}
            <div>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={discoveryData} layout="vertical" margin={{ left: 100, right: 40 }}>
                  <XAxis type="number" hide />
                  <YAxis 
                    type="category" 
                    dataKey="label" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 13, fill: COLORS.text }}
                    width={100}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                    {discoveryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            {/* Right: Key Stats & Social Breakdown */}
            <div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px',
                marginBottom: '20px',
              }}>
                <StatCard label="Top Channel" value="33.0%" subtext="Don't remember" />
                <StatCard label="TV/News/Media" value="31.2%" subtext="1,599 respondents" accent />
              </div>
              
              {/* Social Media Breakdown */}
              <div style={{
                marginTop: '20px',
              }}>
                <button
                  onClick={() => setShowSocialBreakdown(!showSocialBreakdown)}
                  style={{
                    marginTop: '0',
                    padding: '8px 16px',
                    background: 'transparent',
                    border: `1px solid ${COLORS.tertiary}`,
                    borderRadius: '6px',
                    fontSize: '13px',
                    color: COLORS.secondary,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  {showSocialBreakdown ? '▼' : '▶'} Social Media Breakdown (989 total)
                </button>
                
                {showSocialBreakdown && (
                  <div style={{
                    marginTop: '12px',
                    padding: '16px',
                    background: COLORS.background,
                    borderRadius: '8px',
                  }}>
                    <ResponsiveContainer width="100%" height={160}>
                      <PieChart>
                        <Pie
                          data={socialMediaBreakdown}
                          dataKey="count"
                          nameKey="label"
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={70}
                        >
                          {socialMediaBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={CHART_COLORS[index]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend 
                          verticalAlign="middle" 
                          align="right"
                          layout="vertical"
                          wrapperStyle={{ fontSize: '12px' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
              
              {/* Other Discovery Breakdown */}
              <div style={{
                marginTop: '12px',
              }}>
                <button
                  onClick={() => setShowOtherDiscovery(!showOtherDiscovery)}
                  style={{
                    padding: '8px 16px',
                    background: 'transparent',
                    border: `1px solid ${COLORS.tertiary}`,
                    borderRadius: '6px',
                    fontSize: '13px',
                    color: COLORS.secondary,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  {showOtherDiscovery ? '▼' : '▶'} "Other" Breakdown (195 total)
                </button>
                
                {showOtherDiscovery && (
                  <div style={{
                    marginTop: '12px',
                    padding: '16px',
                    background: COLORS.background,
                    borderRadius: '8px',
                  }}>
                    {otherDiscoveryData.map((item, index) => (
                      <div key={item.label} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '6px 0',
                        borderBottom: index < otherDiscoveryData.length - 1 ? `1px solid ${COLORS.quinary}` : 'none',
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
                      <strong style={{ color: COLORS.primary }}>Insight:</strong> Cross-pollination from other animal organisations (Animal Liberation, Animals Asia, RSPCA, AJP) was the leading source, followed by event stalls and market stands. Notably, 16 respondents specifically credited Lyn White or Peter Singer as their introduction to AA, demonstrating the power of personal brand, while 9 cited the live export campaigns as their gateway.
                    </p>
                  </div>
                )}
              </div>
              
              <p style={{
                fontSize: '13px',
                color: COLORS.textMuted,
                margin: '16px 0 0',
                padding: '12px',
                background: COLORS.background,
                borderRadius: '8px',
              }}>
                <strong style={{ color: COLORS.primary }}>Key insight:</strong> Traditional media (TV/News) remains the top identifiable channel at 31.2%, aligning with the older demographic. Social media accounts for 19.3% with Facebook dominating.
              </p>
            </div>
          </div>
        </div>

        {/* Q3 - Political Leanings */}
        <div style={{
          background: COLORS.cardBg,
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          border: `1px solid ${COLORS.quinary}`,
        }}>
          <SectionHeader 
            question="Q3" 
            title="How would you describe your political leanings?" 
            respondents={5119}
          />
          
          <HorizontalBarChart data={politicalData} maxValue={1788} />
          
          {/* Other Parties Toggle */}
          <button
            onClick={() => setShowOtherParties(!showOtherParties)}
            style={{
              marginTop: '16px',
              padding: '8px 16px',
              background: 'transparent',
              border: `1px solid ${COLORS.tertiary}`,
              borderRadius: '6px',
              fontSize: '13px',
              color: COLORS.secondary,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {showOtherParties ? '▼' : '▶'} "Other Party" breakdown ({otherPartiesData.reduce((a, b) => a + b.count, 0)} responses)
          </button>
          
          {showOtherParties && (
            <div style={{
              marginTop: '12px',
              padding: '16px',
              background: COLORS.background,
              borderRadius: '8px',
            }}>
              {otherPartiesData.map((item, index) => (
                <div key={item.label} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '6px 0',
                  borderBottom: index < otherPartiesData.length - 1 ? `1px solid ${COLORS.quinary}` : 'none',
                }}>
                  <span style={{ fontSize: '13px', color: COLORS.text }}>{item.label}</span>
                  <span style={{ fontSize: '13px', color: COLORS.textMuted }}>{item.count}</span>
                </div>
              ))}
            </div>
          )}
          
          <p style={{
            fontSize: '13px',
            color: COLORS.textMuted,
            margin: '16px 0 0',
            padding: '12px',
            background: COLORS.background,
            borderRadius: '8px',
          }}>
            <strong style={{ color: COLORS.primary }}>Key insight:</strong> 74.7% lean left (AJP + Greens + Labor), with Animal Justice Party being the dominant affiliation.
          </p>
        </div>
      </div>
    </div>
  );
}
