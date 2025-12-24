import React, { useEffect, useState } from "react";
import API from "../api/api";

const Sessions = ({ user }) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newSession, setNewSession] = useState({ counselorId: "", date: "" });

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        let url = "/session/my-sessions";
        if (user.role === "admin") url = "/sessions/all";

        const { data } = await API.get(url);
        setSessions(data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchSessions();
  }, [user]);

  const handleChange = (e) => {
    setNewSession({ ...newSession, [e.target.name]: e.target.value });
  };

  const handleBookSession = async () => {
    try {
      const { data } = await API.post("/session/book", newSession);
      setSessions([data.data, ...sessions]);
      setNewSession({ counselorId: "", date: "" });
      alert("Session booked!");
    } catch (err) {
      console.error(err);
      alert("Booking failed");
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const { data } = await API.put(`/session/update-status/${id}`, { status });
      setSessions(sessions.map((s) => (s._id === id ? data.data : s)));
      alert("Status updated!");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  if (loading) return <p>Loading sessions...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Sessions</h2>

      {/* Book session form (Client only) */}
      {user.role === "client" && (
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Counselor ID"
            name="counselorId"
            value={newSession.counselorId}
            onChange={handleChange}
          />
          <input
            type="date"
            name="date"
            value={newSession.date}
            onChange={handleChange}
          />
          <button onClick={handleBookSession}>Book Session</button>
        </div>
      )}

      {/* Sessions List */}
      <ul>
        {sessions.map((s) => (
          <li key={s._id} style={{ marginBottom: "15px", border: "1px solid #ccc", padding: "10px" }}>
            <p>
              <strong>Client:</strong> {s.client.name} ({s.client.email})
            </p>
            <p>
              <strong>Counselor:</strong> {s.counselor.name} ({s.counselor.email})
            </p>
            <p><strong>Date:</strong> {new Date(s.date).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {s.status}</p>
            <p><strong>Payment:</strong> {s.paymentStatus}</p>
            <p><strong>Paid to Counselor:</strong> {s.counselorPaid ? "Yes" : "No"}</p>

            {/* Update status (Admin or assigned Counselor) */}
            {(user.role === "admin" || user._id === s.counselor._id) && (
              <div>
                {s.status !== "completed" && <button onClick={() => handleUpdateStatus(s._id, "completed")}>Mark Completed</button>}
                {s.status !== "cancelled" && <button onClick={() => handleUpdateStatus(s._id, "cancelled")}>Cancel</button>}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sessions;
