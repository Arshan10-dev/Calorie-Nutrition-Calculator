// src/context/UserContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

// ── Two separate contexts so nav changes never re-render profile consumers ──
const UserContext = createContext(null);
const NavContext  = createContext(null);

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
const LS_THEME_KEY   = 'nutriiq_theme';

function readProfile() {
  try {
    const raw = localStorage.getItem(LS_PROFILE_KEY);
    return raw ? { ...DEFAULT_PROFILE, ...JSON.parse(raw) } : DEFAULT_PROFILE;
  } catch {
    return DEFAULT_PROFILE;
  }
}

function readDark() {
  try {
    const saved = localStorage.getItem(LS_THEME_KEY);
    if (saved !== null) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch {
    return false;
  }
}

export function UserProvider({ children }) {
  // ── Dark mode ────────────────────────────────────────────────────────────
  const [darkMode, setDarkMode] = useState(readDark);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem(LS_THEME_KEY, darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleDarkMode = useCallback(() => setDarkMode(p => !p), []);

  // ── Profile ──────────────────────────────────────────────────────────────
  const [profile, setProfile] = useState(readProfile);

  useEffect(() => {
    localStorage.setItem(LS_PROFILE_KEY, JSON.stringify(profile));
  }, [profile]);

  const updateProfile = useCallback((updates) => {
    setProfile(prev => ({ ...prev, ...updates }));
  }, []);

  const resetProfile = useCallback(() => {
    setProfile(DEFAULT_PROFILE);
    localStorage.removeItem(LS_PROFILE_KEY);
  }, []);

  // ── Navigation (completely separate — won't disturb profile renders) ─────
  const [activeView,  setActiveView]  = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const userValue = { darkMode, toggleDarkMode, profile, updateProfile, resetProfile };
  const navValue  = { activeView, setActiveView, sidebarOpen, setSidebarOpen };

  return (
    <UserContext.Provider value={userValue}>
      <NavContext.Provider value={navValue}>
        {children}
      </NavContext.Provider>
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be inside <UserProvider>');
  return ctx;
}

export function useNav() {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error('useNav must be inside <UserProvider>');
  return ctx;
}
