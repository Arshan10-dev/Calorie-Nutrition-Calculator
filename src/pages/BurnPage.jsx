// src/pages/BurnPage.jsx
import { motion } from 'framer-motion';
import BurnEstimator from '../components/BurnEstimator';
import { CALORIE_BURN_ACTIVITIES } from '../constants/activityLevels';
import { useUser } from '../context/UserContext';
import { calculateCaloriesBurned } from '../utils/calorieCalculations';

const DURATION_LABELS = [15, 30, 45, 60];

function ActivityTable({ weightKg }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 dark:border-gray-700">
            <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 pb-3 pr-4">
              Activity
            </th>
            {DURATION_LABELS.map((d) => (
              <th key={d} className="text-right text-xs font-semibold text-gray-500 dark:text-gray-400 pb-3 px-2">
                {d} min
              </th>
            ))}
            <th className="text-right text-xs font-semibold text-gray-500 dark:text-gray-400 pb-3 pl-2">
              MET
            </th>
          </tr>
        </thead>
        <tbody>
          {CALORIE_BURN_ACTIVITIES.map((act, i) => (
            <motion.tr
              key={act.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
              className="border-b border-gray-50 dark:border-gray-800/60 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
            >
              <td className="py-3 pr-4">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full bg-brand-500`} />
                  <span className="font-medium text-gray-800 dark:text-gray-200">{act.label}</span>
                </div>
              </td>
              {DURATION_LABELS.map((d) => (
                <td key={d} className="py-3 px-2 text-right font-mono text-xs text-gray-600 dark:text-gray-400">
                  {weightKg
                    ? calculateCaloriesBurned(act.metValue, parseFloat(weightKg), d).toLocaleString()
                    : '—'}
                </td>
              ))}
              <td className="py-3 pl-2 text-right">
                <span className="text-xs font-mono font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-md">
                  {act.metValue}
                </span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function BurnPage() {
  const { profile } = useUser();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
          Burn Estimator
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          MET-based calorie burn estimates for 6 activities
        </p>
      </div>

      {/* Interactive estimator */}
      <BurnEstimator />

      {/* Full reference table */}
      <div className="bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-5 shadow-card">
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
          Activity Reference Table
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-5">
          Calories burned based on your weight ({profile.weightKg ? `${profile.weightKg} kg` : 'set in profile'})
        </p>
        <ActivityTable weightKg={profile.weightKg} />

        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/40 rounded-xl">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
            Formula: Calories = MET × weight (kg) × duration (hours)
          </p>
        </div>
      </div>
    </motion.div>
  );
}
