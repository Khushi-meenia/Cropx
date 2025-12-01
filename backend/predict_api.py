from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = joblib.load("crop_model.pkl")

@app.route('/')
def home():
    return "Crop Prediction API is running!"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    df = pd.DataFrame([{
        "Nitrogen": data["Nitrogen"],
        "Phosphorus": data["Phosphorus"],
        "Potassium": data["Potassium"],
        "Temperature": data["Temperature"],
        "Humidity": data["Humidity"],
        "pH_Value": data["pH_Value"],
        "Rainfall": data["Rainfall"],

        "Soil_Type_Clay": data["Soil_Type_Clay"],
        "Soil_Type_Loamy": data["Soil_Type_Loamy"],
        "Soil_Type_Sandy": data["Soil_Type_Sandy"],

        "Variety_Hybrid": data["Variety_Hybrid"],
        "Variety_Normal": data["Variety_Normal"]
    }])

    prediction = model.predict(df)[0]
    return jsonify({"crop": prediction})

if __name__ == '__main__':
    # IMPORTANT: host='0.0.0.0'
    app.run(host='0.0.0.0', port=5000)
