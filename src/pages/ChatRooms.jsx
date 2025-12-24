import React, { useState, useEffect } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const ChatRooms = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const userRole = localStorage.getItem("userRole");
    
    if (!userId) {
      navigate("/login");
      return;
    }
    
    setUserId(userId);
    setUserRole(userRole);
    
    const fetchBookings = async () => {
      try {
        const response = await API.get(`/chat/bookings/${userId}`);
        if (response.data.success) {
          setBookings(response.data.bookings);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  const openChat = (booking) => {
    const otherUserId = userRole === "client" ? booking.counselorId._id : booking.clientId._id;
    navigate(`/chat/${otherUserId}`);
  };

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p>Loading your chat rooms...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>Your Chat Rooms</h2>
      
      {bookings.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <p>No paid bookings found. Start by booking a counseling session!</p>
          <button 
            onClick={() => navigate("/booking")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#7b5bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Book a Session
          </button>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "15px" }}>
          {bookings.map((booking) => (
            <div
              key={booking._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "15px",
                backgroundColor: "#f9f9f9",
                cursor: "pointer",
                transition: "background-color 0.2s"
              }}
              onClick={() => openChat(booking)}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#f0f0f0"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#f9f9f9"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h4 style={{ margin: "0 0 5px 0" }}>
                    {userRole === "client" ? booking.counselorId.name : booking.clientId.name}
                  </h4>
                  <p style={{ margin: "0", color: "#666", fontSize: "14px" }}>
                    {userRole === "client" ? "Counselor" : "Client"}
                  </p>
                  <p style={{ margin: "5px 0", color: "#666", fontSize: "14px" }}>
                    📅 {booking.date} at {booking.time}
                  </p>
                  {booking.meetLink && (
                    <p style={{ margin: "5px 0", fontSize: "12px" }}>
                      📹 <a href={booking.meetLink} target="_blank" rel="noopener noreferrer" style={{ color: "#7b5bff" }}>
                        Join Video Call
                      </a>
                    </p>
                  )}
                </div>
                <div style={{ textAlign: "right" }}>
                  <span
                    style={{
                      backgroundColor: "#4caf50",
                      color: "white",
                      padding: "4px 8px",
                      borderRadius: "12px",
                      fontSize: "12px"
                    }}
                  >
                    Paid
                  </span>
                  <div style={{ marginTop: "10px" }}>
                    <button
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "#7b5bff",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                      }}
                    >
                      Open Chat 💬
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatRooms;
