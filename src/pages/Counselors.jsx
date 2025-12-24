


// import React, { useEffect, useState, useMemo } from "react";
// import API from "../api/api";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   Search, 
//   Filter, 
//   MapPin, 
//   Clock, 
//   Star, 
//   X, 
//   Calendar, 
//   CheckCircle,
//   User
// } from "lucide-react";
// import PaymentButton from "./PaymentButton";

// // --- Visual Components ---

// const GrainTexture = () => (
//   <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
//        style={{ 
//          backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
//          filter: 'contrast(170%) brightness(100%)'
//        }} />
// );

// const SkeletonCard = () => (
//   <div className="bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm h-[400px] flex flex-col items-center justify-center gap-4 animate-pulse">
//     <div className="w-24 h-24 bg-stone-200 rounded-full" />
//     <div className="h-6 w-3/4 bg-stone-200 rounded" />
//     <div className="h-4 w-1/2 bg-stone-200 rounded" />
//     <div className="h-10 w-full bg-stone-200 rounded mt-4" />
//   </div>
// );

// // --- Main Component ---

// const Counselor = ({ user, counselors, setCounselors }) => {
//   const navigate = useNavigate();
  
//   // State
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({ search: "", specialization: "", sort: "" });
//   const [selectedCounselor, setSelectedCounselor] = useState(null);
//   const [bookingData, setBookingData] = useState({ duration: "", date: "", time: "" });

//   // Fetch Data
//   useEffect(() => {
//     const fetchData = async () => {
//       if (!counselors || counselors.length === 0) {
//         try {
//           const { data } = await API.get("/counselors/all");
//           setCounselors(data.data);
//         } catch (err) {
//           console.error(err);
//         }
//       }
//       // Simulate aesthetic delay for smoothness
//       setTimeout(() => setLoading(false), 600);
//     };
//     fetchData();
//   }, [counselors, setCounselors]);

//   // Memoized Filtering Logic
//   const filteredCounselors = useMemo(() => {
//     let result = [...(counselors || [])];

//     if (filters.search) {
//       result = result.filter(c => c.name.toLowerCase().includes(filters.search.toLowerCase()));
//     }
//     if (filters.specialization) {
//       result = result.filter(c => c.specialization === filters.specialization);
//     }
//     if (filters.sort === "low-high") {
//       result.sort((a, b) => (a.pricePerSession || 0) - (b.pricePerSession || 0));
//     } else if (filters.sort === "high-low") {
//       result.sort((a, b) => (b.pricePerSession || 0) - (a.pricePerSession || 0));
//     }

//     return result;
//   }, [counselors, filters]);

//   // Handlers
//   const handleFilterChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });
  
  // const handleBookingClick = (counselor) => {
  //   if (!user) return navigate("/login");
  //   if (user.role !== "client") return alert("Only clients can book sessions."); // Ideally replace with Toast
    
  //   // Option A: Navigate to dedicated page
  //   // navigate(`/counselor/${counselor._id}/book`);
    
  //   // Option B: Open Modal (Implemented below for UI demo)
  //   setSelectedCounselor(counselor);
  // };

//   return (
//     <div className="min-h-screen bg-[#f4f2ed] text-[#1c1917] font-sans selection:bg-[#3f6212] selection:text-white relative">
//       <GrainTexture />

//       {/* --- Header Section --- */}
//       <div className="pt-32 pb-12 px-6 max-w-7xl mx-auto text-center">
//         <motion.span 
//           initial={{ opacity: 0 }} animate={{ opacity: 1 }}
//           className="inline-block px-4 py-1.5 rounded-full border border-stone-200 bg-white/40 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-6"
//         >
//           Our Specialists
//         </motion.span>
//         <motion.h1 
//           initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
//           className="text-5xl md:text-7xl font-serif mb-6 tracking-tight"
//         >
//           Find your <span className="italic text-stone-400 font-light">Guide</span>
//         </motion.h1>
//       </div>

//       {/* --- Filter Toolbar --- */}
//       <div className="sticky top-24 z-30 px-6 mb-16">
//         <motion.div 
//           initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
//           className="max-w-5xl mx-auto bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm rounded-2xl p-2 flex flex-col md:flex-row gap-2"
//         >
//           <div className="flex-1 relative group">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-[#1c1917]" size={18} />
//             <input
//               name="search"
//               placeholder="Search by name..."
//               value={filters.search}
//               onChange={handleFilterChange}
//               className="w-full h-12 bg-transparent pl-12 pr-4 outline-none text-sm font-medium placeholder-stone-400"
//             />
//           </div>

