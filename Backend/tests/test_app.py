import json
from pathlib import Path

import pandas as pd
import pytest

from app import FEATURES, RANGES, app, model

DATA = Path(__file__).parent.parent / "data" / "Crop_recommendation.csv"
RICE = {"N": 90, "P": 42, "K": 43, "temperature": 20.88, "humidity": 82.0, "ph": 6.5, "rainfall": 202.9}


@pytest.fixture
def client():
    return app.test_client()


def test_predict_returns_crop(client):
    response = client.post("/predict", json=RICE)
    assert response.status_code == 200
    assert response.get_json() == {"crop": "rice"}


def test_predict_matches_model_for_every_crop(client):
    df = pd.read_csv(DATA).groupby("label").head(1)
    for _, row in df.iterrows():
        payload = {f: float(row[f]) for f in FEATURES}
        expected = model.predict([[payload[f] for f in FEATURES]])[0]
        assert client.post("/predict", json=payload).get_json() == {"crop": expected}


def test_model_is_accurate_on_its_own_dataset():
    df = pd.read_csv(DATA)
    assert (model.predict(df[FEATURES].to_numpy()) == df["label"]).mean() > 0.95


@pytest.mark.parametrize("field", FEATURES)
def test_missing_field_is_rejected(client, field):
    payload = {k: v for k, v in RICE.items() if k != field}
    response = client.post("/predict", json=payload)
    assert response.status_code == 400
    assert response.get_json()["errors"] == {field: "Must be a number."}


@pytest.mark.parametrize("bad", ["90", None, True, [], {}])
def test_non_numeric_is_rejected(client, bad):
    response = client.post("/predict", json={**RICE, "N": bad})
    assert response.status_code == 400
    assert response.get_json()["errors"] == {"N": "Must be a number."}


def test_non_finite_is_rejected(client):
    body = json.dumps(RICE).replace("90", "NaN", 1)
    response = client.post("/predict", data=body, content_type="application/json")
    assert response.status_code == 400
    assert "N" in response.get_json()["errors"]


@pytest.mark.parametrize("field", FEATURES)
def test_out_of_range_is_rejected(client, field):
    lo, hi = RANGES[field]["min"], RANGES[field]["max"]
    for value in (lo - 0.01, hi + 0.01):
        response = client.post("/predict", json={**RICE, field: value})
        assert response.status_code == 400
        assert response.get_json()["errors"] == {field: f"Must be between {lo} and {hi}."}


@pytest.mark.parametrize("field", FEATURES)
def test_range_bounds_are_inclusive(client, field):
    for bound in ("min", "max"):
        response = client.post("/predict", json={**RICE, field: RANGES[field][bound]})
        assert response.status_code == 200


@pytest.mark.parametrize("body", ["not json", "[1, 2, 3]", ""])
def test_non_object_body_is_rejected(client, body):
    response = client.post("/predict", data=body, content_type="application/json")
    assert response.status_code == 400
    assert response.get_json()["errors"] == {"body": "Expected a JSON object."}


def test_ranges_cover_the_dataset():
    df = pd.read_csv(DATA)
    for f in FEATURES:
        assert RANGES[f]["min"] <= df[f].min() and df[f].max() <= RANGES[f]["max"]
