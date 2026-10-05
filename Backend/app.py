import os
import pickle
from pathlib import Path

import numpy as np
from flask import Flask, jsonify, request
from flask_cors import CORS

with open(Path(__file__).parent / "model.pkl", "rb") as f:
    model = pickle.load(f)

app = Flask(__name__)
CORS(app, origins=os.environ.get("ALLOWED_ORIGINS", "http://localhost:5173").split(","))


@app.post("/predict")
def predict():
    form = request.form
    features = np.array(
        [[form["Nitrogen"], form["Phosporus"], form["Potassium"], form["Temperature"],
          form["Humidity"], form["ph"], form["Rainfall"]]],
        dtype=float,
    )
    crop = model.predict(features)[0]
    return jsonify({"result": "{} is the best crop to be cultivated right there".format(crop.capitalize())})


if __name__ == "__main__":
    app.run()
