

// // // src/pages/CounselorDashboard.jsx
// // import React, { useEffect, useState } from "react";
// // import API from "../api/api";
// // import { useNavigate } from "react-router-dom";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { toast } from "react-hot-toast";
// // import {
// //   Edit2,
// //   User,
// //   Calendar,
// //   Phone,
// //   Mail,
// //   Camera,
// //   Video,
// //   MessageSquare,
// //   Clock,
// //   Sparkles,
// //   Wallet,
// //   FileText,
// //   Trash2,
// //   Edit,
// // } from "lucide-react";

// // // --- Visual Components (same style as ClientDashboard) ---
// // const GrainTexture = () => (
// //   <div
// //     className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] mix-blend-overlay"
// //     style={{
// //       backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
// //       filter: "contrast(170%) brightness(100%)",
// //     }}
// //   />
// // );

// // const Card = ({ children, className = "", onClick }) => (
// //   <motion.div
// //     onClick={onClick}
// //     layout
// //     initial={{ opacity: 0, y: 20 }}
// //     animate={{ opacity: 1, y: 0 }}
// //     transition={{ duration: 0.35 }}
// //     className={`bg-white rounded-[1.25rem] border-stone-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden ${className}`}
// //   >
// //     {children}
// //   </motion.div>
// // );

// // const Badge = ({ children, color = "stone" }) => {
// //   const colors = {
// //     stone: "bg-stone-100 text-stone-600",
// //     green: "bg-[#ECF6E1] text-[#3f6212]",
// //     red: "bg-red-50 text-red-500",
// //     yellow: "bg-yellow-50 text-yellow-600",
// //   };
// //   return (
// //     <span
// //       className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${colors[color]}`}
// //     >
// //       {children}
// //     </span>
// //   );
// // };

// // const CounselorDashboard = ({ user }) => {
// //   const navigate = useNavigate();
// //   const [profile, setProfile] = useState(null);
// //   const [bookings, setBookings] = useState([]);
// //   const [payoutSummary, setPayoutSummary] = useState(null);
// //   const [blogs, setBlogs] = useState([]);
// //   const [editingProfile, setEditingProfile] = useState(false);
// //   const [profileData, setProfileData] = useState({});
// //   const [selectedFile, setSelectedFile] = useState(null);
// //   const [previewImage, setPreviewImage] = useState(null);
// //   const [activeTab, setActiveTab] = useState("sessions"); // "sessions" | "earnings" | "blogs"

// //   const token = localStorage.getItem("token");
// //   const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};
// //   const counselorId = user?.id || user?._id || localStorage.getItem("userId");

// //   // --- Fetch profile ---
// //   useEffect(() => {
// //     if (!counselorId) return;
// //     const fetchProfile = async () => {
// //       try {
// //         const { data } = await API.get(`/users/${counselorId}`, {
// //           headers: authHeaders,
// //         });
// //         setProfile(data.data);
// //         setProfileData({
// //           name: data.data.name || "",
// //           bio: data.data.bio || "",
// //           contactNumber: data.data.contactNumber || "",
// //         });
// //         setPreviewImage(
// //           data.data.profileImage
// //             ? `http://localhost:3000${data.data.profileImage}`
// //             : null
// //         );
// //       } catch (err) {
// //         console.error("Failed to fetch profile:", err);
// //       }
// //     };
// //     fetchProfile();
// //   }, [counselorId, token]);

// //   // --- Fetch bookings + payout summary + own blogs ---
// //   useEffect(() => {
// //     if (!counselorId || !token) return;

// //     const fetchData = async () => {
// //       try {
// //         const [bookingsRes, payoutRes, blogsRes] = await Promise.all([
// //           API.get(`/booking/counselor/${counselorId}`, { headers: authHeaders }),
// //           API.get(`/payout/summary/${counselorId}`, { headers: authHeaders }),
// //           API.get("/blogs/my-blogs", { headers: authHeaders }),
// //         ]);

// //         setBookings(bookingsRes.data.bookings || bookingsRes.data.data || []);
// //         setPayoutSummary(payoutRes.data.summary || null);
// //         setBlogs(blogsRes.data.data || []);
// //       } catch (err) {
// //         console.error("Fetch error:", err);
// //       }
// //     };
// //     fetchData();
// //   }, [counselorId, token]);

// //   // --- Profile form handlers ---
// //   const handleProfileChange = (e) =>
// //     setProfileData({ ...profileData, [e.target.name]: e.target.value });

// //   const handleFileChange = (e) => {
// //     const file = e.target.files?.[0];
// //     setSelectedFile(file);
// //     if (file) setPreviewImage(URL.createObjectURL(file));
// //   };

// //   const submitProfileUpdate = async (e) => {
// //     e.preventDefault();
// //     if (!token) return toast.error("You are not authenticated");

// //     try {
// //       const formData = new FormData();
// //       formData.append("name", profileData.name);
// //       formData.append("bio", profileData.bio);
// //       formData.append("contactNumber", profileData.contactNumber);
// //       if (selectedFile) formData.append("profileImage", selectedFile);

// //       const { data } = await API.put(`/profile/update`, formData, {
// //         headers: { ...authHeaders, "Content-Type": "multipart/form-data" },
// //       });

// //       setProfile(data.data);
// //       setProfileData({
// //         name: data.data.name,
// //         bio: data.data.bio,
// //         contactNumber: data.data.contactNumber,
// //       });
// //       setPreviewImage(
// //         data.data.profileImage
// //           ? `http://localhost:3000${data.data.profileImage}`
// //           : null
// //       );
// //       setEditingProfile(false);
// //       toast.success("Profile updated successfully!");
// //     } catch (err) {
// //       console.error("Update failed:", err);
// //       toast.error("Update failed.");
// //     }
// //   };

// //   // --- Sessions ---
// //   const handleStartSession = (booking) => {
// //     if (
// //       booking.sessionType &&
// //       booking.sessionType.toLowerCase() === "chat" &&
// //       booking.chatRoom
// //     ) {
// //       navigate(`/chat/${booking.chatRoom}`);
// //       return;
// //     }

// //     const callId = booking._id || booking.id;
// //     if (!callId) {
// //       toast.error("Missing booking ID for video call.");
// //       return;
// //     }

// //     navigate(`/video/${callId}`);
// //   };

// //   const otherName = (b) => b?.clientId?.name;

// //   // --- Blogs handlers ---
// //   const handleDeleteBlog = async (id) => {
// //     if (!window.confirm("Delete this blog?")) return;
// //     try {
// //       await API.delete(`/blogs/${id}`, { headers: authHeaders });
// //       setBlogs((prev) => prev.filter((b) => b._id !== id));
// //       toast.success("Blog deleted");
// //     } catch (err) {
// //       console.error("Blog delete failed:", err);
// //       toast.error("Deletion failed.");
// //     }
// //   };

// //   const handleEditBlog = (id) => {
// //     navigate(`/update-blog/${id}`);
// //   };

// //   if (!profile) {
// //     return (
// //       <div className="min-h-screen bg-[#f4f2ed] flex items-center justify-center">
// //         <div className="animate-pulse">Loading your dashboard...</div>
// //       </div>
// //     );
// //   }

// //   // --- Split bookings into upcoming & completed (by time / status) ---
// //   const splitBookingsByTime = (items) => {
// //     const now = new Date();
// //     const upcoming = [];
// //     const completed = [];

// //     items.forEach((b) => {
// //       let start = b.startDateTime ? new Date(b.startDateTime) : null;
// //       let end = b.endDateTime ? new Date(b.endDateTime) : null;

// //       if (!start && b.date && b.time) {
// //         const [year, month, day] = b.date.split("-");
// //         const [hour, minute] = b.time.split(":");
// //         start = new Date(year, month - 1, day, hour, minute);
// //       }
// //       if (!end && start) {
// //         const duration = b.durationMin || 60;
// //         end = new Date(start.getTime() + duration * 60 * 1000);
// //       }

// //       if (!start || !end) {
// //         upcoming.push(b);
// //         return;
// //       }

// //       const isCompletedByStatus =
// //         b.status === "completed" || b.status === "cancelled";
// //       const isCompletedByTime = now > end;

// //       if (isCompletedByStatus || isCompletedByTime) {
// //         completed.push(b);
// //       } else {
// //         upcoming.push(b);
// //       }
// //     });

// //     return { upcoming, completed };
// //   };

// //   const { upcoming: upcomingSessions, completed: completedSessions } =
// //     splitBookingsByTime(bookings);

// //   return (
// //     <div className="min-h-screen bg-[#f4f2ed] text-[#1c1977] font-sans relative selection:bg-[#3f6212] selection:text-white">
// //       <GrainTexture />

// //       <main className="max-w-7xl mx-auto px-6 py-20 lg:py-28 relative z-10">
// //         <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
// //           {/* LEFT: Profile */}
// //           <aside className="lg:col-span-4 lg:sticky lg:top-10 space-y-6">
// //             <Card className="p-8 text-center relative">
// //               <button
// //                 onClick={() => setEditingProfile((s) => !s)}
// //                 className="absolute top-6 right-6 p-2 rounded-full hover:bg-stone-100 text-stone-400 hover:text-[#1c1977] transition-colors"
// //               >
// //                 <Edit2 size={16} />
// //               </button>

// //               {/* Avatar */}
// //               <div className="relative w-32 h-32 mx-auto mb-6 group">
// //                 <div className="absolute inset-0 rounded-full bg-[#3f6212] opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500"></div>
// //                 <img
// //                   src={
// //                     previewImage ||
// //                     "https://cdn-icons-png.flaticon.com/512/149/149071.png"
// //                   }
// //                   alt="Profile"
// //                   className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
// //                 />
// //                 {editingProfile && (
// //                   <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer opacity-0 hover:opacity-100 transition-opacity">
// //                     <Camera className="text-white" size={20} />
// //                     <input
// //                       type="file"
// //                       accept="image/*"
// //                       onChange={handleFileChange}
// //                       className="hidden"
// //                     />
// //                   </label>
// //                 )}
// //               </div>

