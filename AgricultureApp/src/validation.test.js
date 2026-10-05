import { describe, expect, it } from 'vitest'
import ranges from '../../training/feature_ranges.json'
import { FIELDS, validate } from './validation'

const RICE = { N: '90', P: '42', K: '43', temperature: '20.88', humidity: '82', ph: '6.5', rainfall: '202.9' }

describe('validate', () => {
  it('accepts valid input and converts it to numbers', () => {
    expect(validate(RICE)).toEqual({
      errors: {},
      payload: { N: 90, P: 42, K: 43, temperature: 20.88, humidity: 82, ph: 6.5, rainfall: 202.9 },
    })
  })

  it('uses the same ranges as the backend for every model feature', () => {
    expect(FIELDS.map((f) => f.key).sort()).toEqual(Object.keys(ranges).sort())
    for (const f of FIELDS) expect([f.min, f.max]).toEqual([ranges[f.key].min, ranges[f.key].max])
  })

  it.each(FIELDS.map((f) => f.key))('requires %s', (key) => {
    expect(validate({ ...RICE, [key]: '  ' }).errors).toEqual({ [key]: 'Required.' })
  })

  it.each(['abc', 'Infinity', 'NaN'])('rejects non-numeric value %s', (bad) => {
    expect(validate({ ...RICE, N: bad }).errors).toEqual({ N: 'Must be a number.' })
  })

  it.each(FIELDS)('enforces the inclusive range for $key', ({ key, min, max }) => {
    expect(validate({ ...RICE, [key]: String(min) }).errors).toEqual({})
    expect(validate({ ...RICE, [key]: String(max) }).errors).toEqual({})
    const message = `Must be between ${min} and ${max}.`
    expect(validate({ ...RICE, [key]: String(min - 0.01) }).errors).toEqual({ [key]: message })
    expect(validate({ ...RICE, [key]: String(max + 0.01) }).errors).toEqual({ [key]: message })
  })

  it('reports every invalid field at once', () => {
    expect(Object.keys(validate({}).errors).sort()).toEqual(Object.keys(ranges).sort())
  })
})
