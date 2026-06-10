// src/pages/CaloriesPage.jsx
import { motion } from 'framer-motion';
import { Flame, Zap, TrendingDown, TrendingUp, Info } from 'lucide-react';
import { useCalorieCalculator } from '../hooks/useCalorieCalculator';
import { useNav } from '../context/UserContext';
import { formatNumber } from '../utils/nutritionUtils';
import CalorieComparisonChart from '../charts/CalorieComparisonChart';

function MetricBlock({ icon: Icon, label, value, unit, color, note }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-5 shadow-card"
    >
      <div className="flex items-center gap-2.5 mb-4">
        <div className={`w-9 h-9 rounded-xl ${color} flex items-center justify-center shadow-sm`}>
          <Icon size={16} className="text-white" />
        </div>
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{label}</p>
      </div>
      <motion.p key={value} initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        className="text-4xl font-display font-bold text-gray-900 dark:text-white tracking-tight"
      >{formatNumber(value)}</motion.p>
      <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">{unit}</p>
      {note && (
        <div className="mt-3 flex items-start gap-1.5 text-xs text-gray-400 dark:text-gray-500">
          <Info size={12} className="shrink-0 mt-0.5" /><span>{note}</span>
        </div>
      )}
    </motion.div>
  );
}

export default function CaloriesPage() {
  const { bmr, tdee, calorieTargets, isValid } = useCalorieCalculator();
  const { setActiveView } = useNav();

  if (!isValid) return (
    <div className="text-center py-20">
      <p className="text-gray-500 dark:text-gray-400 mb-4">Complete your profile to view calorie data.</p>
      <button onClick={() => setActiveView('profile')} className="px-5 py-2.5 rounded-xl bg-brand-500 text-white text-sm font-semibold hover:bg-brand-600 transition-colors">Go to Profile</button>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Calories</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Calculated using the Mifflin-St Jeor formula</p>
      </div>
      <div className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/10 dark:to-purple-900/10 border border-violet-100 dark:border-violet-800/30 rounded-2xl p-4">
        <p className="text-xs font-semibold text-violet-600 dark:text-violet-400 mb-1.5 uppercase tracking-wide">Mifflin-St Jeor Formula</p>
        <p className="text-xs font-mono text-gray-700 dark:text-gray-300 leading-relaxed">
          Male: BMR = (10 × kg) + (6.25 × cm) − (5 × age) + 5<br />
          Female: BMR = (10 × kg) + (6.25 × cm) − (5 × age) − 161<br />
          TDEE = BMR × Activity Multiplier
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricBlock icon={Zap} label="BMR" value={bmr} unit="kcal/day at complete rest" color="bg-gradient-to-br from-violet-400 to-purple-600" note="Energy needed to sustain basic bodily functions" />
        <MetricBlock icon={Flame} label="TDEE" value={tdee} unit="total daily energy expenditure" color="bg-gradient-to-br from-ember-400 to-rose-600" note="BMR adjusted for your activity level" />
        <MetricBlock icon={TrendingDown} label="Lose Weight" value={calorieTargets.lose} unit="kcal/day (−500 deficit)" color="bg-gradient-to-br from-sky-400 to-blue-600" note="Targets ~0.5 kg/week fat loss" />
        <MetricBlock icon={TrendingUp} label="Gain Muscle" value={calorieTargets.gain} unit="kcal/day (+300 surplus)" color="bg-gradient-to-br from-ember-400 to-orange-600" note="Lean bulk — minimise fat gain" />
      </div>
      <div className="bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-5 shadow-card">
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Calorie Comparison</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">Your BMR, TDEE, and all goal-adjusted targets</p>
        <CalorieComparisonChart />
      </div>
    </motion.div>
  );
}
