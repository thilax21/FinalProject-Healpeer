


// // src/pages/CounselorProfile.jsx
// import React, { useEffect, useState } from "react";
// import API from "../api/api";
// import { useParams, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   MapPin,
//   Clock,
//   Star,
//   Calendar,
//   MessageCircle,
//   Video,
//   Award,
//   Users,
//   BookOpen,
//   CheckCircle2,
//   ArrowRight,
//   Shield,
//   Quote,
//   Sparkles,
//   GraduationCap,
//   Globe,
//   HeartHandshake,
// } from "lucide-react";

// // --- VISUAL COMPOSITES ---

// const NoiseOverlay = () => (
//   <div
//     className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03] mix-blend-overlay"
//     style={{
//       backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
//       filter: "contrast(170%) brightness(100%)",
//     }}
//   />
// );

// const GradientOrb = ({ className }) => (
//   <div
//     className={`absolute rounded-full blur-[100px] opacity-30 pointer-events-none ${className}`}
//   />
// );

// const FadeIn = ({ children, delay = 0 }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.6, delay }}
//   >
//     {children}
//   </motion.div>
// );

// const InfoChip = ({ icon: Icon, label }) => (
//   <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md border border-stone-100 rounded-full text-sm font-medium text-stone-600 shadow-sm">
//     <Icon size={14} className="text-[#3f6212]" /> {label}
//   </div>
// );

// const daysOfWeek = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];

// // --- MAIN COMPONENT ---

// const CounselorProfile = ({ user }) => {
//   const { id } = useParams(); // counselorId
//   const navigate = useNavigate();
//   const [counselor, setCounselor] = useState(null);
//   const [availability, setAvailability] = useState({ slots: [] });
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("overview");
    
//   // is this the logged‑in counselor's own profile?
//   const isOwnProfile =
//     user &&
//     user.role === "counselor" &&
//     ((user._id && user._id.toString() === id) ||
//       (user.id && user.id.toString() === id));


