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

// Q7 Data - Awareness of cruelty practices (sorted by awareness descending)
const q7Data = [
  { label: 'Pig farrowing crates', fullLabel: "In factory farms, mother pigs are confined in restricted 'farrowing crates'", count: 4641, pct: 90.7 },
  { label: 'No humane slaughter', fullLabel: "There is no such thing as 'humane slaughter'", count: 4425, pct: 86.4 },
  { label: 'Dairy cow pregnancy cycle', fullLabel: 'Dairy cows are kept almost continuously pregnant and give birth each year', count: 4399, pct: 85.9 },
  { label: 'Meat chicken suffering', fullLabel: "Chickens raised for 'meat' in all commercial systems endure short painful lives", count: 4251, pct: 83.0 },
  { label: 'Male chicks killed', fullLabel: 'Male chicks born into commercial egg production systems are considered worthless', count: 3883, pct: 75.9 },
  { label: 'Farming drives extinction', fullLabel: 'The biggest driver of biodiversity loss and species extinction is farming animals', count: 3878, pct: 75.8 },
  { label: 'Unequal legal protection', fullLabel: 'Farmed animals do not receive the same legal protection as dogs and cats', count: 3743, pct: 73.1 },
  { label: 'Fish farm conditions', fullLabel: 'Fish in industrial farms are kept in crowded, unhygienic conditions', count: 3703, pct: 72.3 },
  { label: 'Same slaughterhouses', fullLabel: 'Most animals in commercial farming systems go to same slaughterhouses', count: 3010, pct: 58.8 },
  { label: 'Piglet tail docking', fullLabel: 'Piglets in factory farms can legally have their tails cut off', count: 2908, pct: 56.8 },
  { label: 'Hen lifespan (18 months)', fullLabel: 'Egg laying hens in all commercial systems are slaughtered at 18 months', count: 2428, pct: 47.4 },
];

// Q8 Data - Dietary choices (sorted by count descending)
const q8Data = [
  { label: 'Reducing meat consumption', fullLabel: "I'm reducing my meat consumption", count: 1403, pct: 27.4 },
  { label: 'Vegan', fullLabel: "I'm vegan", count: 1053, pct: 20.6 },
  { label: 'Vegetarian', fullLabel: "I'm vegetarian", count: 1045, pct: 20.4 },
  { label: 'Pescatarian', fullLabel: "I'm pescatarian", count: 699, pct: 13.7 },
  { label: 'Swapping for alternatives', fullLabel: "I'm trying to swap more animal products for alternatives", count: 586, pct: 11.4 },
  { label: 'Omnivore', fullLabel: "I'm an omnivore", count: 346, pct: 6.8 },
  { label: 'Prefer not to say', fullLabel: "Prefer not to say", count: 38, pct: 0.7 },
];

// Q9 Data - Inspiration for dietary change (sorted by count descending, with corrected documentary count)
const q9Data = [
  { label: 'Factory farming cruelty awareness', fullLabel: 'Awareness of factory farming cruelty', count: 2304, pct: 45.0 },
  { label: 'Emotional attachment to animals', fullLabel: 'My emotional attachment to animals', count: 2276, pct: 44.5 },
  { label: 'Learning truth about farmed animals', fullLabel: 'Learning the truth about cruelty inflicted on farmed animals', count: 1515, pct: 29.6 },
  { label: 'Slaughterhouse video', fullLabel: 'Viewing a video of slaughterhouse cruelty', count: 834, pct: 16.3 },
  { label: 'Environmental concerns', fullLabel: 'Environmental concerns, such as deforestation', count: 640, pct: 12.5 },
  { label: 'The work of Animals Australia', fullLabel: 'The work of Animals Australia', count: 603, pct: 11.8 },
  { label: 'Health benefits', fullLabel: 'The health benefits', count: 384, pct: 7.5 },
  { label: 'Documentary or book', fullLabel: 'Watching a documentary or reading a book', count: 279, pct: 5.5 },
  { label: 'AA TV campaign', fullLabel: 'An Animals Australia TV campaign', count: 173, pct: 3.4 },
  { label: 'Friends and family', fullLabel: 'Conversations with friends and family', count: 127, pct: 2.5 },
  { label: 'VegKit website', fullLabel: "VegKit, Animals Australia's food advocacy website", count: 33, pct: 0.6 },
  { label: 'Internet search', fullLabel: 'An Internet search, like google', count: 27, pct: 0.5 },
];

