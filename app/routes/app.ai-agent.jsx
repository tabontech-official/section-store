import { useState, useEffect, useRef } from "react";

export default function ChatGPTClone() {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const [userInput, setUserInput] = useState("");
  const chatEndRef = useRef(null); 
  const handleUserInput = () => {
    if (userInput.trim() === "") return;

    const newMessages = [...messages, { text: userInput, sender: "user" }];
    setMessages(newMessages);
    setUserInput("");

    setTimeout(() => {
      const botResponse = {
        text: "I'm here to help! Please let me know what you need.",
        sender: "bot",
      };
      setMessages([...newMessages, botResponse]);
    }, 1000);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <div
        style={{
          background: "#f7f7f7",
          borderRadius: "12px",
          padding: "20px",
          height: "400px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              background: msg.sender === "user" ? "#c6f1d6" : "#e0e0e0",
              padding: "10px 15px",
              borderRadius: "20px",
              margin: "5px 0",
              maxWidth: "80%",
              wordWrap: "break-word",
              whiteSpace: "pre-wrap",
            }}
          >
            {msg.text}
          </div>
        ))}

        <div ref={chatEndRef}></div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
          style={{
            width: "80%",
            padding: "10px",
            borderRadius: "20px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleUserInput}
          style={{
            width: "15%",
            background: "#4caf50",
            color: "white",
            border: "none",
            borderRadius: "20px",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
