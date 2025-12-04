import React, { useEffect, useState } from "react";

interface WeatherData {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  time: string;
}

const WeatherInfo: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("Delhi");
  const [coords, setCoords] = useState({ lat: 28.6139, lon: 77.2090 });

  // Fetch Weather Function
  const getWeather = async () => {
    setLoading(true);
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true`;
    const res = await fetch(url);
    const data = await res.json();
    setWeather(data.current_weather);
    setLoading(false);
  };

  // Fetch on first load
  useEffect(() => {
    getWeather();
  }, []);

  // Change city function (simple presets)
  const cityCoords: Record<string, { lat: number; lon: number }> = {
    Delhi: { lat: 28.6139, lon: 77.2090 },
    Mumbai: { lat: 19.0760, lon: 72.8777 },
    Kolkata: { lat: 22.5726, lon: 88.3639 },
    Chennai: { lat: 13.0827, lon: 80.2707 },
  };

  const handleCityChange = (c: string) => {
    setCity(c);
    setCoords(cityCoords[c]);
    setTimeout(() => getWeather(), 200);
  };

  return (
    <div
      style={{
        padding: "40px",
        background: "#eaf7e8",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          color: "#1c3c1d",
          marginBottom: "25px",
        }}
      >
        Weather Forecast
      </h1>

      {/* City Selector */}
      <div style={{ marginBottom: "20px" }}>
        <select
          value={city}
          onChange={(e) => handleCityChange(e.target.value)}
          style={{
            padding: "12px 18px",
            borderRadius: "8px",
            border: "2px solid #2ecc71",
            fontSize: "16px",
            background: "white",
          }}
        >
          {Object.keys(cityCoords).map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Weather Box */}
      <div
        style={{
          background: "white",
          padding: "30px",
          width: "350px",
          borderRadius: "20px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        {loading ? (
          <p>Loading weather...</p>
        ) : weather ? (
          <>
            <h2 style={{ color: "#1c3c1d", marginBottom: "10px" }}>{city}</h2>

            <p style={{ fontSize: "20px", color: "#2ecc71" }}>
              🌡 Temperature: <strong>{weather.temperature}°C</strong>
            </p>

            <p style={{ fontSize: "16px", color: "#1c3c1d" }}>
              💨 Wind Speed: <strong>{weather.windspeed} km/h</strong>
            </p>

            <p style={{ fontSize: "16px", color: "#1c3c1d" }}>
              🧭 Wind Direction: <strong>{weather.winddirection}°</strong>
            </p>

            <p style={{ fontSize: "14px", color: "#4b614f" }}>
              Updated At: {weather.time}
            </p>
          </>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default WeatherInfo;