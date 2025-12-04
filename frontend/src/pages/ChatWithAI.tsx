import React, { useState } from "react";

const ChatWithAI: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: "You", text: input }];
    setMessages(newMessages);

    const userMessage = input;
    setInput("");

    try {
      // FREE API
      const res = await fetch(
        `https://some-random-api.com/others/chatbot?message=${encodeURIComponent(
          userMessage
        )}`
      );
      const data = await res.json();

      const botReply = data.response || "Sorry, I couldn't understand that.";

      // Add bot reply
      setMessages((prev) => [...prev, { sender: "AI", text: botReply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "AI", text: "Error connecting to server." },
      ]);
    }
  };

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
                backgroundColor:
                  msg.sender === "You" ? "#2ecc71" : "#d7f1d3",
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