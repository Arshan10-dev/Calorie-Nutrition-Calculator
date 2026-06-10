// src/App.jsx
import { AnimatePresence, motion } from 'framer-motion';
import { useNav } from './context/UserContext';
import MainLayout from './layouts/MainLayout';

import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import CaloriesPage from './pages/CaloriesPage';
import MacrosPage from './pages/MacrosPage';
import HydrationPage from './pages/HydrationPage';
import BurnPage from './pages/BurnPage';
import ChartsPage from './pages/ChartsPage';
import GoalsPage from './pages/GoalsPage';

const PAGES = {
  dashboard: Dashboard,
  profile: ProfilePage,
  calories: CaloriesPage,
  macros: MacrosPage,
  hydration: HydrationPage,
  burn: BurnPage,
  charts: ChartsPage,
  goals: GoalsPage,
};

export default function App() {
  const { activeView } = useNav();
  const PageComponent = PAGES[activeView] || Dashboard;

  return (
    <MainLayout>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <PageComponent />
        </motion.div>
      </AnimatePresence>
    </MainLayout>
  );
}
