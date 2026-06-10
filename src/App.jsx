// src/App.jsx
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

// NO AnimatePresence — simple conditional render, zero blank screen risk
export default function App() {
  const { activeView } = useNav();
  const PageComponent = PAGES[activeView] || Dashboard;

  return (
    <MainLayout>
      <PageComponent key={activeView} />
    </MainLayout>
  );
}
