// import React, { useEffect, useState } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import API from "../api/api";
// import { CheckCircle2, ArrowLeft, Calendar, Clock, Video, MessageSquare, Mail } from "lucide-react";

// const PaymentSuccess = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const [booking, setBooking] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const sessionId = searchParams.get("session_id");

//   useEffect(() => {
//     if (!sessionId) {
//       setError("No session ID found");
//       setLoading(false);
//       return;
//     }

//     const fetchPaymentDetails = async () => {
//       try {
//         const { data } = await API.get(`/payment/details/${sessionId}`);
//         if (data.success) {
//           setBooking(data.booking);
//         } else {
//           setError(data.message || "Failed to load payment details");
//         }
//       } catch (err) {
//         console.error("Error fetching payment details:", err);
//         setError("Failed to load payment details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPaymentDetails();
//   }, [sessionId]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#f4f2ed] flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3f6212] mx-auto"></div>
//           <p className="mt-4 text-[#3f6212]">Loading payment details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-[#f4f2ed] flex items-center justify-center">
//         <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
//           <div className="text-red-600 text-6xl mb-4">⚠️</div>
//           <h2 className="text-2xl font-bold text-[#1c1917] mb-2">Payment Error</h2>
//           <p className="text-gray-600 mb-6">{error}</p>
//           <button
//             onClick={() => navigate("/")}
//             className="bg-[#1c1917] text-white px-6 py-3 rounded-full hover:bg-[#3f6212] transition-colors"
//           >
//             Go Home
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#f4f2ed] text-[#1c1917] font-sans">
//       <div className="max-w-4xl mx-auto px-6 py-12">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
//             <CheckCircle2 size={40} />
//           </div>
//           <h1 className="text-4xl font-serif font-bold text-[#1c1917] mb-4">Payment Successful!</h1>
//           <p className="text-lg text-stone-600">
//             Your booking has been confirmed and payment has been processed.
//           </p>
//         </div>

//         {/* Booking Details */}
//         {booking && (
//           <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
//             <h2 className="text-2xl font-serif font-bold text-[#1c1917] mb-6">Booking Details</h2>
            
//             <div className="grid md:grid-cols-2 gap-8">
//               {/* Session Info */}
//               <div className="space-y-4">
//                 <h3 className="font-bold text-[#3f6212] uppercase tracking-wider text-sm mb-4">Session Information</h3>
                
//                 <div className="flex items-center gap-3">
//                   <Calendar size={20} className="text-[#3f6212]" />
//                   <div>
//                     <p className="text-sm text-stone-500">Date</p>
//                     <p className="font-semibold">{booking.date}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <Clock size={20} className="text-[#3f6212]" />
//                   <div>
//                     <p className="text-sm text-stone-500">Time</p>
//                     <p className="font-semibold">{booking.time}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   {booking.sessionType === "video" ? (
//                     <Video size={20} className="text-[#3f6212]" />
//                   ) : (
//                     <MessageSquare size={20} className="text-[#3f6212]" />
//                   )}
//                   <div>
//                     <p className="text-sm text-stone-500">Session Type</p>
//                     <p className="font-semibold capitalize">{booking.sessionType} Session</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <Mail size={20} className="text-[#3f6212]" />
//                   <div>
//                     <p className="text-sm text-stone-500">Duration</p>
//                     <p className="font-semibold">{booking.durationMin} minutes</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Counselor Info */}
//               <div className="space-y-4">
//                 <h3 className="font-bold text-[#3f6212] uppercase tracking-wider text-sm mb-4">Counselor Information</h3>
                
//                 <div className="flex items-center gap-4">
//                   <img
//                     src={booking.counselorId?.profileImage || "https://cdn-icons-png.flaticon.com/512/219/219969.png"}
//                     alt={booking.counselorId?.name}
//                     className="w-16 h-16 rounded-full"
//                   />
//                   <div>
//                     <p className="font-semibold text-lg">{booking.counselorId?.name}</p>
//                     <p className="text-stone-500">{booking.counselorId?.specialization || "Counselor"}</p>
//                   </div>
//                 </div>

