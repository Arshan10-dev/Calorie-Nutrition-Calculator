// src/components/DashboardHeader.jsx
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useCalorieCalculator } from '../hooks/useCalorieCalculator';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function DashboardHeader() {
  const { profile } = useUser();
  const { isValid, targetCalories, bmi } = useCalorieCalculator();
  const greeting = getGreeting();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 via-emerald-500 to-teal-500 p-6 md:p-8 shadow-xl"
    >
      {/* Decorative blobs */}
      <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-black/10 blur-2xl pointer-events-none" />

      {/* Shimmer stripe */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 pointer-events-none" />

      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-white/80" />
            <span className="text-white/80 text-sm font-medium">{greeting}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
            {profile.name ? profile.name : 'Your Dashboard'}
          </h1>
          <p className="text-white/70 text-sm mt-1.5 max-w-xs">
            {isValid
              ? `${targetCalories.toLocaleString()} kcal target · BMI ${bmi}`
              : 'Complete your profile to unlock all insights.'}
          </p>
        </div>

        {/* Right: quick stats */}
        {isValid && (
          <div className="flex gap-3 sm:gap-4 shrink-0">
            <StatPill label="Calories" value={`${targetCalories.toLocaleString()} kcal`} />
            <StatPill label="BMI" value={bmi} />
          </div>
        )}
      </div>
    </motion.div>
  );
}

function StatPill({ label, value }) {
  return (
    <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-4 py-3 text-center border border-white/20">
      <p className="text-white/70 text-xs font-medium">{label}</p>
      <motion.p
        key={value}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-white text-lg font-display font-bold mt-0.5"
      >
        {value}
      </motion.p>
    </div>
  );
}
