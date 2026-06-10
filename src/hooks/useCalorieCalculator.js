// src/hooks/useCalorieCalculator.js
import { useMemo } from 'react';
import { useUser } from '../context/UserContext';
import { ACTIVITY_LEVELS } from '../constants/activityLevels';
import { calculateBMR, calculateTDEE, calculateCalorieTargets, weeksToGoal } from '../utils/calorieCalculations';
import { calculateBMI, getBMICategory, idealWeightRange } from '../utils/bmiCalculations';
import { calculateMacros, calculateWaterIntake, calculateProtein } from '../utils/nutritionUtils';

export function useCalorieCalculator() {
  const { profile } = useUser();

  // Pull out primitives so useMemo deps are stable scalars, not an object ref
  const age          = profile.age;
  const gender       = profile.gender;
  const heightCm     = profile.heightCm;
  const weightKg     = profile.weightKg;
  const goalWeightKg = profile.goalWeightKg;
  const activityLevel= profile.activityLevel;
  const goal         = profile.goal;

  return useMemo(() => {
    const weight = parseFloat(weightKg);
    const height = parseFloat(heightCm);
    const ageNum = parseInt(age);
    const isValid = weight > 0 && height > 0 && ageNum > 0;

    const activityInfo = ACTIVITY_LEVELS.find(a => a.id === activityLevel);

    if (!isValid) {
      return {
        isValid: false,
        bmr: 0, tdee: 0,
        calorieTargets: { lose: 0, maintain: 0, gain: 0 },
        targetCalories: 0,
        bmi: 0, bmiCategory: null,
        idealWeight: { min: 0, max: 0 },
        macros: null,
        water: { liters: 0, cups: 0, ml: 0 },
        protein: { min: 0, max: 0, recommended: 0, calories: 0 },
        weeksToGoal: 0,
        activityInfo,
      };
    }

    const multiplier    = activityInfo?.multiplier ?? 1.2;
    const bmr           = Math.round(calculateBMR(weight, height, ageNum, gender));
    const tdee          = calculateTDEE(bmr, multiplier);
    const calorieTargets= calculateCalorieTargets(tdee);
    const targetCalories= calorieTargets[goal] ?? tdee;
    const bmi           = calculateBMI(weight, height);
    const bmiCategory   = getBMICategory(bmi);
    const idealWeight   = idealWeightRange(height);
    const macros        = calculateMacros(targetCalories, goal, weight);
    const water         = calculateWaterIntake(weight, activityLevel);
    const protein       = calculateProtein(weight, goal);
    const gw            = parseFloat(goalWeightKg);
    const weeksToGoalNum= gw ? weeksToGoal(weight, gw) : 0;

    return {
      isValid: true,
      bmr, tdee, calorieTargets, targetCalories,
      bmi, bmiCategory, idealWeight,
      macros, water, protein,
      weeksToGoal: weeksToGoalNum,
      activityInfo,
    };
  }, [age, gender, heightCm, weightKg, goalWeightKg, activityLevel, goal]);
}