// //               <AnimatePresence mode="wait">
// //                 {editingProfile ? (
// //                   <motion.form
// //                     initial={{ opacity: 0 }}
// //                     animate={{ opacity: 1 }}
// //                     exit={{ opacity: 0 }}
// //                     onSubmit={submitProfileUpdate}
// //                     className="space-y-4"
// //                   >
// //                     <input
// //                       name="name"
// //                       value={profileData.name}
// //                       onChange={handleProfileChange}
// //                       className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6212]"
// //                       placeholder="Name"
// //                     />
// //                     <textarea
// //                       name="bio"
// //                       value={profileData.bio}
// //                       onChange={handleProfileChange}
// //                       className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6212] resize-none"
// //                       rows={3}
// //                       placeholder="Bio"
// //                     />
// //                     <input
// //                       name="contactNumber"
// //                       value={profileData.contactNumber}
// //                       onChange={handleProfileChange}
// //                       className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6212]"
// //                       placeholder="Contact Number"
// //                     />
// //                     <div className="flex gap-2">
// //                       <button
// //                         type="submit"
// //                         className="flex-1 bg-[#3f6212] text-white py-2 rounded-lg hover:bg-[#2f4a0e]"
// //                       >
// //                         Save
// //                       </button>
// //                       <button
// //                         type="button"
// //                         onClick={() => setEditingProfile(false)}
// //                         className="flex-1 bg-stone-200 text-stone-700 py-2 rounded-lg hover:bg-stone-300"
// //                       >
// //                         Cancel
// //                       </button>
// //                     </div>
// //                   </motion.form>
// //                 ) : (
// //                   <motion.div
// //                     initial={{ opacity: 0 }}
// //                     animate={{ opacity: 1 }}
// //                     exit={{ opacity: 0 }}
// //                     className="space-y-4"
// //                   >
// //                     <h2 className="text-2xl font-bold text-[#1c1977]">
// //                       {profile.name}
// //                     </h2>
// //                     {profile.bio && (
// //                       <p className="text-stone-600 text-sm leading-relaxed">
// //                         {profile.bio}
// //                       </p>
// //                     )}
// //                     <div className="flex flex-col gap-2 text-sm text-stone-500">
// //                       {profile.email && (
// //                         <div className="flex items-center justify-center gap-2">
// //                           <Mail size={14} />
// //                           <span>{profile.email}</span>
// //                         </div>
// //                       )}
// //                       {profile.contactNumber && (
// //                         <div className="flex items-center justify-center gap-2">
// //                           <Phone size={14} />
// //                           <span>{profile.contactNumber}</span>
// //                         </div>
// //                       )}
// //                       <div className="text-xs text-stone-400 mt-2">
// //                         Role: <span className="font-semibold">counselor</span>
// //                       </div>
// //                     </div>
// //                   </motion.div>
// //                 )}
// //               </AnimatePresence>
// //             </Card>

// //             {/* Quick Stats */}
// //             <Card className="p-6">
// //               <h3 className="font-semibold text-[#1c1977] mb-4">
// //                 Your Practice
// //               </h3>
// //               <div className="grid grid-cols-2 gap-4">
// //                 <div className="text-center p-3 bg-stone-50 rounded-lg">
// //                   <div className="text-2xl font-bold text-[#3f6212]">
// //                     {bookings.length}
// //                   </div>
// //                   <div className="text-xs text-stone-500">
// //                     Total Sessions
// //                   </div>
// //                 </div>
// //                 <div className="text-center p-3 bg-stone-50 rounded-lg">
// //                   <div className="text-2xl font-bold text-[#3f6212]">
// //                     {blogs.length}
// //                   </div>
// //                   <div className="text-xs text-stone-500">
// //                     Blog Articles
// //                   </div>
// //                 </div>
// //               </div>
// //             </Card>
// //           </aside>

// //           {/* RIGHT: Tabs & Content */}
// //           <div className="lg:col-span-8 space-y-6">
// //             {/* Tabs */}
// //             <div className="flex gap-2 border-b border-stone-200">
// //               {["sessions", "earnings", "blogs"].map((tab) => (
// //                 <button
// //                   key={tab}
// //                   onClick={() => setActiveTab(tab)}
// //                   className={`px-4 py-2 font-medium transition-colors ${
// //                     activeTab === tab
// //                       ? "text-[#3f6212] border-b-2 border-[#3f6212]"
// //                       : "text-stone-500 hover:text-stone-700"
// //                   }`}
// //                 >
// //                   {tab === "sessions"
// //                     ? "Sessions"
// //                     : tab === "earnings"
// //                     ? "Earnings"
// //                     : "Blogs"}
// //                 </button>
// //               ))}
// //             </div>

// //             <AnimatePresence mode="wait">
// //               {/* SESSIONS TAB */}
// //               {activeTab === "sessions" && (
// //                 <motion.div
// //                   key="sessions"
// //                   initial={{ opacity: 0, y: 10 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   exit={{ opacity: 0, y: -10 }}
// //                   className="space-y-4"
// //                 >
// //                   {bookings.length === 0 ? (
// //                     <Card className="p-8 text-center">
// //                       <Calendar
// //                         className="mx-auto text-stone-300 mb-4"
// //                         size={48}
// //                       />
// //                       <p className="text-stone-500">
// //                         No sessions scheduled yet
// //                       </p>
// //                     </Card>
// //                   ) : (
// //                     <>
// //                       {/* Upcoming Sessions */}
// //                       <h3 className="font-semibold text-[#1c1977] mb-2">
// //                         Upcoming Sessions
// //                       </h3>
// //                       {upcomingSessions.length === 0 ? (
// //                         <Card className="p-6 text-center mb-4">
// //                           <p className="text-sm text-stone-500">
// //                             No upcoming sessions
// //                           </p>
// //                         </Card>
// //                       ) : (
// //                         upcomingSessions.map((b) => {
// //                           const PRE_JOIN_MINUTES = 10;
// //                           let start = b.startDateTime
// //                             ? new Date(b.startDateTime)
// //                             : null;
// //                           let end = b.endDateTime
// //                             ? new Date(b.endDateTime)
// //                             : null;

// //                           if (!start && b.date && b.time) {
// //                             const [year, month, day] = b.date.split("-");
// //                             const [hour, minute] = b.time.split(":");
// //                             start = new Date(
// //                               year,
// //                               month - 1,
// //                               day,
// //                               hour,
// //                               minute
// //                             );
// //                           }
// //                           if (!end && start) {
// //                             const duration = b.durationMin || 60;
// //                             end = new Date(
// //                               start.getTime() + duration * 60 * 1000
// //                             );
// //                           }

// //                           const now = new Date();
// //                           const joinOpensAt =
// //                             start &&
// //                             new Date(
// //                               start.getTime() - PRE_JOIN_MINUTES * 60 * 1000
// //                             );
// //                           const canJoinNow =
// //                             start &&
// //                             end &&
// //                             now >= joinOpensAt &&
// //                             now <= end;

// //                           return (
// //                             <Card key={b._id} className="p-6 mb-4">
// //                               <div className="flex items-start justify-between">
// //                                 <div className="flex-1">
// //                                   <div className="flex items-center gap-3 mb-2">
// //                                     <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center">
// //                                       <User
// //                                         className="text-stone-600"
// //                                         size={20}
// //                                       />
// //                                     </div>
// //                                     <div>
// //                                       <h4 className="font-semibold text-[#1c1977]">
// //                                         {otherName(b) || "Client"}
// //                                       </h4>
// //                                       <div className="flex items-center gap-2 text-sm text-stone-500">
// //                                         <Calendar size={14} />
// //                                         <span>
// //                                           {new Date(
// //                                             b.date
// //                                           ).toLocaleDateString()}
// //                                         </span>
// //                                         <Clock size={14} />
// //                                         <span>{b.time}</span>
// //                                       </div>
// //                                     </div>
// //                                   </div>

// //                                   <div className="flex gap-2 mt-3">
// //                                     <Badge
// //                                       color={
// //                                         b.status === "paid" ||
// //                                         b.status === "completed"
// //                                           ? "green"
// //                                           : "yellow"
// //                                       }
// //                                     >
// //                                       {b.status}
// //                                     </Badge>
// //                                     <Badge color="stone">
// //                                       {b.sessionType}
// //                                     </Badge>
// //                                   </div>
// //                                 </div>

// //                                 {(b.status === "paid" ||
// //                                   b.status === "confirmed") && (
// //                                   <button
// //                                     onClick={() =>
// //                                       canJoinNow && handleStartSession(b)
// //                                     }
// //                                     disabled={!canJoinNow}
// //                                     className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
// //                                       ${
// //                                         canJoinNow
// //                                           ? "bg-[#3f6212] text-white hover:bg-[#2f4a0e]"
// //                                           : "bg-stone-200 text-stone-500 cursor-not-allowed"
// //                                       }`}
// //                                   >
// //                                     {b.sessionType === "chat" ? (
// //                                       <MessageSquare size={16} />
// //                                     ) : (
// //                                       <Video size={16} />
// //                                     )}
// //                                     {canJoinNow ? "Join" : "Not available"}
// //                                   </button>
// //                                 )}
// //                               </div>
// //                             </Card>
// //                           );
// //                         })
// //                       )}

// //                       {/* Completed Sessions */}
// //                       <h3 className="font-semibold text-[#1c1977] mt-4 mb-2">
// //                         Completed Sessions
// //                       </h3>
// //                       {completedSessions.length === 0 ? (
// //                         <Card className="p-6 text-center">
// //                           <p className="text-sm text-stone-500">
// //                             No completed sessions
// //                           </p>
// //                         </Card>
// //                       ) : (
// //                         completedSessions.map((b) => (
// //                           <Card key={b._id} className="p-6 mb-4">
// //                             <div className="flex items-start justify-between">
// //                               <div className="flex-1">
// //                                 <div className="flex items-center gap-3 mb-2">
// //                                   <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center">
// //                                     <User
// //                                       className="text-stone-600"
// //                                       size={20}
// //                                     />
// //                                   </div>
// //                                   <div>
// //                                     <h4 className="font-semibold text-[#1c1977]">
// //                                       {otherName(b) || "Client"}
// //                                     </h4>
// //                                     <div className="flex items-center gap-2 text-sm text-stone-500">
// //                                       <Calendar size={14} />
// //                                       <span>
// //                                         {new Date(
// //                                           b.date
// //                                         ).toLocaleDateString()}
// //                                       </span>
// //                                       <Clock size={14} />
// //                                       <span>{b.time}</span>
// //                                     </div>
// //                                   </div>
// //                                 </div>

// //                                 <div className="flex gap-2 mt-3">
// //                                   <Badge color="green">
// //                                     {b.status === "completed"
// //                                       ? "completed"
// //                                       : b.status}
// //                                   </Badge>
// //                                   <Badge color="stone">
// //                                     {b.sessionType}
// //                                   </Badge>
// //                                 </div>
// //                               </div>
// //                               {/* No Join button for completed */}
// //                             </div>
// //                           </Card>
// //                         ))
// //                       )}
// //                     </>
// //                   )}
// //                 </motion.div>
// //               )}

