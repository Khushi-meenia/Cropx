import React, { useState, useEffect } from "react";
import Login from "./pages/Login";

const App: React.FC = () => {
  const fullText = "Welcome to CropX";
  const [displayedText, setDisplayedText] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      if (index <= fullText.length) {
        // slice ensures we never access undefined
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setZoom(true), 300);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (zoom) {
      const timer = setTimeout(() => setShowLogin(true), 700);
      return () => clearTimeout(timer);
    }
  }, [zoom]);

  if (showLogin) {
    return <Login />;
  }

  return (
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
};

export default App;
