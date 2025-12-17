import React, { useState } from 'react';
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

// Q15 Data - What would you like to see AA do more of (sorted by count descending)
// Respondents: 4,963 (select all that apply)
const q15Data = [
  { label: 'Expose factory farms', fullLabel: 'Expose the reality for animals trapped in factory farms', count: 4091, pct: 82.4 },
  { label: 'Legal protections', fullLabel: 'Secure more legal protections for animals through the courts', count: 3832, pct: 77.2 },
  { label: 'More investigations', fullLabel: 'Carry out more investigations', count: 2958, pct: 59.6 },
  { label: 'TV advertising', fullLabel: 'Run more TV advertising campaigns', count: 2735, pct: 55.1 },
  { label: 'News/outdoor advertising', fullLabel: 'Conduct more news media and outdoor advertising campaigns', count: 2657, pct: 53.5 },
  { label: 'Public events', fullLabel: 'Hold public events', count: 1283, pct: 25.9 },
  { label: 'Plant-based tips/recipes', fullLabel: 'Provide more tips and recipes on how to eat plant-based, cruelty-free food', count: 905, pct: 18.2 },
  { label: 'More merchandise', fullLabel: 'Offer more merchandise through the online store', count: 645, pct: 13.0 },
  { label: 'Shareable resources', fullLabel: 'Create more resources I can share with family and friends', count: 644, pct: 13.0 },
  { label: 'Volunteer opportunities', fullLabel: 'Create more volunteer opportunities', count: 467, pct: 9.4 },
  { label: 'Other', fullLabel: 'Other', count: 495, pct: 10.0 },
];

// Q15 "Other" breakdown data (sorted by count descending, Other minor last)
const q15OtherData = [
  { label: 'Political lobbying & legislation', count: 63 },
  { label: 'Praise/doing great work', count: 57 },
  { label: 'Wildlife & native animals', count: 39 },
  { label: 'School & youth education', count: 33 },
  { label: 'More graphic/hard-hitting content', count: 26 },
  { label: 'Reduce postal/paper mail', count: 22 },
  { label: 'Partner with other organisations', count: 20 },
  { label: 'Social media & digital advertising', count: 19 },
  { label: 'Public events & speaking tours', count: 17 },
  { label: 'Lab testing & experimentation', count: 13 },
  { label: 'Vegan/plant-based promotion', count: 12 },
  { label: 'Live export', count: 9 },
  { label: 'Horse & greyhound racing', count: 8 },
  { label: 'Food labelling & consumer awareness', count: 6 },
  { label: 'Other minor responses', count: 151 },
];

// Q16 Data - Improve supporter experience (sorted by count descending)
// Total survey: 5,119 | Answered: 4,954 | Yes adjusted from free-text count (692)
const q16Data = [
  { label: 'No, I\'m happy', fullLabel: 'No, I\'m happy', count: 4262, pct: 83.3 },
  { label: 'Yes, I think', fullLabel: 'Yes, I think', count: 692, pct: 13.5 },
  { label: 'Not provided', fullLabel: 'Not provided', count: 165, pct: 3.2 },
];

// Q16 "Yes" breakdown data (sorted by count descending, Other last)
const q16YesData = [
  { label: 'Reduce/stop postal mail', count: 146 },
  { label: 'Praise / doing great work', count: 91 },
  { label: 'More advertising / media exposure', count: 82 },
  { label: 'Tax deductibility / DGR status', count: 26 },
  { label: 'More events / regional presence', count: 22 },
  { label: 'More volunteer opportunities', count: 21 },
  { label: 'More transparency / impact reporting', count: 19 },
  { label: 'School / youth education', count: 17 },
  { label: 'Wildlife / native animals focus', count: 12 },
  { label: 'Content warnings / less graphic imagery', count: 11 },
  { label: 'Partner with other organisations', count: 7 },
  { label: 'Other suggestions', count: 236 },
];