// //               {/* EARNINGS TAB */}
// //               {activeTab === "earnings" && (
// //                 <motion.div
// //                   key="earnings"
// //                   initial={{ opacity: 0, y: 10 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   exit={{ opacity: 0, y: -10 }}
// //                   className="space-y-6"
// //                 >
// //                   {!payoutSummary ? (
// //                     <Card className="p-8 text-center">
// //                       <Wallet
// //                         className="mx-auto text-stone-300 mb-4"
// //                         size={48}
// //                       />
// //                       <p className="text-stone-500">
// //                         No earnings data available yet.
// //                       </p>
// //                     </Card>
// //                   ) : (
// //                     <>
// //                       {/* Top summary cards */}
// //                       <div className="grid md:grid-cols-3 gap-4">
// //                         <Card className="p-4">
// //                           <div className="text-xs text-stone-500 uppercase font-bold tracking-widest mb-1">
// //                             Total Earnings
// //                           </div>
// //                           <div className="text-2xl font-bold text-[#1c1977] flex items-center gap-2">
// //                             <Wallet size={18} className="text-[#3f6212]" />
// //                             {payoutSummary.totalEarnings.toFixed(2)}{" "}
// //                             {payoutSummary.currency || "LKR"}
// //                           </div>
// //                         </Card>
// //                         <Card className="p-4">
// //                           <div className="text-xs text-stone-500 uppercase font-bold tracking-widest mb-1">
// //                             Paid Out
// //                           </div>
// //                           <div className="text-2xl font-bold text-[#1c1977]">
// //                             {payoutSummary.totalPaidOut.toFixed(2)}{" "}
// //                             {payoutSummary.currency || "LKR"}
// //                           </div>
// //                         </Card>
// //                         <Card className="p-4">
// //                           <div className="text-xs text-stone-500 uppercase font-bold tracking-widest mb-1">
// //                             Pending Balance
// //                           </div>
// //                           <div className="text-2xl font-bold text-[#3f6212]">
// //                             {payoutSummary.pendingBalance.toFixed(2)}{" "}
// //                             {payoutSummary.currency || "LKR"}
// //                           </div>
// //                         </Card>
// //                       </div>

// //                       {/* Recent sessions */}
// //                       <Card className="p-6">
// //                         <h3 className="font-semibold text-[#1c1977] mb-4">
// //                           Recent Paid Sessions
// //                         </h3>
// //                         {payoutSummary.recentBookings?.length === 0 ? (
// //                           <p className="text-sm text-stone-500">
// //                             No paid sessions yet.
// //                           </p>
// //                         ) : (
// //                           <div className="space-y-3">
// //                             {payoutSummary.recentBookings.map((b) => (
// //                               <div
// //                                 key={b._id}
// //                                 className="flex items-center justify-between p-3 bg-stone-50 rounded-lg"
// //                               >
// //                                 <div>
// //                                   <div className="font-medium text-[#1c1977]">
// //                                     {b.clientId?.name || "Client"}
// //                                   </div>
// //                                   <div className="text-xs text-stone-500 flex items-center gap-2">
// //                                     <Calendar size={12} />
// //                                     <span>
// //                                       {new Date(
// //                                         b.date
// //                                       ).toLocaleDateString()}
// //                                     </span>
// //                                     <Clock size={12} />
// //                                     <span>{b.time}</span>
// //                                   </div>
// //                                 </div>
// //                                 <div className="text-sm font-semibold text-[#3f6212]">
// //                                   {b.paidAmount || b.amount}{" "}
// //                                   {payoutSummary.currency || "LKR"}
// //                                 </div>
// //                               </div>
// //                             ))}
// //                           </div>
// //                         )}
// //                       </Card>
// //                     </>
// //                   )}
// //                 </motion.div>
// //               )}

// //               {/* BLOGS TAB */}
// //               {activeTab === "blogs" && (
// //                 <motion.div
// //                   key="blogs"
// //                   initial={{ opacity: 0, y: 10 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   exit={{ opacity: 0, y: -10 }}
// //                   className="space-y-4"
// //                 >
// //                   <div className="flex justify-between items-center">
// //                     <h3 className="font-semibold text-[#1c1977]">
// //                       Your Articles
// //                     </h3>
// //                     <button
// //                       onClick={() => navigate("/blogs/write")}
// //                       className="px-4 py-2 bg-[#3f6212] text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-[#2f4a0e]"
// //                     >
// //                       Write New Blog
// //                     </button>
// //                   </div>

// //                   {blogs.length === 0 ? (
// //                     <Card className="p-8 text-center">
// //                       <FileText
// //                         className="mx-auto text-stone-300 mb-4"
// //                         size={48}
// //                       />
// //                       <p className="text-stone-500">
// //                         You haven&apos;t written any blogs yet.
// //                       </p>
// //                     </Card>
// //                   ) : (
// //                     blogs.map((blog) => (
// //                       <Card
// //                         key={blog._id}
// //                         className="p-6 cursor-pointer"
// //                         onClick={() => navigate(`/blogs/${blog._id}`)}
// //                       >
// //                         <div className="flex items-start justify-between gap-4">
// //                           <div className="flex-1">
// //                             <h4 className="font-semibold text-[#1c1977] mb-2">
// //                               {blog.title}
// //                             </h4>
// //                             <p className="text-stone-600 text-sm mb-3 line-clamp-3">
// //                               {blog.content}
// //                             </p>
// //                             <div className="text-xs text-stone-400">
// //                               {new Date(blog.createdAt).toLocaleDateString()}
// //                             </div>
// //                           </div>
// //                           <div className="flex gap-2">
// //                             <button
// //                               onClick={(e) => {
// //                                 e.stopPropagation();
// //                                 handleEditBlog(blog._id);
// //                               }}
// //                               className="p-2 bg-stone-100 rounded text-stone-600 hover:bg-[#3f6212] hover:text-white transition-colors"
// //                             >
// //                               <Edit size={14} />
// //                             </button>
// //                             <button
// //                               onClick={(e) => {
// //                                 e.stopPropagation();
// //                                 handleDeleteBlog(blog._id);
// //                               }}
// //                               className="p-2 bg-stone-100 rounded text-stone-600 hover:bg-red-600 hover:text-white transition-colors"
// //                             >
// //                               <Trash2 size={14} />
// //                             </button>
// //                           </div>
// //                         </div>
// //                       </Card>
// //                     ))
// //                   )}
// //                 </motion.div>
// //               )}
// //             </AnimatePresence>
// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // };

// // export default CounselorDashboard;


// // src/pages/CounselorDashboard.jsx
// import React, { useEffect, useState } from "react";
// import API from "../api/api";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast } from "react-hot-toast";
// import {
//   Edit2,
//   User,
//   Calendar,
//   Phone,
//   Mail,
//   Camera,
//   Video,
//   MessageSquare,
//   Clock,
//   Wallet,
//   FileText,
//   Trash2,
//   Edit,
// } from "lucide-react";

// // --- Visual components (same family as ClientDashboard) ---
// const GrainTexture = () => (
//   <div
//     className="fixed inset-0 pointer-events-none z-0 opacity-[0.04] mix-blend-overlay"
//     style={{
//       backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
//       filter: "contrast(160%) brightness(105%)",
//     }}
//   />
// );

// const Card = ({ children, className = "", onClick }) => (
//   <motion.div
//     onClick={onClick}
//     layout
//     initial={{ opacity: 0, y: 10 }}
//     animate={{ opacity: 1, y: 0 }}
//     exit={{ opacity: 0, y: 10 }}
//     transition={{ duration: 0.25 }}
//     className={`bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-sm ${className}`}
//   >
//     {children}
//   </motion.div>
// );

// const Badge = ({ children, color = "stone" }) => {
//   const colors = {
//     stone: "bg-slate-100 text-slate-700",
//     green: "bg-emerald-50 text-emerald-700",
//     red: "bg-rose-50 text-rose-600",
//     yellow: "bg-amber-50 text-amber-700",
//   };
//   return (
//     <span
//       className={`px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.14em] ${colors[color]}`}
//     >
//       {children}
//     </span>
//   );
// };

// const CLIENT_DEFAULT_AVATAR =
//   "https://cdn-icons-png.flaticon.com/512/219/219969.png";

// const PRE_JOIN_MINUTES = 10;

// const CounselorDashboard = ({ user }) => {
//   const navigate = useNavigate();

//   const [profile, setProfile] = useState(null);
//   const [bookings, setBookings] = useState([]);
//   const [payoutSummary, setPayoutSummary] = useState(null);
//   const [blogs, setBlogs] = useState([]);

//   const [editingProfile, setEditingProfile] = useState(false);
//   const [profileData, setProfileData] = useState({
//     name: "",
//     bio: "",
//     contactNumber: "",
//     profileImageUrl: "",
//   });
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);

//   const [activeTab, setActiveTab] = useState("upcoming"); // "upcoming" | "completed" | "earnings" | "blogs"

//   // Pagination
//   const [completedPage, setCompletedPage] = useState(1);
//   const completedPerPage = 5;
//   const [blogPage, setBlogPage] = useState(1);
//   const blogsPerPage = 5;
//   const [earningsPage, setEarningsPage] = useState(1);
//   const earningsPerPage = 5;

//   const token = localStorage.getItem("token");
//   const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};
//   const counselorId =
//     user?.id || user?._id || localStorage.getItem("userId");

//   // --- Fetch profile ---
//   useEffect(() => {
//     if (!counselorId) return;
//     const fetchProfile = async () => {
//       try {
//         const { data } = await API.get(`/users/${counselorId}`, {
//           headers: authHeaders,
//         });
//         setProfile(data.data);
//         setProfileData({
//           name: data.data.name || "",
//           bio: data.data.bio || "",
//           contactNumber: data.data.contactNumber || "",
//         });
//         setPreviewImage(
//           data.data.profileImage
//             ? `http://localhost:3000${data.data.profileImage}`
//             : null
//         );
//       } catch (err) {
//         console.error("Failed to fetch profile:", err);
//       }
//     };
//     fetchProfile();
//   }, [counselorId, token]);

//   // --- Fetch bookings + payout summary + own blogs ---
//   useEffect(() => {
//     if (!counselorId || !token) return;

//     const fetchData = async () => {
//       try {
//         const [bookingsRes, payoutRes, blogsRes] = await Promise.all([
//           API.get(`/booking/counselor/${counselorId}`, {
//             headers: authHeaders,
//           }),
//           API.get(`/payout/summary/${counselorId}`, { headers: authHeaders }),
//           API.get("/blogs/my-blogs", { headers: authHeaders }),
//         ]);

//         setBookings(bookingsRes.data.bookings || bookingsRes.data.data || []);
//         setPayoutSummary(payoutRes.data.summary || null);
//         setBlogs(blogsRes.data.data || []);
//       } catch (err) {
//         console.error("Fetch error:", err);
//       }
//     };
//     fetchData();
//   }, [counselorId, token]);

//   // Reset pagination when data size changes
//   useEffect(() => {
//     setCompletedPage(1);
//   }, [bookings.length]);

//   useEffect(() => {
//     setBlogPage(1);
//   }, [blogs.length]);

//   useEffect(() => {
//     setEarningsPage(1);
//   }, [payoutSummary?.recentBookings?.length]);

//   // --- Profile handlers ---
//   const handleProfileChange = (e) =>
//     setProfileData({ ...profileData, [e.target.name]: e.target.value });

//   const handleFileChange = (e) => {
//     const file = e.target.files?.[0];
//     setSelectedFile(file);
//     if (file) setPreviewImage(URL.createObjectURL(file));
//   };

//   const submitProfileUpdate = async (e) => {
//     e.preventDefault();
//     if (!token) return toast.error("You are not authenticated");

//     try {
//       const formData = new FormData();
//       formData.append("name", profileData.name);
//       formData.append("bio", profileData.bio);
//       formData.append("contactNumber", profileData.contactNumber);
//       if (selectedFile) formData.append("profileImage", selectedFile);

