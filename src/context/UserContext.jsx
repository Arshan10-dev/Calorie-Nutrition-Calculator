// src/context/UserContext.jsx
// Global user profile & theme state — persisted to localStorage
// 
// FIX: activeView and sidebarOpen are now kept in a separate NavigationContext
// so that navigating between pages does NOT trigger a profile context re-render,
// which was causing useCalorieCalculator to see a stale/empty profile briefly.

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

// ── User / Profile context ─────────────────────────────────────────────────
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

// ── Navigation context (separate to avoid cross-contamination) ─────────────
const NavContext = createContext(null);

export function UserProvider({ children }) {
  // ── Theme ────────────────────────────────────────────────────────────────
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem(LS_THEME_KEY);
      if (saved !== null) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    darkMode ? root.classList.add('dark') : root.classList.remove('dark');
    localStorage.setItem(LS_THEME_KEY, darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleDarkMode = useCallback(() => setDarkMode((p) => !p), []);

  // ── Profile ──────────────────────────────────────────────────────────────
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(LS_PROFILE_KEY);
      return saved ? { ...DEFAULT_PROFILE, ...JSON.parse(saved) } : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  // Write to localStorage whenever profile changes
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

  // ── Navigation (separate state — does NOT live inside UserContext) ────────
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const userValue = {
    darkMode,
    toggleDarkMode,
    profile,
    updateProfile,
    resetProfile,
  };

  const navValue = {
    activeView,
    setActiveView,
    sidebarOpen,
    setSidebarOpen,
  };

  return (
    <UserContext.Provider value={userValue}>
      <NavContext.Provider value={navValue}>
        {children}
      </NavContext.Provider>
    </UserContext.Provider>
  );
}

// ── Hooks ────────────────────────────────────────────────────────────────────
export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used inside <UserProvider>');
  return ctx;
}

export function useNav() {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error('useNav must be used inside <UserProvider>');
  return ctx;
}
