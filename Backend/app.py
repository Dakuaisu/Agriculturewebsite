import json
import math
import os
import pickle
from pathlib import Path

from flask import Flask, jsonify, request
from flask_cors import CORS

HERE = Path(__file__).parent
FEATURES = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]
RANGES = json.loads((HERE / "feature_ranges.json").read_text())

with open(HERE / "model.pkl", "rb") as f:
    model = pickle.load(f)

app = Flask(__name__)
CORS(app, origins=os.environ.get("ALLOWED_ORIGINS", "http://localhost:5173").split(","))


def validate(payload):
    if not isinstance(payload, dict):
        return None, {"body": "Expected a JSON object."}
    values, errors = [], {}
    for name in FEATURES:
        lo, hi = RANGES[name]["min"], RANGES[name]["max"]
        value = payload.get(name)
        # bool is a subclass of int, so it must be excluded explicitly
        if isinstance(value, bool) or not isinstance(value, (int, float)) or not math.isfinite(value):
            errors[name] = "Must be a number."
        elif not lo <= value <= hi:
            errors[name] = f"Must be between {lo} and {hi}."
        else:
            values.append(float(value))
    return (None if errors else values), errors


@app.post("/predict")
def predict():
    values, errors = validate(request.get_json(silent=True))
    if errors:
        return jsonify({"errors": errors}), 400
    crop = model.predict([values])[0]
    return jsonify({"crop": crop})


if __name__ == "__main__":
    app.run()