// Q17 Data - Net Promoter Score Rating (0-10 scale, sorted descending by rating)
// Respondents: 5,024 | Not provided: 95
// NPS Categories: Promoters (9-10), Passives (6-8), Detractors (0-5)
const q17Data = [
  { label: '10', fullLabel: 'Rating 10 (Most likely)', count: 3296, pct: 65.6 },
  { label: '9', fullLabel: 'Rating 9', count: 668, pct: 13.3 },
  { label: '8', fullLabel: 'Rating 8', count: 551, pct: 11.0 },
  { label: '7', fullLabel: 'Rating 7', count: 203, pct: 4.0 },
  { label: '6', fullLabel: 'Rating 6', count: 74, pct: 1.5 },
  { label: '5', fullLabel: 'Rating 5', count: 158, pct: 3.1 },
  { label: '4', fullLabel: 'Rating 4', count: 14, pct: 0.3 },
  { label: '3', fullLabel: 'Rating 3', count: 10, pct: 0.2 },
  { label: '2', fullLabel: 'Rating 2', count: 9, pct: 0.2 },
  { label: '1', fullLabel: 'Rating 1', count: 15, pct: 0.3 },
  { label: '0', fullLabel: 'Rating 0 (Least likely)', count: 26, pct: 0.5 },
];

// Q18 Data - "I support Animals Australia because..." (free-text themes)
// Respondents: 4,924
const q18Data = [
  { label: 'Animal welfare / ending cruelty', fullLabel: 'Animal welfare / ending cruelty', count: 1885, pct: 38.3 },
  { label: 'Voice for the voiceless', fullLabel: 'Animals deserve better / voice for voiceless', count: 898, pct: 18.2 },
  { label: 'Making a difference', fullLabel: 'Making a difference / hope for change', count: 631, pct: 12.8 },
  { label: 'Love / care for animals', fullLabel: 'Love / care for animals', count: 446, pct: 9.1 },
  { label: 'Trust in AA', fullLabel: 'Trust in AA / effective organisation', count: 301, pct: 6.1 },
  { label: 'Ethical / moral beliefs', fullLabel: 'Ethical / moral beliefs', count: 141, pct: 2.9 },
  { label: 'Investigations & awareness', fullLabel: 'Investigations & awareness campaigns', count: 76, pct: 1.5 },
  { label: 'All animals matter', fullLabel: 'All animals matter equally', count: 58, pct: 1.2 },
  { label: 'Acts on my behalf', fullLabel: 'Personal motivation / acting on my behalf', count: 35, pct: 0.7 },
  { label: 'Live export & factory farming', fullLabel: 'Live export & factory farming', count: 26, pct: 0.5 },
  { label: 'Environment & wildlife', fullLabel: 'Environment & wildlife', count: 12, pct: 0.2 },
  { label: 'Vegan / plant-based', fullLabel: 'Vegan / plant-based lifestyle', count: 9, pct: 0.2 },
  { label: 'Other responses', fullLabel: 'Other responses', count: 406, pct: 8.2 },
];

// Q18 "Other" breakdown data (sorted by count descending)
const q18OtherData = [
  { label: 'Miscellaneous responses', count: 167 },
  { label: 'Simple/short affirmations', count: 115 },
  { label: 'Fighting for / supporting animals', count: 62 },
  { label: 'General praise & approval', count: 28 },
  { label: 'Action-oriented / gets results', count: 13 },
  { label: 'AA is unique / only one doing this', count: 9 },
  { label: 'Animals need us / our responsibility', count: 8 },
  { label: 'Philosophical / animals\' inherent rights', count: 4 },
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
    <strong style={{ color: COLORS.primary }}>Key Insights:</strong>
    <div style={{ marginTop: '8px', lineHeight: '1.6' }}>{children}</div>
  </div>
);