//       const { data } = await API.put(`/profile/update`, formData, {
//         headers: { ...authHeaders, "Content-Type": "multipart/form-data" },
//       });

//       setProfile(data.data);
//       setProfileData({
//         name: data.data.name || "",
//         bio: data.data.bio || "",
//         contactNumber: data.data.contactNumber || "",
//         // if backend already stores URL in profileImage and it's an http URL, reuse it:
//         profileImageUrl:
//           data.data.profileImage && data.data.profileImage.startsWith("http")
//             ? data.data.profileImage
//             : "",
//       });
//       setPreviewImage(
//         data.data.profileImage
//           ? `http://localhost:3000${data.data.profileImage}`
//           : null
//       );
//       setEditingProfile(false);
//       toast.success("Profile updated successfully!");
//     } catch (err) {
//       console.error("Update failed:", err);
//       toast.error("Update failed.");
//     }
//   };

//   // --- Session handlers ---
//   const handleStartSession = (booking) => {
//     if (
//       booking.sessionType &&
//       booking.sessionType.toLowerCase() === "chat" &&
//       booking.chatRoom
//     ) {
//       navigate(`/chat/${booking.chatRoom}`);
//       return;
//     }

//     const callId = booking._id || booking.id;
//     if (!callId) {
//       toast.error("Missing booking ID for video call.");
//       return;
//     }

//     navigate(`/video/${callId}`);
//   };

//   const clientName = (b) => b?.clientId?.name || "Client";
//   const clientAvatar = (b) =>
//     b?.clientId?.profileImage || CLIENT_DEFAULT_AVATAR;
//   const clientPublicId = (b) => b?.clientId?._id || b?.clientId?.id;

//   // --- Blog handlers ---
//   const handleDeleteBlog = async (id) => {
//     if (!window.confirm("Delete this blog?")) return;
//     try {
//       await API.delete(`/blogs/${id}`, { headers: authHeaders });
//       setBlogs((prev) => prev.filter((b) => b._id !== id));
//       toast.success("Blog deleted");
//     } catch (err) {
//       console.error("Blog delete failed:", err);
//       toast.error("Deletion failed.");
//     }
//   };

//   const handleEditBlog = (id) => {
//     navigate(`/update-blog/${id}`);
//   };

//   if (!profile) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500">
//         <div className="animate-pulse text-xs tracking-[0.25em] uppercase">
//           Loading your dashboard...
//         </div>
//       </div>
//     );
//   }

//   // --- Split bookings into upcoming & completed ---
//   const splitBookingsByTime = (items) => {
//     const now = new Date();
//     const upcoming = [];
//     const completed = [];

//     items.forEach((b) => {
//       let start = b.startDateTime ? new Date(b.startDateTime) : null;
//       let end = b.endDateTime ? new Date(b.endDateTime) : null;

//       if (!start && b.date && b.time) {
//         const [year, month, day] = b.date.split("-");
//         const [hour, minute] = b.time.split(":");
//         start = new Date(year, month - 1, day, hour, minute);
//       }
//       if (!end && start) {
//         const duration = b.durationMin || 60;
//         end = new Date(start.getTime() + duration * 60 * 1000);
//       }

//       if (!start || !end) {
//         upcoming.push(b);
//         return;
//       }

//       const isCompletedByStatus =
//         b.status === "completed" || b.status === "cancelled";
//       const isCompletedByTime = now > end;

//       if (isCompletedByStatus || isCompletedByTime) {
//         completed.push(b);
//       } else {
//         upcoming.push(b);
//       }
//     });

//     return { upcoming, completed };
//   };

//   const { upcoming: upcomingSessions, completed: completedSessions } =
//     splitBookingsByTime(bookings);

//   const nextSession = upcomingSessions[0];

//   // Next session join window (10 mins before until end)
//   let nextCanJoin = false;
//   if (nextSession) {
//     let s = nextSession.startDateTime
//       ? new Date(nextSession.startDateTime)
//       : null;
//     let e = nextSession.endDateTime
//       ? new Date(nextSession.endDateTime)
//       : null;
//     if (!s && nextSession.date && nextSession.time) {
//       const [year, month, day] = nextSession.date.split("-");
//       const [hour, minute] = nextSession.time.split(":");
//       s = new Date(year, month - 1, day, hour, minute);
//     }
//     if (!e && s) {
//       const duration = nextSession.durationMin || 60;
//       e = new Date(s.getTime() + duration * 60 * 1000);
//     }
//     if (s && e) {
//       const now = new Date();
//       const joinOpensAt = new Date(
//         s.getTime() - PRE_JOIN_MINUTES * 60 * 1000
//       );
//       nextCanJoin = now >= joinOpensAt && now <= e;
//     }
//   }

//   // Pagination slices
//   const completedTotalPages = Math.max(
//     1,
//     Math.ceil(completedSessions.length / completedPerPage)
//   );
//   const completedSlice = completedSessions.slice(
//     (completedPage - 1) * completedPerPage,
//     completedPage * completedPerPage
//   );

//   const blogsTotalPages = Math.max(
//     1,
//     Math.ceil(blogs.length / blogsPerPage)
//   );
//   const blogsSlice = blogs.slice(
//     (blogPage - 1) * blogsPerPage,
//     blogPage * blogsPerPage
//   );

//   const recentBookings = payoutSummary?.recentBookings || [];
//   const earningsTotalPages = Math.max(
//     1,
//     Math.ceil(recentBookings.length / earningsPerPage)
//   );
//   const earningsSlice = recentBookings.slice(
//     (earningsPage - 1) * earningsPerPage,
//     earningsPage * earningsPerPage
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 text-slate-900 relative">
//       <GrainTexture />

//       <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 lg:py-14 relative z-10">
//         {/* HEADER */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
//           <div>
//             <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
//               Welcome back
//             </p>
//             <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mt-1 text-slate-900">
//               {profile.name || "Your Practice"}
//             </h1>
//             <p className="text-sm text-slate-500 mt-2 max-w-md">
//               Manage your upcoming sessions, see your earnings, and publish
//               helpful content.
//             </p>
//           </div>

//           {/* Quick stats */}
//           <div className="flex flex-wrap gap-3">
//             <Card className="px-5 py-3 flex items-center gap-3">
//               <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
//                 <Calendar size={18} />
//               </div>
//               <div>
//                 <div className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
//                   Sessions
//                 </div>
//                 <div className="text-base font-semibold">
//                   {bookings.length}
//                 </div>
//               </div>
//             </Card>
//             <Card className="px-5 py-3 flex items-center gap-3">
//               <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center text-sky-500">
//                 <FileText size={18} />
//               </div>
//               <div>
//                 <div className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
//                   Blogs
//                 </div>
//                 <div className="text-base font-semibold">{blogs.length}</div>
//               </div>
//             </Card>
//           </div>
//         </div>

//         {/* GRID LAYOUT */}
//         <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
//           {/* LEFT: Profile panel */}
//           <aside className="lg:col-span-4 space-y-6">
//             <Card className="p-6 md:p-7 text-center relative">
//               <button
//                 onClick={() => setEditingProfile((s) => !s)}
//                 className="absolute top-4 right-4 inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/80 hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors w-9 h-9"
//               >
//                 <Edit2 size={16} />
//               </button>

//               {/* Avatar */}
//               <div className="relative w-28 h-28 mx-auto mb-4">
//                 <div className="absolute inset-0 rounded-full bg-emerald-100 blur-xl" />
//                 <img
//                   src={
//                     previewImage ||
//                     "https://cdn-icons-png.flaticon.com/512/149/149071.png"
//                   }
//                   alt="Profile"
//                   className="relative w-full h-full rounded-full object-cover border-4 border-white shadow-md"
//                 />
//                 {editingProfile && (
//                   <label className="absolute inset-0 flex items-center justify-center bg-slate-900/40 rounded-full cursor-pointer text-[11px] font-semibold text-white uppercase tracking-[0.16em]">
//                     <Camera size={14} className="mr-1" />
//                     Edit
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handleFileChange}
//                       className="hidden"
//                     />
//                   </label>
//                 )}
//               </div>

//               <AnimatePresence mode="wait">
//                 {editingProfile ? (
//                   <motion.form
//                     initial={{ opacity: 0, y: 6 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: 6 }}
//                     onSubmit={submitProfileUpdate}
//                     className="space-y-3"
//                   >
//                     <input
//                       name="name"
//                       value={profileData.name}
//                       onChange={handleProfileChange}
//                       className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
//                       placeholder="Name"
//                     />
//                     <textarea
//                       name="bio"
//                       value={profileData.bio}
//                       onChange={handleProfileChange}
//                       className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
//                       rows={3}
//                       placeholder="Bio"
//                     />
//                     <input
//                       name="contactNumber"
//                       value={profileData.contactNumber}
//                       onChange={handleProfileChange}
//                       className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
//                       placeholder="Contact Number"
//                     />
//                     <div className="flex gap-2 pt-1">
//                       <button
//                         type="submit"
//                         className="flex-1 inline-flex justify-center items-center rounded-xl bg-emerald-500 text-white text-[11px] font-semibold uppercase tracking-[0.16em] py-2 hover:bg-emerald-400 transition-colors"
//                       >
//                         Save
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() => setEditingProfile(false)}
//                         className="flex-1 inline-flex justify-center items-center rounded-xl bg-slate-100 text-slate-700 text-[11px] font-semibold uppercase tracking-[0.16em] py-2 hover:bg-slate-200 transition-colors"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </motion.form>
//                 ) : (
//                   <motion.div
//                     initial={{ opacity: 0, y: 6 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: 6 }}
//                     className="space-y-2"
//                   >
//                     <h2 className="text-xl font-semibold text-slate-900">
//                       {profile.name}
//                     </h2>
//                     {profile.bio && (
//                       <p className="text-xs text-slate-500 leading-relaxed">
//                         {profile.bio}
//                       </p>
//                     )}
//                     <div className="pt-3 space-y-2 text-xs text-slate-600">
//                       {profile.email && (
//                         <div className="flex items-center justify-center gap-2">
//                           <Mail size={13} />
//                           <span>{profile.email}</span>
//                         </div>
//                       )}
//                       {profile.contactNumber && (
//                         <div className="flex items-center justify-center gap-2">
//                           <Phone size={13} />
//                           <span>{profile.contactNumber}</span>
//                         </div>
//                       )}
//                       <div className="text-[11px] text-slate-400 pt-1">
//                         Role:{" "}
//                         <span className="font-semibold text-slate-700">
//                           Counselor
//                         </span>
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               {/* Quick Stats */}
//               <div className="mt-6 grid grid-cols-2 gap-3">
//                 <div className="text-center p-3 bg-slate-50 rounded-lg">
//                   <div className="text-2xl font-bold text-emerald-600">
//                     {bookings.length}
//                   </div>
//                   <div className="text-[11px] text-slate-500 uppercase tracking-[0.12em]">
//                     Sessions
//                   </div>
//                 </div>
//                 <div className="text-center p-3 bg-slate-50 rounded-lg">
//                   <div className="text-2xl font-bold text-emerald-600">
//                     {blogs.length}
//                   </div>
//                   <div className="text-[11px] text-slate-500 uppercase tracking-[0.12em]">
//                     Blogs
//                   </div>
//                 </div>
//               </div>
//             </Card>
//           </aside>

