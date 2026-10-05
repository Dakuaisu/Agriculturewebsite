# AgriApp: crop recommendation

You enter seven soil and weather values (nitrogen, phosphorus, potassium, temperature, humidity, soil pH,
rainfall) and AgriApp suggests one of 22 crops. It's a static React + Vite site: the model runs in your
browser, so there's no backend, no server to wake up and no cold start. Your inputs never leave the page.

This was a 2024 college group project. It was cleaned up later: features that never worked (sign-in, a
cultivation roadmap, weather analysis, SMS OTP) were removed rather than finished. See [AUDIT.md](AUDIT.md)
for what was wrong and how each finding was handled.

![Screenshot of the crop recommendation form showing an "Apple" result](docs/screenshot.png)

**Live:** not deployed yet. Once the step in [Deploy](#deploy) is done, the site will be at
https://dakuaisu.github.io/Agriculturewebsite/.

## Run it locally

```sh
cd AgricultureApp
npm ci
npm run dev
```

Then open http://localhost:5173. Node 22 is what CI uses.

## Retrain the model

Python 3.12:

```sh
cd training
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python train.py
```

This rebuilds, from `data/Crop_recommendation.csv`:

- `model.json`: the parameters the browser uses to predict
- `sklearn_predictions.json`: scikit-learn's prediction for every dataset row, used by the parity test
- `feature_ranges.json`: the input limits used by the form
- [`evaluation.md`](training/evaluation.md): accuracy, baselines and confusion matrix

Training is deterministic.

## Checks

These are the same checks CI runs:

```sh
cd training && ruff check . && python train.py && git diff --exit-code -- .
cd AgricultureApp && npm run lint && npm test && npm run build
```

- **Retrain and export checks:** retraining must reproduce the committed report, ranges, `model.json` and
  predictions exactly.
- **Parity test** (`src/predict.test.js`): the JS predictor must return exactly scikit-learn's label on all
  2,200 dataset rows.

## Model card

- **Data:** [Crop Recommendation Dataset](https://www.kaggle.com/datasets/atharvaingle/crop-recommendation-dataset)
  by Atharva Ingle on Kaggle, Apache 2.0 (as listed in its Kaggle metadata). It has 2,200 rows: 22 crops ×
  100 rows each, with no missing values or duplicates. Kaggle says it was "built by augmenting" Indian
  rainfall, climate and fertiliser data. The augmentation method isn't documented, so treat the data as
  partly synthetic. A copy and its notice are in [`training/data/`](training/data/NOTICE.md).
- **Method:** scikit-learn `GaussianNB` with default settings, trained on a stratified 80% split with
  seed 42, with no preprocessing. The model is just a prior, a mean and a variance per crop and feature
  (`var` already includes sklearn's smoothing term). `src/predict.js` computes the same log-probabilities
  and picks the highest, as sklearn does.
- **Why naive Bayes:** simplicity, not accuracy. It's small and easy to run in a browser. It makes 2 test
  errors against 5 for the 10 bagged decision trees the project used before. A gap of a few test errors
  isn't evidence that it's the better model.
- **Inputs:** each value must lie within the range seen in the data (N 0–140, P 5–145, K 5–205,
  temperature 8–44 °C, humidity 14–100 %, pH 3.5–10, rainfall 20–299 mm). Outside those ranges the model
  would be guessing, so the form rejects them.
- **Accuracy:** 99.5% on the 440 held-out rows (438 correct). Both errors are rice predicted as jute.
  5-fold cross-validation gives 99.5% (std 0.2%). The full confusion matrix is in
  [`evaluation.md`](training/evaluation.md).
- **Caveat:** this score reflects an easy dataset, not a strong model. On the same split, bagged decision
  trees score 98.9%, a single decision tree 98.0%, and a majority-class baseline 4.5%. A model that treats
  each crop as one Gaussian blob scoring this high means each crop forms a tight, mostly separate cluster.
  That is consistent with the data being generated per crop rather than collected from real farms. Nothing
  here has been validated against real fields; don't use it for agronomic decisions.
- **History:** the model originally committed in 2024 was paired with scalers fitted on a single row. As
  deployed, it scored 9.1% on this dataset and only ever answered Orange or Apple (AUDIT.md F02).

## Deploy

In the repo settings, set Pages → Source to "GitHub Actions". Each push to `main` then builds the site and
deploys it with `.github/workflows/pages.yml`. Nothing else needs hosting.

## Authors

- Adnan Rashid
- Anushikha Singh
- Utkarsh Dwivedi
