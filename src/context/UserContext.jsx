// src/context/UserContext.jsx
// Global user profile & theme state — persisted to localStorage

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const UserContext = createContext(null);

const DEFAULT_PROFILE = {
  name: '',
  age: '',
  gender: 'male',
  heightCm: '',
  weightKg: '',
  goalWeightKg: '',
  activityLevel: 'moderate',
  goal: 'maintain',
};

const LS_PROFILE_KEY = 'nutriiq_profile';
const LS_THEME_KEY = 'nutriiq_theme';

export function UserProvider({ children }) {
  // ── Theme ──────────────────────────────────────────────────────────────
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem(LS_THEME_KEY);
    if (saved !== null) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem(LS_THEME_KEY, darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleDarkMode = useCallback(() => setDarkMode((prev) => !prev), []);

  // ── Profile ────────────────────────────────────────────────────────────
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(LS_PROFILE_KEY);
      return saved ? { ...DEFAULT_PROFILE, ...JSON.parse(saved) } : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  // Persist on every change
  useEffect(() => {
    localStorage.setItem(LS_PROFILE_KEY, JSON.stringify(profile));
  }, [profile]);

  const updateProfile = useCallback((updates) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetProfile = useCallback(() => {
    setProfile(DEFAULT_PROFILE);
    localStorage.removeItem(LS_PROFILE_KEY);
  }, []);

  // ── Active view ────────────────────────────────────────────────────────
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const value = {
    // Theme
    darkMode,
    toggleDarkMode,
    // Profile
    profile,
    updateProfile,
    resetProfile,
    // Navigation
    activeView,
    setActiveView,
    sidebarOpen,
    setSidebarOpen,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// Hook
export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within <UserProvider>');
  return ctx;
}
