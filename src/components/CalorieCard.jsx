// src/components/CalorieCard.jsx
import { motion } from 'framer-motion';
import { Flame, Zap, TrendingDown, TrendingUp } from 'lucide-react';
import { useCalorieCalculator } from '../hooks/useCalorieCalculator';
import { formatNumber } from '../utils/nutritionUtils';

function StatRow({ label, value, icon: Icon, color, highlight }) {
  return (
    <div className={`flex items-center justify-between p-3 rounded-xl transition-colors
      ${highlight ? 'bg-brand-50 dark:bg-brand-900/20 border border-brand-100 dark:border-brand-800/40' : 'bg-gray-50 dark:bg-gray-700/40'}`}
    >
      <div className="flex items-center gap-2.5">
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${color}`}>
          <Icon size={14} className="text-white" />
        </div>
        <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>
      </div>
      <motion.span
        key={value}
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        className={`text-sm font-bold font-mono ${highlight ? 'text-brand-600 dark:text-brand-300' : 'text-gray-800 dark:text-gray-200'}`}
      >
        {formatNumber(value)} <span className="text-xs font-normal text-gray-400">kcal</span>
      </motion.span>
    </div>
  );
}

export default function CalorieCard() {
  const { bmr, tdee, calorieTargets, targetCalories, isValid } = useCalorieCalculator();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      className="bg-white dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-5 shadow-card"
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-ember-400 to-rose-600 flex items-center justify-center shadow-sm">
          <Flame size={16} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">Daily Calories</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">BMR, TDEE & Targets</p>
        </div>
      </div>

      {/* Big TDEE number */}
      <div className="text-center mb-5">
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
          Your TDEE
        </p>
        <motion.div
          key={tdee}
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          className="text-5xl font-display font-bold text-gray-900 dark:text-white tracking-tight"
        >
          {isValid ? formatNumber(tdee) : '—'}
        </motion.div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">calories / day</p>
      </div>

      {/* Stats */}
      {isValid ? (
        <div className="space-y-2">
          <StatRow label="BMR (Base)" value={bmr} icon={Zap} color="bg-violet-500" />
          <StatRow label="Lose Weight" value={calorieTargets.lose} icon={TrendingDown} color="bg-sky-500" />
          <StatRow label="Maintain" value={calorieTargets.maintain} icon={Flame} color="bg-brand-500" highlight />
          <StatRow label="Gain Muscle" value={calorieTargets.gain} icon={TrendingUp} color="bg-ember-500" />
        </div>
      ) : (
        <p className="text-center text-xs text-gray-400 dark:text-gray-500 py-4">
          Fill in your profile to see calorie targets
        </p>
      )}
    </motion.div>
  );
}