//           {/* RIGHT: Main content */}
//           <div className="lg:col-span-8 space-y-6">
//             {/* Next Session highlight */}
//             {nextSession && (
//               <Card className="p-4 md:p-5 bg-gradient-to-r from-emerald-50 via-emerald-50/70 to-white border-emerald-100">
//                 <div className="flex flex-wrap items-center justify-between gap-3">
//                   <div className="flex items-center gap-3">
//                     <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
//                       <Calendar size={18} />
//                     </div>
//                     <div>
//                       <div className="text-[11px] uppercase tracking-[0.16em] text-emerald-600">
//                         Next Session
//                       </div>
//                       <div className="text-sm text-slate-800 flex flex-wrap items-center gap-2">
//                         <span className="font-semibold">
//                           {clientName(nextSession)}
//                         </span>
//                         <span className="text-slate-400">•</span>
//                         <span>
//                           {new Date(
//                             nextSession.date
//                           ).toLocaleDateString()}{" "}
//                           at {nextSession.time}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => nextCanJoin && handleStartSession(nextSession)}
//                     disabled={!nextCanJoin}
//                     className={`inline-flex items-center gap-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.16em] px-4 py-2
//                       ${
//                         nextCanJoin
//                           ? "bg-emerald-500 text-white hover:bg-emerald-400"
//                           : "bg-slate-100 text-slate-400 cursor-not-allowed"
//                       }`}
//                   >
//                     <Video size={14} />
//                     {nextCanJoin ? "Join" : "Not ready yet"}
//                   </button>
//                 </div>
//               </Card>
//             )}

//             {/* Tabs */}
//             <div className="flex gap-2 border-b border-slate-200 pb-1">
//               {[
//                 { id: "upcoming", label: "Upcoming" },
//                 { id: "completed", label: "Completed" },
//                 { id: "earnings", label: "Earnings" },
//                 { id: "blogs", label: "Blogs" },
//               ].map((tab) => (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`px-4 py-2 text-sm font-medium rounded-t-xl border-b-2 transition-all ${
//                     activeTab === tab.id
//                       ? "text-emerald-600 border-emerald-500"
//                       : "text-slate-500 border-transparent hover:text-slate-700"
//                   }`}
//                 >
//                   {tab.label}
//                 </button>
//               ))}
//             </div>

//             <AnimatePresence mode="wait">
//               {/* UPCOMING TAB */}
//               {activeTab === "upcoming" && (
//                 <motion.div
//                   key="upcoming"
//                   initial={{ opacity: 0, y: 8 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -8 }}
//                   className="space-y-4"
//                 >
//                   {upcomingSessions.length === 0 ? (
//                     <Card className="p-8 text-center">
//                       <Calendar
//                         className="mx-auto text-slate-300 mb-4"
//                         size={42}
//                       />
//                       <p className="text-sm text-slate-500">
//                         No upcoming sessions yet.
//                       </p>
//                     </Card>
//                   ) : (
//                     upcomingSessions.map((b) => {
//                       let start = b.startDateTime
//                         ? new Date(b.startDateTime)
//                         : null;
//                       let end = b.endDateTime ? new Date(b.endDateTime) : null;

//                       if (!start && b.date && b.time) {
//                         const [year, month, day] = b.date.split("-");
//                         const [hour, minute] = b.time.split(":");
//                         start = new Date(year, month - 1, day, hour, minute);
//                       }
//                       if (!end && start) {
//                         const duration = b.durationMin || 60;
//                         end = new Date(
//                           start.getTime() + duration * 60 * 1000
//                         );
//                       }

//                       let canJoinNow = false;
//                       if (start && end) {
//                         const now = new Date();
//                         const joinOpensAt = new Date(
//                           start.getTime() - PRE_JOIN_MINUTES * 60 * 1000
//                         );
//                         canJoinNow = now >= joinOpensAt && now <= end;
//                       }

//                       return (
//                         <Card key={b._id} className="p-6">
//                           <div className="flex items-start justify-between gap-4">
//                             <div className="flex gap-3">
//                               <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
//                                 <User
//                                   className="text-slate-600"
//                                   size={18}
//                                 />
//                               </div>
//                               <div>
//                                 <h4 className="text-sm font-semibold text-slate-900">
//                                   {clientName(b)}
//                                 </h4>
//                                 <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
//                                   <span className="inline-flex items-center gap-1">
//                                     <Calendar size={12} />
//                                     {new Date(
//                                       b.date
//                                     ).toLocaleDateString()}
//                                   </span>
//                                   <span className="inline-flex items-center gap-1">
//                                     <Clock size={12} />
//                                     {b.time}
//                                   </span>
//                                   <span className="inline-flex items-center gap-1">
//                                     <span className="w-1 h-1 rounded-full bg-slate-400" />
//                                     {b.durationMin || 60} min
//                                   </span>
//                                 </div>
//                                 <div className="flex flex-wrap gap-2 mt-3">
//                                   <Badge
//                                     color={
//                                       b.status === "paid" ? "green" : "yellow"
//                                     }
//                                   >
//                                     {b.status}
//                                   </Badge>
//                                   <Badge color="stone">
//                                     {b.sessionType || "session"}
//                                   </Badge>
//                                 </div>
//                               </div>
//                             </div>

//                             {b.status === "paid" && (
//                               <button
//                                 onClick={() =>
//                                   canJoinNow && handleStartSession(b)
//                                 }
//                                 disabled={!canJoinNow}
//                                 className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.16em]
//                                   ${
//                                     canJoinNow
//                                       ? "bg-emerald-500 text-white hover:bg-emerald-400"
//                                       : "bg-slate-100 text-slate-400 cursor-not-allowed"
//                                   }`}
//                               >
//                                 {b.sessionType === "chat" ? (
//                                   <MessageSquare size={14} />
//                                 ) : (
//                                   <Video size={14} />
//                                 )}
//                                 {canJoinNow ? "Join" : "Not ready yet"}
//                               </button>
//                             )}
//                           </div>
//                         </Card>
//                       );
//                     })
//                   )}
//                 </motion.div>
//               )}

//               {/* COMPLETED TAB (with pagination) */}
//               {activeTab === "completed" && (
//                 <motion.div
//                   key="completed"
//                   initial={{ opacity: 0, y: 8 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -8 }}
//                   className="space-y-4"
//                 >
//                   {completedSessions.length === 0 ? (
//                     <Card className="p-6 text-center">
//                       <p className="text-sm text-slate-500">
//                         No completed sessions yet.
//                       </p>
//                     </Card>
//                   ) : (
//                     <>
//                       {completedSlice.map((b) => (
//                         <Card key={b._id} className="p-6">
//                           <div className="flex items-start justify-between gap-4">
//                             <div className="flex gap-3">
//                               <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
//                                 <User
//                                   className="text-slate-600"
//                                   size={18}
//                                 />
//                               </div>
//                               <div>
//                                 <h4 className="text-sm font-semibold text-slate-900">
//                                   {clientName(b)}
//                                 </h4>
//                                 <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
//                                   <span className="inline-flex items-center gap-1">
//                                     <Calendar size={12} />
//                                     {new Date(
//                                       b.date
//                                     ).toLocaleDateString()}
//                                   </span>
//                                   <span className="inline-flex items-center gap-1">
//                                     <Clock size={12} />
//                                     {b.time}
//                                   </span>
//                                 </div>
//                                 <div className="flex flex-wrap gap-2 mt-3">
//                                   <Badge color="green">
//                                     {b.status === "completed"
//                                       ? "completed"
//                                       : b.status}
//                                   </Badge>
//                                   <Badge color="stone">
//                                     {b.sessionType || "session"}
//                                   </Badge>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </Card>
//                       ))}
//                       <div className="flex items-center justify-center gap-3 pt-2 text-xs text-slate-500">
//                         <button
//                           disabled={completedPage === 1}
//                           onClick={() =>
//                             setCompletedPage((p) => Math.max(1, p - 1))
//                           }
//                           className={`px-3 py-1 rounded-full border text-xs ${
//                             completedPage === 1
//                               ? "border-slate-200 text-slate-300 cursor-not-allowed"
//                               : "border-slate-300 text-slate-600 hover:bg-slate-100"
//                           }`}
//                         >
//                           Prev
//                         </button>
//                         <span>
//                           Page {completedPage} of {completedTotalPages}
//                         </span>
//                         <button
//                           disabled={completedPage === completedTotalPages}
//                           onClick={() =>
//                             setCompletedPage((p) =>
//                               Math.min(completedTotalPages, p + 1)
//                             )
//                           }
//                           className={`px-3 py-1 rounded-full border text-xs ${
//                             completedPage === completedTotalPages
//                               ? "border-slate-200 text-slate-300 cursor-not-allowed"
//                               : "border-slate-300 text-slate-600 hover:bg-slate-100"
//                           }`}
//                         >
//                           Next
//                         </button>
//                       </div>
//                     </>
//                   )}
//                 </motion.div>
//               )}

//               {/* EARNINGS TAB (with pagination for recent bookings) */}
//               {activeTab === "earnings" && (
//                 <motion.div
//                   key="earnings"
//                   initial={{ opacity: 0, y: 8 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -8 }}
//                   className="space-y-6"
//                 >
//                   {!payoutSummary ? (
//                     <Card className="p-8 text-center">
//                       <Wallet
//                         className="mx-auto text-slate-300 mb-4"
//                         size={48}
//                       />
//                       <p className="text-slate-500">
//                         No earnings data available yet.
//                       </p>
//                     </Card>
//                   ) : (
//                     <>
//                       <div className="grid md:grid-cols-3 gap-4">
//                         <Card className="p-4">
//                           <div className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">
//                             Total Earnings
//                           </div>
//                           <div className="text-2xl font-bold text-slate-900 flex items-center gap-2">
//                             <Wallet size={18} className="text-emerald-600" />
//                             {payoutSummary.totalEarnings.toFixed(2)}{" "}
//                             {payoutSummary.currency || "LKR"}
//                           </div>
//                         </Card>
//                         <Card className="p-4">
//                           <div className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">
//                             Paid Out
//                           </div>
//                           <div className="text-2xl font-bold text-slate-900">
//                             {payoutSummary.totalPaidOut.toFixed(2)}{" "}
//                             {payoutSummary.currency || "LKR"}
//                           </div>
//                         </Card>
//                         <Card className="p-4">
//                           <div className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">
//                             Pending Balance
//                           </div>
//                           <div className="text-2xl font-bold text-emerald-600">
//                             {payoutSummary.pendingBalance.toFixed(2)}{" "}
//                             {payoutSummary.currency || "LKR"}
//                           </div>
//                         </Card>
//                       </div>

