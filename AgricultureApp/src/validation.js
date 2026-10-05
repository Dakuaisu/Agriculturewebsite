import ranges from '../../Backend/feature_ranges.json'

export const FIELDS = [
  { key: 'N', label: 'Nitrogen (N)', step: 1 },
  { key: 'P', label: 'Phosphorus (P)', step: 1 },
  { key: 'K', label: 'Potassium (K)', step: 1 },
  { key: 'temperature', label: 'Temperature (°C)', step: 0.1 },
  { key: 'humidity', label: 'Relative humidity (%)', step: 0.1 },
  { key: 'ph', label: 'Soil pH', step: 0.1 },
  { key: 'rainfall', label: 'Rainfall (mm)', step: 0.1 },
].map((field) => ({ ...field, ...ranges[field.key] }))

export function validate(values) {
  const errors = {}
  const payload = {}
  for (const { key, min, max } of FIELDS) {
    const raw = String(values[key] ?? '').trim()
    const value = Number(raw)
    if (raw === '') errors[key] = 'Required.'
    else if (!Number.isFinite(value)) errors[key] = 'Must be a number.'
    else if (value < min || value > max) errors[key] = `Must be between ${min} and ${max}.`
    else payload[key] = value
  }
  return { errors, payload }
}