//           <div className="w-px bg-stone-200 hidden md:block my-2"></div>

//           <div className="flex-1 flex items-center gap-2 px-2">
//             <Filter size={16} className="text-stone-400" />
//             <select
//               name="specialization"
//               value={filters.specialization}
//               onChange={handleFilterChange}
//               className="w-full h-12 bg-transparent outline-none text-sm font-medium text-stone-600 cursor-pointer"
//             >
//               <option value="">All Specializations</option>
//               <option value="Depression">Depression</option>
//               <option value="Relationship">Relationship</option>
//               <option value="Anxiety">Anxiety</option>
//               <option value="Career">Career Counseling</option>
//             </select>
//           </div>

//           <div className="w-px bg-stone-200 hidden md:block my-2"></div>

//           <div className="flex-1 px-2">
//             <select
//               name="sort"
//               value={filters.sort}
//               onChange={handleFilterChange}
//               className="w-full h-12 bg-transparent outline-none text-sm font-medium text-stone-600 cursor-pointer"
//             >
//               <option value="">Sort by Fee</option>
//               <option value="low-high">Price: Low to High</option>
//               <option value="high-low">Price: High to Low</option>
//             </select>
//           </div>
//         </motion.div>
//       </div>

//       {/* --- Grid --- */}
//       <div className="max-w-7xl mx-auto px-6 pb-24">
//         {loading ? (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[1,2,3,4,5,6].map(i => <SkeletonCard key={i} />)}
//           </div>
//         ) : filteredCounselors.length === 0 ? (
//            <div className="text-center py-20">
//              <p className="text-stone-400 text-lg">No specialists found matching your criteria.</p>
//              <button onClick={() => setFilters({search: "", specialization: "", sort: ""})} className="mt-4 text-[#3f6212] font-bold underline">Clear Filters</button>
//            </div>
//         ) : (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             <AnimatePresence>
//               {filteredCounselors.map((c) => (
//                 <motion.div
//                   layout
//                   key={c._id}
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.9 }}
//                   className="group bg-white rounded-[2rem] p-6 border border-stone-100 hover:border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
//                 >
//                   {/* Card Header */}
//                   <div className="flex items-start justify-between mb-6">
//                     <div className="relative">
//                        <img
//                          src={c.profileImage || "https://ui-avatars.com/api/?name=" + c.name + "&background=f4f2ed&color=1c1917"}
//                          alt={c.name}
//                          className="w-20 h-20 rounded-2xl object-cover shadow-inner"
//                        />
//                        <div className="absolute -bottom-2 -right-2 bg-white px-2 py-1 rounded-full shadow-sm border border-stone-100 flex items-center gap-1">
//                          <Star size={10} className="text-yellow-500 fill-yellow-500" />
//                          <span className="text-[10px] font-bold">4.9</span>
//                        </div>
//                     </div>
//                     <div className="text-right">
//                       <span className="block text-lg font-bold text-[#1c1917]">${c.pricePerSession || 50}</span>
//                       <span className="text-[10px] text-stone-400 uppercase tracking-wide">Per Session</span>
//                     </div>
//                   </div>

//                   {/* Card Body */}
//                   <div className="mb-6 flex-grow">
//                     <h3 className="text-2xl font-serif text-[#1c1917] mb-1">{c.name}</h3>
//                     <p className="text-xs font-bold uppercase tracking-widest text-[#3f6212] mb-3">
//                       {c.specialization || "General Counselor"}
//                     </p>
//                     <p className="text-sm text-stone-500 line-clamp-3 leading-relaxed">
//                       {c.bio || "No biography available. This specialist focuses on mental well-being and personal growth."}
//                     </p>
//                   </div>

//                   {/* Stats Pill */}
//                   <div className="flex items-center gap-4 mb-6 text-xs font-medium text-stone-500 bg-[#f4f2ed] p-3 rounded-xl">
//                     <div className="flex items-center gap-1">
//                       <CheckCircle size={14} /> {c.experience || 0} Yrs Exp.
//                     </div>
//                     <div className="w-px h-3 bg-stone-300"></div>
//                     <div className="flex items-center gap-1">
//                       <User size={14} /> 200+ Clients
//                     </div>
//                   </div>