//                       <Card className="p-6">
//                         <h3 className="font-semibold text-slate-900 mb-4">
//                           Recent Paid Sessions
//                         </h3>
//                         {recentBookings.length === 0 ? (
//                           <p className="text-sm text-slate-500">
//                             No paid sessions yet.
//                           </p>
//                         ) : (
//                           <>
//                             {earningsSlice.map((b) => (
//                               <div
//                                 key={b._id}
//                                 className="flex items-center justify-between p-3 bg-slate-50 rounded-lg mb-2"
//                               >
//                                 <div>
//                                   <div className="font-medium text-slate-900">
//                                     {b.clientId?.name || "Client"}
//                                   </div>
//                                   <div className="text-xs text-slate-500 flex items-center gap-2">
//                                     <Calendar size={12} />
//                                     <span>
//                                       {new Date(
//                                         b.date
//                                       ).toLocaleDateString()}
//                                     </span>
//                                     <Clock size={12} />
//                                     <span>{b.time}</span>
//                                   </div>
//                                 </div>
//                                 <div className="text-sm font-semibold text-emerald-600">
//                                   {b.paidAmount || b.amount}{" "}
//                                   {payoutSummary.currency || "LKR"}
//                                 </div>
//                               </div>
//                             ))}
//                             <div className="flex items-center justify-center gap-3 pt-2 text-xs text-slate-500">
//                               <button
//                                 disabled={earningsPage === 1}
//                                 onClick={() =>
//                                   setEarningsPage((p) => Math.max(1, p - 1))
//                                 }
//                                 className={`px-3 py-1 rounded-full border text-xs ${
//                                   earningsPage === 1
//                                     ? "border-slate-200 text-slate-300 cursor-not-allowed"
//                                     : "border-slate-300 text-slate-600 hover:bg-slate-100"
//                                 }`}
//                               >
//                                 Prev
//                               </button>
//                               <span>
//                                 Page {earningsPage} of {earningsTotalPages}
//                               </span>
//                               <button
//                                 disabled={earningsPage === earningsTotalPages}
//                                 onClick={() =>
//                                   setEarningsPage((p) =>
//                                     Math.min(earningsTotalPages, p + 1)
//                                   )
//                                 }
//                                 className={`px-3 py-1 rounded-full border text-xs ${
//                                   earningsPage === earningsTotalPages
//                                     ? "border-slate-200 text-slate-300 cursor-not-allowed"
//                                     : "border-slate-300 text-slate-600 hover:bg-slate-100"
//                                 }`}
//                               >
//                                 Next
//                               </button>
//                             </div>
//                           </>
//                         )}
//                       </Card>
//                     </>
//                   )}
//                 </motion.div>
//               )}

//               {/* BLOGS TAB (with pagination) */}
//               {activeTab === "blogs" && (
//                 <motion.div
//                   key="blogs"
//                   initial={{ opacity: 0, y: 8 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -8 }}
//                   className="space-y-4"
//                 >
//                   <div className="flex justify-between items-center mb-1">
//                     <div>
//                       <h3 className="text-sm font-semibold text-slate-900">
//                         Your Articles
//                       </h3>
//                       <p className="text-xs text-slate-500">
//                         Share your knowledge with your clients.
//                       </p>
//                     </div>
//                     <button
//                       onClick={() => navigate("/blogs/write")}
//                       className="px-4 py-2 bg-emerald-500 text-white rounded-full text-[11px] font-semibold uppercase tracking-[0.16em] hover:bg-emerald-400 transition-colors"
//                     >
//                       Write New Blog
//                     </button>
//                   </div>

//                   {blogs.length === 0 ? (
//                     <Card className="p-8 text-center">
//                       <FileText
//                         className="mx-auto text-slate-300 mb-4"
//                         size={48}
//                       />
//                       <p className="text-slate-500">
//                         You haven&apos;t written any blogs yet.
//                       </p>
//                     </Card>
//                   ) : (
//                     <>
//                       {blogsSlice.map((blog) => (
//                         <Card
//                           key={blog._id}
//                           className="p-6 cursor-pointer"
//                           onClick={() => navigate(`/blogs/${blog._id}`)}
//                         >
//                           <div className="flex items-start justify-between gap-4">
//                             <div className="flex-1">
//                               <h4 className="font-semibold text-slate-900 mb-2">
//                                 {blog.title}
//                               </h4>
//                               <p className="text-slate-600 text-sm mb-3 line-clamp-3">
//                                 {blog.content}
//                               </p>
//                               <div className="text-xs text-slate-400">
//                                 {new Date(
//                                   blog.createdAt
//                                 ).toLocaleDateString()}
//                               </div>
//                             </div>
//                             <div className="flex gap-2">
//                               <button
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   handleEditBlog(blog._id);
//                                 }}
//                                 className="p-2 bg-slate-100 rounded text-slate-600 hover:bg-emerald-500 hover:text-white transition-colors"
//                               >
//                                 <Edit size={14} />
//                               </button>
//                               <button
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   handleDeleteBlog(blog._id);
//                                 }}
//                                 className="p-2 bg-slate-100 rounded text-slate-600 hover:bg-rose-500 hover:text-white transition-colors"
//                               >
//                                 <Trash2 size={14} />
//                               </button>
//                             </div>
//                           </div>
//                         </Card>
//                       ))}
//                       <div className="flex items-center justify-center gap-3 pt-2 text-xs text-slate-500">
//                         <button
//                           disabled={blogPage === 1}
//                           onClick={() =>
//                             setBlogPage((p) => Math.max(1, p - 1))
//                           }
//                           className={`px-3 py-1 rounded-full border text-xs ${
//                             blogPage === 1
//                               ? "border-slate-200 text-slate-300 cursor-not-allowed"
//                               : "border-slate-300 text-slate-600 hover:bg-slate-100"
//                           }`}
//                         >
//                           Prev
//                         </button>
//                         <span>
//                           Page {blogPage} of {blogsTotalPages}
//                         </span>
//                         <button
//                           disabled={blogPage === blogsTotalPages}
//                           onClick={() =>
//                             setBlogPage((p) =>
//                               Math.min(blogsTotalPages, p + 1)
//                             )
//                           }
//                           className={`px-3 py-1 rounded-full border text-xs ${
//                             blogPage === blogsTotalPages
//                               ? "border-slate-200 text-slate-300 cursor-not-allowed"
//                               : "border-slate-300 text-slate-600 hover:bg-slate-100"
//                           }`}
//                         >
//                           Next
//                         </button>
//                       </div>
//                     </>
//                   )}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default CounselorDashboard;

// src/pages/CounselorDashboard.jsx
import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import {
  Edit2,
  User,
  Calendar,
  Phone,
  Mail,
  Camera,
  Video,
  MessageSquare,
  Clock,
  Wallet,
  FileText,
  Trash2,
  Edit,
} from "lucide-react";

const GrainTexture = () => (
  <div
    className="fixed inset-0 pointer-events-none z-0 opacity-[0.04] mix-blend-overlay"
    style={{
      backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
      filter: "contrast(160%) brightness(105%)",
    }}
  />
);

const Card = ({ children, className = "", onClick }) => (
  <motion.div
    onClick={onClick}
    layout
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    transition={{ duration: 0.25 }}
    className={`bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-sm ${className}`}
  >
    {children}
  </motion.div>
);

