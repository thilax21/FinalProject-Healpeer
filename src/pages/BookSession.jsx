// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import API from "../api/api";

// const BookSession = ({ user }) => {
//   const { id } = useParams(); // counselor ID
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { counselor } = location.state || {};

//   const [loading, setLoading] = useState(true);
//   const [dateTime, setDateTime] = useState("");
//   const [amount, setAmount] = useState(50); // Default session fee
//   const [counselorData, setCounselorData] = useState(null);

//   useEffect(() => {
//     const fetchCounselor = async () => {
//       try {
//         const { data } = await API.get(`/counselors/${id}`);
//         setCounselorData(data.data);
//       } catch (err) {
//         console.error("Error fetching counselor:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCounselor();
//   }, [id]);

//   const handlePay = async () => {
//     if (!user) {
//       alert("Please login first to book a session");
//       navigate("/login");
//       return;
//     }
  
//     if (!dateTime) {
//       alert("Please select a date and time for your session");
//       return;
//     }
  
//     try {
//       // 1️⃣ Create session in backend
//       const sessionRes = await API.post("/session/book", {
//         counselorId: id,
//         dateTime,
//         amount,
//       });
  
//       const session = sessionRes.data.data;
  
//       // 2️⃣ Create Stripe checkout session
//       const stripeRes = await API.post("/payments/create-checkout-session", {
//         sessionId: session._id,
//         amount,
//       });
  
//       if (stripeRes.data.success) {
//         window.location.href = stripeRes.data.url; // redirect to Stripe checkout
//       } else {
//         alert("Payment initialization failed");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Something went wrong during payment");
//     }
//   };
  

//   if (loading) return <p>Loading counselor details...</p>;
//   if (!counselorData) return <p>Counselor not found.</p>;

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Book Session with {counselorData.name}</h2>
//       <p><strong>Specialization:</strong> {counselorData.specialization || "Not specified"}</p>
//       <p><strong>Experience:</strong> {counselorData.experience || "Not available"}</p>
//       <p><strong>Bio:</strong> {counselorData.bio || "No bio provided"}</p>
//       <p><strong>Contact:</strong> {counselorData.contactNumber || "Not provided"}</p>

//       <hr />

//       <label>
//         Select Date & Time:
//         <input
//           type="datetime-local"
//           value={dateTime}
//           onChange={(e) => setDateTime(e.target.value)}
//           required
//         />
//       </label>

//       <div style={{ marginTop: "20px" }}>
//         <h3>Session Fee: ${amount}</h3>
//         <button onClick={handlePay}>Proceed to Payment</button>
//       </div>
//     </div>
//   );
// };

// export default BookSession;
// src/pages/BookSession.jsx
import React, { useState } from "react";
import API from "../api/api";
import PaymentButton from "./PaymentButton";

const BookSession = ({ counselor }) => {
  const [dateTime, setDateTime] = useState("");
  const [amount, setAmount] = useState(counselor.fee || 50);
  const [sessionBooked, setSessionBooked] = useState(null);

  const handleBookSession = async () => {
    if (!dateTime) return alert("Select a date & time");

    try {
      const { data } = await API.post("/session/book", {
        counselorId: counselor._id,
        dateTime,
        amount,
      });

      setSessionBooked(data.data);
    } catch (err) {
      console.error(err);
      alert("Booking failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Book Session with {counselor.name}</h2>
      <label>
        Date & Time:
        <input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
      </label>
      <br />
      <label>
        Amount: $
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ width: "80px", marginLeft: "5px" }}
        />
      </label>
      <br />
      <button onClick={handleBookSession} style={{ marginTop: "10px" }}>
        Book Session
      </button>

      {sessionBooked && (
        <div style={{ marginTop: "20px" }}>
          <h3>Proceed to Payment 💳</h3>
          <PaymentButton
            sessionId={sessionBooked._id}
            amount={amount}
            type="user"
          />
        </div>
      )}
    </div>
  );
};

export default BookSession;
