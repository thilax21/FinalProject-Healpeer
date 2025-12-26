

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API from "../api/api";
// import PaymentButton from "./PaymentButton";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   ArrowLeft,
//   Calendar,
//   Clock,
//   Video,
//   MessageSquare,
//   CheckCircle2,
//   Sparkles,
//   AlertCircle,
//   ShieldCheck,
// } from "lucide-react";

// // --- VISUAL UTILS ---

// const Grain = () => (
//   <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.04] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] filter contrast-150 brightness-100" />
// );

// const InputGroup = ({ label, children, icon: Icon }) => (
//   <div className="space-y-2">
//     <label className="text-xs font-bold uppercase tracking-widest text-stone-400 flex items-center gap-2">
//       {Icon && <Icon size={12} />} {label}
//     </label>
//     {children}
//   </div>
// );

// // --- MAIN COMPONENT ---

// const BookingPage = ({ user }) => {
//   const { id } = useParams(); // counselorId
//   const navigate = useNavigate();

//   const [counselor, setCounselor] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [bookingData, setBookingData] = useState({
//     sessionType: "video",
//     date: "",
//     time: "",
//     durationMin: 60, // default duration
//     notes: "",
//   });

//   const [availableSlots, setAvailableSlots] = useState([]);
//   const [slotsLoading, setSlotsLoading] = useState(false);
//   const [selectedSlot, setSelectedSlot] = useState(null);

//   const [bookingCreated, setBookingCreated] = useState(null);
//   const [error, setError] = useState("");

//   // --- Fetch counselor ---

//   useEffect(() => {
//     const fetchCounselor = async () => {
//       try {
//         const { data } = await API.get(`/counselors/${id}`);
//         setCounselor(data.data);
//       } catch (err) {
//         console.error("Error fetching counselor:", err);
//         setError("Failed to load counselor information");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCounselor();
//   }, [id]);

//   // --- Fetch available slots when date or duration changes ---

//   useEffect(() => {
//     const fetchSlots = async () => {
//       if (!bookingData.date || !bookingData.durationMin) {
//         setAvailableSlots([]);
//         setSelectedSlot(null);
//         return;
//       }

//       setSlotsLoading(true);
//       setError("");

//       try {
//         const { data } = await API.get(
//           `/availability/${id}/date/${bookingData.date}?durationMin=${bookingData.durationMin}`
//         );
//         setAvailableSlots(data.slots || []);
//         setSelectedSlot(null);
//         // clear time until slot chosen
//         setBookingData((prev) => ({
//           ...prev,
//           time: "",
//         }));
//       } catch (err) {
//         console.error("Error fetching slots:", err);
//         setError("Failed to load available time slots");
//         setAvailableSlots([]);
//         setSelectedSlot(null);
//       } finally {
//         setSlotsLoading(false);
//       }
//     };

//     fetchSlots();
//   }, [id, bookingData.date, bookingData.durationMin]);

