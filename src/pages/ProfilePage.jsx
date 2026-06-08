// src/pages/ProfilePage.jsx
import { motion } from 'framer-motion';
import ProfileForm from '../components/ProfileForm';
import ActivitySelector from '../components/ActivitySelector';
import GoalSelector from '../components/GoalSelector';
import BMICard from '../components/BMICard';
import CalorieCard from '../components/CalorieCard';

const Card = ({ children }) => (
  <div className="bg-white dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-6 shadow-card">
    {children}
  </div>
);

export default function ProfilePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-6"
    >
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
          My Profile
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Your data is saved automatically in your browser — no account needed.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left column: forms */}
        <div className="xl:col-span-2 space-y-5">
          <Card>
            <ProfileForm />
          </Card>

          <Card>
            <ActivitySelector />
          </Card>

          <Card>
            <GoalSelector />
          </Card>
        </div>

        {/* Right column: live preview cards */}
        <div className="space-y-5">
          <BMICard />
          <CalorieCard />
        </div>
      </div>
    </motion.div>
  );
}
