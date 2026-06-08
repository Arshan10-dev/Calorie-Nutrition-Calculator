// src/pages/MacrosPage.jsx
import { motion } from 'framer-motion';
import MacroCard from '../components/MacroCard';
import MacroPieChart from '../charts/MacroPieChart';
import { useCalorieCalculator } from '../hooks/useCalorieCalculator';
import { useUser } from '../context/UserContext';
import { formatNumber } from '../utils/nutritionUtils';

const MACRO_INFO = [
  {
    key: 'protein',
    label: 'Protein',
    icon: '🥩',
    color: 'sky',
    description: 'Essential for muscle repair and growth. Each gram provides 4 kcal.',
    foods: ['Chicken breast', 'Eggs', 'Greek yogurt', 'Lentils', 'Tuna'],
  },
  {
    key: 'fat',
    label: 'Fat',
    icon: '🥑',
    color: 'orange',
    description: 'Vital for hormones, brain function and fat-soluble vitamins. 9 kcal/g.',
    foods: ['Avocado', 'Olive oil', 'Nuts', 'Salmon', 'Cheese'],
  },
  {
    key: 'carbs',
    label: 'Carbohydrates',
    icon: '🍠',
    color: 'violet',
    description: 'Primary energy source for the body and brain. 4 kcal per gram.',
    foods: ['Oats', 'Sweet potato', 'Brown rice', 'Banana', 'Beans'],
  },
];

const COLOR_MAP = {
  sky: 'text-sky-600 dark:text-sky-300 bg-sky-50 dark:bg-sky-900/20 border-sky-100 dark:border-sky-800/30',
  orange: 'text-orange-600 dark:text-orange-300 bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-800/30',
  violet: 'text-violet-600 dark:text-violet-300 bg-violet-50 dark:bg-violet-900/20 border-violet-100 dark:border-violet-800/30',
};

function MacroDetail({ info, data, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, ease: [0.22, 1, 0.36, 1], duration: 0.45 }}
      className={`rounded-2xl border p-5 ${COLOR_MAP[info.color]}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{info.icon}</span>
          <p className="font-semibold text-sm">{info.label}</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-display font-bold font-mono">{formatNumber(data?.grams)}g</p>
          <p className="text-xs opacity-70">{formatNumber(data?.calories)} kcal · {data?.percent}%</p>
        </div>
      </div>
      <p className="text-xs opacity-80 mb-3 leading-relaxed">{info.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {info.foods.map((f) => (
          <span key={f} className="text-xs px-2 py-0.5 rounded-full bg-white/50 dark:bg-white/10 font-medium">
            {f}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function MacrosPage() {
  const { macros, isValid } = useCalorieCalculator();
  const { setActiveView } = useUser();

  if (!isValid) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 dark:text-gray-400 mb-4">Complete your profile to see macro targets.</p>
        <button
          onClick={() => setActiveView('profile')}
          className="px-5 py-2.5 rounded-xl bg-brand-500 text-white text-sm font-semibold hover:bg-brand-600 transition-colors"
        >
          Go to Profile
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Macronutrients</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Your daily macro targets based on goal and calorie needs
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left: MacroCard */}
        <MacroCard />

        {/* Right: Pie chart */}
        <div className="bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-5 shadow-card">
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Visual Split</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">Percentage of calories by macro</p>
          <MacroPieChart />
        </div>
      </div>

      {/* Macro detail cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {MACRO_INFO.map((info, i) => (
          <MacroDetail key={info.key} info={info} data={macros?.[info.key]} index={i} />
        ))}
      </div>
    </motion.div>
  );
}
