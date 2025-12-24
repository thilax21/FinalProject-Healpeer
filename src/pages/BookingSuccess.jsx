// import { useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// const BokingSuccess = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     // Optional: get session_id from URL if needed
//     const params = new URLSearchParams(location.search);
//     const sessionId = params.get("session_id");
//     console.log("Payment successful. Stripe session:", sessionId);

//     // Wait 2 seconds then navigate to home page
//     const timer = setTimeout(() => {
//       navigate("/"); // home page
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, [navigate, location]);

//   return (
//     <div style={{ textAlign: "center", marginTop: 50 }}>
//       <h2>Payment Successful ✅</h2>
//       <p>Redirecting to home page...</p>
//     </div>
//   );
// };

// export default BokingSuccess;




import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api/api";

const BokingSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sessionId = params.get("session_id");

    if (sessionId) {
      // fetch updated booking using our API
      API.get(`/booking/session/${sessionId}`)
        .then((res) => {
          if (res.data.success) {
            setBooking(res.data.booking);
          }
        })
        .catch((err) => console.error("Error fetching booking:", err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }

    const timer = setTimeout(() => {
      navigate("/"); // redirect after 5s
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate, location]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Confirming your booking...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">Your booking has been confirmed</p>
        
        {booking && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-3">Booking Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Session Type:</span>
                <span className="font-medium">
                  {booking.sessionType === "chat" ? "💬 Chat Session" : "📹 Video Call"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{booking.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-medium">{booking.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">{booking.durationMin} minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium text-green-600">{booking.status}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-gray-600 mb-2">
                {booking.sessionType === "chat" 
                  ? "Check your email for the chat room link to start your session." 
                  : "Check your email for the Google Meet link to join your video call."
                }
              </p>
            </div>
          </div>
        )}
        
        <div className="space-y-3">
          <button
            onClick={() => navigate("/dashboard/bookings")}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
          >
            View My Bookings
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-200"
          >
            Back to Home
          </button>
        </div>
        
        <p className="text-sm text-gray-500 mt-4">
          You will be redirected automatically in 5 seconds...
        </p>
      </div>
    </div>
  );
};

export default BokingSuccess;
