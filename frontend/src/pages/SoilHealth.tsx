import React, { useState } from "react";

const SoilHealth: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const topics = [
    {
      title: "Soil pH",
      subtitle: "Controls nutrient availability",
      img: "/soil_ph.png",
      details: [
        "Ideal soil pH range for Indian crops is 6.0–7.5.",
        "Low pH reduces nutrient absorption – apply lime.",
        "High pH affects micronutrients – use compost.",
      ],
    },
    {
      title: "Nitrogen (N)",
      subtitle: "Boosts leaf growth",
      img: "/nitrogen.jpg",
      details: [
        "Nitrogen deficiency causes yellowing of leaves.",
        "Use compost, manure, urea or green manure crops.",
      ],
    },
    {
      title: "Phosphorus (P)",
      subtitle: "Strengthens roots",
      img: "/phoshporus.jpg",
      details: [
        "Low phosphorus results in weak root development.",
        "Use bone meal, DAP, or rock phosphate to improve P.",
      ],
    },
    {
      title: "Potassium (K)",
      subtitle: "Improves disease resistance",
      img: "/potassium.jpg",
      details: [
        "Low potassium causes leaf tip burn.",
        "Use MOP or wood ash to improve potassium levels.",
      ],
    },
    {
      title: "Organic Matter",
      subtitle: "Improves soil fertility",
      img: "/soil organic.jpg",
      details: [
        "Organic matter boosts microbial activity & soil richness.",
        "Add compost, cow dung, or vermicompost regularly.",
      ],
    },
    {
      title: "Soil Moisture",
      subtitle: "Helps nutrient flow",
      img: "/mositure.jpg",
      details: [
        "Mulching helps preserve soil moisture.",
        "Avoid over-irrigation — nutrients may wash away.",
      ],
    },
    {
      title: "Soil Texture",
      subtitle: "Sand, clay & loam balance",
      img: "/texture.jpg",
      details: [
        "Loamy soil is ideal for crop growth.",
        "Clay soil retains water but needs aeration.",
        "Sandy soil drains fast — mix organic matter.",
      ],
    },
    {
      title: "Microbial Activity",
      subtitle: "Life inside soil",
      img: "/images.jpg",
      details: [
        "Healthy soil contains beneficial microorganisms.",
        "Avoid excessive chemicals — they kill microbes.",
      ],
    },
  ];

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#eaf7e8",
        padding: "20px",
        fontFamily: "Inter, Arial",
      }}
    >
      {/* Sticky Header */}
      <div
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: "#eaf7e8",
          padding: "15px 0",
          zIndex: 20,
        }}
      >
        <h1
          style={{
            fontSize: 30,
            fontWeight: 800,
            color: "#13321a",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          🌱 Soil Health Guide
        </h1>
      </div>

      {/* GRID */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 22,
          marginTop: 10,
          alignItems: "start",       // ⭐ Fix 1
          gridAutoRows: "1fr",       // ⭐ Fix 2
        }}
      >
        {topics.map((topic, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              onClick={() => toggle(idx)}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: 16,
                padding: 16,
                boxShadow: isOpen
                  ? "0 12px 30px rgba(39,174,96,0.15)"
                  : "0 6px 14px rgba(0,0,0,0.08)",
                cursor: "pointer",
                transition: "all 220ms ease",
                alignSelf: "start",    // ⭐ Fix 3 (no shifting)
              }}
            >
              {/* Image */}
              <img
                src={topic.img}
                style={{
                  width: "100%",
                  height: 140,
                  borderRadius: 12,
                  objectFit: "cover",
                  marginBottom: 10,
                }}
                alt={topic.title}
              />

              {/* Title */}
              <div style={{ fontSize: 20, fontWeight: 800, color: "#13321a" }}>
                {topic.title}
              </div>
              <div style={{ fontSize: 14, color: "#556a60", marginTop: 4 }}>
                {topic.subtitle}
              </div>

              {/* Expandable Section */}
              {isOpen && (
                <div style={{ marginTop: 10 }}>
                  {topic.details.map((d, i) => (
                    <p key={i} style={{ color: "#2e4b2f", margin: "6px 0" }}>
                      • {d}
                    </p>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default SoilHealth;
