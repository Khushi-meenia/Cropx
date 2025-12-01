import React, { useState, useEffect } from "react";
import "./Login.css";

// ⭐ Floating Image Component
function FloatingImage({ images }) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="floating-image-box">
      <img src={images[currentImage]} alt="hero" />
      <div className="floating-tag">better crop</div>
    </div>
  );
}

// ⭐ Hero Content Component (Title + Subtitle + Search)
function HeroContent({ onLoginClick }) {
  return (
    <div className="hero-content">
      <h1 className="hero-title">Get Personalized Crop Recommendations Instantly</h1>
      <p className="hero-subtitle">Your Soil, Your Climate, Your Perfect Crop</p>

      <div className="hero-search-box">
        <input type="text" placeholder="Crop Type" />
        <input type="text" placeholder="Location" />
        <button className="hero-search-btn" onClick={onLoginClick}>
          Login
        </button>
      </div>
    </div>
  );
}

// ⭐ Main Login Component
export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showLoginCard, setShowLoginCard] = useState(false);

  const images = ["./1st crop.jpg", "./crop 2.avif", "./crop3.webp"];

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="login-page">
      {/* ⭐ HEADER — CropX title + slogan ⭐
      <div className="hero-header">
        <h1 className="site-title">CropX</h1>
        <p className="site-slogan">AI-Powered Crop Recommendation, Smart Farming Made Easy</p>
      </div> */}

      {/* ⭐ LEFT HERO SECTION ⭐ */}
      <div className="hero-section">
        <HeroContent onLoginClick={() => setShowLoginCard(true)} />
        <FloatingImage images={images} />
      </div>

      {/* ⭐ RIGHT LOGIN CARD — shows only after click ⭐ */}
      {showLoginCard && (
        <div className="login-card">
          <div className="tab-buttons">
            <button
              className={isLogin ? "active" : "inactive"}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={!isLogin ? "active" : "inactive"}
              onClick={() => setIsLogin(false)}
            >
              Signup
            </button>
          </div>

          <form>
            {!isLogin && (
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Enter your name" />
              </div>
            )}

            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Enter your password" />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" placeholder="Confirm your password" />
              </div>
            )}

            <button type="submit" className="submit-btn">
              {isLogin ? "Login" : "Signup"}
            </button>
          </form>

          <div className="toggle-text">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button onClick={toggleForm}>{isLogin ? "Signup" : "Login"}</button>
          </div>
        </div>
      )}
    </div>
  );
}
