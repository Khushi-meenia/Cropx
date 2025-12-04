import React from "react";

interface LifespanProps {
  cropName: string;
  daysLeft: number;
  messages: string[];
}

const Lifespan: React.FC<LifespanProps> = ({ cropName, daysLeft, messages }) => {
  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "40px auto",
        padding: "20px",
        backgroundColor: "#ffffff",
        border: "1px solid #ccc",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Top Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#2f855a",
          }}
        >
          {cropName}
        </div>
        <div
          style={{
            backgroundColor: "#fefcbf",
            color: "#975a16",
            padding: "4px 12px",
            borderRadius: "9999px",
            fontWeight: 600,
          }}
        >
          {daysLeft} days
        </div>
      </div>

      {/* Divider */}
      <hr
        style={{
          border: "none",
          borderTop: "1px solid #ccc",
          marginBottom: "16px",
        }}
      />

      {/* Messages */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              padding: "10px",
              backgroundColor: "#ebf8ff",
              borderLeft: "4px solid #4299e1",
              borderRadius: "8px",
              color: "#2b6cb0",
            }}
          >
            {msg}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lifespan;
