// src/components/StatsGrid.jsx
// Quick-glance metric tiles shown at top of dashboard

import { motion } from 'framer-motion';
import { Flame, Activity, Droplets, Beef, Target, Clock } from 'lucide-react';
import { useCalorieCalculator } from '../hooks/useCalorieCalculator';
import { formatNumber } from '../utils/nutritionUtils';

const TILE_VARIANTS = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
};

function StatTile({ icon: Icon, label, value, unit, gradient, index }) {
  return (
    <motion.div
      custom={index}
      variants={TILE_VARIANTS}
      initial="hidden"
      animate="show"
      className="relative overflow-hidden rounded-2xl p-4 shadow-card border border-white/60 dark:border-gray-700/40"
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10 dark:opacity-20`} />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</p>
          <motion.p
            key={value}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-display font-bold text-gray-900 dark:text-white mt-1 tracking-tight"
          >
            {value}
          </motion.p>
          {unit && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{unit}</p>
          )}
        </div>
        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-sm shrink-0`}>
          <Icon size={16} className="text-white" />
        </div>
      </div>
    </motion.div>
  );
}

export default function StatsGrid() {
  const { bmr, tdee, water, macros, protein, weeksToGoal, isValid } = useCalorieCalculator();

  const tiles = [
    {
      icon: Flame,
      label: 'BMR',
      value: isValid ? formatNumber(bmr) : '—',
      unit: 'kcal / day at rest',
      gradient: 'from-ember-400 to-rose-500',
    },
    {
      icon: Activity,
      label: 'TDEE',
      value: isValid ? formatNumber(tdee) : '—',
      unit: 'total energy expenditure',
      gradient: 'from-violet-400 to-purple-500',
    },
    {
      icon: Droplets,
      label: 'Water',
      value: isValid ? `${water.liters}L` : '—',
      unit: `${water.cups} cups per day`,
      gradient: 'from-sky-400 to-cyan-500',
    },
    {
      icon: Beef,
      label: 'Protein',
      value: isValid ? `${protein.recommended}g` : '—',
      unit: `${protein.min}–${protein.max}g range`,
      gradient: 'from-brand-400 to-emerald-500',
    },
    {
      icon: Target,
      label: 'Carbs',
      value: isValid && macros ? `${macros.carbs.grams}g` : '—',
      unit: `${macros?.carbs?.percent ?? 0}% of calories`,
      gradient: 'from-amber-400 to-yellow-500',
    },
    {
      icon: Clock,
      label: 'Weeks to Goal',
      value: isValid && weeksToGoal ? weeksToGoal : '—',
      unit: weeksToGoal ? '~0.5 kg/week rate' : 'set a goal weight',
      gradient: 'from-teal-400 to-cyan-600',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
      {tiles.map((tile, i) => (
        <StatTile key={tile.label} {...tile} index={i} />
      ))}
    </div>
  );
}