//                   {/* Actions */}
//                   <div className="grid grid-cols-2 gap-3 mt-auto">
//                     <button 
//                       onClick={() => navigate(`/counselor/${c._id}`)}
//                       className="py-3 rounded-full border border-stone-200 text-[#1c1917] text-xs font-bold uppercase tracking-widest hover:bg-stone-50 transition-colors"
//                     >
//                       Profile
//                     </button>
//                     <button 
//                       onClick={() => handleBookingClick(c)}
//                       className="py-3 rounded-full bg-[#1c1917] text-[#f2f0e9] text-xs font-bold uppercase tracking-widest hover:bg-[#3f6212] transition-colors shadow-lg"
//                     >
//                       Book
//                     </button>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </div>
//         )}
//       </div>

//       {/* --- Booking Modal --- */}
//       <AnimatePresence>
//         {selectedCounselor && (
//           <motion.div 
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
//           >
//             <motion.div 
//               initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
//               className="bg-white rounded-[2rem] shadow-2xl p-8 max-w-md w-full relative"
//             >
//               <button onClick={() => setSelectedCounselor(null)} className="absolute top-6 right-6 text-stone-400 hover:text-stone-800">
//                 <X size={20} />
//               </button>

//               <h3 className="text-2xl font-serif mb-1">Book Session</h3>
//               <p className="text-stone-500 text-sm mb-6">with <span className="font-bold text-[#1c1917]">{selectedCounselor.name}</span></p>

//               <div className="space-y-4">
//                 <div className="space-y-1">
//                   <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Duration</label>
//                   <select
//                     name="duration"
//                     value={bookingData.duration}
//                     onChange={(e) => setBookingData({...bookingData, duration: e.target.value})}
//                     className="w-full p-3 bg-[#f4f2ed] rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-[#1c1917]"
//                   >
//                     <option value="">Select Duration</option>
//                     <option value="30">30 Minutes</option>
//                     <option value="60">1 Hour</option>
//                   </select>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-1">
//                     <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Date</label>
//                     <div className="relative">
//                       <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
//                       <input
//                         type="date"
//                         name="date"
//                         value={bookingData.date}
//                         onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
//                         className="w-full p-3 pl-10 bg-[#f4f2ed] rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-[#1c1917]"
//                       />
//                     </div>
//                   </div>
//                   <div className="space-y-1">
//                     <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Time</label>
//                     <div className="relative">
//                       <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
//                       <input
//                         type="time"
//                         name="time"
//                         value={bookingData.time}
//                         onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
//                         className="w-full p-3 pl-10 bg-[#f4f2ed] rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-[#1c1917]"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="pt-4">
//                   {bookingData.duration && bookingData.date && bookingData.time ? (
//                     <PaymentButton
//                       amount={selectedCounselor.pricePerSession || 50}
//                       counselorId={selectedCounselor._id}
//                       booking={bookingData}
//                     />
//                   ) : (
//                     <button disabled className="w-full py-4 rounded-full bg-stone-200 text-stone-400 text-xs font-bold uppercase tracking-widest cursor-not-allowed">
//                       Fill details to proceed
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Counselor;


// import React, { useEffect, useState, useMemo } from "react";
// import API from "../api/api";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   Search, 
//   Filter, 
//   Star, 
//   X, 
//   Calendar, 
//   CheckCircle,
//   User,
//   Clock
// } from "lucide-react";
// import PaymentButton from "./PaymentButton";

// // --- Visual Components ---

// const GrainTexture = () => (
//   <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
//        style={{ 
//          backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
//          filter: 'contrast(170%) brightness(100%)'
//        }} />
// );

// const SkeletonCard = () => (
//   <div className="bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm h-[400px] flex flex-col items-center justify-center gap-4 animate-pulse">
//     <div className="w-24 h-24 bg-stone-200 rounded-full" />
//     <div className="h-6 w-3/4 bg-stone-200 rounded" />
//     <div className="h-4 w-1/2 bg-stone-200 rounded" />
//     <div className="h-10 w-full bg-stone-200 rounded mt-4" />
//   </div>
// );

// // --- Main Component ---

// const Counselor = ({ user, counselors, setCounselors }) => {
//   const navigate = useNavigate();
  