const Badge = ({ children, color = "stone" }) => {
  const colors = {
    stone: "bg-slate-100 text-slate-700",
    green: "bg-emerald-50 text-emerald-700",
    red: "bg-rose-50 text-rose-600",
    yellow: "bg-amber-50 text-amber-700",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.14em] ${colors[color]}`}
    >
      {children}
    </span>
  );
};

const CLIENT_DEFAULT_AVATAR =
  "https://cdn-icons-png.flaticon.com/512/219/219969.png";

const PRE_JOIN_MINUTES = 10;

const CounselorDashboard = ({ user }) => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [payoutSummary, setPayoutSummary] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const [editingProfile, setEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    bio: "",
    contactNumber: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [activeTab, setActiveTab] = useState("upcoming"); // "upcoming" | "completed" | "earnings" | "blogs"

  // Pagination
  const [completedPage, setCompletedPage] = useState(1);
  const completedPerPage = 5;
  const [blogPage, setBlogPage] = useState(1);
  const blogsPerPage = 5;
  const [earningsPage, setEarningsPage] = useState(1);
  const earningsPerPage = 5;

  const token = localStorage.getItem("token");
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};
  const counselorId = user?.id || user?._id || localStorage.getItem("userId");

  // --- Fetch profile (from /counselors/:id) ---
  useEffect(() => {
    if (!counselorId || !token) return;

    const fetchProfile = async () => {
      try {
        const { data } = await API.get(`/counselors/${counselorId}`, {
          headers: authHeaders,
        });

        const c = data.data;
        setProfile(c);
        setProfileData({
          name: c.name || "",
          bio: c.bio || "",
          contactNumber: c.contactNumber || "",
        });

        let img = "";
        if (c.profileImage) {
          img = c.profileImage.startsWith("http")
            ? c.profileImage
            : `https://healpeer-backend.onrender.com${c.profileImage}`;
        }
        setPreviewImage(img || null);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, [counselorId, token]);

  // --- Fetch bookings + payout summary + own blogs ---
  useEffect(() => {
    if (!counselorId || !token) return;

    const fetchData = async () => {
      try {
        const [bookingsRes, payoutRes, blogsRes] = await Promise.all([
          API.get(`/booking/counselor/${counselorId}`, {
            headers: authHeaders,
          }),
          API.get(`/payout/summary/${counselorId}`, { headers: authHeaders }),
          API.get("/blogs/my-blogs", { headers: authHeaders }),
        ]);

        setBookings(
          bookingsRes.data.bookings || bookingsRes.data.data || []
        );
        setPayoutSummary(payoutRes.data.summary || null);
        setBlogs(blogsRes.data.data || []);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchData();
  }, [counselorId, token]);

  // Reset pagination when data size changes
  useEffect(() => {
    setCompletedPage(1);
  }, [bookings.length]);

  useEffect(() => {
    setBlogPage(1);
  }, [blogs.length]);

  useEffect(() => {
    setEarningsPage(1);
  }, [payoutSummary?.recentBookings?.length]);

  // --- Profile handlers ---
  const handleProfileChange = (e) =>
    setProfileData({ ...profileData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setSelectedFile(file);
    if (file) setPreviewImage(URL.createObjectURL(file));
  };

  const submitProfileUpdate = async (e) => {
    e.preventDefault();
    if (!token || !counselorId) {
      toast.error("You are not authenticated");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", profileData.name);
      formData.append("bio", profileData.bio);
      formData.append("contactNumber", profileData.contactNumber);
      if (selectedFile) formData.append("profileImage", selectedFile);

      const { data } = await API.put(
        `/counselors/update/${counselorId}`,
        formData,
        {
          headers: {
            ...authHeaders,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updated = data.data;
      setProfile(updated);
      setProfileData({
        name: updated.name || "",
        bio: updated.bio || "",
        contactNumber: updated.contactNumber || "",
      });

      let img = "";
      if (updated.profileImage) {
        img = updated.profileImage.startsWith("http")
          ? updated.profileImage
          : `https://healpeer-backend.onrender.com${updated.profileImage}`;
      }
      setPreviewImage(img || null);

      setEditingProfile(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Update failed.");
    }
  };

  // --- Session handlers ---
  const handleStartSession = (booking) => {
    if (
      booking.sessionType &&
      booking.sessionType.toLowerCase() === "chat" &&
      booking.chatRoom
    ) {
      navigate(`/chat/${booking.chatRoom}`);
      return;
    }

    const callId = booking._id || booking.id;
    if (!callId) {
      toast.error("Missing booking ID for video call.");
      return;
    }

    navigate(`/video/${callId}`);
  };

  const clientName = (b) => b?.clientId?.name || "Client";
  const clientAvatar = (b) =>
    b?.clientId?.profileImage || CLIENT_DEFAULT_AVATAR;
  const clientPublicId = (b) => b?.clientId?._id || b?.clientId?.id;

  // --- Blog handlers ---
  const handleDeleteBlog = async (id) => {
    if (!window.confirm("Delete this blog?")) return;
    try {
      await API.delete(`/blogs/${id}`, { headers: authHeaders });
      setBlogs((prev) => prev.filter((b) => b._id !== id));
      toast.success("Blog deleted");
    } catch (err) {
      console.error("Blog delete failed:", err);
      toast.error("Deletion failed.");
    }
  };

  const handleEditBlog = (id) => {
    navigate(`/update-blog/${id}`);
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500">
        <div className="animate-pulse text-xs tracking-[0.25em] uppercase">
          Loading your dashboard...
        </div>
      </div>
    );
  }

  // --- Split bookings into upcoming & completed ---
  const splitBookingsByTime = (items) => {
    const now = new Date();
    const upcoming = [];
    const completed = [];

    items.forEach((b) => {
      let start = b.startDateTime ? new Date(b.startDateTime) : null;
      let end = b.endDateTime ? new Date(b.endDateTime) : null;

      if (!start && b.date && b.time) {
        const [year, month, day] = b.date.split("-");
        const [hour, minute] = b.time.split(":");
        start = new Date(year, month - 1, day, hour, minute);
      }
      if (!end && start) {
        const duration = b.durationMin || 60;
        end = new Date(start.getTime() + duration * 60 * 1000);
      }

      if (!start || !end) {
        upcoming.push(b);
        return;
      }

      const isCompletedByStatus =
        b.status === "completed" || b.status === "cancelled";
      const isCompletedByTime = now > end;

      if (isCompletedByStatus || isCompletedByTime) {
        completed.push(b);
      } else {
        upcoming.push(b);
      }
    });

    return { upcoming, completed };
  };

  const { upcoming: upcomingSessions, completed: completedSessions } =
    splitBookingsByTime(bookings);

  const nextSession = upcomingSessions[0];

  // Next session join window (10 mins before until end)
  let nextCanJoin = false;
  if (nextSession) {
    let s = nextSession.startDateTime
      ? new Date(nextSession.startDateTime)
      : null;
    let e = nextSession.endDateTime
      ? new Date(nextSession.endDateTime)
      : null;
    if (!s && nextSession.date && nextSession.time) {
      const [year, month, day] = nextSession.date.split("-");
      const [hour, minute] = nextSession.time.split(":");
      s = new Date(year, month - 1, day, hour, minute);
    }
    if (!e && s) {
      const duration = nextSession.durationMin || 60;
      e = new Date(s.getTime() + duration * 60 * 1000);
    }
    if (s && e) {
      const now = new Date();
      const joinOpensAt = new Date(
        s.getTime() - PRE_JOIN_MINUTES * 60 * 1000
      );
      nextCanJoin = now >= joinOpensAt && now <= e;
    }
  }

  // Pagination slices
  const completedTotalPages = Math.max(
    1,
    Math.ceil(completedSessions.length / completedPerPage)
  );
  const completedSlice = completedSessions.slice(
    (completedPage - 1) * completedPerPage,
    completedPage * completedPerPage
  );

  const blogsTotalPages = Math.max(
    1,
    Math.ceil(blogs.length / blogsPerPage)
  );
  const blogsSlice = blogs.slice(
    (blogPage - 1) * blogsPerPage,
    blogPage * blogsPerPage
  );

  const recentBookings = payoutSummary?.recentBookings || [];
  const earningsTotalPages = Math.max(
    1,
    Math.ceil(recentBookings.length / earningsPerPage)
  );
  const earningsSlice = recentBookings.slice(
    (earningsPage - 1) * earningsPerPage,
    earningsPage * earningsPerPage
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 text-slate-900 relative top-20">
      <GrainTexture />

      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 lg:py-14 relative z-10">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Welcome back
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mt-1 text-slate-900">
              {profile.name || "Your Practice"}
            </h1>
            <p className="text-sm text-slate-500 mt-2 max-w-md">
              Manage your upcoming sessions, see your earnings, and publish
              helpful content.
            </p>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-3">
            <Card className="px-5 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                <Calendar size={18} />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                  Sessions
                </div>
                <div className="text-base font-semibold">
                  {bookings.length}
                </div>
              </div>
            </Card>
            <Card className="px-5 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center text-sky-500">
                <FileText size={18} />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                  Blogs
                </div>
                <div className="text-base font-semibold">{blogs.length}</div>
              </div>
            </Card>
          </div>
        </div>

        {/* GRID LAYOUT */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* LEFT: Profile panel */}
          <aside className="lg:col-span-4 space-y-6">
            <Card className="p-6 md:p-7 text-center relative">
              <button
                onClick={() => setEditingProfile((s) => !s)}
                className="absolute top-4 right-4 inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/80 hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors w-9 h-9"
              >
                <Edit2 size={16} />
              </button>

              {/* Avatar */}
              <div className="relative w-28 h-28 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full bg-emerald-100 blur-xl" />
                <img
                  src={
                    previewImage ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="Profile"
                  className="relative w-full h-full rounded-full object-cover border-4 border-white shadow-md"
                />
                {editingProfile && (
                  <label className="absolute inset-0 flex items-center justify-center bg-slate-900/40 rounded-full cursor-pointer text-[11px] font-semibold text-white uppercase tracking-[0.16em]">
                    <Camera size={14} className="mr-1" />
                    Edit
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <AnimatePresence mode="wait">
                {editingProfile ? (
                  <motion.form
                    key="edit-form"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    onSubmit={submitProfileUpdate}
                    className="space-y-3"
                  >
                    <input
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                      placeholder="Name"
                    />
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
                      rows={3}
                      placeholder="Bio"
                    />
                    <input
                      name="contactNumber"
                      value={profileData.contactNumber}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                      placeholder="Contact Number"
                    />
                    <div className="flex gap-2 pt-1">
                      <button
                        type="submit"
                        className="flex-1 inline-flex justify-center items-center rounded-xl bg-emerald-500 text-white text-[11px] font-semibold uppercase tracking-[0.16em] py-2 hover:bg-emerald-400 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingProfile(false)}
                        className="flex-1 inline-flex justify-center items-center rounded-xl bg-slate-100 text-slate-700 text-[11px] font-semibold uppercase tracking-[0.16em] py-2 hover:bg-slate-200 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="view-profile"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="space-y-2"
                  >
                    <h2 className="text-xl font-semibold text-slate-900">
                      {profile.name}
                    </h2>
                    {profile.bio && (
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {profile.bio}
                      </p>
                    )}
                    <div className="pt-3 space-y-2 text-xs text-slate-600">
                      {profile.email && (
                        <div className="flex items-center justify-center gap-2">
                          <Mail size={13} />
                          <span>{profile.email}</span>
                        </div>
                      )}
                      {profile.contactNumber && (
                        <div className="flex items-center justify-center gap-2">
                          <Phone size={13} />
                          <span>{profile.contactNumber}</span>
                        </div>
                      )}
                      <div className="text-[11px] text-slate-400 pt-1">
                        Role:{" "}
                        <span className="font-semibold text-slate-700">
                          Counselor
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Quick Stats */}
              {/* <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">
                    {bookings.length}
                  </div>
                  <div className="text-[11px] text-slate-500 uppercase tracking-[0.12em]">
                    Sessions
                  </div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">
                    {blogs.length}
                  </div>
                  <div className="text-[11px] text-slate-500 uppercase tracking-[0.12em]">
                    Blogs
                  </div>
                </div>
              </div> */}
            </Card>
          </aside>

          {/* RIGHT: Main content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Next Session highlight */}
            {nextSession && (
              <Card className="p-4 md:p-5 bg-gradient-to-r from-emerald-50 via-emerald-50/70 to-white border-emerald-100">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.16em] text-emerald-600">
                        Next Session
                      </div>
                      <div className="text-sm text-slate-800 flex flex-wrap items-center gap-2">
                        <span className="font-semibold">
                          {clientName(nextSession)}
                        </span>
                        {nextSession.date && (
                          <>
                            <span className="text-slate-400">•</span>
                            <span>
                              {new Date(
                                nextSession.date
                              ).toLocaleDateString()}{" "}
                              at {nextSession.time}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => nextCanJoin && handleStartSession(nextSession)}
                    disabled={!nextCanJoin}
                    className={`inline-flex items-center gap-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.16em] px-4 py-2
                      ${
                        nextCanJoin
                          ? "bg-emerald-500 text-white hover:bg-emerald-400"
                          : "bg-slate-100 text-slate-400 cursor-not-allowed"
                      }`}
                  >
                    <Video size={14} />
                    {nextCanJoin ? "Join" : "Not ready yet"}
                  </button>
                </div>
              </Card>
            )}

            {/* Tabs */}
            <div className="flex gap-2 border-b border-slate-200 pb-1">
              {[
                { id: "upcoming", label: "Upcoming" },
                { id: "completed", label: "Completed" },
                { id: "earnings", label: "Earnings" },
                { id: "blogs", label: "Blogs" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-t-xl border-b-2 transition-all ${
                    activeTab === tab.id
                      ? "text-emerald-600 border-emerald-500"
                      : "text-slate-500 border-transparent hover:text-slate-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {/* UPCOMING TAB */}
              {activeTab === "upcoming" && (
                <motion.div
                  key="upcoming"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="space-y-4"
                >
                  {upcomingSessions.length === 0 ? (
                    <Card className="p-8 text-center">
                      <Calendar
                        className="mx-auto text-slate-300 mb-4"
                        size={42}
                      />
                      <p className="text-sm text-slate-500">
                        No upcoming sessions yet.
                      </p>
                    </Card>
                  ) : (
                    upcomingSessions.map((b) => {
                      let start = b.startDateTime
                        ? new Date(b.startDateTime)
                        : null;
                      let end = b.endDateTime ? new Date(b.endDateTime) : null;

                      if (!start && b.date && b.time) {
                        const [year, month, day] = b.date.split("-");
                        const [hour, minute] = b.time.split(":");
                        start = new Date(year, month - 1, day, hour, minute);
                      }
                      if (!end && start) {
                        const duration = b.durationMin || 60;
                        end = new Date(
                          start.getTime() + duration * 60 * 1000
                        );
                      }

                      let canJoinNow = false;
                      if (start && end) {
                        const now = new Date();
                        const joinOpensAt = new Date(
                          start.getTime() - PRE_JOIN_MINUTES * 60 * 1000
                        );
                        canJoinNow = now >= joinOpensAt && now <= end;
                      }

                      return (
                        <Card key={b._id} className="p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex gap-3">
                              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                                <User
                                  className="text-slate-600"
                                  size={18}
                                />
                              </div>
                              <div>
                                <h4 className="text-sm font-semibold text-slate-900">
                                  {clientName(b)}
                                </h4>
                                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                                  {b.date && (
                                    <span className="inline-flex items-center gap-1">
                                      <Calendar size={12} />
                                      {new Date(
                                        b.date
                                      ).toLocaleDateString()}
                                    </span>
                                  )}
                                  {b.time && (
                                    <span className="inline-flex items-center gap-1">
                                      <Clock size={12} />
                                      {b.time}
                                    </span>
                                  )}
                                  <span className="inline-flex items-center gap-1">
                                    <span className="w-1 h-1 rounded-full bg-slate-400" />
                                    {b.durationMin || 60} min
                                  </span>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-3">
                                  <Badge
                                    color={
                                      b.status === "paid" ? "green" : "yellow"
                                    }
                                  >
                                    {b.status}
                                  </Badge>
                                  <Badge color="stone">
                                    {b.sessionType || "session"}
                                  </Badge>
                                </div>
                              </div>
                            </div>

                            {b.status === "paid" && (
                              <button
                                onClick={() =>
                                  canJoinNow && handleStartSession(b)
                                }
                                disabled={!canJoinNow}
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.16em]
                                  ${
                                    canJoinNow
                                      ? "bg-emerald-500 text-white hover:bg-emerald-400"
                                      : "bg-slate-100 text-slate-400 cursor-not-allowed"
                                  }`}
                              >
                                {b.sessionType === "chat" ? (
                                  <MessageSquare size={14} />
                                ) : (
                                  <Video size={14} />
                                )}
                                {canJoinNow ? "Join" : "Not ready yet"}
                              </button>
                            )}
                          </div>
                        </Card>
                      );
                    })
                  )}
                </motion.div>
              )}

              {/* COMPLETED TAB */}
              {activeTab === "completed" && (
                <motion.div
                  key="completed"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="space-y-4"
                >
                  {completedSessions.length === 0 ? (
                    <Card className="p-6 text-center">
                      <p className="text-sm text-slate-500">
                        No completed sessions yet.
                      </p>
                    </Card>
                  ) : (
                    <>
                      {completedSlice.map((b) => (
                        <Card key={b._id} className="p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex gap-3">
                              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                                <User
                                  className="text-slate-600"
                                  size={18}
                                />
                              </div>
                              <div>
                                <h4 className="text-sm font-semibold text-slate-900">
                                  {clientName(b)}
                                </h4>
                                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                                  {b.date && (
                                    <span className="inline-flex items-center gap-1">
                                      <Calendar size={12} />
                                      {new Date(
                                        b.date
                                      ).toLocaleDateString()}
                                    </span>
                                  )}
                                  {b.time && (
                                    <span className="inline-flex items-center gap-1">
                                      <Clock size={12} />
                                      {b.time}
                                    </span>
                                  )}
                                </div>
                                <div className="flex flex-wrap gap-2 mt-3">
                                  <Badge color="green">
                                    {b.status === "completed"
                                      ? "completed"
                                      : b.status}
                                  </Badge>
                                  <Badge color="stone">
                                    {b.sessionType || "session"}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                      <div className="flex items-center justify-center gap-3 pt-2 text-xs text-slate-500">
                        <button
                          disabled={completedPage === 1}
                          onClick={() =>
                            setCompletedPage((p) => Math.max(1, p - 1))
                          }
                          className={`px-3 py-1 rounded-full border text-xs ${
                            completedPage === 1
                              ? "border-slate-200 text-slate-300 cursor-not-allowed"
                              : "border-slate-300 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          Prev
                        </button>
                        <span>
                          Page {completedPage} of {completedTotalPages}
                        </span>
                        <button
                          disabled={completedPage === completedTotalPages}
                          onClick={() =>
                            setCompletedPage((p) =>
                              Math.min(completedTotalPages, p + 1)
                            )
                          }
                          className={`px-3 py-1 rounded-full border text-xs ${
                            completedPage === completedTotalPages
                              ? "border-slate-200 text-slate-300 cursor-not-allowed"
                              : "border-slate-300 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          Next
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              )}

              {/* EARNINGS TAB */}
              {activeTab === "earnings" && (
                <motion.div
                  key="earnings"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="space-y-6"
                >
                  {!payoutSummary ? (
                    <Card className="p-8 text-center">
                      <Wallet
                        className="mx-auto text-slate-300 mb-4"
                        size={48}
                      />
                      <p className="text-slate-500">
                        No earnings data available yet.
                      </p>
                    </Card>
                  ) : (
                    <>
                      <div className="grid md:grid-cols-3 gap-4">
                        <Card className="p-4">
                          <div className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">
                            Total Earnings
                          </div>
                          <div className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                            <Wallet
                              size={18}
                              className="text-emerald-600"
                            />
                            {payoutSummary.totalEarnings.toFixed(2)}{" "}
                            {payoutSummary.currency || "LKR"}
                          </div>
                        </Card>
                        <Card className="p-4">
                          <div className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">
                            Paid Out
                          </div>
                          <div className="text-2xl font-bold text-slate-900">
                            {payoutSummary.totalPaidOut.toFixed(2)}{" "}
                            {payoutSummary.currency || "LKR"}
                          </div>
                        </Card>
                        <Card className="p-4">
                          <div className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">
                            Pending Balance
                          </div>
                          <div className="text-2xl font-bold text-emerald-600">
                            {payoutSummary.pendingBalance.toFixed(2)}{" "}
                            {payoutSummary.currency || "LKR"}
                          </div>
                        </Card>
                      </div>

                      <Card className="p-6">
                        <h3 className="font-semibold text-slate-900 mb-4">
                          Recent Paid Sessions
                        </h3>
                        {recentBookings.length === 0 ? (
                          <p className="text-sm text-slate-500">
                            No paid sessions yet.
                          </p>
                        ) : (
                          <>
                            {earningsSlice.map((b) => (
                              <div
                                key={b._id}
                                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg mb-2"
                              >
                                <div>
                                  <div className="font-medium text-slate-900">
                                    {b.clientId?.name || "Client"}
                                  </div>
                                  <div className="text-xs text-slate-500 flex items-center gap-2">
                                    <Calendar size={12} />
                                    <span>
                                      {new Date(
                                        b.date
                                      ).toLocaleDateString()}
                                    </span>
                                    <Clock size={12} />
                                    <span>{b.time}</span>
                                  </div>
                                </div>
                                <div className="text-sm font-semibold text-emerald-600">
                                  {b.paidAmount || b.amount}{" "}
                                  {payoutSummary.currency || "LKR"}
                                </div>
                              </div>
                            ))}
                            <div className="flex items-center justify-center gap-3 pt-2 text-xs text-slate-500">
                              <button
                                disabled={earningsPage === 1}
                                onClick={() =>
                                  setEarningsPage((p) => Math.max(1, p - 1))
                                }
                                className={`px-3 py-1 rounded-full border text-xs ${
                                  earningsPage === 1
                                    ? "border-slate-200 text-slate-300 cursor-not-allowed"
                                    : "border-slate-300 text-slate-600 hover:bg-slate-100"
                                }`}
                              >
                                Prev
                              </button>
                              <span>
                                Page {earningsPage} of {earningsTotalPages}
                              </span>
                              <button
                                disabled={earningsPage === earningsTotalPages}
                                onClick={() =>
                                  setEarningsPage((p) =>
                                    Math.min(earningsTotalPages, p + 1)
                                  )
                                }
                                className={`px-3 py-1 rounded-full border text-xs ${
                                  earningsPage === earningsTotalPages
                                    ? "border-slate-200 text-slate-300 cursor-not-allowed"
                                    : "border-slate-300 text-slate-600 hover:bg-slate-100"
                                }`}
                              >
                                Next
                              </button>
                            </div>
                          </>
                        )}
                      </Card>
                    </>
                  )}
                </motion.div>
              )}

              {/* BLOGS TAB */}
              {activeTab === "blogs" && (
                <motion.div
                  key="blogs"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="space-y-4"
                >
                  <div className="flex justify-between items-center mb-1">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        Your Articles
                      </h3>
                      <p className="text-xs text-slate-500">
                        Share your knowledge with your clients.
                      </p>
                    </div>
                    <button
                      onClick={() => navigate("/blogs/write")}
                      className="px-4 py-2 bg-emerald-500 text-white rounded-full text-[11px] font-semibold uppercase tracking-[0.16em] hover:bg-emerald-400 transition-colors"
                    >
                      Write New Blog
                    </button>
                  </div>

                  {blogs.length === 0 ? (
                    <Card className="p-8 text-center">
                      <FileText
                        className="mx-auto text-slate-300 mb-4"
                        size={48}
                      />
                      <p className="text-slate-500">
                        You haven&apos;t written any blogs yet.
                      </p>
                    </Card>
                  ) : (
                    <>
                      {blogsSlice.map((blog) => (
                        <Card
                          key={blog._id}
                          className="p-6 cursor-pointer"
                          onClick={() => navigate(`/blogs/${blog._id}`)}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h4 className="font-semibold text-slate-900 mb-2">
                                {blog.title}
                              </h4>
                              <p className="text-slate-600 text-sm mb-3 line-clamp-3">
                                {blog.content}
                              </p>
                              <div className="text-xs text-slate-400">
                                {new Date(
                                  blog.createdAt
                                ).toLocaleDateString()}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditBlog(blog._id);
                                }}
                                className="p-2 bg-slate-100 rounded text-slate-600 hover:bg-emerald-500 hover:text-white transition-colors"
                              >
                                <Edit size={14} />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteBlog(blog._id);
                                }}
                                className="p-2 bg-slate-100 rounded text-slate-600 hover:bg-rose-500 hover:text-white transition-colors"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </Card>
                      ))}
                      <div className="flex items-center justify-center gap-3 pt-2 text-xs text-slate-500">
                        <button
                          disabled={blogPage === 1}
                          onClick={() =>
                            setBlogPage((p) => Math.max(1, p - 1))
                          }
                          className={`px-3 py-1 rounded-full border text-xs ${
                            blogPage === 1
                              ? "border-slate-200 text-slate-300 cursor-not-allowed"
                              : "border-slate-300 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          Prev
                        </button>
                        <span>
                          Page {blogPage} of {blogsTotalPages}
                        </span>
                        <button
                          disabled={blogPage === blogsTotalPages}
                          onClick={() =>
                            setBlogPage((p) =>
                              Math.min(blogsTotalPages, p + 1)
                            )
                          }
                          className={`px-3 py-1 rounded-full border text-xs ${
                            blogPage === blogsTotalPages
                              ? "border-slate-200 text-slate-300 cursor-not-allowed"
                              : "border-slate-300 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          Next
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CounselorDashboard;