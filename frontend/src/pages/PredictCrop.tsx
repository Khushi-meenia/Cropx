import React, { useState } from "react";

interface FormState {
  Nitrogen: string;
  Phosphorus: string;
  Potassium: string;
  Temperature: string;
  Humidity: string;
  pH_Value: string;
  Rainfall: string;
  Soil_Type_Clay: number;
  Soil_Type_Loamy: number;
  Soil_Type_Peaty: number;
  Soil_Type_Saline: number;
  Soil_Type_Sandy: number;
  Soil_Type_Silt: number;
  Variety_Arborio: number;
  Variety_Basmati: number;
  Variety_Beefsteak: number;
  Variety_Cherry: number;
  Variety_Co_0238: number;
  Variety_Co_86032: number;
  Variety_Co_99004: number;
  Variety_Dent: number;
  Variety_Durum: number;
  Variety_Flint: number;
  Variety_Hard_Red: number;
  Variety_Jasmine: number;
  Variety_Red: number;
  Variety_Roma: number;
  Variety_Russet: number;
  Variety_Soft_Red: number;
  Variety_Sweet: number;
  Variety_Yukon_Gold: number;
}

const PredictCrop: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    Nitrogen: "",
    Phosphorus: "",
    Potassium: "",
    Temperature: "",
    Humidity: "",
    pH_Value: "",
    Rainfall: "",
    Soil_Type_Clay: 0,
    Soil_Type_Loamy: 0,
    Soil_Type_Peaty: 0,
    Soil_Type_Saline: 0,
    Soil_Type_Sandy: 0,
    Soil_Type_Silt: 0,
    Variety_Arborio: 0,
    Variety_Basmati: 0,
    Variety_Beefsteak: 0,
    Variety_Cherry: 0,
    Variety_Co_0238: 0,
    Variety_Co_86032: 0,
    Variety_Co_99004: 0,
    Variety_Dent: 0,
    Variety_Durum: 0,
    Variety_Flint: 0,
    Variety_Hard_Red: 0,
    Variety_Jasmine: 0,
    Variety_Red: 0,
    Variety_Roma: 0,
    Variety_Russet: 0,
    Variety_Soft_Red: 0,
    Variety_Sweet: 0,
    Variety_Yukon_Gold: 0,
  });

  const [result, setResult] = useState<string>("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    // SOIL
    if (name === "soil") {
      setForm({
        ...form,
        Soil_Type_Clay: value === "Clay" ? 1 : 0,
        Soil_Type_Loamy: value === "Loamy" ? 1 : 0,
        Soil_Type_Peaty: value === "Peaty" ? 1 : 0,
        Soil_Type_Saline: value === "Saline" ? 1 : 0,
        Soil_Type_Sandy: value === "Sandy" ? 1 : 0,
        Soil_Type_Silt: value === "Silt" ? 1 : 0,
      });
      return;
    }

    // VARIETY
    if (name === "variety") {
      const reset = Object.keys(form).reduce((acc: any, key) => {
        if (key.startsWith("Variety_")) acc[key] = 0;
        return acc;
      }, {});

      setForm({
        ...form,
        ...reset,
        [`Variety_${value.replace(" ", "_")}`]: 1,
      });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const handlePredict = async () => {
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    setResult(data.crop);
  };

  return (
    <div
      style={{
        padding: "40px",
        minHeight: "100vh",
        backgroundColor: "#eaf7e8",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ color: "#1c3c1d", fontSize: "32px", marginBottom: "10px" }}>
        🌱 Crop Prediction
      </h1>

      <div
        style={{
          padding: "25px",
          backgroundColor: "white",
          borderRadius: "14px",
          maxWidth: "500px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        {["Nitrogen", "Phosphorus", "Potassium", "Temperature", "Humidity", "pH_Value", "Rainfall"].map(
          (inputName) => (
            <div key={inputName} style={{ marginBottom: "20px" }}>
              <label style={{ fontWeight: "bold", color: "#1c3c1d" }}>
                {inputName}
              </label>
              <input
                type="number"
                name={inputName}
                value={form[inputName as keyof FormState]}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "6px",
                  borderRadius: "10px",
                  border: "1px solid #c3dec1",
                }}
              />
            </div>
          )
        )}

        {/* SOIL TYPE */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontWeight: "bold", color: "#1c3c1d" }}>
            Soil Type
          </label>
          <select
            name="soil"
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "6px",
              borderRadius: "10px",
              border: "1px solid #c3dec1",
            }}
          >
            <option value="">Select Soil</option>
            <option value="Clay">Clay</option>
            <option value="Loamy">Loamy</option>
            <option value="Peaty">Peaty</option>
            <option value="Saline">Saline</option>
            <option value="Sandy">Sandy</option>
            <option value="Silt">Silt</option>
          </select>
        </div>

        {/* VARIETY */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontWeight: "bold", color: "#1c3c1d" }}>
            Variety
          </label>
          <select
            name="variety"
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #c3dec1",
            }}
          >
            <option value="">Select Variety</option>

            <option value="Arborio">Arborio</option>
            <option value="Basmati">Basmati</option>
            <option value="Beefsteak">Beefsteak</option>
            <option value="Cherry">Cherry</option>
            <option value="Co_0238">Co 0238</option>
            <option value="Co_86032">Co 86032</option>
            <option value="Co_99004">Co 99004</option>
            <option value="Dent">Dent</option>
            <option value="Durum">Durum</option>
            <option value="Flint">Flint</option>
            <option value="Hard_Red">Hard Red</option>
            <option value="Jasmine">Jasmine</option>
            <option value="Red">Red</option>
            <option value="Roma">Roma</option>
            <option value="Russet">Russet</option>
            <option value="Soft_Red">Soft Red</option>
            <option value="Sweet">Sweet</option>
            <option value="Yukon_Gold">Yukon Gold</option>
          </select>
        </div>

        <button
          onClick={handlePredict}
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: "#27ae60",
            color: "white",
            fontSize: "18px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Predict Crop
        </button>
      </div>

      {result && (
        <div
          style={{
            marginTop: "30px",
            padding: "25px",
            backgroundColor: "#d4f6e7",
            borderRadius: "14px",
            maxWidth: "500px",
            fontSize: "20px",
          }}
        >
          🌾 Recommended Crop: <b>{result}</b>
        </div>
      )}
    </div>
  );
};

export default PredictCrop;