//   // State
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({ search: "", specialization: "", sort: "" });
//   const [selectedCounselor, setSelectedCounselor] = useState(null);
//   const [bookingData, setBookingData] = useState({ duration: "", date: "", time: "" });

//   // Default Image URL (Abstract/Professional Avatar)
//   const DEFAULT_AVATAR = "https://static.vecteezy.com/system/resources/previews/057/791/671/non_2x/user-profile-icon-design-user-profile-sign-gold-color-style-free-vector.jpg"; 

//   // Fetch Data
//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     if (!counselors || counselors.length === 0) {
//   //       try {
//   //         const { data } = await API.get("/counselors/all");
//   //         setCounselors(data.data);
//   //       } catch (err) {
//   //         console.error(err);
//   //       }
//   //     }
//   //     setTimeout(() => setLoading(false), 600);
//   //   };
//   //   fetchData();
//   // }, [counselors, setCounselors]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const { data } = await API.get("/counselors/all");
//         setCounselors(data.data);
//       } catch (err) {
//         console.error("Failed to load counselors:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [setCounselors]);

//   // Filtering Logic
//   const filteredCounselors = useMemo(() => {
//     let result = [...(counselors || [])];

//     if (filters.search) {
//       result = result.filter(c => c.name.toLowerCase().includes(filters.search.toLowerCase()));
//     }
//     // if (filters.specialization) {
//     //   result = result.filter(c => c.specialization === filters.specialization);
//     // }
//     // if (filters.sort === "low-high") {
//     //   result.sort((a, b) => (a.pricePerSession || 0) - (b.pricePerSession || 0));
//     // } else if (filters.sort === "high-low") {
//     //   result.sort((a, b) => (b.pricePerSession || 0) - (a.pricePerSession || 0));
//     // }

//     return result;
//   }, [counselors, filters]);

//   // Handlers
//   const handleFilterChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });
  
//   // const handleBookingClick = (counselor) => {
//   //   if (!user) return navigate("/login");
//   //   if (user.role !== "client") return alert("Only clients can book sessions.");
//   //   setSelectedCounselor(counselor);
//   // };
//   const handleBookingClick = (counselor) => {
//     if (!user) return navigate("/login");
//     if (user.role !== "client") return alert("Only clients can book sessions."); // Ideally replace with Toast
    
//     // Option A: Navigate to dedicated page
//     navigate(`/counselor/${counselor._id}/book`);
    
//     // Option B: Open Modal (Implemented below for UI demo)
//     setSelectedCounselor(counselor);
//   };

//   return (
//     <div className="min-h-screen bg-[#f4f2ed] text-[#1c1917] font-sans selection:bg-[#3f6212] selection:text-white relative">
//       <GrainTexture />

//       {/* --- Header Section --- */}
//       <div className="pt-32 pb-12 px-6 max-w-7xl mx-auto text-center">
//         <motion.span 
//           initial={{ opacity: 0 }} animate={{ opacity: 1 }}
//           className="inline-block px-4 py-1.5 rounded-full border border-stone-200 bg-white/40 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-6"
//         >
//           Our Specialists
//         </motion.span>
//         <motion.h1 
//           initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
//           className="text-5xl md:text-7xl font-serif mb-6 tracking-tight"
//         >
//           Find your <span className="italic text-stone-400 font-light">Guide</span>
//         </motion.h1>
//       </div>

//       {/* --- Filter Toolbar --- */}
//       <div className="sticky top-24 z-30 px-6 mb-16">
//         <motion.div 
//           initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
//           className="max-w-5xl mx-auto bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm rounded-2xl p-2 flex flex-col md:flex-row gap-2"
//         >
//           <div className="flex-1 relative group">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-[#1c1917]" size={18} />
//             <input
//               name="search"
//               placeholder="Search by name..."
//               value={filters.search}
//               onChange={handleFilterChange}
//               className="w-full h-12 bg-transparent pl-12 pr-4 outline-none text-sm font-medium placeholder-stone-400"
//             />
//           </div>

