// src/utils/calorieCalculations.js
// Mifflin-St Jeor BMR & TDEE calculations

/**
 * Calculate BMR using Mifflin-St Jeor formula
 * Male:   BMR = (10 × weight_kg) + (6.25 × height_cm) - (5 × age) + 5
 * Female: BMR = (10 × weight_kg) + (6.25 × height_cm) - (5 × age) - 161
 *
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in cm
 * @param {number} age - Age in years
 * @param {string} gender - 'male' | 'female'
 * @returns {number} BMR in kcal/day
 */
export function calculateBMR(weight, height, age, gender) {
  if (!weight || !height || !age) return 0;
  const base = 10 * weight + 6.25 * height - 5 * age;
  return gender === 'male' ? base + 5 : base - 161;
}

/**
 * Calculate TDEE (Total Daily Energy Expenditure)
 * TDEE = BMR × activity_multiplier
 *
 * @param {number} bmr - Basal Metabolic Rate
 * @param {number} multiplier - Activity level multiplier
 * @returns {number} TDEE in kcal/day
 */
export function calculateTDEE(bmr, multiplier) {
  if (!bmr || !multiplier) return 0;
  return Math.round(bmr * multiplier);
}

/**
 * Calculate daily calorie targets based on goal
 * Weight loss: TDEE - 500 (approx 0.5kg/week loss)
 * Weight gain: TDEE + 300 (lean bulk)
 *
 * @param {number} tdee
 * @param {string} goal - 'lose' | 'maintain' | 'gain'
 * @returns {{ lose: number, maintain: number, gain: number }}
 */
export function calculateCalorieTargets(tdee) {
  if (!tdee) return { lose: 0, maintain: 0, gain: 0 };
  return {
    lose: Math.max(1200, tdee - 500),
    maintain: tdee,
    gain: tdee + 300,
  };
}

/**
 * Estimate weeks to reach goal weight
 *
 * @param {number} currentWeight - kg
 * @param {number} goalWeight - kg
 * @param {number} weeklyRateKg - weekly change in kg (default 0.5)
 * @returns {number} weeks
 */
export function weeksToGoal(currentWeight, goalWeight, weeklyRateKg = 0.5) {
  if (!currentWeight || !goalWeight) return 0;
  const diff = Math.abs(currentWeight - goalWeight);
  return Math.ceil(diff / weeklyRateKg);
}

/**
 * Calculate calories burned from activity
 * Formula: Calories = MET × weight_kg × duration_hours
 *
 * @param {number} metValue - MET value for activity
 * @param {number} weightKg - body weight in kg
 * @param {number} durationMinutes
 * @returns {number} calories burned
 */
export function calculateCaloriesBurned(metValue, weightKg, durationMinutes) {
  if (!metValue || !weightKg || !durationMinutes) return 0;
  return Math.round(metValue * weightKg * (durationMinutes / 60));
}
