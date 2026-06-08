// src/components/ThemeToggle.jsx
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useUser } from '../context/UserContext';

export default function ThemeToggle() {
  const { darkMode, toggleDarkMode } = useUser();

  return (
    <button
      onClick={toggleDarkMode}
      className="relative w-14 h-7 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Track icons */}
      <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-amber-500">
        <Sun size={13} />
      </span>
      <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-indigo-400">
        <Moon size={13} />
      </span>

      {/* Thumb */}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        className={`absolute top-0.5 w-6 h-6 rounded-full shadow-md ${
          darkMode
            ? 'bg-gray-900 translate-x-7'
            : 'bg-white translate-x-0.5'
        } transition-colors duration-300`}
        style={{ left: 0 }}
        animate={{ x: darkMode ? 28 : 2 }}
      />
    </button>
  );
}
