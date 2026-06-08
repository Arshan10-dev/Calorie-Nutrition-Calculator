// src/components/MacroCard.jsx
import { motion } from 'framer-motion';
import { Beef, Droplets, Wheat } from 'lucide-react';
import { useCalorieCalculator } from '../hooks/useCalorieCalculator';
import { formatNumber } from '../utils/nutritionUtils';

const MACRO_CONFIG = [
  {
    key: 'protein',
    label: 'Protein',
    icon: Beef,
    color: 'from-sky-400 to-blue-500',
    bar: 'bg-sky-400',
    textColor: 'text-sky-600 dark:text-sky-300',
    unit: 'g',
    kcalPer: 4,
  },
  {
    key: 'fat',
    label: 'Fat',
    icon: Droplets,
    color: 'from-ember-400 to-orange-500',
    bar: 'bg-ember-400',
    textColor: 'text-orange-600 dark:text-orange-300',
    unit: 'g',
    kcalPer: 9,
  },
  {
    key: 'carbs',
    label: 'Carbs',
    icon: Wheat,
    color: 'from-violet-400 to-purple-500',
    bar: 'bg-violet-400',
    textColor: 'text-violet-600 dark:text-violet-300',
    unit: 'g',
    kcalPer: 4,
  },
];

function MacroRow({ config, data, index }) {
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + index * 0.08, ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${config.color} flex items-center justify-center`}>
            <Icon size={13} className="text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{config.label}</span>
        </div>
        <div className="text-right">
          <motion.span
            key={data?.grams}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-sm font-bold font-mono ${config.textColor}`}
          >
            {formatNumber(data?.grams)}g
          </motion.span>
          <span className="text-xs text-gray-400 dark:text-gray-500 ml-1.5">
            {data?.percent}%
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${config.bar}`}
          initial={{ width: 0 }}
          animate={{ width: `${data?.percent ?? 0}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 + index * 0.1 }}
        />
      </div>

      <p className="text-xs text-gray-400 dark:text-gray-500">
        {formatNumber(data?.calories)} kcal · {config.kcalPer} kcal/g
      </p>
    </motion.div>
  );
}

export default function MacroCard() {
  const { macros, targetCalories, isValid } = useCalorieCalculator();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="bg-white dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-5 shadow-card"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">Macronutrients</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Daily targets by goal</p>
        </div>
        {isValid && (
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-300">
            {formatNumber(targetCalories)} kcal total
          </span>
        )}
      </div>

      {isValid && macros ? (
        <div className="space-y-5">
          {MACRO_CONFIG.map((config, i) => (
            <MacroRow
              key={config.key}
              config={config}
              data={macros[config.key]}
              index={i}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-xs text-gray-400 dark:text-gray-500 py-8">
          Complete your profile to see macro targets
        </p>
      )}
    </motion.div>
  );
}
