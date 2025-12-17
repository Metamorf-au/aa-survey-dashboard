import React from 'react';
import { useNavigate } from 'react-router-dom';

// Color palette - matching established branding exactly
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

// Stat Card Component - matching established pattern exactly
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

// Pillar Card Component - clickable cards linking to each section
const PillarCard = ({ title, subtitle, path, highlights, accentColor }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      onClick={() => navigate(path)}
      style={{
        background: COLORS.cardBg,
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        border: '1px solid ' + COLORS.quinary,
        borderTop: '4px solid ' + accentColor,
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
      }}
    >
      <div style={{
        fontSize: '11px',
        fontWeight: 600,
        color: accentColor,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginBottom: '4px',
      }}>
        {subtitle}
      </div>
      <h3 style={{
        fontSize: '18px',
        fontWeight: 600,
        color: COLORS.text,
        margin: '0 0 16px 0',
      }}>
        {title}
      </h3>
      <ul style={{
        margin: 0,
        padding: '0 0 0 16px',
        listStyle: 'none',
      }}>
        {highlights.map((highlight, index) => (
          <li 
            key={index}
            style={{
              fontSize: '13px',
              color: COLORS.textMuted,
              marginBottom: '8px',
              position: 'relative',
              paddingLeft: '12px',
            }}
          >
            <span style={{
              position: 'absolute',
              left: '-4px',
              color: accentColor,
              fontWeight: 700,
            }}>•</span>
            {highlight}
          </li>
        ))}
      </ul>
      <div style={{
        marginTop: '16px',
        fontSize: '13px',
        fontWeight: 600,
        color: accentColor,
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
      }}>
        View details →
      </div>
    </div>
  );
};