//   // Mock Reviews Data
//   const reviews = [
//     {
//       id: 1,
//       author: "Sarah M.",
//       rating: 5,
//       text: "Absolutely transformative sessions. Dr. Smith listens deeply.",
//       date: "2 days ago",
//     },
//     {
//       id: 2,
//       author: "James L.",
//       rating: 5,
//       text: "Professional, kind, and very insightful. Highly recommended.",
//       date: "1 week ago",
//     },
//     {
//       id: 3,
//       author: "Emily R.",
//       rating: 4,
//       text: "Great practical advice for managing daily anxiety.",
//       date: "2 weeks ago",
//     },
//   ];

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [counselorRes, availabilityRes] = await Promise.all([
//           API.get(`/counselors/${id}`),
//           API.get(`/availability/${id}`),
//         ]);
//         setCounselor(counselorRes.data.data);
//         setAvailability(availabilityRes.data.data || { slots: [] });
//       } catch (e) {
//         console.error(e);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [id]);

//   if (loading)
//     return (
//       <div className="h-screen flex items-center justify-center bg-[#f4f2ed] text-[#3f6212] animate-pulse font-serif text-xl">
//         Loading...
//       </div>
//     );
//   if (!counselor)
//     return (
//       <div className="h-screen flex items-center justify-center bg-[#f4f2ed]">
//         Counselor not found.
//       </div>
//     );

//   const handleBookClick = () => {
//     if (user?.role === "client") {
//       navigate(`/counselor/${id}/book`);
//     } else {
//       navigate("/login");
//     }
//   };

//   const handleChatClick = () => {
//     if (user) {
//       navigate(`/chat/${id}`);
//     } else {
//       navigate("/login");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#f4f2ed] text-[#1c1917] font-sans selection:bg-[#3f6212] selection:text-white overflow-x-hidden relative">
//       <NoiseOverlay />

//       {/* Background Ambiance */}
//       <div className="fixed inset-0 z-0 overflow-hidden">
//         <GradientOrb className="top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#e7e5e4]" />
//         <GradientOrb className="bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#3f6212]/10" />
//       </div>

//       {/* Navigation */}
//       <nav className="fixed top-17 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
//   <button
//     onClick={() => navigate(-1)}
//     className="bg-white/80 backdrop-blur-xl p-3 rounded-full border border-stone-200 shadow-sm hover:scale-105 transition text-stone-600"
//   >
//     <ArrowRight className="rotate-180" size={20} />
//   </button>

//   <div className="flex items-center gap-3">
//     <div className="hidden md:flex items-center gap-2 bg-white/80 backdrop-blur-xl px-4 py-2 rounded-full border border-stone-200 text-xs font-bold uppercase tracking-widest text-stone-500">
//       <Shield size={14} className="text-green-600" /> Verified Professional
//     </div>

//     {isOwnProfile && (
//       <button
//         onClick={() => navigate(`/counselor/${id}/edit`)}
//         className="hidden md:inline-flex items-center gap-2 bg-white/90 backdrop-blur-xl px-4 py-2 rounded-full border border-stone-200 text-xs font-bold uppercase tracking-widest text-stone-600 hover:bg-stone-100 transition"
//       >
//         Edit Profile
//       </button>
//     )}
//   </div>
// </nav>

//       <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-32 top-19">
//         {/* --- 1. HERO SECTION --- */}
//         <div className="grid lg:grid-cols-12 gap-12 mb-20">
//           {/* Left: Image & Status */}
//           <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
//             <FadeIn>
//               <div className="relative group">
//                 <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl relative z-10 rotate-[-2deg] group-hover:rotate-0 transition-transform duration-500">
//                   <img
//                     src={
//                       counselor.profileImage ||
//                       "https://cdn-icons-png.flaticon.com/512/219/219969.png"
//                     }
//                     className="w-full h-full object-cover"
//                     alt="Profile"
//                   />
//                 </div>
//                 <div className="absolute inset-0 bg-[#3f6212] rounded-[3rem] rotate-[4deg] opacity-20 blur-xl -z-10 group-hover:rotate-2 transition-transform"></div>

//                 {/* Floating Status Badge */}
//                 <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20 bg-[#1c1917] text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-2 whitespace-nowrap">
//                   <div className="relative w-3 h-3">
//                     <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
//                     <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
//                   </div>
//                   <span className="text-xs font-bold uppercase tracking-widest">
//                     Accepting New Clients
//                   </span>
//                 </div>
//               </div>
//             </FadeIn>
//           </div>

//           {/* Right: Intro & Actions */}
//           <div className="lg:col-span-8 flex flex-col justify-center text-center lg:text-left">
//             <FadeIn delay={0.2}>
//               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-stone-500 text-[10px] font-bold uppercase tracking-widest mb-6">
//                 <Sparkles size={12} /> Top Rated Counselor
//               </div>
//               <h1 className="text-5xl lg:text-7xl font-serif text-[#1c1917] mb-4 leading-[0.9]">
//                 {counselor.name}
//               </h1>
//               <p className="text-xl text-stone-500 font-light mb-8 max-w-2xl mx-auto lg:mx-0">
//                 {counselor.specialization || "Clinical Psychologist"}{" "}
//                 specializing in anxiety, trauma recovery, and personal growth.
//               </p>

//               <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-10">
//                 <InfoChip
//                   icon={MapPin}
//                   label={counselor.location || "Online / Global"}
//                 />
//                 <InfoChip
//                   icon={Clock}
//                   label={`${counselor.experience || 5} Years Exp.`}
//                 />
//                 <InfoChip icon={GraduationCap} label="PhD Psychology" />
//                 <InfoChip icon={Globe} label="English, Sinhala" />
//               </div>

//               <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//                 <button
//                   onClick={handleBookClick}
//                   className="px-8 py-4 bg-[#1c1917] text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#3f6212] transition-colors shadow-lg flex items-center justify-center gap-2"
//                 >
//                   <Calendar size={16} /> Book Session
//                 </button>
//                 {isOwnProfile && (
//       <button
//         onClick={() => navigate(`/counselor/${id}/edit`)}
//         className="hidden md:inline-flex items-center gap-2 bg-white/90 backdrop-blur-xl px-4 py-2 rounded-full border border-stone-200 text-xs font-bold uppercase tracking-widest text-stone-600 hover:bg-stone-100 transition"
//       >
//         Edit Profile
//       </button>)}
//               </div>
//             </FadeIn>
//           </div>
//         </div>

//         {/* --- 2. CONTENT GRID --- */}
//         <div className="grid lg:grid-cols-12 gap-8">
//           {/* LEFT: TABS & INFO */}
//           <div className="lg:col-span-8">
//             {/* Tabs */}
//             <div className="bg-white rounded-[2.5rem] shadow-sm border border-stone-100 p-2 mb-8 sticky top-24 z-30">
//               <div className="flex p-1 gap-1 overflow-x-auto">
//                 {[
//                   { id: "overview", label: "Overview" },
//                   { id: "reviews", label: "Client Stories" },
//                   { id: "availability", label: "Schedule" },
//                 ].map((tab) => (
//                   <button
//                     key={tab.id}
//                     onClick={() => setActiveTab(tab.id)}
//                     className={`flex-1 px-6 py-3 rounded-[2rem] text-sm font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
//                       activeTab === tab.id
//                         ? "bg-[#1c1917] text-white shadow-md"
//                         : "text-stone-400 hover:bg-stone-50"
//                     }`}
//                   >
//                     {tab.label}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Tab content */}
//             <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-stone-100 shadow-sm min-h-[500px]">
//               <AnimatePresence mode="wait">
//                 {activeTab === "overview" && (
//                   <motion.div
//                     key="overview"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="space-y-10"
//                   >
//                     <section>
//                       <h3 className="text-2xl font-serif mb-4 flex items-center gap-2">
//                         <Quote className="text-[#3f6212] rotate-180" /> My
//                         Philosophy
//                       </h3>
//                       <p className="text-lg text-stone-600 leading-relaxed font-light">
//                         "
//                         {counselor.bio ||
//                           "I believe every individual has inner strength to heal. My role is to guide you back to your own wisdom using evidence-based tools and compassionate presence."}
//                         "
//                       </p>
//                     </section>
//                     <hr className="border-stone-100" />
//                     <section>
//                       <h3 className="text-xl font-serif mb-6">
//                         Areas of Expertise
//                       </h3>
//                       <div className="flex flex-wrap gap-3">
//                         {[
//                           "Anxiety",
//                           "Depression",
//                           "Relationships",
//                           "Career Stress",
//                           "Life Transitions",
//                           "Trauma",
//                           "Self-Esteem",
//                         ].map((tag, i) => (
//                           <div
//                             key={i}
//                             className="px-4 py-2 bg-[#f4f2ed] text-[#1c1917] rounded-xl text-sm font-medium border border-transparent hover:border-[#3f6212] transition-colors cursor-default"
//                           >
//                             {tag}
//                           </div>
//                         ))}
//                       </div>
//                     </section>
//                   </motion.div>
//                 )}

//                 {activeTab === "reviews" && (
//                   <motion.div
//                     key="reviews"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="space-y-6"
//                   >
//                     <div className="flex items-center gap-4 mb-8 bg-[#f9f8f6] p-6 rounded-2xl">
//                       <div className="text-5xl font-serif text-[#3f6212]">
//                         4.9
//                       </div>
//                       <div>
//                         <div className="flex text-yellow-400 mb-1">
//                           <Star fill="currentColor" />
//                           <Star fill="currentColor" />
//                           <Star fill="currentColor" />
//                           <Star fill="currentColor" />
//                           <Star fill="currentColor" />
//                         </div>
//                         <div className="text-xs font-bold uppercase tracking-widest text-stone-400">
//                           Based on 124 Reviews
//                         </div>
//                       </div>
//                     </div>
//                     {reviews.map((r) => (
//                       <div
//                         key={r.id}
//                         className="border-b border-stone-100 pb-6 last:border-0"
//                       >
//                         <div className="flex justify-between mb-2">
//                           <span className="font-bold text-[#1c1917]">
//                             {r.author}
//                           </span>
//                           <span className="text-xs text-stone-400">
//                             {r.date}
//                           </span>
//                         </div>
//                         <p className="text-stone-600 italic">"{r.text}"</p>
//                       </div>
//                     ))}
//                   </motion.div>
//                 )}

//                 {activeTab === "availability" && (
//                   <motion.div
//                     key="availability"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="space-y-6"
//                   >
//                     <h3 className="text-2xl font-serif mb-2">
//                       Weekly Schedule
//                     </h3>
//                     <p className="text-sm text-stone-500 mb-4">
//                       These are the general times {counselor.name} is
//                       available. Real-time free slots (removing already booked
//                       sessions) are shown when you click “Book Session”.
//                     </p>

//                     {(availability.slots || []).length === 0 ? (
//                       <div className="text-sm text-stone-500 border border-dashed border-stone-200 rounded-2xl p-6 text-center">
//                         This counselor has not published a schedule yet.
//                         Please click{" "}
//                         <button
//                           onClick={handleBookClick}
//                           className="text-[#3f6212] underline"
//                         >
//                           Book Session
//                         </button>{" "}
//                         to see available times.
//                       </div>
//                     ) : (
//                       <div className="space-y-3">
//                         {daysOfWeek.map((dayName, dayIndex) => {
//                           const daySlots =
//                             (availability.slots || []).filter(
//                               (s) => s.dayOfWeek === dayIndex
//                             ) || [];
//                           if (!daySlots.length) return null;

//                           return (
//                             <div
//                               key={dayIndex}
//                               className="border border-stone-100 rounded-2xl p-4 flex flex-col gap-2"
//                             >
//                               <div className="text-sm font-semibold text-[#1c1917]">
//                                 {dayName}
//                               </div>
//                               <div className="flex flex-wrap gap-2 text-xs">
//                                 {daySlots.map((slot, i) => (
//                                  <span
//                                  key={i}
//                                  className="px-3 py-1 rounded-full bg-[#f4f2ed] text-stone-700 border border-stone-200"
//                                >
//                                  {slot.startTime}–{slot.endTime}
//                                </span>
//                                 ))}
//                               </div>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     )}

//                     <div className="pt-4">
//                       <button
//                         onClick={handleBookClick}
//                         className="px-6 py-3 bg-[#1c1917] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#3f6212] transition-colors flex items-center justify-center gap-2 mx-auto"
//                       >
//                         <Calendar size={16} /> View Real-time Availability
//                       </button>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>

//           {/* RIGHT: PRICING CARD */}
//           <div className="lg:col-span-4 space-y-6">
//             <div className="sticky top-24">
//               <div className="bg-[#1c1917] text-white rounded-[3rem] p-8 md:p-10 shadow-2xl relative overflow-hidden group">
//                 <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#3f6212] rounded-full blur-[80px] opacity-50 group-hover:scale-110 transition-transform duration-1000"></div>

//                 <div className="relative z-10">
//                   <div className="flex justify-between items-start mb-8">
//                     <div>
//                       <div className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-1">
//                         Standard Session
//                       </div>
//                       <div className="flex items-baseline gap-1">
//                         <span className="text-5xl font-serif">
//                           {counselor.pricePerSession || 1000}
//                         </span>
//                         <span className="text-stone-500">LKR /hr</span>
//                       </div>
//                     </div>
//                     <div className="p-3 bg-white/10 rounded-2xl">
//                       <Video size={24} />
//                     </div>
//                   </div>

//                   <div className="space-y-4 mb-8">
//                     {[
//                       "1-on-1 Video Consultation",
//                       "Secure & Private Room",
//                       "Follow-up Chat Support",
//                       "Personalized Care Plan",
//                     ].map((feature, i) => (
//                       <div
//                         key={i}
//                         className="flex items-center gap-3 text-sm text-stone-300"
//                       >
//                         <CheckCircle2
//                           size={16}
//                           className="text-[#3f6212]"
//                         />{" "}
//                         {feature}
//                       </div>
//                     ))}
//                   </div>

//                   <button
//                     onClick={handleBookClick}
//                     className="w-full py-4 bg-white text-[#1c1917] rounded-2xl font-bold uppercase text-xs tracking-widest hover:bg-[#3f6212] hover:text-white transition-colors flex items-center justify-center gap-2 shadow-lg"
//                   >
//                     Book Appointment <ArrowRight size={14} />
//                   </button>

//                   <p className="text-[10px] text-center text-stone-500 mt-4 uppercase tracking-widest">
//                     <HeartHandshake
//                       size={10}
//                       className="inline mr-1"
//                     />{" "}
//                     Satisfaction Guaranteed
//                   </p>
//                 </div>
//               </div>

//               {/* Trust Badge */}
//               <div className="bg-white p-6 rounded-[2rem] border border-stone-100 flex items-center gap-4 shadow-sm mt-4">
//                 <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600 shrink-0">
//                   <Shield size={24} />
//                 </div>
//                 <div>
//                   <h4 className="font-bold text-sm">Verified & Vetted</h4>
//                   <p className="text-xs text-stone-500">
//                     Credentials checked by HealPeer.
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

// export default CounselorProfile;


import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Clock,
  Star,
  Calendar,
  Video,
  Shield,
  Quote,
  Sparkles,
  GraduationCap,
  Globe,
  HeartHandshake,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const NoiseOverlay = () => (
  <div
    className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03] mix-blend-overlay"
    style={{
      backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
      filter: "contrast(170%) brightness(100%)",
    }}
  />
);

const GradientOrb = ({ className }) => (
  <div
    className={`absolute rounded-full blur-[100px] opacity-30 pointer-events-none ${className}`}
  />
);

const FadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

const InfoChip = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md border border-stone-100 rounded-full text-sm font-medium text-stone-600 shadow-sm">
    <Icon size={14} className="text-[#3f6212]" />
    {label}
  </div>
);

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const CounselorProfile = ({ user }) => {
  const { id } = useParams(); // counselorId from URL
  const navigate = useNavigate();

  const [counselor, setCounselor] = useState(null);
  const [availability, setAvailability] = useState({ slots: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // is this the logged‑in counselor's own profile?
  const isOwnProfile =
    user &&
    user.role === "counselor" &&
    (user._id?.toString() === id || user.id?.toString() === id);

  // Mock Reviews Data (you can replace with real API later)
  const reviews = [
    {
      id: 1,
      author: "Sarah M.",
      rating: 5,
      text: "Absolutely transformative sessions. Counselor listens deeply.",
      date: "2 days ago",
    },
    {
      id: 2,
      author: "James L.",
      rating: 5,
      text: "Professional, kind, and very insightful. Highly recommended.",
      date: "1 week ago",
    },
    {
      id: 3,
      author: "Emily R.",
      rating: 4,
      text: "Great practical advice for managing daily anxiety.",
      date: "2 weeks ago",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [counselorRes, availabilityRes] = await Promise.all([
          API.get(`/counselors/${id}`), // getCounselorById
          API.get(`/availability/${id}`),
        ]);

        setCounselor(counselorRes.data.data);
        setAvailability(availabilityRes.data.data || { slots: [] });
      } catch (e) {
        console.error("Failed to load counselor profile:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-[#f4f2ed] text-[#3f6212] animate-pulse font-serif text-xl">
        Loading...
      </div>
    );

  if (!counselor)
    return (
      <div className="h-screen flex items-center justify-center bg-[#f4f2ed]">
        Counselor not found.
      </div>
    );

  const avatarUrl = counselor.profileImage
    ? counselor.profileImage.startsWith("http")
      ? counselor.profileImage
      : `http://localhost:3000${counselor.profileImage}`
    : "https://cdn-icons-png.flaticon.com/512/219/219969.png";

  const handleBookClick = () => {
    if (user?.role === "client") {
      navigate(`/counselor/${id}/book`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f2ed] text-[#1c1917] font-sans selection:bg-[#3f6212] selection:text-white overflow-x-hidden relative">
      <NoiseOverlay />

      {/* Background Ambiance */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <GradientOrb className="top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#e7e5e4]" />
        <GradientOrb className="bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#3f6212]/10" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-6 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center max-w-7xl mx-auto top-20">
        <button
          onClick={() => navigate(-1)}
          className="bg-white/80 backdrop-blur-xl p-3 rounded-full border border-stone-200 shadow-sm hover:scale-105 transition text-stone-600"
        >
          <ArrowRight className="rotate-180" size={20} />
        </button>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-white/80 backdrop-blur-xl px-4 py-2 rounded-full border border-stone-200 text-xs font-bold uppercase tracking-widest text-stone-500">
            <Shield size={14} className="text-green-600" />
            Verified Professional
          </div>

         
          
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-32 top-22">
        {/* HERO SECTION */}
        <div className="grid lg:grid-cols-12 gap-12 mb-20">
          {/* Left: Image & Status */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
            <FadeIn>
              <div className="relative group">
                <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl relative z-10 rotate-[-2deg] group-hover:rotate-0 transition-transform duration-500">
                  <img
                    src={avatarUrl}
                    className="w-full h-full object-cover"
                    alt={counselor.name}
                  />
                </div>
                <div className="absolute inset-0 bg-[#3f6212] rounded-[3rem] rotate-[4deg] opacity-20 blur-xl -z-10 group-hover:rotate-2 transition-transform" />

                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20 bg-[#1c1917] text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-2 whitespace-nowrap">
                  <div className="relative w-3 h-3">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest">
                    Accepting New Clients
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right: Intro & Actions */}
          <div className="lg:col-span-8 flex flex-col justify-center text-center lg:text-left">
            <FadeIn delay={0.2}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-stone-500 text-[10px] font-bold uppercase tracking-widest mb-6">
                <Sparkles size={12} /> Top Rated Counselor
              </div>

              <h1 className="text-5xl lg:text-7xl font-serif text-[#1c1917] mb-4 leading-[0.9]">
                {counselor.name}
              </h1>

              <p className="text-xl text-stone-500 font-light mb-8 max-w-2xl mx-auto lg:mx-0">
                {counselor.specialization || "Clinical Psychologist"}{" "}
                specializing in anxiety, trauma recovery, and personal growth.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-10">
                <InfoChip
                  icon={MapPin}
                  label={counselor.location || "Online / Global"}
                />
                <InfoChip
                  icon={Clock}
                  label={`${counselor.experience || 1} Years Exp.`}
                />
                <InfoChip icon={GraduationCap} label="Certified Counselor" />
                <InfoChip icon={Globe} label="English, Sinhala" />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={handleBookClick}
                  className="px-8 py-4 bg-[#1c1917] text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#3f6212] transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  <Calendar size={16} /> Book Session
                </button>

                {isOwnProfile && (
                  <button
                    onClick={() => navigate(`/counselor/${id}/edit`)}
                    className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-xl px-6 py-4 rounded-full border border-stone-200 text-xs font-bold uppercase tracking-widest text-stone-600 hover:bg-stone-100 transition"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </FadeIn>
          </div>
        </div>

        {/* CONTENT GRID */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* LEFT: TABS & CONTENT */}
          <div className="lg:col-span-8">
            {/* Tabs */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-stone-100 p-2 mb-8 sticky top-20 z-30">
              <div className="flex p-1 gap-1 overflow-x-auto">
                {[
                  { id: "overview", label: "Overview" },
                  { id: "reviews", label: "Client Stories" },
                  { id: "availability", label: "Schedule" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 px-6 py-3 rounded-[2rem] text-sm font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? "bg-[#1c1917] text-white shadow-md"
                        : "text-stone-400 hover:bg-stone-50"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab content */}
            <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-stone-100 shadow-sm min-h-[500px]">
              <AnimatePresence mode="wait">
                {activeTab === "overview" && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-10"
                  >
                    <section>
                      <h3 className="text-2xl font-serif mb-4 flex items-center gap-2">
                        <Quote className="text-[#3f6212] rotate-180" /> My
                        Philosophy
                      </h3>
                      <p className="text-lg text-stone-600 leading-relaxed font-light">
                        "
                        {counselor.bio ||
                          "I believe every individual has inner strength to heal. My role is to guide you back to your own wisdom using evidence-based tools and compassionate presence."}
                        "
                      </p>
                    </section>
                    <hr className="border-stone-100" />
                    <section>
                      <h3 className="text-xl font-serif mb-6">
                        Areas of Expertise
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {[
                          "Anxiety",
                          "Depression",
                          "Relationships",
                          "Career Stress",
                          "Life Transitions",
                          "Trauma",
                          "Self-Esteem",
                        ].map((tag, i) => (
                          <div
                            key={i}
                            className="px-4 py-2 bg-[#f4f2ed] text-[#1c1917] rounded-xl text-sm font-medium border border-transparent hover:border-[#3f6212] transition-colors cursor-default"
                          >
                            {tag}
                          </div>
                        ))}
                      </div>
                    </section>
                  </motion.div>
                )}

                {activeTab === "reviews" && (
                  <motion.div
                    key="reviews"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-4 mb-8 bg-[#f9f8f6] p-6 rounded-2xl">
                      <div className="text-5xl font-serif text-[#3f6212]">
                        4.9
                      </div>
                      <div>
                        <div className="flex text-yellow-400 mb-1">
                          <Star fill="currentColor" />
                          <Star fill="currentColor" />
                          <Star fill="currentColor" />
                          <Star fill="currentColor" />
                          <Star fill="currentColor" />
                        </div>
                        <div className="text-xs font-bold uppercase tracking-widest text-stone-400">
                          Based on 124 Reviews
                        </div>
                      </div>
                    </div>
                    {reviews.map((r) => (
                      <div
                        key={r.id}
                        className="border-b border-stone-100 pb-6 last:border-0"
                      >
                        <div className="flex justify-between mb-2">
                          <span className="font-bold text-[#1c1917]">
                            {r.author}
                          </span>
                          <span className="text-xs text-stone-400">
                            {r.date}
                          </span>
                        </div>
                        <p className="text-stone-600 italic">"{r.text}"</p>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === "availability" && (
                  <motion.div
                    key="availability"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-serif mb-2">
                      Weekly Schedule
                    </h3>
                    <p className="text-sm text-stone-500 mb-4">
                      These are the general times {counselor.name} is
                      available. Exact free slots (excluding existing bookings)
                      are shown when you click “Book Session”.
                    </p>

                    {(availability.slots || []).length === 0 ? (
                      <div className="text-sm text-stone-500 border border-dashed border-stone-200 rounded-2xl p-6 text-center">
                        This counselor has not published a schedule yet. Please
                        click{" "}
                        <button
                          onClick={handleBookClick}
                          className="text-[#3f6212] underline"
                        >
                          Book Session
                        </button>{" "}
                        to see available times.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {daysOfWeek.map((dayName, dayIndex) => {
                          const daySlots =
                            (availability.slots || []).filter(
                              (s) => s.dayOfWeek === dayIndex
                            ) || [];
                          if (!daySlots.length) return null;

                          return (
                            <div
                              key={dayIndex}
                              className="border border-stone-100 rounded-2xl p-4 flex flex-col gap-2"
                            >
                              <div className="text-sm font-semibold text-[#1c1917]">
                                {dayName}
                              </div>
                              <div className="flex flex-wrap gap-2 text-xs">
                                {daySlots.map((slot, i) => (
                                  <span
                                    key={i}
                                    className="px-3 py-1 rounded-full bg-[#f4f2ed] text-stone-700 border border-stone-200"
                                  >
                                    {slot.startTime}–{slot.endTime}
                                  </span>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <div className="pt-4">
                      <button
                        onClick={handleBookClick}
                        className="px-6 py-3 bg-[#1c1917] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#3f6212] transition-colors flex items-center justify-center gap-2 mx-auto"
                      >
                        <Calendar size={16} /> View Real-time Availability
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT: PRICING CARD */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-24">
              <div className="bg-[#1c1917] text-white rounded-[3rem] p-8 md:p-10 shadow-2xl relative overflow-hidden group">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#3f6212] rounded-full blur-[80px] opacity-50 group-hover:scale-110 transition-transform duration-1000" />

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-1">
                        Standard Session
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-serif">
                          {counselor.pricePerSession || 1000}
                        </span>
                        <span className="text-stone-500">LKR /hr</span>
                      </div>
                    </div>
                    <div className="p-3 bg-white/10 rounded-2xl">
                      <Video size={24} />
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    {[
                      "1-on-1 Video Consultation",
                      "Secure & Private Room",
                      "Follow-up Chat Support",
                      "Personalized Care Plan",
                    ].map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 text-sm text-stone-300"
                      >
                        <CheckCircle2
                          size={16}
                          className="text-[#3f6212]"
                        />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleBookClick}
                    className="w-full py-4 bg-white text-[#1c1917] rounded-2xl font-bold uppercase text-xs tracking-widest hover:bg-[#3f6212] hover:text-white transition-colors flex items-center justify-center gap-2 shadow-lg"
                  >
                    Book Appointment <ArrowRight size={14} />
                  </button>

                  <p className="text-[10px] text-center text-stone-500 mt-4 uppercase tracking-widest">
                    <HeartHandshake size={10} className="inline mr-1" />{" "}
                    Satisfaction Guaranteed
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-[2rem] border border-stone-100 flex items-center gap-4 shadow-sm mt-4">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600 shrink-0">
                  <Shield size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Verified & Vetted</h4>
                  <p className="text-xs text-stone-500">
                    Credentials checked by HealPeer.
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

export default CounselorProfile;