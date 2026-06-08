// src/components/Sidebar.jsx
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, User, Activity, Flame, Droplets,
  BarChart3, Target, X, Zap
} from 'lucide-react';
import { useUser } from '../context/UserContext';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'profile', label: 'My Profile', icon: User },
  { id: 'calories', label: 'Calories', icon: Flame },
  { id: 'macros', label: 'Macros', icon: Activity },
  { id: 'hydration', label: 'Hydration', icon: Droplets },
  { id: 'burn', label: 'Burn Estimator', icon: Zap },
  { id: 'charts', label: 'Charts', icon: BarChart3 },
  { id: 'goals', label: 'Goals', icon: Target },
];

function NavItem({ item, active, onClick }) {
  const Icon = item.icon;
  return (
    <button
      onClick={() => onClick(item.id)}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
        ${active
          ? 'bg-brand-500 text-white shadow-neon-green'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
        }`}
    >
      <Icon size={18} />
      <span>{item.label}</span>
      {active && (
        <motion.div
          layoutId="active-dot"
          className="ml-auto w-1.5 h-1.5 rounded-full bg-white/80"
        />
      )}
    </button>
  );
}

// Desktop sidebar (always visible ≥ md)
export function DesktopSidebar() {
  const { activeView, setActiveView } = useUser();

  return (
    <aside className="hidden md:flex flex-col w-60 h-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-r border-gray-200/60 dark:border-gray-800/60 pt-16">
      <div className="flex-1 overflow-y-auto px-3 py-6 space-y-1">
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            active={activeView === item.id}
            onClick={setActiveView}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-gray-200/60 dark:border-gray-800/60">
        <p className="text-xs text-gray-400 dark:text-gray-600 text-center">
          NutriIQ v1.0 · Built for health
        </p>
      </div>
    </aside>
  );
}

// Mobile drawer sidebar
export function MobileSidebar() {
  const { activeView, setActiveView, sidebarOpen, setSidebarOpen } = useUser();

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 left-0 bottom-0 z-50 w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col md:hidden"
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-400 to-emerald-600 flex items-center justify-center">
                  <Zap size={14} className="text-white" fill="white" />
                </div>
                <span className="font-display font-bold text-lg text-gray-900 dark:text-white">
                  Nutri<span className="text-brand-500">IQ</span>
                </span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Nav */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
              {NAV_ITEMS.map((item) => (
                <NavItem
                  key={item.id}
                  item={item}
                  active={activeView === item.id}
                  onClick={(id) => {
                    setActiveView(id);
                    setSidebarOpen(false);
                  }}
                />
              ))}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
