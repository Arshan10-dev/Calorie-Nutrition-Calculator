// src/pages/Dashboard.jsx
import { motion } from 'framer-motion';
import DashboardHeader from '../components/DashboardHeader';
import StatsGrid from '../components/StatsGrid';
import BMICard from '../components/BMICard';
import CalorieCard from '../components/CalorieCard';
import MacroCard from '../components/MacroCard';
import WaterCard from '../components/WaterCard';
import BurnEstimator from '../components/BurnEstimator';
import MacroPieChart from '../charts/MacroPieChart';
import CalorieComparisonChart from '../charts/CalorieComparisonChart';
import WeightProgressChart from '../charts/WeightProgressChart';
import { useCalorieCalculator } from '../hooks/useCalorieCalculator';
import { useNav } from '../context/UserContext';

function ChartCard({ title, subtitle, children }) {
  return (
    <div className="bg-white dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-5 shadow-card">
      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{title}</p>
        {subtitle && <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function EmptyState({ onNavigate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16"
    >
      <div className="w-16 h-16 rounded-2xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mx-auto mb-4">
        <span className="text-3xl">🥦</span>
      </div>
      <h3 className="text-lg font-display font-bold text-gray-900 dark:text-white mb-2">
        Welcome to NutriIQ
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-xs mx-auto">
        Fill in your profile details to unlock personalized nutrition insights and calorie targets.
      </p>
      <button
        onClick={() => onNavigate('profile')}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 text-white text-sm font-semibold hover:bg-brand-600 transition-colors shadow-neon-green"
      >
        Set Up Profile →
      </button>
    </motion.div>
  );
}

export default function Dashboard() {
  const { isValid } = useCalorieCalculator();
  const { setActiveView } = useNav();

  if (!isValid) {
    return <EmptyState onNavigate={setActiveView} />;
  }

  return (
    <div className="space-y-6">
      <DashboardHeader />
      <StatsGrid />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        <BMICard />
        <CalorieCard />
        <MacroCard />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <WaterCard />
        <BurnEstimator />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        <ChartCard title="Macro Split" subtitle="By your daily calorie goal">
          <MacroPieChart />
        </ChartCard>
        <ChartCard title="Calorie Targets" subtitle="BMR vs goal-adjusted calories">
          <CalorieComparisonChart />
        </ChartCard>
        <ChartCard title="Weight Projection" subtitle="Estimated timeline to goal">
          <WeightProgressChart />
        </ChartCard>
      </div>
    </div>
  );
}
