// src/components/BMICard.jsx
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import { useCalorieCalculator } from '../hooks/useCalorieCalculator';
import { getBMIGaugePercent } from '../utils/bmiCalculations';
import { BMI_RANGES } from '../constants/activityLevels';

function BMIGauge({ bmi }) {
  const pct = getBMIGaugePercent(bmi);

  // Gradient stops matching BMI ranges
  const gradientId = 'bmi-gradient';

  return (
    <div className="relative mt-3">
      {/* Track */}
      <div className="h-3 rounded-full overflow-hidden bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-500">
        {/* Marker */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-gray-700 dark:border-gray-200 shadow-lg z-10"
          initial={{ left: '50%' }}
          animate={{ left: `calc(${pct}% - 8px)` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
      </div>

      {/* Scale labels */}
      <div className="flex justify-between mt-1.5 text-xs text-gray-400 dark:text-gray-500 font-mono">
        <span>10</span>
        <span>18.5</span>
        <span>25</span>
        <span>30</span>
        <span>40+</span>
      </div>
    </div>
  );
}

export default function BMICard() {
  const { bmi, bmiCategory, idealWeight, isValid } = useCalorieCalculator();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-5 shadow-card"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-sm">
            <Activity size={16} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">BMI</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">Body Mass Index</p>
          </div>
        </div>

        {isValid && bmiCategory && (
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${bmiCategory.bg} ${bmiCategory.text} ${bmiCategory.darkText}`}>
            {bmiCategory.label}
          </span>
        )}
      </div>

      {/* BMI Value */}
      <div className="text-center py-2">
        <motion.div
          key={bmi}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          className="text-5xl font-display font-bold text-gray-900 dark:text-white tracking-tight"
        >
          {isValid ? bmi : '—'}
        </motion.div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">kg/m²</p>
      </div>

      {/* Gauge */}
      {isValid && <BMIGauge bmi={bmi} />}

      {/* Ideal weight range */}
      {isValid && (
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between">
          <p className="text-xs text-gray-500 dark:text-gray-400">Ideal range</p>
          <p className="text-xs font-semibold font-mono text-gray-700 dark:text-gray-300">
            {idealWeight.min} – {idealWeight.max} kg
          </p>
        </div>
      )}

      {!isValid && (
        <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4">
          Fill in your profile to calculate BMI
        </p>
      )}
    </motion.div>
  );
}
