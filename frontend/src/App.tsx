import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import pages
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard";
import PredictCrop from "./pages/PredictCrop";
import ChatWithAI from "./pages/ChatWithAI";
import Lifespan from "./pages/Lifespan";
import WeatherInfo from "./pages/WeatherInfo";
import FarmerFriends from "./pages/FarmerFriends";

const App: React.FC = () => {
  const fullText = "Welcome to CropX";
  const [displayedText, setDisplayedText] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [zoom, setZoom] = useState(false);

  // Typewriter effect for splash screen
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setZoom(true), 300);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  // Show Login after zoom animation
  useEffect(() => {
    if (zoom) {
      const timer = setTimeout(() => setShowLogin(true), 700);
      return () => clearTimeout(timer);
    }
  }, [zoom]);

  // Splash Screen JSX
  const SplashScreen = (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f5f5f5",
        overflow: "hidden",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          transition: "transform 0.7s ease",
          transform: zoom ? "scale(1.5)" : "scale(1)",
        }}
      >
        {displayedText}
      </h1>
    </div>
  );

  return (
    <Router>
      <Routes>
        {/* Splash → Login */}
        <Route path="/" element={showLogin ? <Login /> : SplashScreen} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Predict Crop */}
        <Route path="/predict-crop" element={<PredictCrop />} />

        {/* Chat With AI */}
        <Route path="/chat-ai" element={<ChatWithAI />} />

        {/* Lifespan Page with default props */}
        <Route
          path="/life-span"
          element={
            <Lifespan
              cropName="Tomato"
              daysLeft={45}
              messages={["Water daily", "Fertilize weekly", "Check for pests"]}
            />
          }
        />

        {/* Weather Info Page */}
        <Route path="/weather" element={<WeatherInfo />} />

        {/* Farmer Friends Page */}
        <Route path="/farmer-friends" element={<FarmerFriends />} />
      </Routes>
    </Router>
  );
};

export default App;