//           <div className="w-px bg-stone-200 hidden md:block my-2"></div>
// {/* 
//           <div className="flex-1 flex items-center gap-2 px-2">
//             <Filter size={16} className="text-stone-400" />
//             <select
//               name="specialization"
//               value={filters.specialization}
//               onChange={handleFilterChange}
//               className="w-full h-12 bg-transparent outline-none text-sm font-medium text-stone-600 cursor-pointer"
//             >
//               <option value="">All Specializations</option>
//               <option value="Depression">Depression</option>
//               <option value="Relationship">Relationship</option>
//               <option value="Anxiety">Anxiety</option>
//               <option value="Career">Career Counseling</option>
//             </select>
//           </div> */}

//           <div className="w-px bg-stone-200 hidden md:block my-2"></div>

//           {/* <div className="flex-1 px-2">
//             <select
//               name="sort"
//               value={filters.sort}
//               onChange={handleFilterChange}
//               className="w-full h-12 bg-transparent outline-none text-sm font-medium text-stone-600 cursor-pointer"
//             >
//               <option value="">Sort by Fee</option>
//               <option value="low-high">Price: Low to High</option>
//               <option value="high-low">Price: High to Low</option>
//             </select>
//           </div> */}
//         </motion.div>
//       </div>

//       {/* --- Grid --- */}
//       <div className="max-w-7xl mx-auto px-6 pb-24">
//         {loading ? (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[1,2,3,4,5,6].map(i => <SkeletonCard key={i} />)}
//           </div>
//         ) : filteredCounselors.length === 0 ? (
//            <div className="text-center py-20">
//              <p className="text-stone-400 text-lg">No specialists found matching your criteria.</p>
//              <button onClick={() => setFilters({search: "", specialization: "", sort: ""})} className="mt-4 text-[#3f6212] font-bold underline">Clear Filters</button>
//            </div>
//         ) : (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             <AnimatePresence>
//               {filteredCounselors.map((c) => (
//                 <motion.div
//                   layout
//                   key={c._id}
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.9 }}
//                   className="group bg-white rounded-[2rem] p-6 border border-stone-100 hover:border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
//                 >
//                   {/* Card Header */}
//                   <div className="flex items-start justify-between mb-6">
//                     <div className="relative">
//                        <img
//                          src={c.profileImage || DEFAULT_AVATAR} 
//                          onError={(e) => { e.target.src = DEFAULT_AVATAR; }} // Fallback if URL breaks
//                          alt={c.name}
//                          className="w-20 h-20 rounded-2xl object-cover shadow-inner bg-stone-100"
//                        />
//                        <div className="absolute -bottom-2 -right-2 bg-white px-2 py-1 rounded-full shadow-sm border border-stone-100 flex items-center gap-1">
//                          <Star size={10} className="text-yellow-500 fill-yellow-500" />
//                          <span className="text-[10px] font-bold">4.9</span>
//                        </div>
//                     </div>
//                     <div className="text-right">
//                       <span className="block text-lg font-bold text-[#1c1917]">LKR {c.pricePerSession || 50}</span>
//                       <span className="text-[10px] text-stone-400 uppercase tracking-wide">Per Session</span>
//                     </div>
//                   </div>

//                   {/* Card Body */}
//                   <div className="mb-6 flex-grow">
//                     <h3 className="text-2xl font-serif text-[#1c1917] mb-1">{c.name}</h3>
//                     <p className="text-xs font-bold uppercase tracking-widest text-[#3f6212] mb-3">
//                       {c.specialization || "General Counselor"}
//                     </p>
//                     <p className="text-sm text-stone-500 line-clamp-3 leading-relaxed">
//                       {c.bio || "Experienced professional dedicated to helping you navigate life's challenges with empathy and expert guidance."}
//                     </p>
//                   </div>

//                   {/* Stats Pill */}
//                   <div className="flex items-center gap-4 mb-6 text-xs font-medium text-stone-500 bg-[#f4f2ed] p-3 rounded-xl">
//                     <div className="flex items-center gap-1">
//                       <CheckCircle size={14} /> {c.experience || 5} Yrs Exp.
//                     </div>
//                     <div className="w-px h-3 bg-stone-300"></div>
//                     <div className="flex items-center gap-1">
//                       <User size={14} /> Verified
//                     </div>
//                   </div>

