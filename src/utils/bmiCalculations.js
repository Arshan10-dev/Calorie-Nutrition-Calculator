// src/utils/bmiCalculations.js
// BMI calculation and classification

import { BMI_RANGES } from '../constants/activityLevels';

/**
 * Calculate BMI
 * BMI = weight(kg) / height(m)²
 *
 * @param {number} weightKg
 * @param {number} heightCm
 * @returns {number} BMI value rounded to 1 decimal
 */
export function calculateBMI(weightKg, heightCm) {
  if (!weightKg || !heightCm) return 0;
  const heightM = heightCm / 100;
  return parseFloat((weightKg / (heightM * heightM)).toFixed(1));
}

/**
 * Get BMI classification object
 *
 * @param {number} bmi
 * @returns {object} BMI range object from BMI_RANGES
 */
export function getBMICategory(bmi) {
  if (!bmi) return BMI_RANGES[0];
  return (
    BMI_RANGES.find((range) => bmi >= range.min && bmi < range.max) ||
    BMI_RANGES[BMI_RANGES.length - 1]
  );
}

/**
 * Calculate ideal weight range using BMI thresholds (18.5 – 24.9)
 *
 * @param {number} heightCm
 * @returns {{ min: number, max: number }} ideal weight range in kg
 */
export function idealWeightRange(heightCm) {
  if (!heightCm) return { min: 0, max: 0 };
  const heightM = heightCm / 100;
  return {
    min: parseFloat((18.5 * heightM * heightM).toFixed(1)),
    max: parseFloat((24.9 * heightM * heightM).toFixed(1)),
  };
}

/**
 * Get BMI gauge percentage (0-100) for visual indicator
 * Maps BMI range 10–45 to 0–100%
 *
 * @param {number} bmi
 * @returns {number} percentage
 */
export function getBMIGaugePercent(bmi) {
  const min = 10;
  const max = 45;
  const clamped = Math.max(min, Math.min(max, bmi));
  return ((clamped - min) / (max - min)) * 100;
}
