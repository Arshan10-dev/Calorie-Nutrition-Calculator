// src/components/Navbar.jsx
import { motion } from 'framer-motion';
import { Menu, Zap } from 'lucide-react';
import { useUser, useNav } from '../context/UserContext';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const { profile }                    = useUser();
  const { setSidebarOpen, sidebarOpen } = useNav();

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 h-16"
    >
      <div className="absolute inset-0 bg-white/70 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200/60 dark:border-gray-800/60" />
      <div className="relative flex items-center justify-between h-full px-4 md:px-6 max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-400 to-emerald-600 flex items-center justify-center shadow-neon-green">
              <Zap size={16} className="text-white" fill="white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-gray-900 dark:text-white">
              Nutri<span className="text-brand-500">IQ</span>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {profile.name && (
            <span className="hidden sm:block text-sm font-medium text-gray-500 dark:text-gray-400">
              Hey, <span className="text-gray-900 dark:text-white">{profile.name}</span> 👋
            </span>
          )}
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}
