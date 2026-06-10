// src/pages/GoalsPage.jsx
import { motion } from 'framer-motion';
import { Target, Calendar, TrendingDown, TrendingUp, Scale } from 'lucide-react';
import GoalSelector from '../components/GoalSelector';
import WeightProgressChart from '../charts/WeightProgressChart';
import { useCalorieCalculator } from '../hooks/useCalorieCalculator';
import { useUser } from '../context/UserContext';
import { formatNumber, getWeightProgress } from '../utils/nutritionUtils';

function ProgressBar({ value, color }) {
  return (
    <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
      <motion.div className={`h-full rounded-full ${color}`} initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} />
    </div>
  );
}

export default function GoalsPage() {
  const { profile }                                                   = useUser();
  const { weeksToGoal, targetCalories, calorieTargets, isValid }      = useCalorieCalculator();

  const currentWeight = parseFloat(profile.weightKg)     || 0;
  const goalWeight    = parseFloat(profile.goalWeightKg)  || 0;
  const direction     = goalWeight < currentWeight ? 'lose' : 'gain';
  const startWeight   = direction === 'lose' ? currentWeight * 1.05 : currentWeight * 0.95;
  const progress      = getWeightProgress(startWeight, currentWeight, goalWeight);
  const kgToGo        = Math.abs(currentWeight - goalWeight);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Goals</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Set your target, track your timeline</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-5 shadow-card">
          <GoalSelector />
        </div>
        <div className="bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-5 shadow-card space-y-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-teal-600 flex items-center justify-center shadow-sm">
              <Target size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">Goal Summary</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">Based on your profile & goal</p>
            </div>
          </div>
          {isValid && goalWeight ? (
            <>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Weight progress</span><span className="font-semibold font-mono">{progress}%</span>
                </div>
                <ProgressBar value={progress} color="bg-brand-500" />
                <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 font-mono">
                  <span>{currentWeight} kg now</span><span>{goalWeight} kg goal</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Scale,  label: 'To go',   value: `${kgToGo.toFixed(1)} kg`, color: 'text-brand-500' },
                  { icon: Calendar, label: 'Weeks', value: weeksToGoal || '—',        color: 'text-violet-500' },
                  { icon: direction === 'lose' ? TrendingDown : TrendingUp, label: 'Target', value: `${formatNumber(targetCalories)} kcal`, color: 'text-ember-500' },
                ].map(s => (
                  <div key={s.label} className="text-center bg-gray-50 dark:bg-gray-700/40 rounded-xl p-3">
                    <s.icon size={16} className={`${s.color} mx-auto mb-1.5`} />
                    <p className="text-sm font-bold text-gray-900 dark:text-white font-mono">{s.value}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Calorie plan</p>
                {[
                  { label: 'Lose weight', value: calorieTargets.lose,     isActive: profile.goal === 'lose' },
                  { label: 'Maintain',    value: calorieTargets.maintain,  isActive: profile.goal === 'maintain' },
                  { label: 'Gain muscle', value: calorieTargets.gain,      isActive: profile.goal === 'gain' },
                ].map(c => (
                  <div key={c.label} className={`flex justify-between items-center px-3 py-2.5 rounded-xl text-sm transition-colors
                    ${c.isActive ? 'bg-brand-50 dark:bg-brand-900/20 border border-brand-100 dark:border-brand-800/30' : 'bg-gray-50 dark:bg-gray-700/40'}`}>
                    <span className={`font-medium ${c.isActive ? 'text-brand-700 dark:text-brand-300' : 'text-gray-600 dark:text-gray-400'}`}>{c.label}</span>
                    <span className={`font-mono font-bold text-xs ${c.isActive ? 'text-brand-600 dark:text-brand-300' : 'text-gray-500 dark:text-gray-400'}`}>{formatNumber(c.value)} kcal</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-400 dark:text-gray-500 py-4 text-center">
              {isValid ? 'Set a goal weight in your profile.' : 'Complete your profile first.'}
            </p>
          )}
        </div>
      </div>
      {isValid && goalWeight ? (
        <div className="bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-5 shadow-card">
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Weight Timeline</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">Projected at 0.5 kg/week — a safe, sustainable rate</p>
          <WeightProgressChart />
        </div>
      ) : null}
    </motion.div>
  );
}
