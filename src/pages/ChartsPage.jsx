// src/pages/ChartsPage.jsx
import { motion } from 'framer-motion';
import MacroPieChart from '../charts/MacroPieChart';
import CalorieComparisonChart from '../charts/CalorieComparisonChart';
import WeightProgressChart from '../charts/WeightProgressChart';
import { useNav } from '../context/UserContext';
import { useCalorieCalculator } from '../hooks/useCalorieCalculator';

function ChartSection({ title, subtitle, children, delay = 0 }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.5 }}
      className="bg-white dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-6 shadow-card"
    >
      <div className="mb-5">
        <p className="text-base font-display font-bold text-gray-900 dark:text-white">{title}</p>
        {subtitle && <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </motion.div>
  );
}

export default function ChartsPage() {
  const { isValid }       = useCalorieCalculator();
  const { setActiveView }  = useNav();

  if (!isValid) return (
    <div className="text-center py-20">
      <p className="text-gray-500 dark:text-gray-400 mb-4">Complete your profile to see charts.</p>
      <button onClick={() => setActiveView('profile')} className="px-5 py-2.5 rounded-xl bg-brand-500 text-white text-sm font-semibold hover:bg-brand-600 transition-colors">Go to Profile</button>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Charts</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Visual breakdown of your nutrition data</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ChartSection title="Macronutrient Split" subtitle="Protein · Fat · Carbohydrates — by percentage of daily calories" delay={0}>
          <MacroPieChart />
        </ChartSection>
        <ChartSection title="Calorie Goal Comparison" subtitle="BMR, TDEE and all goal-adjusted calorie targets side by side" delay={0.08}>
          <CalorieComparisonChart />
        </ChartSection>
      </div>
      <ChartSection title="Weight Goal Projection" subtitle="Estimated timeline at ~0.5 kg per week (safe rate)" delay={0.16}>
        <WeightProgressChart />
      </ChartSection>
    </motion.div>
  );
}
