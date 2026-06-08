// src/pages/HydrationPage.jsx
import { motion } from 'framer-motion';
import { Droplets, Info } from 'lucide-react';
import WaterCard from '../components/WaterCard';
import { useCalorieCalculator } from '../hooks/useCalorieCalculator';
import { useUser } from '../context/UserContext';

const HYDRATION_TIPS = [
  { icon: '🌅', tip: 'Start every morning with 500ml of water before coffee.' },
  { icon: '⏰', tip: 'Set hourly reminders to sip throughout the day.' },
  { icon: '🥗', tip: 'Eat water-rich foods: cucumber, lettuce, watermelon.' },
  { icon: '🏋️', tip: 'Add 500–750ml for every hour of exercise.' },
  { icon: '☀️', tip: 'Hot weather and air conditioning increase water needs.' },
  { icon: '☕', tip: 'Coffee and tea count, but limit diuretic excess.' },
];

function HydrationLevel({ label, pct, color }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs font-medium text-gray-600 dark:text-gray-400">
        <span>{label}</span>
        <span className="font-mono">{pct}%</span>
      </div>
      <div className="h-2.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

export default function HydrationPage() {
  const { water, isValid } = useCalorieCalculator();
  const { setActiveView } = useUser();

  if (!isValid) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 dark:text-gray-400 mb-4">Complete your profile to see hydration targets.</p>
        <button
          onClick={() => setActiveView('profile')}
          className="px-5 py-2.5 rounded-xl bg-brand-500 text-white text-sm font-semibold hover:bg-brand-600 transition-colors"
        >
          Go to Profile
        </button>
      </div>
    );
  }

  // Body water percentages by time of day (illustrative)
  const hydrationLevels = [
    { label: 'Morning (wake up)', pct: 65, color: 'bg-amber-400' },
    { label: 'Mid-morning', pct: 72, color: 'bg-sky-400' },
    { label: 'Afternoon', pct: 68, color: 'bg-blue-400' },
    { label: 'Evening (goal)', pct: 80, color: 'bg-brand-400' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Hydration</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Personalised daily water intake recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Water card */}
        <WaterCard />

        {/* Breakdown */}
        <div className="bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-5 shadow-card space-y-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-cyan-600 flex items-center justify-center shadow-sm">
              <Droplets size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">Daily Breakdown</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">How to spread your intake</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { label: 'Total', value: `${water.liters}L`, sub: `${water.ml.toLocaleString()} ml` },
              { label: 'Cups', value: water.cups, sub: '240 ml each' },
              { label: 'Per hour', value: `${Math.round(water.ml / 16)} ml`, sub: '16 waking hrs' },
            ].map((item) => (
              <div key={item.label} className="bg-sky-50 dark:bg-sky-900/20 rounded-xl p-3 border border-sky-100 dark:border-sky-800/30">
                <p className="text-xs text-sky-500 dark:text-sky-400 font-medium">{item.label}</p>
                <p className="text-xl font-display font-bold text-sky-700 dark:text-sky-300 mt-1">{item.value}</p>
                <p className="text-xs text-sky-400 dark:text-sky-500 mt-0.5">{item.sub}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3 pt-2">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Hydration levels throughout the day
            </p>
            {hydrationLevels.map((h) => (
              <HydrationLevel key={h.label} {...h} />
            ))}
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-5 shadow-card">
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4">Hydration Tips</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {HYDRATION_TIPS.map((tip) => (
            <div key={tip.tip} className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-700/40 rounded-xl">
              <span className="text-lg shrink-0">{tip.icon}</span>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{tip.tip}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-start gap-2 p-3 bg-sky-50 dark:bg-sky-900/10 rounded-xl border border-sky-100 dark:border-sky-800/30">
          <Info size={14} className="text-sky-500 shrink-0 mt-0.5" />
          <p className="text-xs text-sky-700 dark:text-sky-300">
            Formula: 35 ml × body weight (kg) + activity bonus. Individual needs vary — thirst, urine colour,
            and energy levels are better real-time indicators.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