// Expandable Breakdown Component
const ExpandableBreakdown = ({ title, total, data, show, onToggle, insight }) => (
  <div style={{ marginTop: '16px' }}>
    <button
      onClick={onToggle}
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
      <span>{show ? '▼' : '▶'}</span> {title} ({total} total)
    </button>

    {show && data.length > 0 && (
      <div style={{
        marginTop: '12px',
        padding: '16px',
        background: COLORS.background,
        borderRadius: '8px',
      }}>
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '6px 0',
              borderBottom: index < data.length - 1 ? '1px solid ' + COLORS.quinary : 'none',
            }}
          >
            <span style={{ fontSize: '13px', color: COLORS.text }}>{item.label}</span>
            <span style={{ fontSize: '13px', color: COLORS.textMuted }}>
              {item.count}
            </span>
          </div>
        ))}

        {/* Insight within breakdown */}
        {insight && (
          <p style={{
            fontSize: '13px',
            color: COLORS.textMuted,
            margin: '16px 0 0',
            padding: '12px',
            background: COLORS.cardBg,
            borderRadius: '8px',
          }}>
            <strong style={{ color: COLORS.primary }}>Insight:</strong> {insight}
          </p>
        )}
      </div>
    )}
  </div>
);

// Main Component
const YourSatisfactionSection = () => {
  const [showQ15Other, setShowQ15Other] = useState(false);
  const [showQ16Yes, setShowQ16Yes] = useState(false);
  const [showQ18Other, setShowQ18Other] = useState(false);

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

        {/* Q15 - What would you like to see AA do more of */}
        <div style={{
          background: COLORS.cardBg,
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          border: '1px solid ' + COLORS.quinary,
        }}>
          <SectionHeader
            question="Q15"
            title="What would you like to see Animals Australia do more of in the future?"
            subtitle="Select all that apply"
            respondents={4963}
          />

          {/* Top 3 Stat Cards */}
          <div style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '24px',
            flexWrap: 'wrap',
          }}>
            <StatCard
              value="4,091"
              label="Expose factory farms (82.4%)"
              colorType="primary"
            />
            <StatCard
              value="3,832"
              label="Legal protections (77.2%)"
              colorType="secondary"
            />
            <StatCard
              value="2,958"
              label="More investigations (59.6%)"
              colorType="accent"
            />
          </div>

          {/* Bar Chart */}
          <HorizontalBarChart
            data={q15Data}
            maxValue={4500}
            height={440}
          />

          {/* Other Breakdown */}
          <ExpandableBreakdown
            title='"Other" Breakdown'
            total={495}
            data={q15OtherData}
            show={showQ15Other}
            onToggle={() => setShowQ15Other(!showQ15Other)}
            insight="Political lobbying and legislative change emerged as the top 'Other' theme (63 responses), with many requesting changing status to enable tax-deductible donations. Wildlife and native animal issues (39) — particularly brumbies, kangaroos, and koalas — represent an area where supporters want increased focus. School and youth education (33) also featured prominently, with supporters keen to reach younger generations through school programs and age-appropriate resources."
          />

          {/* Key Insights */}
          <KeyInsight>
            <p style={{ margin: '0 0 12px 0' }}>
              Exposing factory farm cruelty (82.4%) and securing legal protections (77.2%) are the clear top priorities — both align with AA's core investigative and advocacy work.
            </p>
            <p style={{ margin: '0 0 12px 0' }}>
              Over half of respondents want more TV advertising (55.1%) and news/outdoor campaigns (53.5%), suggesting appetite for broader public awareness efforts.
            </p>
            <p style={{ margin: 0 }}>
              Lower-ranked items like merchandise (13.0%) and volunteer opportunities (9.4%) indicate these are lower priorities compared to direct advocacy and exposure work.
            </p>
          </KeyInsight>
        </div>

        {/* Q16 - Improve supporter experience */}
        <div style={{
          background: COLORS.cardBg,
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          border: '1px solid ' + COLORS.quinary,
        }}>
          <SectionHeader
            question="Q16"
            title="Are there any ways we could improve your experience as a supporter?"
            subtitle="Single select with optional suggestions"
            respondents={5119}
          />

          {/* Top 3 Stat Cards */}
          <div style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '24px',
            flexWrap: 'wrap',
          }}>
            <StatCard
              value="4,262"
              label="No, I'm happy (83.3%)"
              colorType="primary"
            />
            <StatCard
              value="692"
              label="Yes, I think (13.5%)"
              colorType="secondary"
            />
            <StatCard
              value="165"
              label="Not provided (3.2%)"
              colorType="accent"
            />
          </div>

          {/* Bar Chart */}
          <HorizontalBarChart
            data={q16Data}
            maxValue={4500}
            height={160}
          />

          {/* Yes Breakdown */}
          <ExpandableBreakdown
            title='"Yes" Breakdown'
            total={692}
            data={q16YesData}
            show={showQ16Yes}
            onToggle={() => setShowQ16Yes(!showQ16Yes)}
            insight="Reducing postal mail emerged as the dominant suggestion (146 responses), with supporters preferring digital communication and funds directed to animal welfare work. Tax deductibility/DGR status (26) remains a recurring request. Notably, 91 respondents used the 'Yes' field to express praise rather than critique, reflecting high overall satisfaction even among those with suggestions."
          />

          {/* Key Insights */}
          <KeyInsight>
            <p style={{ margin: '0 0 12px 0' }}>
              83.3% of supporters (4,262) are happy with their experience — a strong endorsement of current engagement practices.
            </p>
            <p style={{ margin: '0 0 12px 0' }}>
              Among the 13.5% with suggestions, reducing postal mail (146) was the most common theme, reflecting a preference for digital communication and cost-conscious stewardship.
            </p>
            <p style={{ margin: 0 }}>
              The low "Not provided" rate (3.2%) indicates high engagement with the survey, with most respondents willing to share feedback.
            </p>
          </KeyInsight>
        </div>

        {/* Placeholder for Q17-Q18 */}

        {/* Q17 - NPS Rating */}
        <div style={{
          background: COLORS.cardBg,
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          border: '1px solid ' + COLORS.quinary,
        }}>
          <SectionHeader
            question="Q17"
            title="How likely are you to recommend Animals Australia as an effective charity?"
            subtitle="Rating scale: 0 (least likely) to 10 (most likely)"
            respondents={5024}
          />

          {/* Top 3 Stat Cards - Net Promoter Score Categories */}
          <div style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '24px',
            flexWrap: 'wrap',
          }}>
            <StatCard
              value="3,964"
              label="Promoters 9-10 (78.9%)"
              colorType="primary"
            />
            <StatCard
              value="828"
              label="Passives 6-8 (16.5%)"
              colorType="secondary"
            />
            <StatCard
              value="232"
              label="Detractors 0-5 (4.6%)"
              colorType="accent"
            />
          </div>

          {/* Bar Chart */}
          <HorizontalBarChart
            data={q17Data}
            maxValue={3500}
            height={440}
          />

          {/* Key Insights */}
          <KeyInsight>
            <p style={{ margin: '0 0 12px 0' }}>
              With a Net Promoter Score of 74, Animals Australia achieves world-class advocacy — scores above 70 are considered exceptional and indicate extremely high supporter loyalty.
            </p>
            <p style={{ margin: '0 0 12px 0' }}>
              Nearly two-thirds (65.6%) gave the maximum rating of 10, demonstrating strong enthusiasm for recommending AA to others.
            </p>
            <p style={{ margin: 0 }}>
              The average rating of 9.19 out of 10 reflects consistent satisfaction across the supporter base, with only 4.6% falling into the detractor (0 to 5 rating) category.
            </p>
          </KeyInsight>
        </div>

        {/* Q18 - I support Animals Australia because... */}
        <div style={{
          background: COLORS.cardBg,
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          border: '1px solid ' + COLORS.quinary,
        }}>
          <SectionHeader
            question="Q18"
            title='"I support Animals Australia because..."'
            subtitle="Free-text responses categorised into themes"
            respondents={4924}
          />

          {/* Top 3 Stat Cards */}
          <div style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '24px',
            flexWrap: 'wrap',
          }}>
            <StatCard
              value="1,885"
              label="Animal welfare / ending cruelty (38.3%)"
              colorType="primary"
            />
            <StatCard
              value="898"
              label="Voice for the voiceless (18.2%)"
              colorType="secondary"
            />
            <StatCard
              value="631"
              label="Making a difference (12.8%)"
              colorType="accent"
            />
          </div>

          {/* Bar Chart */}
          <HorizontalBarChart
            data={q18Data}
            maxValue={2000}
            height={520}
          />

          {/* Expandable "Other" Breakdown */}
          <div style={{ marginTop: '16px', marginBottom: '16px' }}>
            <button
              onClick={() => setShowQ18Other(!showQ18Other)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'none',
                border: `1px solid ${COLORS.quinary}`,
                borderRadius: '8px',
                padding: '10px 16px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                color: COLORS.primary,
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{
                transform: showQ18Other ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
              }}>
                ▶
              </span>
              {showQ18Other ? 'Hide' : 'Show'} "Other" Breakdown (406 responses)
            </button>

            {showQ18Other && (
              <div style={{
                marginTop: '16px',
                padding: '16px',
                background: COLORS.background,
                borderRadius: '8px',
                border: `1px solid ${COLORS.quinary}`,
              }}>
                <p style={{
                  margin: '0 0 12px 0',
                  fontSize: '13px',
                  color: COLORS.textMuted,
                }}>
                  Breakdown of 406 responses that didn't match primary theme keywords:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {q18OtherData.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px 12px',
                        background: 'white',
                        borderRadius: '6px',
                        fontSize: '14px',
                      }}
                    >
                      <span style={{ color: COLORS.text }}>{item.label}</span>
                      <span style={{
                        fontWeight: '600',
                        color: COLORS.primary,
                      }}>
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>
                <p style={{
                  margin: '12px 0 0 0',
                  fontSize: '13px',
                  color: COLORS.textMuted,
                  fontStyle: 'italic',
                }}>
                  <strong>Note:</strong> The "Other" category primarily contains brief affirmations (e.g., "they care", "good cause") and variations of the main themes that didn't match specific keywords. No significant new themes emerged from this group.
                </p>
              </div>
            )}
          </div>

          {/* Key Insights */}
          <KeyInsight>
            <p style={{ margin: '0 0 12px 0' }}>
              Ending cruelty and reducing animal suffering is the primary driver of support (38.3%), followed closely by giving animals a voice (18.2%). The combination of these two themes — stopping harm and advocating for the voiceless — accounts for over half of all responses.
            </p>
            <p style={{ margin: '0 0 12px 0' }}>
              A notable theme is supporters feeling AA "does what I cannot" — many cite the emotional toll of witnessing cruelty and express gratitude that investigators bear this burden on their behalf. The courage and bravery of investigators featured prominently (235 mentions).
            </p>
            <p style={{ margin: '0 0 12px 0' }}>
              Lyn White is mentioned by name 60 times, with many crediting her as the reason they first supported AA. Several supporters shared that AA campaigns directly changed their behaviour, including becoming vegan after the 2011 live export exposé.
            </p>
            <p style={{ margin: 0 }}>
              Gratitude (343 mentions) and hope (252 mentions) are stronger emotional drivers than anger or sadness, suggesting supporters are motivated by positive belief in change rather than outrage alone. Notably, 135 respondents describe AA as "the only organisation" doing this work effectively.
            </p>
          </KeyInsight>
        </div>

      </div>
    </div>
  );
};

export default YourSatisfactionSection;
