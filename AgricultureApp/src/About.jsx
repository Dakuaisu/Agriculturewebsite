const REPO = 'https://github.com/Dakuaisu/Agriculturewebsite'

function About() {
  return (
    <article className="mx-auto max-w-xl space-y-4 rounded-lg bg-white/60 p-4 text-gray-900 shadow sm:p-6">
      <h1 className="text-3xl font-extrabold text-background">About</h1>
      <p>
        AgriApp suggests one of 22 crops from seven numbers: soil nitrogen, phosphorus and potassium,
        temperature, humidity, soil pH and rainfall. It was a 2024 college group project.
      </p>
      <h2 className="text-xl font-bold">How it works</h2>
      <p>
        Everything runs in your browser. There&apos;s no server, so nothing to wait for and your values never leave
        the page. The model is a Gaussian naive Bayes classifier trained with scikit-learn on the public{' '}
        <a className="underline" href="https://www.kaggle.com/datasets/atharvaingle/crop-recommendation-dataset">
          Crop Recommendation Dataset
        </a>{' '}
        by Atharva Ingle (2,200 rows, 100 per crop, Apache 2.0). It&apos;s exported to a small JSON file, and a
        test checks that the browser gives exactly the same answer as scikit-learn on every row of the dataset.
      </p>
      <h2 className="text-xl font-bold">Limits</h2>
      <p>
        The model scores about 99% on held-out data, but that says more about the dataset than the model:
        decision trees score about the same, and naive Bayes was picked for simplicity, not accuracy. The dataset was built by augmenting Indian rainfall,
        climate and fertiliser data, and the method isn&apos;t documented, so treat it as partly synthetic.
        Inputs are limited to the ranges seen in that data. This is a student project, not agronomic advice.
      </p>
      <p>
        Full numbers and the confusion matrix are in the{' '}
        <a className="underline" href={`${REPO}/blob/main/training/evaluation.md`}>evaluation report</a>.
      </p>
      <h2 className="text-xl font-bold">Authors</h2>
      <p>Adnan Rashid, Anushikha Singh and Utkarsh Dwivedi.</p>
    </article>
  )
}

export default About
