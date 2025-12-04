import React, { useState } from "react";

const ChatWithAI: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  // ---------------------------
  // Hardcoded Q&A (15+)
  // ---------------------------
  const predefinedQA: { [key: string]: string } = {
    "what is your name": "I'm CropBot 🌱, your farming assistant!",
    "how to grow wheat": "Plant seeds in fertile soil, water regularly, and fertilize after 30 days.",
    "how to water crops": "Water early in the morning or late in the evening for best results.",
    "when to harvest wheat": "Wheat is usually ready for harvest after 120 days 🌾.",
    "what is crop rotation": "Crop rotation is the practice of planting different crops sequentially to maintain soil fertility.",
    "hello": "Hello! How can I help you with your crops today? 😊",
    "hi": "Hi there! Ready to grow some crops? 🌱",
    "thanks": "You're welcome! Happy farming! 🌾",
    "how to grow rice": "Rice grows best in flooded fields; maintain water and fertilizer properly.",
    "when to harvest rice": "Rice is usually ready for harvest after 150 days 🌾.",
    "what is fertilizer": "Fertilizer provides nutrients to crops to enhance growth 🌿.",
    "how to grow tomato": "Plant in well-drained soil, water consistently, and ensure sunlight 6-8 hours/day 🍅.",
    "when to harvest tomato": "Tomatoes are ready for harvest 70-90 days after planting 🍅.",
    "how to prevent pests": "Use natural pesticides, maintain crop rotation, and remove affected plants 🐛.",
    "best season to plant carrot": "Carrots grow best in cool seasons, spring or fall 🥕.",
    "how to store harvested crops": "Store in cool, dry, ventilated areas to prevent spoilage 🏠.",
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "You", text: input }]);
    const userMessage = input.toLowerCase().trim();
    setInput("");

    // Check for predefined answer
    const botReply =
      predefinedQA[userMessage] || "Interesting question! 🌾 Keep observing your crops, water regularly, and maintain healthy soil 🌿";

    setMessages((prev) => [...prev, { sender: "AI", text: botReply }]);
  };

  // ---------------------------
  // Optional: API integration (commented)
  // ---------------------------
  /*
  const sendMessageAPI = async (userMessage: string) => {
    try {
      const res = await fetch(`https://some-random-api.com/others/chatbot?message=${encodeURIComponent(userMessage)}`);
      const data = await res.json();
      const botReply = data.response || "Sorry, I couldn't understand that.";
      setMessages((prev) => [...prev, { sender: "AI", text: botReply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "AI", text: "Error connecting to server." }]);
    }
  };
  */

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#eaf7e8",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ color: "#1c3c1d", marginBottom: "20px" }}>Chat with AI</h1>

      {/* Chat Box */}
      <div
        style={{
          backgroundColor: "white",
          height: "75vh",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          overflowY: "auto",
          marginBottom: "20px",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              marginBottom: "15px",
              textAlign: msg.sender === "You" ? "right" : "left",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "10px 15px",
                borderRadius: "20px",
                maxWidth: "70%",
                backgroundColor: msg.sender === "You" ? "#2ecc71" : "#d7f1d3",
                color: msg.sender === "You" ? "white" : "#1c3c1d",
                fontWeight: "bold",
              }}
            >
              <strong>{msg.sender}: </strong>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your question..."
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "25px",
            border: "1px solid #b6d8b4",
            outline: "none",
            fontSize: "16px",
            backgroundColor: "#f1fff0",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "12px 20px",
            backgroundColor: "#2ecc71",
            border: "none",
            borderRadius: "25px",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 3px 10px rgba(46,204,113,0.4)",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWithAI;
