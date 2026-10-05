import { useState } from 'react'
import axios from 'axios'
import { FIELDS, validate } from './validation'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000'
const EMPTY = Object.fromEntries(FIELDS.map((f) => [f.key, '']))

function Croprecc() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [crop, setCrop] = useState(null)
  const [failure, setFailure] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
    setErrors({ ...errors, [name]: undefined })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { errors: found, payload } = validate(values)
    setErrors(found)
    if (Object.keys(found).length) return
    setFailure(null)
    setLoading(true)
    try {
      const response = await axios.post(`${API_URL}/predict`, payload, { timeout: 90000 })
      setCrop(response.data.crop)
    } catch (err) {
      if (err.response?.data?.errors) setErrors(err.response.data.errors)
      else if (err.response) setFailure(`The server returned an error (${err.response.status}). Please try again.`)
      else setFailure('Could not reach the prediction server. The free host sleeps when idle and can take up to a minute to wake up; please try again.')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setCrop(null)
    setValues(EMPTY)
    setErrors({})
    setFailure(null)
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="mb-6 text-center text-3xl font-extrabold text-background sm:text-4xl">Crop Recommendation</h1>
      <form onSubmit={handleSubmit} noValidate className="grid gap-4 rounded-lg bg-white/60 p-4 shadow sm:grid-cols-2 sm:p-6">
        {FIELDS.map(({ key, label, min, max, step }) => (
          <div key={key}>
            <label htmlFor={key} className="block text-sm font-medium text-gray-800">{label}</label>
            <input
              id={key}
              name={key}
              type="number"
              inputMode="decimal"
              min={min}
              max={max}
              step={step}
              value={values[key]}
              onChange={handleChange}
              placeholder={`${min} – ${max}`}
              aria-invalid={Boolean(errors[key])}
              aria-describedby={errors[key] ? `${key}-error` : undefined}
              className={`mt-1 w-full rounded border bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-secondary ${errors[key] ? 'border-red-600' : 'border-gray-300'}`}
            />
            {errors[key] && <p id={`${key}-error`} className="mt-1 text-sm text-red-700">{errors[key]}</p>}
          </div>
        ))}
        <button type="submit" disabled={loading} className="rounded-lg bg-secondary px-5 py-2.5 font-medium text-white hover:bg-primary disabled:opacity-60 sm:col-span-2">
          {loading ? 'Asking the model…' : 'Recommend a crop'}
        </button>
      </form>
      {failure && <p className="mt-4 rounded-lg bg-red-100 p-3 text-red-800" role="alert">{failure}</p>}
      {crop && (
        <div className="mt-6 rounded-lg bg-white/80 p-4 shadow" role="status">
          <p className="text-lg">Recommended crop: <strong className="capitalize">{crop}</strong></p>
          <button onClick={reset} className="mt-3 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-white hover:bg-primary">
            Start again
          </button>
        </div>
      )}
    </div>
  )
}

export default Croprecc