//   // --- Handlers ---

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setBookingData((prev) => ({
//       ...prev,
//       [name]: name === "durationMin" ? Number(value) : value,
//     }));
//   };

//   const handleSessionTypeSelect = (type) => {
//     setBookingData((prev) => ({ ...prev, sessionType: type }));
//   };

//   const handleSlotSelect = (slot) => {
//     setSelectedSlot(slot);
//     setBookingData((prev) => ({
//       ...prev,
//       time: slot.startTime, // use slot start time
//     }));
//     setError("");
//   };

//   const handleBookingSubmit = async (e) => {
//     e.preventDefault();

//     if (!user) return navigate("/login");
//     if (user.role !== "client")
//       return alert("Only clients can book sessions");
//     if (!bookingData.date || !bookingData.time)
//       return setError("Please select a date and an available time slot.");

//     try {
//       const clientId = user._id || user.id || localStorage.getItem("userId");
//       if (!clientId) {
//         setError("User ID not found. Please login again.");
//         return;
//       }

//       const bookingPayload = {
//         clientId,
//         counselorId: id,
//         date: bookingData.date,
//         time: bookingData.time,
//         durationMin: bookingData.durationMin,
//         notes: bookingData.notes,
//         sessionType: bookingData.sessionType,
//       };

//       const { data } = await API.post("/booking/create", bookingPayload);
//       setBookingCreated(data.booking);
//       setError("");
//     } catch (err) {
//       console.error("Booking create error:", err);
//       setError(err.response?.data?.message || "Failed to create booking");
//     }
//   };

//   // --- UI ---

//   if (loading)
//     return (
//       <div className="min-h-screen bg-[#f4f2ed] flex items-center justify-center font-serif text-[#3f6212] animate-pulse text-xl">
//         Loading Sanctuary...
//       </div>
//     );

//   if (!counselor)
//     return (
//       <div className="min-h-screen bg-[#f4f2ed] flex items-center justify-center">
//         Counselor not found.
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-[#f4f2ed] text-[#1c1917] font-sans selection:bg-[#3f6212] selection:text-white relative">
//       <Grain />

//       {/* Header */}
//       <header className="pt-8 pb-12 px-6 md:px-12 max-w-7xl mx-auto flex items-center justify-between relative z-10">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-[#1c1917] transition-colors"
//         >
//           <ArrowLeft size={16} /> Back
//         </button>
//         <div className="text-sm font-bold flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-stone-100">
//           <ShieldCheck size={16} className="text-green-600" /> Secure Booking
//         </div>
//       </header>

//       <main className="max-w-6xl mx-auto px-6 pb-24 relative z-10">
//         <div className="grid lg:grid-cols-12 gap-12 items-start">
//           {/* LEFT: Counselor card */}
//           <div className="lg:col-span-4 lg:sticky lg:top-8">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-xl text-center relative overflow-hidden"
//             >
//               <div className="absolute top-0 left-0 w-full h-32 bg-[#1c1917]" />

//               <div className="relative z-10 mb-6">
//                 <div className="w-32 h-32 mx-auto rounded-[2rem] overflow-hidden border-4 border-white shadow-md">
//                   <img
//                     src={
//                       counselor.profileImage ||
//                       "https://cdn-icons-png.flaticon.com/512/219/219969.png"
//                     }
//                     alt={counselor.name}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               </div>

//               <h2 className="text-2xl font-serif font-bold text-[#1c1917] mb-1">
//                 {counselor.name}
//               </h2>
//               <p className="text-xs font-bold uppercase tracking-widest text-[#3f6212] mb-6">
//                 {counselor.specialization || "Specialist"}
//               </p>

//               <div className="grid grid-cols-2 gap-4 mb-8">
//                 <div className="bg-[#f9f8f6] p-4 rounded-2xl">
//                   <p className="text-xs text-stone-400 uppercase tracking-wide mb-1">
//                     Experience
//                   </p>
//                   <p className="font-serif font-bold text-lg">
//                     {counselor.experience || 0} Yrs
//                   </p>
//                 </div>
//                 <div className="bg-[#f9f8f6] p-4 rounded-2xl">
//                   <p className="text-xs text-stone-400 uppercase tracking-wide mb-1">
//                     Fee
//                   </p>
//                   <p className="font-serif font-bold text-lg">
//                     Rs. {counselor.pricePerSession || 1000}
//                   </p>
//                 </div>
//               </div>

//               <div className="text-left bg-[#f9f8f6] p-6 rounded-2xl text-sm text-stone-500 leading-relaxed">
//                 <p className="line-clamp-4">
//                   {counselor.bio ||
//                     "Dedicated to providing a safe space for healing and growth."}
//                 </p>
//               </div>
//             </motion.div>
//           </div>

//           {/* RIGHT: Booking form / payment state */}
//           <div className="lg:col-span-8">
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.1 }}
//               className="bg-white p-8 md:p-12 rounded-[3rem] border border-stone-100 shadow-sm relative"
//             >
//               <AnimatePresence mode="wait">
//                 {!bookingCreated ? (
//                   <motion.form
//                     key="form"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     onSubmit={handleBookingSubmit}
//                     className="space-y-10"
//                   >
//                     <div>
//                       <h1 className="text-4xl font-serif font-bold text-[#1c1917] mb-2">
//                         Session Details
//                       </h1>
//                       <p className="text-stone-500">
//                         Choose how you want to meet, duration, and time within
//                         the counselor&apos;s available hours.
//                       </p>
//                     </div>

//                     {/* 1. Session Type */}
//                     <InputGroup label="How would you like to meet?">
//                       <div className="grid md:grid-cols-2 gap-4">
//                         <div
//                           onClick={() => handleSessionTypeSelect("video")}
//                           className={`cursor-pointer p-5 rounded-2xl border-2 transition-all flex items-center gap-4 ${
//                             bookingData.sessionType === "video"
//                               ? "border-[#3f6212] bg-[#3f6212]/5"
//                               : "border-stone-100 hover:border-stone-300"
//                           }`}
//                         >
//                           <div
//                             className={`w-12 h-12 rounded-full flex items-center justify-center ${
//                               bookingData.sessionType === "video"
//                                 ? "bg-[#3f6212] text-white"
//                                 : "bg-stone-100 text-stone-400"
//                             }`}
//                           >
//                             <Video size={20} />
//                           </div>
//                           <div>
//                             <p className="font-bold text-[#1c1917]">
//                               Video Call
//                             </p>
//                             <p className="text-xs text-stone-500">
//                               Encrypted video
//                             </p>
//                           </div>
//                         </div>

//                         <div
//                           onClick={() => handleSessionTypeSelect("chat")}
//                           className={`cursor-pointer p-5 rounded-2xl border-2 transition-all flex items-center gap-4 ${
//                             bookingData.sessionType === "chat"
//                               ? "border-[#3f6212] bg-[#3f6212]/5"
//                               : "border-stone-100 hover:border-stone-300"
//                           }`}
//                         >
//                           <div
//                             className={`w-12 h-12 rounded-full flex items-center justify-center ${
//                               bookingData.sessionType === "chat"
//                                 ? "bg-[#3f6212] text-white"
//                                 : "bg-stone-100 text-stone-400"
//                             }`}
//                           >
//                             <MessageSquare size={20} />
//                           </div>
//                           <div>
//                             <p className="font-bold text-[#1c1917]">
//                               Live Chat
//                             </p>
//                             <p className="text-xs text-stone-500">
//                               Real-time text
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </InputGroup>

//                     {/* 2. Date & Duration */}
//                     <div className="grid md:grid-cols-2 gap-6">
//                       <InputGroup label="Preferred Date" icon={Calendar}>
//                         <input
//                           type="date"
//                           name="date"
//                           value={bookingData.date}
//                           onChange={handleInputChange}
//                           min={new Date().toISOString().split("T")[0]}
//                           className="w-full bg-[#f9f8f6] p-4 rounded-xl border-none focus:ring-2 focus:ring-[#3f6212] text-[#1c1917] font-medium outline-none"
//                           required
//                         />
//                       </InputGroup>
//                       <InputGroup label="Duration" icon={Clock}>
//                         <select
//                           name="durationMin"
//                           value={bookingData.durationMin}
//                           onChange={handleInputChange}
//                           className="w-full bg-[#f9f8f6] p-4 rounded-xl border-none focus:ring-2 focus:ring-[#3f6212] text-[#1c1917] font-medium outline-none cursor-pointer"
//                         >
//                           <option value={30}>30 Minutes</option>
//                           <option value={60}>1 Hour</option>
//                           <option value={90}>1.5 Hours</option>
//                         </select>
//                       </InputGroup>
//                     </div>

//                     {/* 3. Available time slots */}
//                     <InputGroup label="Available Time Slots" icon={Clock}>
//                       {!bookingData.date || !bookingData.durationMin ? (
//                         <p className="text-xs text-stone-500">
//                           Select a date and duration to see available time
//                           slots.
//                         </p>
//                       ) : slotsLoading ? (
//                         <p className="text-xs text-stone-500">
//                           Loading available slots...
//                         </p>
//                       ) : availableSlots.length === 0 ? (
//                         <p className="text-xs text-stone-500">
//                           No free slots on this day for the selected duration.
//                           Please choose another date or different duration.
//                         </p>
//                       ) : (
//                         <div className="flex flex-wrap gap-2">
//                           {availableSlots.map((slot, i) => (
//                             <button
//                               key={i}
//                               type="button"
//                               onClick={() => handleSlotSelect(slot)}
//                               className={`px-3 py-2 rounded-lg text-xs border flex items-center gap-1
//                                 ${
//                                   selectedSlot === slot
//                                     ? "bg-[#3f6212] text-white border-[#3f6212]"
//                                     : "bg-[#f9f8f6] text-stone-700 border-stone-200 hover:bg-stone-100"
//                                 }`}
//                             >
//                               {slot.startTime}–{slot.endTime}
//                             </button>
//                           ))}
//                         </div>
//                       )}
//                     </InputGroup>

//                     {/* 4. Notes */}
//                     <InputGroup label="Notes for Counselor (Optional)">
//                       <input
//                         name="notes"
//                         value={bookingData.notes}
//                         onChange={handleInputChange}
//                         placeholder="Anything specific you want to discuss?"
//                         className="w-full bg-[#f9f8f6] p-4 rounded-xl border-none focus:ring-2 focus:ring-[#3f6212] text-[#1c1917] outline-none placeholder:text-stone-400"
//                       />
//                     </InputGroup>

//                     {/* Error & Submit */}
//                     {error && (
//                       <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-2 text-sm font-medium">
//                         <AlertCircle size={16} /> {error}
//                       </div>
//                     )}

//                     <button
//                       type="submit"
//                       className="w-full bg-[#1c1917] text-white py-5 rounded-2xl text-sm font-bold uppercase tracking-widest hover:bg-[#3f6212] transition-colors shadow-lg flex items-center justify-center gap-2"
//                     >
//                       Confirm & Proceed{" "}
//                       <ArrowLeft className="rotate-180" size={16} />
//                     </button>
//                   </motion.form>
//                 ) : (
//                   // PAYMENT STATE
//                   <motion.div
//                     key="payment"
//                     initial={{ opacity: 0, scale: 0.95 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     className="text-center py-12"
//                   >
//                     <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
//                       <CheckCircle2 size={40} />
//                     </div>
//                     <h2 className="text-3xl font-serif font-bold text-[#1c1917] mb-2">
//                       Reservation Held!
//                     </h2>
//                     <p className="text-stone-500 max-w-md mx-auto mb-10">
//                       Your slot for{" "}
//                       <span className="font-bold text-[#1c1917]">
//                         {bookingData.date} at {bookingData.time}
//                       </span>{" "}
//                       ({bookingData.durationMin} mins) is reserved. Please
//                       complete the payment to finalize your booking.
//                     </p>

//                     <div className="max-w-sm mx-auto bg-[#f9f8f6] p-8 rounded-3xl border border-stone-200">
//                       <div className="flex justify-between items-center mb-6 pb-6 border-b border-stone-200">
//                         <span className="text-sm font-bold text-stone-500 uppercase tracking-wider">
//                           Total
//                         </span>
//                         <span className="text-4xl font-serif font-bold text-[#1c1917]">
//                           Rs.{" "}
//                           {bookingCreated?.amount ||
//                             counselor.pricePerSession ||
//                             1000}
//                         </span>
//                       </div>

//                       <PaymentButton
//                         bookingId={bookingCreated._id}
//                         amount={bookingCreated.amount}
//                       />

//                       <button
//                         onClick={() => {
//                           setBookingCreated(null);
//                         }}
//                         className="mt-4 text-xs font-bold text-stone-400 hover:text-[#1c1917] underline"
//                       >
//                         Modify Booking Details
//                       </button>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.div>

//             {/* Info Footer */}
//             <div className="mt-8 grid md:grid-cols-2 gap-6">
//               <div className="bg-white/50 p-6 rounded-2xl border border-stone-100 flex gap-4 items-start">
//                 <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
//                   <Video size={18} />
//                 </div>
//                 <div>
//                   <h4 className="font-bold text-[#1c1917] text-sm mb-1">
//                     Secure Video
//                   </h4>
//                   <p className="text-xs text-stone-500 leading-relaxed">
//                     Encrypted, high-quality video calls directly in your
//                     browser. No downloads required.
//                   </p>
//                 </div>
//               </div>
//               <div className="bg-white/50 p-6 rounded-2xl border border-stone-100 flex gap-4 items-start">
//                 <div className="p-2 bg-green-50 text-green-600 rounded-lg">
//                   <Sparkles size={18} />
//                 </div>
//                 <div>
//                   <h4 className="font-bold text-[#1c1917] text-sm mb-1">
//                     Satisfaction Guarantee
//                   </h4>
//                   <p className="text-xs text-stone-500 leading-relaxed">
//                     If you're not satisfied with your session, we offer a free
//                     rescheduling option.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default BookingPage;

// src/pages/BookingPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import PaymentButton from "./PaymentButton";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Video,
  MessageSquare,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

// --- VISUAL UTILS ---

const Grain = () => (
  <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.04] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] filter contrast-150 brightness-100" />
);

