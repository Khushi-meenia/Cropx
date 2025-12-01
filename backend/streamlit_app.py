import streamlit as st
import requests

st.title("🌾 Crop Prediction App")

# Input fields
Nitrogen = st.number_input("Nitrogen", 0, 200, 50)
Phosphorus = st.number_input("Phosphorus", 0, 200, 50)
Potassium = st.number_input("Potassium", 0, 200, 50)
Temperature = st.number_input("Temperature", 0.0, 50.0, 25.0)
Humidity = st.number_input("Humidity", 0.0, 100.0, 50.0)
pH_Value = st.number_input("pH Value", 0.0, 14.0, 6.5)
Rainfall = st.number_input("Rainfall", 0.0, 500.0, 100.0)

# Soil type options
Soil_Type_Clay = st.selectbox("Soil Type - Clay", [0, 1])
Soil_Type_Loamy = st.selectbox("Soil Type - Loamy", [0, 1])
Soil_Type_Sandy = st.selectbox("Soil Type - Sandy", [0, 1])

# Variety options
Variety_Hybrid = st.selectbox("Variety - Hybrid", [0, 1])
Variety_Normal = st.selectbox("Variety - Normal", [0, 1])

if st.button("Predict Crop"):
    data = {
        "Nitrogen": Nitrogen,
        "Phosphorus": Phosphorus,
        "Potassium": Potassium,
        "Temperature": Temperature,
        "Humidity": Humidity,
        "pH_Value": pH_Value,
        "Rainfall": Rainfall,
        "Soil_Type_Clay": Soil_Type_Clay,
        "Soil_Type_Loamy": Soil_Type_Loamy,
        "Soil_Type_Sandy": Soil_Type_Sandy,
        "Variety_Hybrid": Variety_Hybrid,
        "Variety_Normal": Variety_Normal
    }

    try:
        response = requests.post("http://127.0.0.1:5000/predict", json=data)
        if response.status_code == 200:
            res = response.json()
            if "crop" in res:
                st.success(f"Predicted Crop: 🌱 {res['crop']}")
            else:
                st.error(f"Error from API: {res.get('error')}")
        else:
            st.error(f"API Error: {response.text}")
    except Exception as e:
        st.error(f"Request failed: {e}")
