// src/charts/MacroPieChart.jsx
import { motion } from 'framer-motion';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { useCalorieCalculator } from '../hooks/useCalorieCalculator';

const COLORS = ['#38bdf8', '#f97316', '#a78bfa'];
const RADIAN = Math.PI / 180;

function CustomLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) {
  if (percent < 0.08) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x} y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-xs font-bold"
      fontSize={12}
      fontWeight={700}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 shadow-lg text-xs">
      <p className="font-bold text-gray-800 dark:text-gray-200">{d.name}</p>
      <p className="text-gray-500 dark:text-gray-400 mt-0.5">
        {d.value}g · {d.payload.calories} kcal
      </p>
    </div>
  );
}

export default function MacroPieChart() {
  const { macros, isValid } = useCalorieCalculator();

  if (!isValid || !macros) {
    return (
      <div className="flex items-center justify-center h-64 text-xs text-gray-400 dark:text-gray-500">
        Complete your profile to see macros
      </div>
    );
  }

  const data = [
    { name: 'Protein', value: macros.protein.grams, calories: macros.protein.calories },
    { name: 'Fat', value: macros.fat.grams, calories: macros.fat.calories },
    { name: 'Carbs', value: macros.carbs.grams, calories: macros.carbs.calories },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
            labelLine={false}
            label={CustomLabel}
            animationBegin={0}
            animationDuration={900}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(value) => (
              <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
