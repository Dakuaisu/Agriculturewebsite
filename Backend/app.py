from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pickle
app = Flask(__name__)

CORS(app, resources={r"/predict": {"origins": "http://localhost:5173"}})
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)





@app.route("/predict",methods=['POST'])
def predict():
    N = request.form['Nitrogen']
    P = request.form['Phosporus']
    K = request.form['Potassium']
    temp = request.form['Temperature']
    humidity = request.form['Humidity']
    ph = request.form['ph']
    rainfall = request.form['Rainfall']

    features = np.array([[N, P, K, temp, humidity, ph, rainfall]], dtype=float)
    crop = model.predict(features)[0]
    return jsonify({"result": "{} is the best crop to be cultivated right there".format(crop.capitalize())})


app = Flask(__name__, template_folder='templates')
cors = CORS(app, origins='*')

if __name__ == '__main__':
    app.run(debug=True)