//                 <div className="bg-[#f9f8f6] p-4 rounded-2xl">
//                   <p className="text-sm text-stone-500 mb-1">Amount Paid</p>
//                   <p className="text-2xl font-serif font-bold text-[#1c1917]">Rs. {booking.paidAmount || booking.amount}</p>
//                   <p className="text-xs text-green-600 mt-1">✓ Payment Completed</p>
//                 </div>
//               </div>
//             </div>

//             {/* Session Access */}
//             {booking.meetLink && (
//               <div className="mt-8 p-6 bg-[#3f6212]/5 rounded-2xl border-2 border-[#3f6212]">
//                 <h3 className="font-bold text-[#3f6212] mb-3">Session Access</h3>
//                 <p className="text-sm text-stone-600 mb-3">
//                   {booking.sessionType === "video" 
//                     ? "Click the button below to join your video session at the scheduled time."
//                     : "Click the button below to access your chat room."
//                   }
//                 </p>
//                 <a
//                   href={booking.meetLink}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center gap-2 bg-[#3f6212] text-white px-6 py-3 rounded-full hover:bg-[#1c1917] transition-colors"
//                 >
//                   {booking.sessionType === "video" ? (
//                     <>
//                       <Video size={20} /> Join Video Call
//                     </>
//                   ) : (
//                     <>
//                       <MessageSquare size={20} /> Open Chat Room
//                     </>
//                   )}
//                 </a>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Action Buttons */}
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <button
//             onClick={() => navigate("/client-bookings")}
//             className="flex items-center justify-center gap-2 bg-white text-[#1c1917] px-6 py-3 rounded-full border-2 border-[#1c1917] hover:bg-[#1c1917] hover:text-white transition-colors"
//           >
//             <ArrowLeft size={20} />
//             View My Bookings
//           </button>
//           <button
//             onClick={() => navigate("/counselors")}
//             className="bg-[#3f6212] text-white px-6 py-3 rounded-full hover:bg-[#1c1917] transition-colors"
//           >
//             Book Another Session
//           </button>
//         </div>

//         {/* Important Information */}
//         <div className="mt-12 bg-white/50 p-6 rounded-2xl border border-stone-200">
//           <h3 className="font-bold text-[#1c1917] mb-3">Important Information</h3>
//           <ul className="space-y-2 text-sm text-stone-600">
//             <li className="flex items-start gap-2">
//               <span className="text-green-600 mt-1">✓</span>
//               <span>You will receive a confirmation email with session details</span>
//             </li>
//             <li className="flex items-start gap-2">
//               <span className="text-green-600 mt-1">✓</span>
//               <span>Your counselor has been notified of the booking</span>
//             </li>
//             <li className="flex items-start gap-2">
//               <span className="text-green-600 mt-1">✓</span>
//               <span>Please join the session 5 minutes before the scheduled time</span>
//             </li>
//             <li className="flex items-start gap-2">
//               <span className="text-green-600 mt-1">✓</span>
//               <span>For any issues, contact support at support@healpeer.com</span>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentSuccess;


import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import {
  CheckCircle2,
  ArrowLeft,
  Calendar,
  Clock,
  Video,
  MessageSquare,
  Mail,
} from "lucide-react";

