// src/hooks/useCalorieCalculator.js
// Central calculation hook — derives all nutrition values from profile

import { useMemo } from 'react';
import { useUser } from '../context/UserContext';
import { ACTIVITY_LEVELS } from '../constants/activityLevels';
import { calculateBMR, calculateTDEE, calculateCalorieTargets, weeksToGoal } from '../utils/calorieCalculations';
import { calculateBMI, getBMICategory, idealWeightRange } from '../utils/bmiCalculations';
import { calculateMacros, calculateWaterIntake, calculateProtein } from '../utils/nutritionUtils';

/**
 * Returns all derived nutrition values reactively computed from the user profile.
 * No side-effects; pure calculations.
 */
export function useCalorieCalculator() {
  const { profile } = useUser();

  const {
    age,
    gender,
    heightCm,
    weightKg,
    goalWeightKg,
    activityLevel,
    goal,
  } = profile;

  return useMemo(() => {
    // Guard: return zeros if required fields are missing
    const weight = parseFloat(weightKg);
    const height = parseFloat(heightCm);
    const ageNum = parseInt(age);

    const isValid = weight > 0 && height > 0 && ageNum > 0;

    if (!isValid) {
      return {
        isValid: false,
        bmr: 0,
        tdee: 0,
        calorieTargets: { lose: 0, maintain: 0, gain: 0 },
        targetCalories: 0,
        bmi: 0,
        bmiCategory: null,
        idealWeight: { min: 0, max: 0 },
        macros: null,
        water: { liters: 0, cups: 0, ml: 0 },
        protein: { min: 0, max: 0, recommended: 0, calories: 0 },
        weeksToGoal: 0,
        activityInfo: ACTIVITY_LEVELS.find((a) => a.id === activityLevel),
      };
    }

    // ── Core calculations ────────────────────────────────────────────────
    const activityInfo = ACTIVITY_LEVELS.find((a) => a.id === activityLevel);
    const multiplier = activityInfo?.multiplier ?? 1.2;

    const bmr = Math.round(calculateBMR(weight, height, ageNum, gender));
    const tdee = calculateTDEE(bmr, multiplier);
    const calorieTargets = calculateCalorieTargets(tdee);

    // Calorie target for selected goal
    const targetCalories = calorieTargets[goal] ?? tdee;

    // ── BMI ──────────────────────────────────────────────────────────────
    const bmi = calculateBMI(weight, height);
    const bmiCategory = getBMICategory(bmi);
    const idealWeight = idealWeightRange(height);

    // ── Macros ───────────────────────────────────────────────────────────
    const macros = calculateMacros(targetCalories, goal);

    // ── Water ────────────────────────────────────────────────────────────
    const water = calculateWaterIntake(weight, activityLevel);

    // ── Protein ──────────────────────────────────────────────────────────
    const protein = calculateProtein(weight, goal);

    // ── Goal timeline ────────────────────────────────────────────────────
    const goalWeight = parseFloat(goalWeightKg);
    const weeksToGoalNum = goalWeight ? weeksToGoal(weight, goalWeight) : 0;

    return {
      isValid: true,
      bmr,
      tdee,
      calorieTargets,
      targetCalories,
      bmi,
      bmiCategory,
      idealWeight,
      macros,
      water,
      protein,
      weeksToGoal: weeksToGoalNum,
      activityInfo,
    };
  }, [age, gender, heightCm, weightKg, goalWeightKg, activityLevel, goal]);
}
