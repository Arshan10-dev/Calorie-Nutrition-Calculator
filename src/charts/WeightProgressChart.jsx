// src/charts/WeightProgressChart.jsx
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from 'recharts';
import { useUser } from '../context/UserContext';
import { useCalorieCalculator } from '../hooks/useCalorieCalculator';

/**
 * Generates a projected weight-loss/gain curve from today to goal,
 * assuming ~0.5 kg per week.
 */
function buildProjection(currentWeight, goalWeight, weeks) {
  if (!currentWeight || !goalWeight || !weeks) return [];

  const points = [];
  const direction = goalWeight < currentWeight ? -1 : 1;
  const weeklyChange = direction * 0.5;

  for (let w = 0; w <= Math.min(weeks, 52); w++) {
    const projected = currentWeight + weeklyChange * w;
    // Don't overshoot goal
    const weight =
      direction === -1
        ? Math.max(goalWeight, projected)
        : Math.min(goalWeight, projected);

    points.push({
      week: w === 0 ? 'Now' : `W${w}`,
      weight: parseFloat(weight.toFixed(1)),
    });
  }
  return points;
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 shadow-lg">
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-sm font-bold font-mono text-brand-600 dark:text-brand-400 mt-0.5">
        {payload[0].value} kg
      </p>
    </div>
  );
}

export default function WeightProgressChart() {
  const { profile } = useUser();
  const { weeksToGoal, isValid } = useCalorieCalculator();

  const currentWeight = parseFloat(profile.weightKg);
  const goalWeight = parseFloat(profile.goalWeightKg);

  const data = buildProjection(currentWeight, goalWeight, weeksToGoal);

  if (!isValid || !goalWeight || data.length < 2) {
    return (
      <div className="flex items-center justify-center h-64 text-xs text-gray-400 dark:text-gray-500">
        Set a goal weight to see your projection
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" vertical={false} />
          <XAxis
            dataKey="week"
            tick={{ fontSize: 11, fill: 'rgb(148,163,184)' }}
            axisLine={false}
            tickLine={false}
            interval={Math.max(1, Math.floor(data.length / 8) - 1)}
          />
          <YAxis
            tick={{ fontSize: 11, fill: 'rgb(148,163,184)' }}
            axisLine={false}
            tickLine={false}
            domain={['dataMin - 2', 'dataMax + 2']}
            tickFormatter={(v) => `${v}kg`}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            y={goalWeight}
            stroke="#22c55e"
            strokeDasharray="5 4"
            strokeWidth={1.5}
            label={{ value: 'Goal', position: 'right', fontSize: 10, fill: '#22c55e' }}
          />
          <Area
            type="monotone"
            dataKey="weight"
            stroke="#22c55e"
            strokeWidth={2.5}
            fill="url(#weightGrad)"
            dot={false}
            activeDot={{ r: 5, fill: '#22c55e', strokeWidth: 0 }}
            animationDuration={1000}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