//                   {/* Actions */}
//                   <div className="grid grid-cols-2 gap-3 mt-auto">
//                     <button 
//                       onClick={() => navigate(`/counselor/${c._id}`)}
//                       className="py-3 rounded-full border border-stone-200 text-[#1c1917] text-xs font-bold uppercase tracking-widest hover:bg-stone-50 transition-colors"
//                     >
//                       Profile
//                     </button>
//                     <button 
//                       onClick={() => handleBookingClick(c)}
//                       className="py-3 rounded-full bg-[#1c1917] text-[#f2f0e9] text-xs font-bold uppercase tracking-widest hover:bg-[#3f6212] transition-colors shadow-lg"
//                     >
//                       Book
//                     </button>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </div>
//         )}
//       </div>

//       {/* --- Booking Modal --- */}
//       <AnimatePresence>
//         {selectedCounselor && (
//           <motion.div 
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
//           >
//             <motion.div 
//               initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
//               className="bg-white rounded-[2rem] shadow-2xl p-8 max-w-md w-full relative"
//             >
//               <button onClick={() => setSelectedCounselor(null)} className="absolute top-6 right-6 text-stone-400 hover:text-stone-800">
//                 <X size={20} />
//               </button>

//               <h3 className="text-2xl font-serif mb-1">Book Session</h3>
//               <p className="text-stone-500 text-sm mb-6">with <span className="font-bold text-[#1c1917]">{selectedCounselor.name}</span></p>

//               <div className="space-y-4">
//                 <div className="space-y-1">
//                   <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Duration</label>
//                   <select
//                     name="duration"
//                     value={bookingData.duration}
//                     onChange={(e) => setBookingData({...bookingData, duration: e.target.value})}
//                     className="w-full p-3 bg-[#f4f2ed] rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-[#1c1917]"
//                   >
//                     <option value="">Select Duration</option>
//                     <option value="30">30 Minutes</option>
//                     <option value="60">1 Hour</option>
//                   </select>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-1">
//                     <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Date</label>
//                     <div className="relative">
//                       <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
//                       <input
//                         type="date"
//                         name="date"
//                         value={bookingData.date}
//                         onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
//                         className="w-full p-3 pl-10 bg-[#f4f2ed] rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-[#1c1917]"
//                       />
//                     </div>
//                   </div>
//                   <div className="space-y-1">
//                     <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Time</label>
//                     <div className="relative">
//                       <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
//                       <input
//                         type="time"
//                         name="time"
//                         value={bookingData.time}
//                         onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
//                         className="w-full p-3 pl-10 bg-[#f4f2ed] rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-[#1c1917]"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="pt-4">
//                   {bookingData.duration && bookingData.date && bookingData.time ? (
//                     <PaymentButton
//                       amount={selectedCounselor.pricePerSession || 1000}
//                       counselorId={selectedCounselor._id}
//                       booking={bookingData}
//                     />
//                   ) : (
//                     <button disabled className="w-full py-4 rounded-full bg-stone-200 text-stone-400 text-xs font-bold uppercase tracking-widest cursor-not-allowed">
//                       Fill details to proceed
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Counselor;

import React, { useEffect, useState, useMemo } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Star, CheckCircle, User } from "lucide-react";

const GrainTexture = () => (
  <div
    className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
    style={{
      backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
      filter: "contrast(170%) brightness(100%)",
    }}
  />
);

const SkeletonCard = () => (
  <div className="bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm h-[400px] flex flex-col items-center justify-center gap-4 animate-pulse">
    <div className="w-24 h-24 bg-stone-200 rounded-full" />
    <div className="h-6 w-3/4 bg-stone-200 rounded" />
    <div className="h-4 w-1/2 bg-stone-200 rounded" />
    <div className="h-10 w-full bg-stone-200 rounded mt-4" />
  </div>
);

// Default Image
const DEFAULT_AVATAR =
  "https://static.vecteezy.com/system/resources/previews/057/791/671/non_2x/user-profile-icon-design-user-profile-sign-gold-color-style-free-vector.jpg";