const DEFAULT_AVATAR =
  "https://cdn-icons-png.flaticon.com/512/219/219969.png";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) {
      setError("No session ID found");
      setLoading(false);
      return;
    }

    const fetchPaymentDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = token
          ? { Authorization: `Bearer ${token}` }
          : {};

        const { data } = await API.get(`/payment/details/${sessionId}`, {
          headers,
        });

        if (data.success) {
          setBooking(data.booking);
        } else {
          setError(data.message || "Failed to load payment details");
        }
      } catch (err) {
        console.error(
          "Error fetching payment details:",
          err.response?.data || err.message || err
        );
        setError(
          err.response?.data?.message ||
            "Failed to load payment details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f2ed] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3f6212] mx-auto"></div>
          <p className="mt-4 text-[#3f6212]">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f4f2ed] flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-[#1c1917] mb-2">
            Payment Error
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="bg-[#1c1917] text-white px-6 py-3 rounded-full hover:bg-[#3f6212] transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f2ed] text-[#1c1917] font-sans">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle2 size={40} />
          </div>
          <h1 className="text-4xl font-serif font-bold text-[#1c1917] mb-4">
            Payment Successful!
          </h1>
          <p className="text-lg text-stone-600">
            Your booking has been confirmed and payment has been processed.
          </p>
        </div>

        {/* Booking Details */}
        {booking && (
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-serif font-bold text-[#1c1917] mb-6">
              Booking Details
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Session Info */}
              <div className="space-y-4">
                <h3 className="font-bold text-[#3f6212] uppercase tracking-wider text-sm mb-4">
                  Session Information
                </h3>

                <div className="flex items-center gap-3">
                  <Calendar size={20} className="text-[#3f6212]" />
                  <div>
                    <p className="text-sm text-stone-500">Date</p>
                    <p className="font-semibold">{booking.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-[#3f6212]" />
                  <div>
                    <p className="text-sm text-stone-500">Time</p>
                    <p className="font-semibold">{booking.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {booking.sessionType === "video" ? (
                    <Video size={20} className="text-[#3f6212]" />
                  ) : (
                    <MessageSquare size={20} className="text-[#3f6212]" />
                  )}
                  <div>
                    <p className="text-sm text-stone-500">Session Type</p>
                    <p className="font-semibold capitalize">
                      {booking.sessionType} Session
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-[#3f6212]" />
                  <div>
                    <p className="text-sm text-stone-500">Duration</p>
                    <p className="font-semibold">
                      {booking.durationMin} minutes
                    </p>
                  </div>
                </div>
              </div>

              {/* Counselor Info */}
              <div className="space-y-4">
                <h3 className="font-bold text-[#3f6212] uppercase tracking-wider text-sm mb-4">
                  Counselor Information
                </h3>

                <div className="flex items-center gap-4">
                  <img
                    src={
                      booking.counselorId?.profileImage || DEFAULT_AVATAR
                    }
                    alt={booking.counselorId?.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-lg">
                      {booking.counselorId?.name}
                    </p>
                    <p className="text-stone-500">
                      {booking.counselorId?.specialization || "Counselor"}
                    </p>
                  </div>
                </div>

                <div className="bg-[#f9f8f6] p-4 rounded-2xl">
                  <p className="text-sm text-stone-500 mb-1">Amount Paid</p>
                  <p className="text-2xl font-serif font-bold text-[#1c1917]">
                    Rs. {booking.paidAmount || booking.amount}
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    ✓ Payment Completed
                  </p>
                </div>
              </div>
            </div>

            {/* Session Access */}
            {booking.meetLink && (
              <div className="mt-8 p-6 bg-[#3f6212]/5 rounded-2xl border-2 border-[#3f6212]">
                <h3 className="font-bold text-[#3f6212] mb-3">
                  Session Access
                </h3>
                <p className="text-sm text-stone-600 mb-3">
                  {booking.sessionType === "video"
                    ? "Click the button below to join your video session at the scheduled time."
                    : "Click the button below to access your chat room."}
                </p>
                <a
                  href={booking.meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#3f6212] text-white px-6 py-3 rounded-full hover:bg-[#1c1917] transition-colors"
                >
                  {booking.sessionType === "video" ? (
                    <>
                      <Video size={20} /> Join Video Call
                    </>
                  ) : (
                    <>
                      <MessageSquare size={20} /> Open Chat Room
                    </>
                  )}
                </a>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/client-dashboard")}
            className="flex items-center justify-center gap-2 bg-white text-[#1c1917] px-6 py-3 rounded-full border-2 border-[#1c1917] hover:bg-[#1c1917] hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            Go to Dashboard
          </button>
          <button
            onClick={() => navigate("/counselors")}
            className="bg-[#3f6212] text-white px-6 py-3 rounded-full hover:bg-[#1c1917] transition-colors"
          >
            Book Another Session
          </button>
        </div>

        {/* Important Information */}
        <div className="mt-12 bg-white/50 p-6 rounded-2xl border border-stone-200">
          <h3 className="font-bold text-[#1c1917] mb-3">
            Important Information
          </h3>
          <ul className="space-y-2 text-sm text-stone-600">
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">✓</span>
              <span>
                You will receive a confirmation email with session details
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">✓</span>
              <span>Your counselor has been notified of the booking</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">✓</span>
              <span>
                Please join the session 5 minutes before the scheduled time
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">✓</span>
              <span>
                For any issues, contact support at support@healpeer.com
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
