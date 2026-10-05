import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import model from '../../training/model.json'
import sklearnPredictions from '../../training/sklearn_predictions.json'
import { predict } from './predict'

const csv = readFileSync(new URL('../../training/data/Crop_recommendation.csv', import.meta.url), 'utf8')
const [header, ...lines] = csv.trim().split('\n')
const columns = header.split(',')
const rows = lines.map((line) => {
  const cells = line.split(',')
  return Object.fromEntries(model.features.map((f) => [f, Number(cells[columns.indexOf(f)])]))
})

describe('predict', () => {
  it('has one sklearn prediction per dataset row', () => {
    expect(rows).toHaveLength(2200)
    expect(sklearnPredictions).toHaveLength(rows.length)
  })

  it("matches sklearn's predict exactly on every row of the dataset", () => {
    const mismatches = rows
      .map((row, i) => ({ row: i, js: predict(row), sklearn: sklearnPredictions[i] }))
      .filter((r) => r.js !== r.sklearn)
    expect(mismatches).toEqual([])
  })

  it('uses only predict-time parameters with no preprocessing', () => {
    expect(model.type).toBe('GaussianNB')
    expect(model.preprocessing).toEqual([])
  })
})