const InputGroup = ({ label, children, icon: Icon }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold uppercase tracking-widest text-stone-400 flex items-center gap-2">
      {Icon && <Icon size={12} />} {label}
    </label>
    {children}
  </div>
);

// --- IMAGE HELPERS ---
const DEFAULT_AVATAR =
  "https://cdn-icons-png.flaticon.com/512/219/219969.png";
const BACKEND_BASE_URL = "https://healpeer-backend.onrender.com"; // adjust if different

const getAvatarUrl = (counselor) => {
  const img = counselor?.profileImage;
  if (!img) return DEFAULT_AVATAR;
  if (img.startsWith("http")) return img;
  return `${BACKEND_BASE_URL}${img}`;
};

// --- MAIN COMPONENT ---

const BookingPage = ({ user }) => {
  const { id } = useParams(); // counselorId
  const navigate = useNavigate();

  const [counselor, setCounselor] = useState(null);
  const [loading, setLoading] = useState(true);

  const [bookingData, setBookingData] = useState({
    sessionType: "video",
    date: "",
    time: "",
    durationMin: 60, // default duration
    notes: "",
  });

  const [availableSlots, setAvailableSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [bookingCreated, setBookingCreated] = useState(null);
  const [error, setError] = useState("");

  // --- Fetch counselor profile ---

  useEffect(() => {
    const fetchCounselor = async () => {
      try {
        const { data } = await API.get(`/counselors/${id}`);
        setCounselor(data.data); // full counselor profile doc
      } catch (err) {
        console.error("Error fetching counselor:", err);
        setError("Failed to load counselor information");
      } finally {
        setLoading(false);
      }
    };
    fetchCounselor();
  }, [id]);

  // --- Fetch available slots when date or duration changes ---

  useEffect(() => {
    const fetchSlots = async () => {
      if (!bookingData.date || !bookingData.durationMin) {
        setAvailableSlots([]);
        setSelectedSlot(null);
        return;
      }

      setSlotsLoading(true);
      setError("");

      try {
        const { data } = await API.get(
          `/availability/${id}/date/${bookingData.date}?durationMin=${bookingData.durationMin}`
        );
        setAvailableSlots(data.slots || []);
        setSelectedSlot(null);
        // clear time until slot chosen
        setBookingData((prev) => ({
          ...prev,
          time: "",
        }));
      } catch (err) {
        console.error("Error fetching slots:", err);
        setError("Failed to load available time slots");
        setAvailableSlots([]);
        setSelectedSlot(null);
      } finally {
        setSlotsLoading(false);
      }
    };

    fetchSlots();
  }, [id, bookingData.date, bookingData.durationMin]);

  // --- Handlers ---

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: name === "durationMin" ? Number(value) : value,
    }));
  };

  const handleSessionTypeSelect = (type) => {
    setBookingData((prev) => ({ ...prev, sessionType: type }));
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setBookingData((prev) => ({
      ...prev,
      time: slot.startTime, // use slot start time
    }));
    setError("");
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!user) return navigate("/login");
    if (user.role !== "client")
      return alert("Only clients can book sessions");
    if (!bookingData.date || !bookingData.time)
      return setError("Please select a date and an available time slot.");

    try {
      const clientId = user._id || user.id || localStorage.getItem("userId");
      if (!clientId) {
        setError("User ID not found. Please login again.");
        return;
      }

      const bookingPayload = {
        clientId,
        counselorId: id,
        date: bookingData.date,
        time: bookingData.time,
        durationMin: bookingData.durationMin,
        notes: bookingData.notes,
        sessionType: bookingData.sessionType,
      };

      const { data } = await API.post("/booking/create", bookingPayload);
      setBookingCreated(data.booking);
      setError("");
    } catch (err) {
      console.error("Booking create error:", err);
      setError(err.response?.data?.message || "Failed to create booking");
    }
  };

  // --- UI ---

  if (loading)
    return (
      <div className="min-h-screen bg-[#f4f2ed] flex items-center justify-center font-serif text-[#3f6212] animate-pulse text-xl">
        Loading Sanctuary...
      </div>
    );

  if (!counselor)
    return (
      <div className="min-h-screen bg-[#f4f2ed] flex items-center justify-center">
        Counselor not found.
      </div>
    );

  const avatarUrl = getAvatarUrl(counselor);

  return (
    <div className="min-h-screen bg-[#f4f2ed] text-[#1c1917] font-sans selection:bg-[#3f6212] selection:text-white relative">
      <Grain />

      {/* Header */}
      <header className="pt-8 pb-12 px-6 md:px-12 max-w-7xl mx-auto flex items-center justify-between relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-[#1c1917] transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <div className="text-sm font-bold flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-stone-100">
          <ShieldCheck size={16} className="text-green-600" /> Secure Booking
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-24 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* LEFT: Counselor profile card */}
          <div className="lg:col-span-4 lg:sticky lg:top-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-xl text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-32 bg-[#1c1917]" />

              <div className="relative z-10 mb-6">
                <div className="w-32 h-32 mx-auto rounded-[2rem] overflow-hidden border-4 border-white shadow-md">
                  <img
                    src={avatarUrl}
                    alt={counselor.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = DEFAULT_AVATAR;
                    }}
                  />
                </div>
              </div>

              <h2 className="text-2xl font-serif font-bold text-[#1c1917] mb-1">
                {counselor.name}
              </h2>
              <p className="text-xs font-bold uppercase tracking-widest text-[#3f6212] mb-2">
                {counselor.specialization || "Specialist"}
              </p>

              {/* View full profile link */}
              <button
                onClick={() => navigate(`/counselor/${id}`)}
                className="mb-4 text-[11px] font-bold uppercase tracking-widest text-stone-500 hover:text-[#1c1917] underline"
              >
                View Full Profile
              </button>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-[#f9f8f6] p-4 rounded-2xl">
                  <p className="text-xs text-stone-400 uppercase tracking-wide mb-1">
                    Experience
                  </p>
                  <p className="font-serif font-bold text-lg">
                    {counselor.experience || 0} Yrs
                  </p>
                </div>
                <div className="bg-[#f9f8f6] p-4 rounded-2xl">
                  <p className="text-xs text-stone-400 uppercase tracking-wide mb-1">
                    Fee
                  </p>
                  <p className="font-serif font-bold text-lg">
                    Rs. {counselor.pricePerSession || 1000}
                  </p>
                </div>
              </div>

              <div className="text-left bg-[#f9f8f6] p-6 rounded-2xl text-sm text-stone-500 leading-relaxed">
                <p className="line-clamp-4">
                  {counselor.bio ||
                    "Dedicated to providing a safe space for healing and growth."}
                </p>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Booking form / payment state */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 md:p-12 rounded-[3rem] border border-stone-100 shadow-sm relative"
            >
              <AnimatePresence mode="wait">
                {!bookingCreated ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleBookingSubmit}
                    className="space-y-10"
                  >
                    <div>
                      <h1 className="text-4xl font-serif font-bold text-[#1c1917] mb-2">
                        Session Details
                      </h1>
                      <p className="text-stone-500">
                        Choose how you want to meet, duration, and time within
                        the counselor&apos;s available hours.
                      </p>
                    </div>

                    {/* 1. Session Type */}
                    <InputGroup label="How would you like to meet?">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div
                          onClick={() => handleSessionTypeSelect("video")}
                          className={`cursor-pointer p-5 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                            bookingData.sessionType === "video"
                              ? "border-[#3f6212] bg-[#3f6212]/5"
                              : "border-stone-100 hover:border-stone-300"
                          }`}
                        >
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              bookingData.sessionType === "video"
                                ? "bg-[#3f6212] text-white"
                                : "bg-stone-100 text-stone-400"
                            }`}
                          >
                            <Video size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-[#1c1917]">
                              Video Call
                            </p>
                            <p className="text-xs text-stone-500">
                              Encrypted video
                            </p>
                          </div>
                        </div>

                        <div
                          onClick={() => handleSessionTypeSelect("chat")}
                          className={`cursor-pointer p-5 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                            bookingData.sessionType === "chat"
                              ? "border-[#3f6212] bg-[#3f6212]/5"
                              : "border-stone-100 hover:border-stone-300"
                          }`}
                        >
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              bookingData.sessionType === "chat"
                                ? "bg-[#3f6212] text-white"
                                : "bg-stone-100 text-stone-400"
                            }`}
                          >
                            <MessageSquare size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-[#1c1917]">
                              Live Chat
                            </p>
                            <p className="text-xs text-stone-500">
                              Real-time text
                            </p>
                          </div>
                        </div>
                      </div>
                    </InputGroup>

                    {/* 2. Date & Duration */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <InputGroup label="Preferred Date" icon={Calendar}>
                        <input
                          type="date"
                          name="date"
                          value={bookingData.date}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full bg-[#f9f8f6] p-4 rounded-xl border-none focus:ring-2 focus:ring-[#3f6212] text-[#1c1917] font-medium outline-none"
                          required
                        />
                      </InputGroup>
                      <InputGroup label="Duration" icon={Clock}>
                        <select
                          name="durationMin"
                          value={bookingData.durationMin}
                          onChange={handleInputChange}
                          className="w-full bg-[#f9f8f6] p-4 rounded-xl border-none focus:ring-2 focus:ring-[#3f6212] text-[#1c1917] font-medium outline-none cursor-pointer"
                        >
                          <option value={30}>30 Minutes</option>
                          <option value={60}>1 Hour</option>
                          <option value={90}>1.5 Hours</option>
                        </select>
                      </InputGroup>
                    </div>

                    {/* 3. Available time slots */}
                    <InputGroup label="Available Time Slots" icon={Clock}>
                      {!bookingData.date || !bookingData.durationMin ? (
                        <p className="text-xs text-stone-500">
                          Select a date and duration to see available time
                          slots.
                        </p>
                      ) : slotsLoading ? (
                        <p className="text-xs text-stone-500">
                          Loading available slots...
                        </p>
                      ) : availableSlots.length === 0 ? (
                        <p className="text-xs text-stone-500">
                          No free slots on this day for the selected duration.
                          Please choose another date or different duration.
                        </p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {availableSlots.map((slot, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => handleSlotSelect(slot)}
                              className={`px-3 py-2 rounded-lg text-xs border flex items-center gap-1
                                ${
                                  selectedSlot === slot
                                    ? "bg-[#3f6212] text-white border-[#3f6212]"
                                    : "bg-[#f9f8f6] text-stone-700 border-stone-200 hover:bg-stone-100"
                                }`}
                            >
                              {slot.startTime}–{slot.endTime}
                            </button>
                          ))}
                        </div>
                      )}
                    </InputGroup>

                    {/* 4. Notes */}
                    <InputGroup label="Notes for Counselor (Optional)">
                      <input
                        name="notes"
                        value={bookingData.notes}
                        onChange={handleInputChange}
                        placeholder="Anything specific you want to discuss?"
                        className="w-full bg-[#f9f8f6] p-4 rounded-xl border-none focus:ring-2 focus:ring-[#3f6212] text-[#1c1917] outline-none placeholder:text-stone-400"
                      />
                    </InputGroup>

                    {/* Error & Submit */}
                    {error && (
                      <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-2 text-sm font-medium">
                        <AlertCircle size={16} /> {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-[#1c1917] text-white py-5 rounded-2xl text-sm font-bold uppercase tracking-widest hover:bg-[#3f6212] transition-colors shadow-lg flex items-center justify-center gap-2"
                    >
                      Confirm & Proceed{" "}
                      <ArrowLeft className="rotate-180" size={16} />
                    </button>
                  </motion.form>
                ) : (
                  // PAYMENT STATE
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                      <CheckCircle2 size={40} />
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-[#1c1917] mb-2">
                      Reservation Held!
                    </h2>
                    <p className="text-stone-500 max-w-md mx-auto mb-10">
                      Your slot for{" "}
                      <span className="font-bold text-[#1c1917]">
                        {bookingData.date} at {bookingData.time}
                      </span>{" "}
                      ({bookingData.durationMin} mins) is reserved. Please
                      complete the payment to finalize your booking.
                    </p>

                    <div className="max-w-sm mx-auto bg-[#f9f8f6] p-8 rounded-3xl border border-stone-200">
                      <div className="flex justify-between items-center mb-6 pb-6 border-b border-stone-200">
                        <span className="text-sm font-bold text-stone-500 uppercase tracking-wider">
                          Total
                        </span>
                        <span className="text-4xl font-serif font-bold text-[#1c1917]">
                          Rs.{" "}
                          {bookingCreated?.amount ||
                            counselor.pricePerSession ||
                            1000}
                        </span>
                      </div>

                      <PaymentButton
                        bookingId={bookingCreated._id}
                        amount={bookingCreated.amount}
                      />

                      <button
                        onClick={() => {
                          setBookingCreated(null);
                        }}
                        className="mt-4 text-xs font-bold text-stone-400 hover:text-[#1c1917] underline"
                      >
                        Modify Booking Details
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Info Footer */}
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="bg-white/50 p-6 rounded-2xl border border-stone-100 flex gap-4 items-start">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <Video size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-[#1c1917] text-sm mb-1">
                    Secure Video
                  </h4>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Encrypted, high-quality video calls directly in your
                    browser. No downloads required.
                  </p>
                </div>
              </div>
              <div className="bg-white/50 p-6 rounded-2xl border border-stone-100 flex gap-4 items-start">
                <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-[#1c1917] text-sm mb-1">
                    Satisfaction Guarantee
                  </h4>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    If you're not satisfied with your session, we offer a free
                    rescheduling option.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingPage;