import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';
import { TraitScore, TRAIT_SHORT_LABELS, BigFiveTrait } from '../types';

interface TraitChartProps {
  traits: TraitScore[];
}

// Muted zen-inspired trait colors
const TRAIT_COLORS: Record<BigFiveTrait, string> = {
  openness: '#9b8ab8',
  conscientiousness: '#7d9f7d',
  extraversion: '#c4a574',
  agreeableness: '#7ba4ad',
  neuroticism: '#b89898',
};

export default function TraitChart({ traits }: TraitChartProps) {
  const radarData = traits.map((t) => ({
    trait: TRAIT_SHORT_LABELS[t.trait],
    score: t.percentScore,
    fullMark: 100,
  }));

  const barData = traits.map((t) => ({
    name: TRAIT_SHORT_LABELS[t.trait],
    score: t.percentScore,
    trait: t.trait,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Radar Chart */}
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData}>
            <PolarGrid stroke="#d4d9d4" />
            <PolarAngleAxis
              dataKey="trait"
              tick={{ fill: '#57534e', fontSize: 12 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fill: '#a3a8a3', fontSize: 10 }}
              tickCount={5}
            />
            <Radar
              name="Score"
              dataKey="score"
              stroke="#627362"
              fill="#627362"
              fillOpacity={0.25}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData} layout="vertical">
            <XAxis
              type="number"
              domain={[0, 100]}
              tick={{ fill: '#a3a8a3', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: '#57534e', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              width={120}
            />
            <Tooltip
              formatter={(value: number) => [`${value}%`, 'Score']}
              contentStyle={{
                backgroundColor: '#fafaf8',
                border: '1px solid #e7e5e4',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
              }}
            />
            <Bar dataKey="score" radius={[0, 8, 8, 0]}>
              {barData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={TRAIT_COLORS[entry.trait as BigFiveTrait]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