// Main Component
const OverviewSection = () => {
  return (
    <div style={{
      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      background: COLORS.background,
      minHeight: '100vh',
      padding: '32px',
    }}>
      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}>

        {/* Hero Section - Total Respondents */}
        <div style={{
          background: COLORS.cardBg,
          borderRadius: '16px',
          padding: '20px 32px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          border: '1px solid ' + COLORS.quinary,
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: '13px',
            fontWeight: 600,
            color: COLORS.textMuted,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '4px',
          }}>
            Total Survey Respondents
          </div>
          <div style={{
            fontSize: '52px',
            fontWeight: 700,
            color: COLORS.primary,
            lineHeight: 1,
          }}>
            5,119
          </div>
          
          {/* Online vs Printed Split */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '32px',
            marginTop: '12px',
            flexWrap: 'wrap',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 700, color: COLORS.primary }}>2,779</div>
              <div style={{ fontSize: '13px', color: COLORS.textMuted }}>Online (54.3%)</div>
            </div>
            <div style={{
              width: '1px',
              background: COLORS.quinary,
              alignSelf: 'stretch',
            }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 700, color: COLORS.primary }}>2,340</div>
              <div style={{ fontSize: '13px', color: COLORS.textMuted }}>Printed (45.7%)</div>
            </div>
          </div>
        </div>

        {/* Key Metrics Row */}
        <div style={{
          background: COLORS.cardBg,
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          border: '1px solid ' + COLORS.quinary,
        }}>
          <div style={{ marginBottom: '16px', textAlign: 'center' }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 700,
              color: COLORS.text,
              margin: 0,
            }}>
              Key Metrics at a Glance
            </h3>
          </div>
          <div style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            <StatCard value="74.4%" label="Aged 56 or older" colorType="primary" />
            <StatCard value="65.9%" label="Inspired by Results" colorType="secondary" />
            <StatCard value="41%" label="Vegan/vegetarian" colorType="accent" />
            <StatCard value="77.1%" label="Email subscribers" colorType="accent" />
            <StatCard value="39.4%" label="Monthly donors" colorType="primary" />
            <StatCard value="94.6%" label="Trust Stewardship" colorType="secondary" />
            <StatCard value="74%" label="High Loyalty Score" colorType="accent" />
          </div>
        </div>

        {/* Key Opportunities Section */}
        <div style={{
          background: COLORS.cardBg,
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          border: '1px solid ' + COLORS.quinary,
        }}>
          <div style={{ marginBottom: '16px', textAlign: 'center' }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 700,
              color: COLORS.text,
              margin: 0,
            }}>
              Key Opportunities
            </h3>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
          }}>
            {/* Opportunity 1 - Bequest */}
            <div style={{
              background: COLORS.background,
              borderRadius: '12px',
              padding: '20px',
              borderLeft: '4px solid ' + COLORS.primary,
            }}>
              <div style={{ fontSize: '28px', fontWeight: 700, color: COLORS.primary }}>31.3%</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: COLORS.text, marginTop: '4px' }}>Considering bequest</div>
              <div style={{ fontSize: '13px', color: COLORS.textMuted, marginTop: '2px' }}>Legacy giving potential</div>
            </div>
            {/* Opportunity 2 - Education */}
            <div style={{
              background: COLORS.background,
              borderRadius: '12px',
              padding: '20px',
              borderLeft: '4px solid #1E7B8C',
            }}>
              <div style={{ fontSize: '28px', fontWeight: 700, color: '#1E7B8C' }}>47.4%</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: COLORS.text, marginTop: '4px' }}>Hen lifespan awareness</div>
              <div style={{ fontSize: '13px', color: COLORS.textMuted, marginTop: '2px' }}>Fill education gaps</div>
            </div>
            {/* Opportunity 3 - Schools */}
            <div style={{
              background: COLORS.background,
              borderRadius: '12px',
              padding: '20px',
              borderLeft: '4px solid ' + COLORS.accent,
            }}>
              <div style={{ fontSize: '28px', fontWeight: 700, color: COLORS.accent }}>33%</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: COLORS.text, marginTop: '4px' }}>School/Youth programs</div>
              <div style={{ fontSize: '13px', color: COLORS.textMuted, marginTop: '2px' }}>Engage school-aged kids</div>
            </div>
            {/* Opportunity 4 - Digital */}
            <div style={{
              background: COLORS.background,
              borderRadius: '12px',
              padding: '20px',
              borderLeft: '4px solid #8B5CF6',
            }}>
              <div style={{ fontSize: '28px', fontWeight: 700, color: '#8B5CF6' }}>7.3%</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: COLORS.text, marginTop: '4px' }}>Digital channel growth</div>
              <div style={{ fontSize: '13px', color: COLORS.textMuted, marginTop: '2px' }}>Increase online content</div>
            </div>
          </div>
        </div>

        {/* Four Pillars Section - 2x2 Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px',
        }}>
          <PillarCard
            title="Who are our supporters?"
            subtitle="About You · Q1-3"
            path="/about-you"
            accentColor={COLORS.primary}
            highlights={[
              "74.4% aged 56 or older",
              "75% align with AJP, Greens, or Labor",
              "TV/News top discovery channel (31.2%)",
            ]}
          />
          <PillarCard
            title="What do they value?"
            subtitle="Values & Views · Q4-9"
            path="/values-views"
            accentColor="#1E7B8C"
            highlights={[
              "41% fully vegan or vegetarian",
              "52.5% actively transitioning diets",
              "90.7% aware of factory farm cruelty",
            ]}
          />
          <PillarCard
            title="How do they engage?"
            subtitle="Your Support · Q10-13"
            path="/your-support"
            accentColor={COLORS.accent}
            highlights={[
              "77.1% subscribe to emails",
              "68.1% sign petitions and take action",
              "31.3% considering bequest giving",
            ]}
          />
          <PillarCard
            title="How satisfied are they?"
            subtitle="Your Satisfaction · Q14-17"
            path="/satisfaction"
            accentColor="#8B5CF6"
            highlights={[
              "NPS 74 — world-class loyalty",
              "65.6% gave maximum rating of 10",
              "82.4% want more factory farm exposés",
            ]}
          />
        </div>

      </div>
    </div>
  );
};

export default OverviewSection;
