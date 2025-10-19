// src/utils/calculations.js

/** Calculate % change between two values */
export function getPercentChange(current, previous) {
  if (!previous || previous === 0) return 0;
  return (((current - previous) / previous) * 100).toFixed(1);
}

/** Count number of critical alerts */
export function countCriticalAlerts(alerts, threshold = 20) {
  if (!Array.isArray(alerts)) return 0;
  return alerts.filter(a => a.value > threshold).length;
}
