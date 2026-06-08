// src/components/ActivitySelector.jsx
import { motion } from 'framer-motion';
import { Armchair, PersonStanding, Bike, Dumbbell, Zap } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { ACTIVITY_LEVELS } from '../constants/activityLevels';

const ICON_MAP = {
  Armchair,
  PersonStanding,
  Bike,
  Dumbbell,
  Zap,
};

export default function ActivitySelector() {
  const { profile, updateProfile } = useUser();

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-display font-bold text-gray-900 dark:text-white">
          Activity Level
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          How active are you on a typical week?
        </p>
      </div>

      <div className="space-y-2.5">
        {ACTIVITY_LEVELS.map((level, i) => {
          const Icon = ICON_MAP[level.icon] || Zap;
          const isSelected = profile.activityLevel === level.id;

          return (
            <motion.button
              key={level.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07, ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
              onClick={() => updateProfile({ activityLevel: level.id })}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl border transition-all duration-200 text-left
                ${isSelected
                  ? 'border-brand-400 dark:border-brand-500 bg-brand-50 dark:bg-brand-900/20 shadow-md'
                  : 'border-gray-200 dark:border-gray-700/60 bg-white dark:bg-gray-800/40 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
            >
              {/* Icon bubble */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${level.color} shadow-sm`}
              >
                <Icon size={18} className="text-white" />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${isSelected ? 'text-brand-700 dark:text-brand-300' : 'text-gray-800 dark:text-gray-200'}`}>
                  {level.label}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {level.description}
                </p>
              </div>

              {/* Multiplier badge */}
              <div className={`shrink-0 text-xs font-mono font-bold px-2 py-1 rounded-lg
                ${isSelected
                  ? 'bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}
              >
                ×{level.multiplier}
              </div>

              {/* Selected ring */}
              {isSelected && (
                <motion.div
                  layoutId="activity-ring"
                  className="absolute inset-0 rounded-2xl ring-2 ring-brand-400 dark:ring-brand-500 pointer-events-none"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
