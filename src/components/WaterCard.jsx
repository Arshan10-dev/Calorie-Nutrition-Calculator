// src/components/WaterCard.jsx
import { motion } from 'framer-motion';
import { Droplets } from 'lucide-react';
import { useCalorieCalculator } from '../hooks/useCalorieCalculator';

function WaterGlass({ filled }) {
  // 8 cups max visual
  const cups = Math.min(filled, 8);
  const total = 8;

  return (
    <div className="flex gap-1.5 flex-wrap justify-center mt-4">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.06, type: 'spring', stiffness: 260, damping: 18 }}
          className={`w-8 h-10 rounded-b-xl rounded-t-sm border-2 transition-colors duration-500
            ${i < cups
              ? 'bg-sky-400 border-sky-500 shadow-sm'
              : 'bg-gray-100 dark:bg-gray-700/60 border-gray-200 dark:border-gray-600'
            }`}
        >
          {i < cups && (
            <div className="w-full h-1/3 rounded-t-sm bg-sky-300/60" />
          )}
        </motion.div>
      ))}
    </div>
  );
}

export default function WaterCard() {
  const { water, isValid } = useCalorieCalculator();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className="bg-white dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-5 shadow-card"
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-cyan-500 flex items-center justify-center shadow-sm">
          <Droplets size={16} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">Hydration</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">Daily water intake</p>
        </div>
      </div>

      {/* Big number */}
      <div className="text-center">
        <motion.div
          key={water.liters}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          className="text-5xl font-display font-bold text-sky-500 dark:text-sky-400 tracking-tight"
        >
          {isValid ? water.liters : '—'}
        </motion.div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">litres per day</p>
      </div>

      {/* Cup visual */}
      {isValid && <WaterGlass filled={water.cups} />}

      {/* Stats row */}
      {isValid && (
        <div className="flex justify-around mt-5 pt-4 border-t border-gray-100 dark:border-gray-700/60">
          <div className="text-center">
            <p className="text-sm font-bold font-mono text-gray-800 dark:text-gray-200">{water.ml.toLocaleString()}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">ml</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold font-mono text-gray-800 dark:text-gray-200">{water.cups}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">cups (240ml)</p>
          </div>
        </div>
      )}

      {!isValid && (
        <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4">
          Enter your weight & activity level
        </p>
      )}
    </motion.div>
  );
}
