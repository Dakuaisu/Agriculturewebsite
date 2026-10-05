import model from '../../Backend/model.json'

// Mirrors sklearn GaussianNB._joint_log_likelihood + argmax; var already includes epsilon.
export function predict(values, m = model) {
  const x = m.features.map((f) => values[f])
  let best = 0
  let bestScore = -Infinity
  for (let i = 0; i < m.classes.length; i++) {
    let logNorm = 0
    let sq = 0
    for (let j = 0; j < x.length; j++) logNorm += Math.log(2 * Math.PI * m.var[i][j])
    for (let j = 0; j < x.length; j++) sq += (x[j] - m.theta[i][j]) ** 2 / m.var[i][j]
    const score = Math.log(m.class_prior[i]) + (-0.5 * logNorm - 0.5 * sq)
    // strict > keeps the first maximum, like numpy.argmax
    if (score > bestScore) {
      bestScore = score
      best = i
    }
  }
  return m.classes[best]
}
