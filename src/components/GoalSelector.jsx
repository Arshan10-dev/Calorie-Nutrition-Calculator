// src/components/GoalSelector.jsx
import { motion } from 'framer-motion';
import { TrendingDown, Minus, TrendingUp } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { GOAL_TYPES } from '../constants/activityLevels';

const ICON_MAP = { TrendingDown, Minus, TrendingUp };

export default function GoalSelector() {
  const { profile, updateProfile } = useUser();

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-display font-bold text-gray-900 dark:text-white">
          Your Goal
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          Adjusts daily calorie targets
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {GOAL_TYPES.map((g, i) => {
          const Icon = ICON_MAP[g.icon] || Minus;
          const isSelected = profile.goal === g.id;

          return (
            <motion.button
              key={g.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
              onClick={() => updateProfile({ goal: g.id })}
              className={`relative flex flex-col items-center gap-2.5 px-4 py-5 rounded-2xl border transition-all duration-200
                ${isSelected
                  ? 'border-transparent shadow-lg scale-[1.02]'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/40 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
            >
              {/* Gradient background when selected */}
              {isSelected && (
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${g.color} opacity-10 dark:opacity-20`} />
              )}

              {/* Icon */}
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br ${g.color} shadow-md`}>
                <Icon size={20} className="text-white" strokeWidth={2.5} />
              </div>

              <div className="text-center">
                <p className={`text-sm font-bold ${isSelected ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                  {g.label}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">
                  {g.description}
                </p>
              </div>

              {/* Calorie badge */}
              <span className={`text-xs font-mono font-semibold px-2 py-0.5 rounded-full
                ${g.calorieAdjust < 0 ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300' :
                  g.calorieAdjust > 0 ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300' :
                  'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300'
                }`}
              >
                {g.calorieAdjust > 0 ? '+' : ''}{g.calorieAdjust} kcal
              </span>

              {/* Selected indicator ring */}
              {isSelected && (
                <motion.div
                  layoutId="goal-ring"
                  className={`absolute inset-0 rounded-2xl ring-2 ring-offset-2 dark:ring-offset-gray-900 pointer-events-none
                    ${g.id === 'lose' ? 'ring-blue-400' : g.id === 'gain' ? 'ring-orange-400' : 'ring-green-400'}`}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