const Counselor = ({ user, counselors, setCounselors }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
  });

  // Fetch counselors list from /counselors/all
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.get("/counselors/all");
        setCounselors(data.data || []);
      } catch (err) {
        console.error("Failed to load counselors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [setCounselors]);

  // Filtering Logic (by name for now)
  const filteredCounselors = useMemo(() => {
    let result = [...(counselors || [])];

    if (filters.search) {
      result = result.filter((c) =>
        (c.name || "")
          .toLowerCase()
          .includes(filters.search.toLowerCase())
      );
    }

    return result;
  }, [counselors, filters]);

  const handleFilterChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  const handleBookingClick = (counselor) => {
    if (!user) return navigate("/login");
    if (user.role !== "client")
      return alert("Only clients can book sessions.");
    navigate(`/counselor/${counselor._id}/book`);
  };

  // Helper to normalize avatar path from backend
  const getAvatarUrl = (c) => {
    if (!c.profileImage) return DEFAULT_AVATAR;
    if (c.profileImage.startsWith("http")) return c.profileImage;
    return `http://localhost:3000${c.profileImage}`;
  };

  return (
    <div className="min-h-screen bg-[#f4f2ed] text-[#1c1917] font-sans selection:bg-[#3f6212] selection:text-white relative">
      <GrainTexture />

      {/* Header */}
      <div className="pt-32 pb-12 px-6 max-w-7xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="inline-block px-4 py-1.5 rounded-full border border-stone-200 bg-white/40 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-6"
        >
          Our Specialists
        </motion.span>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl md:text-7xl font-serif mb-6 tracking-tight"
        >
          Find your{" "}
          <span className="italic text-stone-400 font-light">
            Guide
          </span>
        </motion.h1>
      </div>

      {/* Filter Toolbar */}
      <div className="sticky top-24 z-30 px-6 mb-16">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="max-w-5xl mx-auto bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm rounded-2xl p-2 flex flex-col md:flex-row gap-2"
        >
          <div className="flex-1 relative group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-[#1c1917]"
              size={18}
            />
            <input
              name="search"
              placeholder="Search by name..."
              value={filters.search}
              onChange={handleFilterChange}
              className="w-full h-12 bg-transparent pl-12 pr-4 outline-none text-sm font-medium placeholder-stone-400"
            />
          </div>
        </motion.div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredCounselors.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-stone-400 text-lg">
              No specialists found matching your criteria.
            </p>
            <button
              onClick={() => setFilters({ search: "" })}
              className="mt-4 text-[#3f6212] font-bold underline"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredCounselors.map((c) => (
                <motion.div
                  layout
                  key={c._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group bg-white rounded-[2rem] p-6 border border-stone-100 hover:border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="relative">
                      <img
                        src={getAvatarUrl(c)}
                        alt={c.name}
                        className="w-20 h-20 rounded-2xl object-cover shadow-inner bg-stone-100"
                        onError={(e) => {
                          e.target.src = DEFAULT_AVATAR;
                        }}
                      />
                      <div className="absolute -bottom-2 -right-2 bg-white px-2 py-1 rounded-full shadow-sm border border-stone-100 flex items-center gap-1">
                        <Star
                          size={10}
                          className="text-yellow-500 fill-yellow-500"
                        />
                        <span className="text-[10px] font-bold">
                          4.9
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="block text-lg font-bold text-[#1c1917]">
                        LKR {c.pricePerSession || 1000}
                      </span>
                      <span className="text-[10px] text-stone-400 uppercase tracking-wide">
                        Per Session
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="mb-6 flex-grow">
                    <h3 className="text-2xl font-serif text-[#1c1917] mb-1">
                      {c.name}
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#3f6212] mb-3">
                      {c.specialization || "General Counselor"}
                    </p>
                    <p className="text-sm text-stone-500 line-clamp-3 leading-relaxed">
                      {c.bio ||
                        "Experienced professional dedicated to helping you navigate life's challenges with empathy and expert guidance."}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-6 text-xs font-medium text-stone-500 bg-[#f4f2ed] p-3 rounded-xl">
                    <div className="flex items-center gap-1">
                      <CheckCircle size={14} />{" "}
                      {c.experience || 1} Yrs Exp.
                    </div>
                    <div className="w-px h-3 bg-stone-300" />
                    <div className="flex items-center gap-1">
                      <User size={14} /> Verified
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3 mt-auto">
                    <button
                      onClick={() => navigate(`/counselor/${c._id}`)}
                      className="py-3 rounded-full border border-stone-200 text-[#1c1917] text-xs font-bold uppercase tracking-widest hover:bg-stone-50 transition-colors"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => handleBookingClick(c)}
                      className="py-3 rounded-full bg-[#1c1917] text-[#f2f0e9] text-xs font-bold uppercase tracking-widest hover:bg-[#3f6212] transition-colors shadow-lg"
                    >
                      Book
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Counselor;