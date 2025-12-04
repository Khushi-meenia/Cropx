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
  const [coords, setCoords] = useState({ lat: 28.6139, lon: 77.209 });
  const [message, setMessage] = useState("");

  const cityCoords: Record<string, { lat: number; lon: number }> = {
    Delhi: { lat: 28.6139, lon: 77.209 },
    Mumbai: { lat: 19.076, lon: 72.8777 },
    Kolkata: { lat: 22.5726, lon: 88.3639 },
    Chennai: { lat: 13.0827, lon: 80.2707 },
  };

  const getWeather = async () => {
    try {
      setLoading(true);
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.current_weather) {
        setWeather(data.current_weather);
        const temp = data.current_weather.temperature;
        const wind = data.current_weather.windspeed;

        // Weather message
        if (temp >= 15 && temp <= 35 && wind <= 20) {
          setMessage("🌞 Today's weather is healthy for your crops!");
        } else if (temp < 15) {
          setMessage("🥶 It's cold today, protect your crops!");
        } else if (temp > 35) {
          setMessage("🔥 It's hot today, make sure to water your crops!");
        } else if (wind > 20) {
          setMessage("💨 Strong winds today, be careful with your crops!");
        } else {
          setMessage("⚠️ Be cautious with today's weather!");
        }
      }
      setLoading(false);
    } catch (err) {
      console.log("Weather Fetch Error:", err);
      setLoading(false);
      setMessage("❌ Unable to fetch weather");
    }
  };

  useEffect(() => {
    getWeather();
  }, [coords]);

  const handleCityChange = (cityName: string) => {
    setCity(cityName);
    setCoords(cityCoords[cityName]);
  };

  const getWeatherEmoji = (code: number) => {
    // Open-Meteo weather codes reference:
    // 0: Clear sky, 1-3: Partly cloudy, 45-48: Fog, 51-67: Rain, 71-77: Snow, 95-99: Thunderstorm
    if (!weather) return "";
    const hour = new Date(weather.time).getHours();
    const isDay = hour >= 6 && hour < 18;

    if (code === 0) return isDay ? "🌞" : "🌙";
    if ([1, 2, 3].includes(code)) return "☁️";
    if ([45, 48].includes(code)) return "🌫";
    if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67].includes(code)) return "🌧";
    if ([71, 73, 75, 77].includes(code)) return "❄️";
    if ([80, 81, 82].includes(code)) return "🌧☔";
    if ([95, 96, 99].includes(code)) return "⛈";
    return isDay ? "🌞" : "🌙";
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Weather & Crop Health</h1>

      <select
        value={city}
        onChange={(e) => handleCityChange(e.target.value)}
        style={styles.dropdown}
      >
        {Object.keys(cityCoords).map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <div style={styles.weatherCard}>
        {loading ? (
          <p style={styles.loading}>Loading weather...</p>
        ) : weather ? (
          <>
            <div style={styles.weatherEmoji}>{getWeatherEmoji(weather.weathercode)}</div>
            <h2 style={styles.city}>{city}</h2>
            <p style={styles.temp}>🌡 Temperature: {weather.temperature}°C</p>
            <p style={styles.wind}>💨 Wind Speed: {weather.windspeed} km/h</p>
            <p style={styles.wind}>🧭 Wind Direction: {weather.winddirection}°</p>
            <p style={styles.message}>{message}</p>
          </>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

const styles: any = {
  container: {
    minHeight: "100vh",
    width: "100%",
    background: "linear-gradient(to top, #a8edea, #fed6e3)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  },
  heading: {
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "30px",
    color: "#1c3c1d",
  },
  dropdown: {
    padding: "12px 18px",
    borderRadius: "12px",
    border: "2px solid #2ecc71",
    fontSize: "16px",
    background: "white",
    marginBottom: "40px",
    cursor: "pointer",
  },
  weatherCard: {
    background: "white",
    padding: "40px",
    borderRadius: "25px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    width: "80%",
    maxWidth: "600px",
  },
  loading: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#2f6e3f",
  },
  weatherEmoji: {
    fontSize: "60px",
    marginBottom: "20px",
  },
  city: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#2f6e3f",
  },
  temp: {
    fontSize: "22px",
    color: "#2ecc71",
    margin: "10px 0",
  },
  wind: {
    fontSize: "18px",
    color: "#1c3c1d",
    margin: "5px 0",
  },
  message: {
    fontSize: "20px",
    fontWeight: "bold",
    marginTop: "20px",
    color: "#ff7f50",
  },
};

export default WeatherInfo;
