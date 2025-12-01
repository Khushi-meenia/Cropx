from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load model and columns
model = joblib.load("crop_model.pkl")
model_columns = joblib.load("model_columns.pkl")

@app.route('/')
def home():
    return "Crop Prediction API is running!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        input_df = pd.DataFrame([data])

        # Add missing columns with 0
        for col in model_columns:
            if col not in input_df.columns:
                input_df[col] = 0

        # Reorder columns to match training
        input_df = input_df[model_columns]

        prediction = model.predict(input_df)[0]
        return jsonify({"crop": prediction})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
