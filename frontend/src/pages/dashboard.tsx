import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type CardItem = {
  key: string;
  title: string;
  subtitle?: string;
  img?: string; // e.g. "/images/predict.png"
  route: string;
};

const CARDS: CardItem[] = [
  { key: "predict", title: "Predict Crop", subtitle: "Get best crop", img: "/images/predict.png", route: "/predict-crop" },
  { key: "lifespan", title: "Check Life Span", subtitle: "Crop life info", img: "/images/lifespan.png", route: "/life-span" },
  { key: "chat", title: "Chat with AI", subtitle: "Ask farming questions", img: "/images/chat.png", route: "/chat-ai" },
  { key: "fertilizer", title: "Fertilizer Recommendation", subtitle: "NPK advice", img: "/images/fertilizer.png", route: "/fertilizer" },
  { key: "soil", title: "Soil Health", subtitle: "Soil test & tips", img: "/images/soil.png", route: "/soil-health" },
  { key: "weather", title: "Weather Info", subtitle: "Forecast & alerts", img: "/images/weather.png", route: "/weather" },
  { key: "friends", title: "Farmer Friends", subtitle: "Community", img: "/images/friends.png", route: "/farmer-friends" },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "Inter, Arial, sans-serif",
        backgroundColor: "#eaf7e8", // background below header (light green)
        color: "#13321a",
      }}
    >
      {/* Top header (white) */}
      <header
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          height: 72,
          display: "flex",
          alignItems: "center",
          padding: "0 28px",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        {/* Left - CropX logo box */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              backgroundColor: "#f8fff4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
              fontWeight: 800,
              color: "#1c3c1d",
              fontSize: 16,
            }}
          >
            CropX
          </div>
        </div>

        {/* Center - Title */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#13321a" }}>Dashboard Menu</div>
        </div>

        {/* Right - Logout */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => {
              localStorage.removeItem("loggedIn");
              localStorage.removeItem("token");
              navigate("/");
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.03)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 22px rgba(231,76,60,0.14)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
            }}
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              border: "none",
              backgroundColor: "#e74c3c",
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 160ms ease",
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Content area with consistent padding */}
      <main style={{ padding: "28px", maxWidth: 1200, margin: "0 auto" }}>
        <section style={{ marginBottom: 18 }}>
          <h1 style={{ margin: 0, color: "#13321a", fontSize: 28, fontWeight: 800 }}>Choose an option</h1>
          <p style={{ marginTop: 6, color: "#45604a", marginBottom: 18 }}>Click any card to open the page</p>
        </section>

        {/* Cards grid */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 22,
            alignItems: "stretch",
          }}
        >
          {CARDS.map((card, idx) => {
            const isHover = hoverIndex === idx;
            return (
              <article
                key={card.key}
                role="button"
                tabIndex={0}
                onClick={() => navigate(card.route)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") navigate(card.route);
                }}
                onMouseEnter={() => setHoverIndex(idx)}
                onMouseLeave={() => setHoverIndex(null)}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: 14,
                  padding: 18,
                  boxShadow: isHover ? "0 14px 36px rgba(39,174,96,0.12)" : "0 6px 18px rgba(0,0,0,0.06)",
                  transform: isHover ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
                  transition: "transform 220ms ease, box-shadow 220ms ease",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minHeight: 200,
                  border: "1px solid rgba(0,0,0,0.02)",
                }}
              >
                {/* Image area */}
                <div
                  style={{
                    width: "100%",
                    height: 120,
                    borderRadius: 12,
                    overflow: "hidden",
                    marginBottom: 12,
                    backgroundColor: "#f0f0f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {card.img ? (
                    <img
                      src={card.img}
                      alt={card.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <div style={{ color: "#9aa69a", fontWeight: 700 }}>{card.title}</div>
                  )}
                </div>

                {/* Title & subtitle */}
                <div style={{ textAlign: "center", marginTop: 6 }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#13321a" }}>{card.title}</div>
                  {card.subtitle && <div style={{ fontSize: 13, color: "#556a60", marginTop: 6 }}>{card.subtitle}</div>}
                </div>
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
