// src/components/BurnEstimator.jsx
import { motion } from 'framer-motion';
import { Flame, Timer, Bike, Waves, Dumbbell, Flower2, Footprints, Minus, Plus } from 'lucide-react';
import { useBurnEstimator } from '../hooks/useBurnEstimator';

const ICON_MAP = {
  Footprints, Timer, Bike, Waves, Dumbbell, Flower2, Flame,
};

const DURATION_PRESETS = [15, 30, 45, 60, 90];

export default function BurnEstimator() {
  const {
    activities,
    selectedActivity,
    setSelectedActivity,
    durationMinutes,
    setDurationMinutes,
    activityInfo,
    caloriesBurned,
    fatBurned,
  } = useBurnEstimator();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-5 shadow-card"
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-ember-400 to-rose-500 flex items-center justify-center shadow-sm">
          <Flame size={16} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">Burn Estimator</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">MET-based calculation</p>
        </div>
      </div>

      {/* Activity grid */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-5">
        {activities.map((act) => {
          const Icon = ICON_MAP[act.icon] || Flame;
          const isSelected = selectedActivity === act.id;

          return (
            <button
              key={act.id}
              onClick={() => setSelectedActivity(act.id)}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all duration-200
                ${isSelected
                  ? 'border-ember-400 bg-ember-50 dark:bg-ember-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center
                ${isSelected ? act.color : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}
              >
                <Icon size={16} />
              </div>
              <span className={`text-xs font-medium leading-tight text-center
                ${isSelected ? 'text-ember-600 dark:text-ember-300' : 'text-gray-600 dark:text-gray-400'}`}
              >
                {act.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Duration control */}
      <div className="mb-5">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
          Duration
        </p>

        {/* Preset pills */}
        <div className="flex gap-2 flex-wrap mb-3">
          {DURATION_PRESETS.map((d) => (
            <button
              key={d}
              onClick={() => setDurationMinutes(d)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all
                ${durationMinutes === d
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
            >
              {d} min
            </button>
          ))}
        </div>

        {/* Custom stepper */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDurationMinutes(Math.max(5, durationMinutes - 5))}
            className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <Minus size={16} />
          </button>
          <div className="flex-1 text-center">
            <motion.span
              key={durationMinutes}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-2xl font-display font-bold text-gray-900 dark:text-white"
            >
              {durationMinutes}
            </motion.span>
            <span className="text-sm text-gray-400 dark:text-gray-500 ml-1.5">minutes</span>
          </div>
          <button
            onClick={() => setDurationMinutes(Math.min(240, durationMinutes + 5))}
            className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Result */}
      <div className="bg-gradient-to-br from-ember-50 to-orange-50 dark:from-ember-900/20 dark:to-orange-900/20 rounded-2xl p-5 border border-ember-100 dark:border-ember-800/30">
        <p className="text-xs font-semibold text-ember-600 dark:text-ember-400 uppercase tracking-wider mb-3">
          Estimated Burn
        </p>
        <div className="flex items-end justify-between">
          <div>
            <motion.p
              key={caloriesBurned}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              className="text-4xl font-display font-bold text-ember-600 dark:text-ember-400 tracking-tight"
            >
              {caloriesBurned.toLocaleString()}
            </motion.p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">kilocalories</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-display font-bold text-rose-500 dark:text-rose-400">{fatBurned}g</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">fat burned</p>
          </div>
        </div>

        {activityInfo && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 font-mono">
            MET {activityInfo.metValue} · {durationMinutes} min {activityInfo.label.toLowerCase()}
          </p>
        )}
      </div>
    </motion.div>
  );
}
