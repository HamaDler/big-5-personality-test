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
  Cell
} from 'recharts';
import { TraitScore, TRAIT_SHORT_LABELS, BigFiveTrait } from '../types';

interface TraitChartProps {
  traits: TraitScore[];
}

const TRAIT_COLORS: Record<BigFiveTrait, string> = {
  openness: '#9B59B6',
  conscientiousness: '#27AE60',
  extraversion: '#F1C40F',
  agreeableness: '#3498DB',
  neuroticism: '#E74C3C'
};

export default function TraitChart({ traits }: TraitChartProps) {
  const radarData = traits.map(t => ({
    trait: TRAIT_SHORT_LABELS[t.trait],
    score: t.percentScore,
    fullMark: 100
  }));

  const barData = traits.map(t => ({
    name: TRAIT_SHORT_LABELS[t.trait],
    score: t.percentScore,
    trait: t.trait
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Radar Chart */}
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis
              dataKey="trait"
              tick={{ fill: '#374151', fontSize: 12 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fill: '#9ca3af', fontSize: 10 }}
              tickCount={5}
            />
            <Radar
              name="Score"
              dataKey="score"
              stroke="#374151"
              fill="#374151"
              fillOpacity={0.3}
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
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: '#374151', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              width={120}
            />
            <Tooltip
              formatter={(value: number) => [`${value}%`, 'Score']}
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Bar dataKey="score" radius={[0, 4, 4, 0]}>
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
