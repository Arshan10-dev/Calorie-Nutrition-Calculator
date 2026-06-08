// src/hooks/useBurnEstimator.js
// State & derived data for the calorie burn estimator

import { useState, useMemo } from 'react';
import { useUser } from '../context/UserContext';
import { CALORIE_BURN_ACTIVITIES } from '../constants/activityLevels';
import { calculateCaloriesBurned } from '../utils/calorieCalculations';

export function useBurnEstimator() {
  const { profile } = useUser();
  const [selectedActivity, setSelectedActivity] = useState(CALORIE_BURN_ACTIVITIES[0].id);
  const [durationMinutes, setDurationMinutes] = useState(30);

  const activityInfo = useMemo(
    () => CALORIE_BURN_ACTIVITIES.find((a) => a.id === selectedActivity),
    [selectedActivity]
  );

  const caloriesBurned = useMemo(() => {
    const weight = parseFloat(profile.weightKg);
    if (!weight || !activityInfo) return 0;
    return calculateCaloriesBurned(activityInfo.metValue, weight, durationMinutes);
  }, [profile.weightKg, activityInfo, durationMinutes]);

  // Estimate grams of fat burned (1g fat ≈ 7.7 kcal)
  const fatBurned = useMemo(
    () => (caloriesBurned ? parseFloat((caloriesBurned / 7.7).toFixed(1)) : 0),
    [caloriesBurned]
  );

  return {
    activities: CALORIE_BURN_ACTIVITIES,
    selectedActivity,
    setSelectedActivity,
    durationMinutes,
    setDurationMinutes,
    activityInfo,
    caloriesBurned,
    fatBurned,
  };
}
