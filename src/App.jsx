// src/App.jsx
// Top-level router: swaps pages based on activeView from UserContext

import { AnimatePresence, motion } from 'framer-motion';
import { useUser } from './context/UserContext';
import MainLayout from './layouts/MainLayout';

// Pages
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import CaloriesPage from './pages/CaloriesPage';
import MacrosPage from './pages/MacrosPage';
import HydrationPage from './pages/HydrationPage';
import BurnPage from './pages/BurnPage';
import ChartsPage from './pages/ChartsPage';
import GoalsPage from './pages/GoalsPage';

// Page transition wrapper
const PageWrapper = ({ children }) => (
  <motion.div
    key="page"
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

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
  const { activeView } = useUser();
  const PageComponent = PAGES[activeView] || Dashboard;

  return (
    <MainLayout>
      <AnimatePresence mode="wait">
        <PageWrapper key={activeView}>
          <PageComponent />
        </PageWrapper>
      </AnimatePresence>
    </MainLayout>
  );
}
