import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import API from "../api/api";

const socket = io("http://localhost:3000"); // backend URL

const Chatmessage = ({ counselorId, clientId, userId }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const chatBoxRef = useRef(null);

  const room = `${counselorId}_${clientId}`;

  useEffect(() => {
    // Load chat history
    const loadChatHistory = async () => {
      try {
        const response = await API.get(`/chat/history/${counselorId}/${clientId}`);
        if (response.data.success) {
          setMessages(response.data.messages);
        }
      } catch (error) {
        console.error("Error loading chat history:", error);
      } finally {
        setLoading(false);
      }
    };

    loadChatHistory();
    socket.emit("join_room", room);

    socket.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
      scrollToBottom();
    });

    return () => socket.disconnect();
  }, [room, counselorId, clientId]);

  const sendMessage = () => {
    if (!message.trim()) return;
    socket.emit("send_message", { room, senderId: userId, message });
    setMessages((prev) => [...prev, { senderId: userId, message }]);
    setMessage("");
    scrollToBottom();
  };

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  if (loading) {
    return (
      <div style={{ maxWidth: "500px", margin: "auto", padding: "10px", textAlign: "center" }}>
        <p>Loading chat history...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "10px" }}>
      <div
        ref={chatBoxRef}
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "10px",
          height: "400px",
          overflowY: "scroll",
          marginBottom: "10px",
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              textAlign: msg.senderId === userId ? "right" : "left",
              margin: "5px 0",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: "20px",
                backgroundColor: msg.senderId === userId ? "#7b5bff" : "#eee",
                color: msg.senderId === userId ? "#fff" : "#000",
              }}
            >
              {msg.message}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex" }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: "10px", borderRadius: "20px", border: "1px solid #ccc" }}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            borderRadius: "20px",
            border: "none",
            backgroundColor: "#7b5bff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatmessage;
