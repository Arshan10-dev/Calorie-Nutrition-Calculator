// src/utils/nutritionUtils.js
// Macronutrient and water intake recommendations

/**
 * Calculate recommended daily protein intake
 * Based on goal: 1.6–2.2g/kg for muscle gain, 1.2–1.6g/kg for maintenance,
 * 1.2–1.5g/kg for weight loss
 *
 * @param {number} weightKg
 * @param {string} goal - 'lose' | 'maintain' | 'gain'
 * @returns {{ min: number, max: number, recommended: number }} grams per day
 */
export function calculateProtein(weightKg, goal) {
  if (!weightKg) return { min: 0, max: 0, recommended: 0 };

  const multipliers = {
    lose: { min: 1.2, max: 1.6, rec: 1.4 },
    maintain: { min: 1.2, max: 1.6, rec: 1.4 },
    gain: { min: 1.6, max: 2.2, rec: 1.9 },
  };

  const m = multipliers[goal] || multipliers.maintain;
  return {
    min: Math.round(weightKg * m.min),
    max: Math.round(weightKg * m.max),
    recommended: Math.round(weightKg * m.rec),
    calories: Math.round(weightKg * m.rec * 4), // 4 kcal per gram
  };
}

/**
 * Calculate macronutrient split from total daily calories
 * Typical split: Protein 25–30%, Fat 25–35%, Carbs 40–50%
 *
 * @param {number} totalCalories
 * @param {string} goal - 'lose' | 'maintain' | 'gain'
 * @returns {{ protein: { grams, calories, percent }, fat: {...}, carbs: {...} }}
 */
export function calculateMacros(totalCalories, goal) {
  if (!totalCalories) return null;

  const splits = {
    lose: { protein: 0.30, fat: 0.30, carbs: 0.40 },
    maintain: { protein: 0.25, fat: 0.30, carbs: 0.45 },
    gain: { protein: 0.25, fat: 0.25, carbs: 0.50 },
  };

  const split = splits[goal] || splits.maintain;

  const proteinCals = totalCalories * split.protein;
  const fatCals = totalCalories * split.fat;
  const carbCals = totalCalories * split.carbs;

  return {
    protein: {
      grams: Math.round(proteinCals / 4),
      calories: Math.round(proteinCals),
      percent: Math.round(split.protein * 100),
    },
    fat: {
      grams: Math.round(fatCals / 9),
      calories: Math.round(fatCals),
      percent: Math.round(split.fat * 100),
    },
    carbs: {
      grams: Math.round(carbCals / 4),
      calories: Math.round(carbCals),
      percent: Math.round(split.carbs * 100),
    },
  };
}

/**
 * Calculate recommended daily water intake
 * Base: 35ml per kg body weight
 * Exercise adds approx 500ml per hour
 *
 * @param {number} weightKg
 * @param {string} activityLevel - 'sedentary' | 'light' | 'moderate' | 'active' | 'athlete'
 * @returns {{ liters: number, cups: number, ml: number }}
 */
export function calculateWaterIntake(weightKg, activityLevel) {
  if (!weightKg) return { liters: 0, cups: 0, ml: 0 };

  const activityBonus = {
    sedentary: 0,
    light: 300,
    moderate: 500,
    active: 700,
    athlete: 1000,
  };

  const baseMl = weightKg * 35;
  const bonus = activityBonus[activityLevel] || 0;
  const totalMl = baseMl + bonus;

  return {
    ml: Math.round(totalMl),
    liters: parseFloat((totalMl / 1000).toFixed(1)),
    cups: Math.round(totalMl / 240),
  };
}

/**
 * Format number with commas
 * @param {number} num
 * @returns {string}
 */
export function formatNumber(num) {
  if (!num && num !== 0) return '—';
  return num.toLocaleString('en-US');
}

/**
 * Get progress percentage between current weight, goal weight
 * @param {number} start - starting weight (can be derived from profile)
 * @param {number} current
 * @param {number} goal
 * @returns {number} 0-100
 */
export function getWeightProgress(start, current, goal) {
  if (!start || !current || !goal) return 0;
  if (start === goal) return 100;
  const totalChange = Math.abs(goal - start);
  const achievedChange = Math.abs(current - start);
  const rawPct = (achievedChange / totalChange) * 100;
  return Math.min(100, Math.max(0, Math.round(rawPct)));
}
