// src/charts/CalorieComparisonChart.jsx
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, ReferenceLine,
} from 'recharts';
import { useCalorieCalculator } from '../hooks/useCalorieCalculator';

const BAR_COLORS = {
  BMR:      '#a78bfa',
  'Lose Weight': '#38bdf8',
  Maintain: '#22c55e',
  'Gain Muscle': '#f97316',
  TDEE:     '#94a3b8',
};

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 shadow-lg">
      <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">{label}</p>
      <p className="text-sm font-mono font-bold" style={{ color: payload[0].fill }}>
        {payload[0].value?.toLocaleString()} kcal
      </p>
    </div>
  );
}

export default function CalorieComparisonChart() {
  const { bmr, tdee, calorieTargets, isValid } = useCalorieCalculator();

  if (!isValid) {
    return (
      <div className="flex items-center justify-center h-64 text-xs text-gray-400 dark:text-gray-500">
        Complete your profile to see calorie chart
      </div>
    );
  }

  const data = [
    { name: 'BMR',         calories: bmr },
    { name: 'Lose Weight', calories: calorieTargets.lose },
    { name: 'Maintain',    calories: calorieTargets.maintain },
    { name: 'Gain Muscle', calories: calorieTargets.gain },
    { name: 'TDEE',        calories: tdee },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} barCategoryGap="28%" margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: 'rgb(148,163,184)', fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: 'rgb(148,163,184)' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148,163,184,0.07)' }} />
          <ReferenceLine
            y={tdee}
            stroke="#22c55e"
            strokeDasharray="4 4"
            strokeWidth={1.5}
            label={{ value: 'TDEE', position: 'right', fontSize: 10, fill: '#22c55e' }}
          />
          <Bar dataKey="calories" radius={[8, 8, 0, 0]} maxBarSize={56} animationDuration={900} animationEasing="ease-out">
            {data.map((entry) => (
              <Cell key={entry.name} fill={BAR_COLORS[entry.name] || '#64748b'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