// Q9 Documentary/Book breakdown data
const q9DocBookData = [
  { label: 'Animal Liberation (Peter Singer)', count: 55 },
  { label: 'Dominion', count: 32 },
  { label: 'Earthlings', count: 27 },
  { label: 'Four Corners / ABC exposé', count: 18 },
  { label: 'Cowspiracy', count: 12 },
  { label: 'Game Changers', count: 8 },
  { label: 'Forks Over Knives', count: 5 },
  { label: 'What the Health', count: 5 },
  { label: 'Eating Animals (J. Safran Foer)', count: 5 },
  { label: 'Other responses', count: 112 },
];

// Q9 Other Reasons breakdown data
const q9OtherData = [
  { label: 'Lifelong/childhood vegetarian or vegan', count: 27 },
  { label: 'Witnessed slaughter/transport firsthand', count: 18 },
  { label: 'Farm/sanctuary/animal work experience', count: 18 },
  { label: 'Emotional/moral/ethical conviction', count: 14 },
  { label: 'Media/AA campaigns/exposés', count: 12 },
  { label: 'Health reasons', count: 9 },
  { label: 'Dairy industry awareness (bobby calves)', count: 7 },
  { label: 'Spiritual/religious reasons', count: 6 },
  { label: 'Influenced by family/friends/partner', count: 5 },
  { label: 'Other minor responses', count: 60 },
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
    warning: '#f7b02eff',
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
  const [showQ9DocBook, setShowQ9DocBook] = useState(false);
  const [showQ9Other, setShowQ9Other] = useState(false);

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

        {/* Q7 - Awareness of Cruelty Practices */}
        <div style={{
          background: COLORS.cardBg,
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          border: '1px solid ' + COLORS.quinary,
        }}>
          <SectionHeader
            question="Q7"
            title="Are you aware of the following cruelty practices and issues within the Australian farming industry?"
            subtitle="Respondents answered Yes or No for each issue"
            respondents={4965}
          />

          <div style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '24px',
            flexWrap: 'wrap',
          }}>
            <StatCard value="90.7%" label="Pig farrowing crates" colorType="primary" />
            <StatCard value="86.4%" label="No humane slaughter" colorType="secondary" />
            <StatCard value="47.4%" label="Hen lifespan (lowest)" colorType="warning" />
          </div>

          <HorizontalBarChart data={q7Data} maxValue={5000} height={460} />

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
              High baseline awareness: Average awareness is 73.3% across all issues - this is an informed and engaged supporter base.
            </p>
            
            <p style={{ margin: '12px 0 0 0' }}>
              Top awareness cluster: Pig farrowing crates (90.7%), humane slaughter myth (86.4%), and dairy cow pregnancy (85.9%) are the most well-known issues among supporters.
            </p>
            
            <p style={{ margin: '12px 0 0 0' }}>
              Education opportunities: Egg laying hen lifespan (47.4%) and piglet tail docking (56.8%) have the lowest awareness - these represent potential areas for future campaigns.
            </p>
            
            <p style={{ margin: '12px 0 0 0' }}>
              Fish awareness gap: Fish farm conditions (72.3%) awareness is relatively high, yet fish ranked last for donations in Q4 (4.7%) - awareness does not equal priority for supporters.
            </p>
          </div>
        </div>

        {/* Q8 - Dietary Choices */}
        <div style={{
          background: COLORS.cardBg,
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          border: '1px solid ' + COLORS.quinary,
        }}>
          <SectionHeader
            question="Q8"
            title="Which one of the following best describes your current dietary choices?"
            subtitle="Respondents asked to select one"
            respondents={5060}
          />

          <div style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '24px',
            flexWrap: 'wrap',
          }}>
            <StatCard value="27.4%" label="Reducing meat" colorType="primary" />
            <StatCard value="20.6%" label="Vegan" colorType="secondary" />
            <StatCard value="20.4%" label="Vegetarian" colorType="accent" />
          </div>

          <HorizontalBarChart data={q8Data} maxValue={1500} height={300} />

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
              Reducetarian majority: The largest group (27.4%) are actively reducing meat consumption - they're on a journey, not at a destination.
            </p>
            
            <p style={{ margin: '12px 0 0 0' }}>
              Strong vegan/vegetarian base: Combined 41% are fully vegan (20.6%) or vegetarian (20.4%) - a highly committed core supporter base.
            </p>
            
            <p style={{ margin: '12px 0 0 0' }}>
              Very few omnivores: Only 6.8% identify as omnivores - AA's supporter base is overwhelmingly plant-forward in their eating habits.
            </p>
            
            <p style={{ margin: '12px 0 0 0' }}>
              Transition spectrum: Grouping "reducing" + "swapping" + "pescatarian" as transitioning = 52.5% - over half are somewhere on the journey toward plant-based eating.
            </p>
          </div>
        </div>

        {/* Q9 - Inspiration for Dietary Change */}
        <div style={{
          background: COLORS.cardBg,
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          border: '1px solid ' + COLORS.quinary,
        }}>
          <SectionHeader
            question="Q9"
            title="What most inspired you to become vegan, vegetarian or to reduce your meat consumption?"
            subtitle="Respondents could select up to 2 options"
            respondents={4696}
          />

          <div style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '24px',
            flexWrap: 'wrap',
          }}>
            <StatCard value="45.0%" label="Factory farming cruelty" colorType="primary" />
            <StatCard value="44.5%" label="Emotional attachment" colorType="secondary" />
            <StatCard value="29.6%" label="Learning the truth" colorType="accent" />
          </div>

          <HorizontalBarChart data={q9Data} maxValue={2500} height={500} />

          {/* Documentary/Book Breakdown Toggle */}
          <div style={{ marginTop: '16px' }}>
            <button
              onClick={() => setShowQ9DocBook(!showQ9DocBook)}
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
              {showQ9DocBook ? '▼' : '▶'} "Documentary or Book" Breakdown (279 responses)
            </button>
            
            {showQ9DocBook && (
              <div style={{
                marginTop: '12px',
                padding: '16px',
                background: COLORS.background,
                borderRadius: '8px',
              }}>
                {q9DocBookData.map((item, index) => (
                  <div key={item.label} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '6px 0',
                    borderBottom: index < q9DocBookData.length - 1 ? '1px solid ' + COLORS.quinary : 'none',
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
                  <strong style={{ color: COLORS.primary }}>Insight:</strong> Peter Singer's "Animal Liberation" (55 mentions) remains the most influential single piece of media — a 1975 book still converting people decades later. Australian content like Four Corners (18) shows local journalism has significant impact.
                </p>
              </div>
            )}
          </div>

          {/* Other Reasons Breakdown Toggle */}
          <div style={{ marginTop: '12px' }}>
            <button
              onClick={() => setShowQ9Other(!showQ9Other)}
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
              {showQ9Other ? '▼' : '▶'} "Other Reasons" Breakdown (176 responses)
            </button>
            
            {showQ9Other && (
              <div style={{
                marginTop: '12px',
                padding: '16px',
                background: COLORS.background,
                borderRadius: '8px',
              }}>
                {q9OtherData.map((item, index) => (
                  <div key={item.label} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '6px 0',
                    borderBottom: index < q9OtherData.length - 1 ? '1px solid ' + COLORS.quinary : 'none',
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
                  <strong style={{ color: COLORS.primary }}>Insight:</strong> Many supporters (27) were lifelong or childhood vegetarians/vegans — they didn't convert, they never ate meat. Direct witness experiences like seeing slaughter/transport firsthand (18) or working on farms/sanctuaries (18) are powerful catalysts.
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
              Cruelty awareness dominates: Factory farming cruelty (45.0%) and emotional attachment to animals (44.5%) are virtually tied as top motivators for dietary change.
            </p>
            
            <p style={{ margin: '12px 0 0 0' }}>
              Truth-telling works: "Learning the truth about cruelty" (29.6%) reinforces that exposure and education are key drivers of behaviour change.
            </p>
            
            <p style={{ margin: '12px 0 0 0' }}>
              AA direct attribution: 11.8% credit "The work of Animals Australia" directly, plus 3.4% for AA TV campaigns — combined ~15% direct AA influence on dietary choices.
            </p>
            
            <p style={{ margin: '12px 0 0 0' }}>
              Health and environment secondary: Health benefits (7.5%) and environmental concerns (12.5%) are much lower motivators than animal welfare for this audience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValuesViewsSection;
