// src/constants/activityLevels.js
// Activity multipliers for TDEE calculation (Mifflin-St Jeor)

export const ACTIVITY_LEVELS = [
  {
    id: 'sedentary',
    label: 'Sedentary',
    description: 'Desk job, little or no exercise',
    multiplier: 1.2,
    icon: 'Armchair',
    color: 'from-slate-400 to-slate-500',
    examples: ['Office work', 'Minimal movement', 'Less than 1hr/week activity'],
  },
  {
    id: 'light',
    label: 'Lightly Active',
    description: 'Light exercise 1–3 days/week',
    multiplier: 1.375,
    icon: 'PersonStanding',
    color: 'from-sky-400 to-sky-500',
    examples: ['Walking', 'Light yoga', 'Casual cycling 1–3x/week'],
  },
  {
    id: 'moderate',
    label: 'Moderately Active',
    description: 'Moderate exercise 3–5 days/week',
    multiplier: 1.55,
    icon: 'Bike',
    color: 'from-brand-400 to-brand-500',
    examples: ['Gym 3–5x/week', 'Sports occasionally', 'Cycling commuter'],
  },
  {
    id: 'active',
    label: 'Very Active',
    description: 'Hard exercise 6–7 days/week',
    multiplier: 1.725,
    icon: 'Dumbbell',
    color: 'from-ember-400 to-ember-500',
    examples: ['Daily gym', 'Hard manual labor', 'Running 5+ days/week'],
  },
  {
    id: 'athlete',
    label: 'Athlete',
    description: 'Very hard exercise, twice daily',
    multiplier: 1.9,
    icon: 'Zap',
    color: 'from-violet-400 to-violet-500',
    examples: ['Professional athlete', 'Twice-a-day training', 'Physical job + gym'],
  },
];

export const GOAL_TYPES = [
  {
    id: 'lose',
    label: 'Lose Weight',
    description: 'Caloric deficit for fat loss',
    calorieAdjust: -500,
    color: 'from-sky-400 to-blue-500',
    icon: 'TrendingDown',
  },
  {
    id: 'maintain',
    label: 'Maintain Weight',
    description: 'Eat at TDEE for body maintenance',
    calorieAdjust: 0,
    color: 'from-brand-400 to-emerald-500',
    icon: 'Minus',
  },
  {
    id: 'gain',
    label: 'Gain Muscle',
    description: 'Caloric surplus for muscle growth',
    calorieAdjust: 300,
    color: 'from-ember-400 to-orange-500',
    icon: 'TrendingUp',
  },
];

export const CALORIE_BURN_ACTIVITIES = [
  {
    id: 'walking',
    label: 'Walking',
    icon: 'Footprints',
    metValue: 3.5,
    color: 'bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400',
    accentColor: 'sky',
  },
  {
    id: 'running',
    label: 'Running',
    icon: 'Timer',
    metValue: 9.8,
    color: 'bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400',
    accentColor: 'brand',
  },
  {
    id: 'cycling',
    label: 'Cycling',
    icon: 'Bike',
    metValue: 8.0,
    color: 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400',
    accentColor: 'violet',
  },
  {
    id: 'swimming',
    label: 'Swimming',
    icon: 'Waves',
    metValue: 7.0,
    color: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400',
    accentColor: 'cyan',
  },
  {
    id: 'gym',
    label: 'Gym / Weights',
    icon: 'Dumbbell',
    metValue: 5.5,
    color: 'bg-ember-100 dark:bg-orange-900/30 text-ember-600 dark:text-orange-400',
    accentColor: 'ember',
  },
  {
    id: 'yoga',
    label: 'Yoga',
    icon: 'Flower2',
    metValue: 2.5,
    color: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400',
    accentColor: 'pink',
  },
];

export const BMI_RANGES = [
  { label: 'Severely Underweight', min: 0, max: 16, color: '#3b82f6', bg: 'bg-blue-100', text: 'text-blue-700', darkText: 'dark:text-blue-300' },
  { label: 'Underweight', min: 16, max: 18.5, color: '#38bdf8', bg: 'bg-sky-100', text: 'text-sky-700', darkText: 'dark:text-sky-300' },
  { label: 'Normal Weight', min: 18.5, max: 25, color: '#22c55e', bg: 'bg-green-100', text: 'text-green-700', darkText: 'dark:text-green-300' },
  { label: 'Overweight', min: 25, max: 30, color: '#f97316', bg: 'bg-orange-100', text: 'text-orange-700', darkText: 'dark:text-orange-300' },
  { label: 'Obese Class I', min: 30, max: 35, color: '#ef4444', bg: 'bg-red-100', text: 'text-red-700', darkText: 'dark:text-red-300' },
  { label: 'Obese Class II', min: 35, max: 40, color: '#dc2626', bg: 'bg-red-200', text: 'text-red-800', darkText: 'dark:text-red-200' },
  { label: 'Obese Class III', min: 40, max: Infinity, color: '#991b1b', bg: 'bg-red-300', text: 'text-red-900', darkText: 'dark:text-red-100' },
];
