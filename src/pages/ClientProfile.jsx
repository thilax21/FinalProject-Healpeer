// import React, { useEffect, useState } from "react";
// import API from "../api/api";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast } from "react-hot-toast";
// import { 
//   Edit2, Trash, User, FileText, Calendar, 
//   Phone, Mail, Camera, Video, MessageSquare, 
//   CheckCircle2, Clock, ArrowRight, Sparkles
// } from "lucide-react";

// // --- Visual Components ---
// const GrainTexture = () => (
//   <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
//        style={{ 
//          backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
//          filter: 'contrast(170%) brightness(100%)'
//        }} />
// );

// const Card = ({ children, className = "", onClick }) => (
//   <motion.div 
//     onClick={onClick}
//     layout
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.4 }}
//     className={`bg-white rounded-[2.5rem] border-stone-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden ${className}`}
//   >
//     {children}
//   </motion.div>
// );

// const Badge = ({ children, color = "stone" }) => {
//   const colors = {
//     stone: "bg-stone-100 text-stone-600",
//     green: "bg-[#3f6212]/10 text-[#3f6212]",
//     red: "bg-red-50 text-red-500",
//     yellow: "bg-yellow-50 text-yellow-600"
//   };
//   return (
//     <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${colors[color]}`}>
//       {children}
//     </span>
//   );
// };

// // --- Main Component ---
// const ClientProfile = () => {
//   const navigate = useNavigate();
  
//   // --- State ---
//   const [client, setClient] = useState(null);
//   const [blogs, setBlogs] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [activeBookings, setActiveBookings] = useState([]);
//   const [editingProfile, setEditingProfile] = useState(false);
//   const [profileData, setProfileData] = useState({});
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [activeTab, setActiveTab] = useState("bookings");

//   const clientId = localStorage.getItem("userId");
//   const token = localStorage.getItem("token");
//   const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

//   // --- Data Fetching ---
//   useEffect(() => {
//     if (!clientId) return;

//     const fetchClient = async () => {
//       try {
//         const { data } = await API.get(`/users/${clientId}`, { headers: authHeaders });
//         setClient(data.data);
//         setProfileData({
//           name: data.data.name || "",
//           bio: data.data.bio || "",
//           contactNumber: data.data.contactNumber || "",
//           profileImage: data.data.profileImage || "",
//         });
//         setPreviewImage(data.data.profileImage ? `http://localhost:3000${data.data.profileImage}` : null);
//       } catch (err) {
//         console.error("Failed to fetch profile.");
//       }
//     };
//     fetchClient();
//   }, [clientId]);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!token) return;

//       try {
//         const [blogsRes, bookingsRes] = await Promise.all([
//           API.get("/blogs/my-blogs", { headers: authHeaders }),
//           API.get(`/booking/client/${clientId}`, { headers: authHeaders })
//         ]);
//         setBlogs(blogsRes.data.data || []);
//         setBookings(bookingsRes.data.bookings || []);
//       } catch (err) {
//         console.error("Data fetch error", err);
//       }
//     };
//     fetchData();
//   }, [clientId, token]);

 

//   // --- Event Handlers ---
//   const handleProfileChange = (e) =>
//     setProfileData({ ...profileData, [e.target.name]: e.target.value });

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
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

//       setClient(data.data);
//       setProfileData({ ...profileData, ...data.data });
//       setPreviewImage(data.data.profileImage ? `http://localhost:3000${data.data.profileImage}` : null);
//       setEditingProfile(false);
//       toast.success("Profile updated successfully!");
//     } catch (err) {
//       console.error("Update failed:", err);
//       toast.error("Update failed.");
//     }
//   };

//   const handleDeleteBlog = async (id) => {
//     if (!window.confirm("Delete this journal entry?")) return;
//     try {
//       await API.delete(`/blogs/${id}`, { headers: authHeaders });
//       setBlogs(blogs.filter((b) => b._id !== id));
//       toast.success("Entry deleted");
//     } catch (err) {
//       toast.error("Deletion failed.");
//     }
//   };

//   const handleStartSession = (booking) => {
//     if (booking.sessionType === 'chat') {
//       navigate(`/chat/${booking.chatRoom}`);
//     } else if (booking.sessionType === 'video') {
//       window.open(booking.meetLink, '_blank');
//     }
//   };

//   if (!client) return (
//     <div className="min-h-screen bg-[#f4f2ed] text-[#1c1977] font-sans-serif animate-pulse">Preparing your space...</div>
//   );

//   return (
//     <div className="min-h-screen bg-[#f4f2ed] text-[#1c1977] font-sans relative selection:bg-[#3f6212] selection:text-white">
//       <GrainTexture />
//       <main className="max-w-7xl mx-auto px-6 py-24 lg:py-32 relative z-10">
        
//         <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
//           {/* --- LEFT SIDEBAR (STICKY) --- */}
//           <aside className="lg:col-span-4 lg:sticky lg:top-10 space-y-6">
//             <Card className="p-8 text-center relative">
//               {/* Edit Toggle */}
//               <button 
//                 onClick={() => setEditingProfile(!editingProfile)}
//                 className="absolute top-6 right-6 p-2 rounded-full hover:bg-stone-100 text-stone-400 hover:text-[#1c1977] transition-colors"
//               >
//                 <Edit2 size={16} />
//               </button>

//               {/* Avatar */}
//               <div className="relative w-32 h-32 mx-auto mb-6 group">
//                 <div className="absolute inset-0 rounded-full bg-[#3f6212] opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500"></div>
//                 <img
//                   src={previewImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
//                   alt="Profile"
//                   className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
//                 />
//                 {editingProfile && (
//                   <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer opacity-0 hover:opacity-100 transition-opacity">
//                     <Camera className="text-white" size={20} />
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handleFileChange}
//                       className="hidden"
//                     />
//                   </label>
//                 )}
//               </div>

//               {/* Profile Info */}
//               <AnimatePresence mode="wait">
//                 {editingProfile ? (
//                   <motion.form
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     onSubmit={submitProfileUpdate}
//                     className="space-y-4"
//                   >
//                     <input
//                       type="text"
//                       name="name"
//                       value={profileData.name}
//                       onChange={handleProfileChange}
//                       className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6212]"
//                       placeholder="Name"
//                     />
//                     <textarea
//                       name="bio"
//                       value={profileData.bio}
//                       onChange={handleProfileChange}
//                       className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6212] resize-none"
//                       rows={3}
//                       placeholder="Bio"
//                     />
//                     <input
//                       type="tel"
//                       name="contactNumber"
//                       value={profileData.contactNumber}
//                       onChange={handleProfileChange}
//                       className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6212]"
//                       placeholder="Contact Number"
//                     />
//                     <div className="flex gap-2">
//                       <button
//                         type="submit"
//                         className="flex-1 bg-[#3f6212] text-white py-2 rounded-lg hover:bg-[#2f4a0e] transition-colors"
//                       >
//                         Save
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() => setEditingProfile(false)}
//                         className="flex-1 bg-stone-200 text-stone-700 py-2 rounded-lg hover:bg-stone-300 transition-colors"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </motion.form>
//                 ) : (
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="space-y-4"
//                   >
//                     <h2 className="text-2xl font-bold text-[#1c1977]">{client.name}</h2>
//                     {client.bio && (
//                       <p className="text-stone-600 text-sm leading-relaxed">{client.bio}</p>
//                     )}
//                     <div className="flex flex-col gap-2 text-sm text-stone-500">
//                       {client.email && (
//                         <div className="flex items-center justify-center gap-2">
//                           <Mail size={14} />
//                           <span>{client.email}</span>
//                         </div>
//                       )}
//                       {client.contactNumber && (
//                         <div className="flex items-center justify-center gap-2">
//                           <Phone size={14} />
//                           <span>{client.contactNumber}</span>
//                         </div>
//                       )}
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </Card>

//             {/* Quick Stats */}
//             <Card className="p-6">
//               <h3 className="font-semibold text-[#1c1977] mb-4">Your Journey</h3>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="text-center p-3 bg-stone-50 rounded-lg">
//                   <div className="text-2xl font-bold text-[#3f6212]">{bookings.length}</div>
//                   <div className="text-xs text-stone-500">Total Sessions</div>
//                 </div>
//                 <div className="text-center p-3 bg-stone-50 rounded-lg">
//                   <div className="text-2xl font-bold text-[#3f6212]">{blogs.length}</div>
//                   <div className="text-xs text-stone-500">Journal Entries</div>
//                 </div>
//               </div>
//             </Card>
//           </aside>

//           {/* --- MAIN CONTENT --- */}
//           <div className="lg:col-span-8 space-y-6">
//             {/* Active Sessions */}
//             {activeBookings.length > 0 && (
//               <Card className="p-6">
//                 <h3 className="font-semibold text-[#1c1977] mb-4 flex items-center gap-2">
//                   <Sparkles className="text-[#3f6212]" size={20} />
//                   Active Sessions
//                 </h3>
//                 <div className="space-y-3">
//                   {activeBookings.map((booking) => (
//                     <div key={booking._id} className="flex items-center justify-between p-4 bg-stone-50 rounded-lg">
//                       <div>
//                         <div className="font-medium text-[#1c1977]">{booking.counselorId?.name}</div>
//                         <div className="text-sm text-stone-500">
//                           {booking.sessionType === 'chat' ? 'Chat Session' : 'Video Session'}
//                         </div>
//                       </div>
//                       <button
//                         onClick={() => handleStartSession(booking)}
//                         className="bg-[#3f6212] text-white px-4 py-2 rounded-lg hover:bg-[#2f4a0e] transition-colors flex items-center gap-2"
//                       >
//                         {booking.sessionType === 'chat' ? (
//                           <MessageSquare size={16} />
//                         ) : (
//                           <Video size={16} />
//                         )}
//                         Join
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </Card>
//             )}

//             {/* Tabs */}
//             <div className="flex gap-2 border-b border-stone-200">
//               {["bookings", "blogs"].map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`px-4 py-2 font-medium transition-colors ${
//                     activeTab === tab
//                       ? "text-[#3f6212] border-b-2 border-[#3f6212]"
//                       : "text-stone-500 hover:text-stone-700"
//                   }`}
//                 >
//                   {tab === "bookings" ? "Session History" : "Journal Entries"}
//                 </button>
//               ))}
//             </div>

//             {/* Tab Content */}
//             <AnimatePresence mode="wait">
//               {activeTab === "bookings" ? (
//                 <motion.div
//                   key="bookings"
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   className="space-y-4"
//                 >
//                   {bookings.length === 0 ? (
//                     <Card className="p-8 text-center">
//                       <Calendar className="mx-auto text-stone-300 mb-4" size={48} />
//                       <p className="text-stone-500">No sessions booked yet</p>
//                     </Card>
//                   ) : (
//                     bookings.map((booking) => (
//                       <Card key={booking._id} className="p-6">
//                         <div className="flex items-start justify-between">
//                           <div className="flex-1">
//                             <div className="flex items-center gap-3 mb-2">
//                               <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center">
//                                 <User className="text-stone-600" size={20} />
//                               </div>
//                               <div>
//                                 <h4 className="font-semibold text-[#1c1977]">
//                                   {booking.counselorId?.name || "Counselor"}
//                                 </h4>
//                                 <div className="flex items-center gap-2 text-sm text-stone-500">
//                                   <Calendar size={14} />
//                                   {new Date(booking.date).toLocaleDateString()}
//                                   <Clock size={14} />
//                                   {booking.time}
//                                 </div>
//                               </div>
//                             </div>
//                             <div className="flex gap-2 mt-3">
//                               <Badge color={booking.status === 'completed' ? 'green' : 'yellow'}>
//                                 {booking.status}
//                               </Badge>
//                               <Badge color="stone">
//                                 {booking.sessionType}
//                               </Badge>
//                             </div>
//                           </div>
//                           {booking.status === 'confirmed' && (
//                             <button
//                               onClick={() => handleStartSession(booking)}
//                               className="bg-[#3f6212] text-white px-4 py-2 rounded-lg hover:bg-[#2f4a0e] transition-colors flex items-center gap-2"
//                             >
//                               {booking.sessionType === 'chat' ? (
//                                 <MessageSquare size={16} />
//                               ) : (
//                                 <Video size={16} />
//                               )}
//                               Join
//                             </button>
//                           )}
//                         </div>
//                       </Card>
//                     ))
//                   )}
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   key="blogs"
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   className="space-y-4"
//                 >
//                   {blogs.length === 0 ? (
//                     <Card className="p-8 text-center">
//                       <FileText className="mx-auto text-stone-300 mb-4" size={48} />
//                       <p className="text-stone-500">No journal entries yet</p>
//                     </Card>
//                   ) : (
//                     blogs.map((blog) => (
//                       <Card key={blog._id} className="p-6">
//                         <div className="flex items-start justify-between">
//                           <div className="flex-1">
//                             <h4 className="font-semibold text-[#1c1977] mb-2">{blog.title}</h4>
//                             <p className="text-stone-600 text-sm mb-3 line-clamp-3">{blog.content}</p>
//                             <div className="text-xs text-stone-400">
//                               {new Date(blog.createdAt).toLocaleDateString()}
//                             </div>
//                           </div>
//                           <button
//                             onClick={() => handleDeleteBlog(blog._id)}
//                             className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
//                           >
//                             <Trash size={16} />
//                           </button>
//                         </div>
//                       </Card>
//                     ))
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

// export default ClientProfile;

import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import {
  Edit2, Trash, User, FileText, Calendar,
  Phone, Mail, Camera, Video, MessageSquare,
  Clock, Sparkles
} from "lucide-react";

// --- Visual Components ---
const GrainTexture = () => (
  <div
    className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
    style={{
      backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
      filter: "contrast(170%) brightness(100%)",
    }}
  />
);

const Card = ({ children, className = "", onClick }) => (
  <motion.div
    onClick={onClick}
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35 }}
    className={`bg-white rounded-[1.25rem] border-stone-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden ${className}`}
  >
    {children}
  </motion.div>
);

const Badge = ({ children, color = "stone" }) => {
  const colors = {
    stone: "bg-stone-100 text-stone-600",
    green: "bg-[#ECF6E1] text-[#3f6212]",
    red: "bg-red-50 text-red-500",
    yellow: "bg-yellow-50 text-yellow-600",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${colors[color]}`}>
      {children}
    </span>
  );
};

// --- Main Component ---
const ClientProfile = () => {
  const navigate = useNavigate();

  // --- State ---
  const [client, setClient] = useState(null); // logged-in user (client OR counselor)
  const [blogs, setBlogs] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [activeBookings, setActiveBookings] = useState([]);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [activeTab, setActiveTab] = useState("bookings");

  const clientId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  // --- Fetch logged-in user profile (to get role) ---
  useEffect(() => {
    if (!clientId) return;
    const fetchClient = async () => {
      try {
        const { data } = await API.get(`/users/${clientId}`, { headers: authHeaders });
        setClient(data.data);
        setProfileData({
          name: data.data.name || "",
          bio: data.data.bio || "",
          contactNumber: data.data.contactNumber || "",
          profileImage: data.data.profileImage || "",
        });
        setPreviewImage(data.data.profileImage ? `http://localhost:3000${data.data.profileImage}` : null);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };
    fetchClient();
  }, [clientId, token]);

  // --- Fetch blogs + bookings based on role (client or counselor) ---
  useEffect(() => {
    const fetchData = async () => {
      if (!token || !client) return;

      try {
        // blogs (same for both)
        const blogsPromise = API.get("/blogs/my-blogs", { headers: authHeaders });

        // bookings endpoint depends on role
        const bookingsEndpoint =
          client.role === "counselor"
            ? `/booking/counselor/${clientId}`
            : `/booking/client/${clientId}`;

        const bookingsPromise = API.get(bookingsEndpoint, { headers: authHeaders });

        const [blogsRes, bookingsRes] = await Promise.all([blogsPromise, bookingsPromise]);

        setBlogs(blogsRes?.data?.data || []);
        // support both response shapes: { bookings } or { data: { bookings } }
        setBookings(bookingsRes?.data?.bookings || bookingsRes?.data?.data || []);
      } catch (err) {
        console.error("Data fetch error:", err);
      }
    };
    fetchData();
  }, [client, clientId, token]);

  // --- Active bookings (polling) ---
  // useEffect(() => {
  //   if (!token || !client) return;

  //   const fetchActive = async () => {
  //     try {
  //       // backend may expect same active endpoint for any user id
  //       const { data } = await API.get(`/booking/active/${clientId}`, { headers: authHeaders });
  //       setActiveBookings(data?.bookings || []);
  //     } catch (err) {
  //       console.error("Fetch active bookings error:", err);
  //     }
  //   };

  //   fetchActive();
  //   const interval = setInterval(fetchActive, 5 * 60 * 1000);
  //   return () => clearInterval(interval);
  // }, [client, clientId, token]);

  // --- Handlers ---
  const handleProfileChange = (e) => setProfileData({ ...profileData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setSelectedFile(file);
    if (file) setPreviewImage(URL.createObjectURL(file));
  };

  const submitProfileUpdate = async (e) => {
    e.preventDefault();
    if (!token) return toast.error("You are not authenticated");

    try {
      const formData = new FormData();
      formData.append("name", profileData.name);
      formData.append("bio", profileData.bio);
      formData.append("contactNumber", profileData.contactNumber);
      if (selectedFile) formData.append("profileImage", selectedFile);

      const { data } = await API.put(`/profile/update`, formData, {
        headers: { ...authHeaders, "Content-Type": "multipart/form-data" },
      });

      setClient(data.data);
      setProfileData({ ...profileData, ...data.data });
      setPreviewImage(data.data.profileImage ? `http://localhost:3000${data.data.profileImage}` : null);
      setEditingProfile(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Update failed.");
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm("Delete this journal entry?")) return;
    try {
      await API.delete(`/blogs/${id}`, { headers: authHeaders });
      setBlogs((prev) => prev.filter((b) => b._id !== id));
      toast.success("Entry deleted");
    } catch (err) {
      console.error("Deletion failed:", err);
      toast.error("Deletion failed.");
    }
  };

  const handleStartSession = (booking) => {
    if (booking.sessionType === "chat" && booking.chatRoom) {
      navigate(`/chat/${booking.chatRoom}`);
    } else if (booking.sessionType === "video" && booking.meetLink) {
      window.open(booking.meetLink, "_blank");
    } else {
      toast.error("Session information incomplete.");
    }
  };

  if (!client) {
    return (
      <div className="min-h-screen bg-[#f4f2ed] text-[#1c1977] flex items-center justify-center">
        <div className="animate-pulse">Preparing your space...</div>
      </div>
    );
  }

  // helper for showing opposite party's name/email based on logged-in role
  const otherName = (b) => (client.role === "counselor" ? b?.clientId?.name : b?.counselorId?.name);
  const otherEmail = (b) => (client.role === "counselor" ? b?.clientId?.email : b?.counselorId?.email);

  return (
    <div className="min-h-screen bg-[#f4f2ed] text-[#1c1977] font-sans relative selection:bg-[#3f6212] selection:text-white">
      <GrainTexture />
      <main className="max-w-7xl mx-auto px-6 py-20 lg:py-28 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT */}
          <aside className="lg:col-span-4 lg:sticky lg:top-10 space-y-6">
            <Card className="p-8 text-center relative">
              <button
                onClick={() => setEditingProfile((s) => !s)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-stone-100 text-stone-400 hover:text-[#1c1977] transition-colors"
              >
                <Edit2 size={16} />
              </button>

              <div className="relative w-32 h-32 mx-auto mb-6 group">
                <div className="absolute inset-0 rounded-full bg-[#3f6212] opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500"></div>
                <img
                  src={previewImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                />
                {editingProfile && (
                  <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer opacity-0 hover:opacity-100 transition-opacity">
                    <Camera className="text-white" size={20} />
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
                )}
              </div>

              <AnimatePresence mode="wait">
                {editingProfile ? (
                  <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={submitProfileUpdate} className="space-y-4">
                    <input name="name" value={profileData.name} onChange={handleProfileChange} className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6212]" placeholder="Name" />
                    <textarea name="bio" value={profileData.bio} onChange={handleProfileChange} className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6212] resize-none" rows={3} placeholder="Bio" />
                    <input name="contactNumber" value={profileData.contactNumber} onChange={handleProfileChange} className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6212]" placeholder="Contact Number" />
                    <div className="flex gap-2">
                      <button type="submit" className="flex-1 bg-[#3f6212] text-white py-2 rounded-lg hover:bg-[#2f4a0e]">Save</button>
                      <button type="button" onClick={() => setEditingProfile(false)} className="flex-1 bg-stone-200 text-stone-700 py-2 rounded-lg hover:bg-stone-300">Cancel</button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                    <h2 className="text-2xl font-bold text-[#1c1977]">{client.name}</h2>
                    {client.bio && <p className="text-stone-600 text-sm leading-relaxed">{client.bio}</p>}
                    <div className="flex flex-col gap-2 text-sm text-stone-500">
                      {client.email && <div className="flex items-center justify-center gap-2"><Mail size={14} /><span>{client.email}</span></div>}
                      {client.contactNumber && <div className="flex items-center justify-center gap-2"><Phone size={14} /><span>{client.contactNumber}</span></div>}
                      <div className="text-xs text-stone-400 mt-2">Role: <span className="font-semibold">{client.role}</span></div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-[#1c1977] mb-4">Your Journey</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-stone-50 rounded-lg">
                  <div className="text-2xl font-bold text-[#3f6212]">{bookings.length}</div>
                  <div className="text-xs text-stone-500">Total Sessions</div>
                </div>
                <div className="text-center p-3 bg-stone-50 rounded-lg">
                  <div className="text-2xl font-bold text-[#3f6212]">{blogs.length}</div>
                  <div className="text-xs text-stone-500">Journal Entries</div>
                </div>
              </div>
            </Card>
          </aside>

          {/* MAIN */}
          <div className="lg:col-span-8 space-y-6">
            {activeBookings.length > 0 && (
              <Card className="p-6">
                <h3 className="font-semibold text-[#1c1977] mb-4 flex items-center gap-2">
                  <Sparkles className="text-[#3f6212]" size={20} /> Active Sessions
                </h3>
                <div className="space-y-3">
                  {activeBookings.map((b) => (
                    <div key={b._id} className="flex items-center justify-between p-4 bg-stone-50 rounded-lg">
                      <div>
                        <div className="font-medium text-[#1c1977]">{otherName(b) || "—"}</div>
                        <div className="text-sm text-stone-500">{b.sessionType === "chat" ? "Chat Session" : "Video Session"}</div>
                      </div>
                      <button onClick={() => handleStartSession(b)} className="bg-[#3f6212] text-white px-4 py-2 rounded-lg hover:bg-[#2f4a0e] transition-colors flex items-center gap-2">
                        {b.sessionType === "chat" ? <MessageSquare size={16} /> : <Video size={16} />} Join
                      </button>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Tabs */}
            <div className="flex gap-2 border-b border-stone-200">
              {["bookings", "blogs"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 font-medium transition-colors ${activeTab === tab ? "text-[#3f6212] border-b-2 border-[#3f6212]" : "text-stone-500 hover:text-stone-700"}`}
                >
                  {tab === "bookings" ? "Session History" : "Journal Entries"}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === "bookings" ? (
                <motion.div key="bookings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                  {bookings.length === 0 ? (
                    <Card className="p-8 text-center">
                      <Calendar className="mx-auto text-stone-300 mb-4" size={48} />
                      <p className="text-stone-500">No sessions booked yet</p>
                    </Card>
                  ) : (
                    bookings.map((b) => (
                      <Card key={b._id} className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center">
                                <User className="text-stone-600" size={20} />
                              </div>
                              <div>
                                <h4 className="font-semibold text-[#1c1977]">{otherName(b) || (client.role === "counselor" ? "Client" : "Counselor")}</h4>
                                <div className="flex items-center gap-2 text-sm text-stone-500">
                                  <Calendar size={14} />
                                  <span>{new Date(b.date).toLocaleDateString()}</span>
                                  <Clock size={14} />
                                  <span>{b.time}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2 mt-3">
                              <Badge color={b.status === "completed" ? "green" : "yellow"}>{b.status}</Badge>
                              <Badge color="stone">{b.sessionType}</Badge>
                            </div>
                          </div>

                          {b.status === "confirmed" && (
                            <button onClick={() => handleStartSession(b)} className="bg-[#3f6212] text-white px-4 py-2 rounded-lg hover:bg-[#2f4a0e] transition-colors flex items-center gap-2">
                              {b.sessionType === "chat" ? <MessageSquare size={16} /> : <Video size={16} />} Join
                            </button>
                          )}
                        </div>
                      </Card>
                    ))
                  )}
                </motion.div>
              ) : (
                <motion.div key="blogs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                  {blogs.length === 0 ? (
                    <Card className="p-8 text-center">
                      <FileText className="mx-auto text-stone-300 mb-4" size={48} />
                      <p className="text-stone-500">No journal entries yet</p>
                    </Card>
                  ) : (
                    blogs.map((blog) => (
                      <Card key={blog._id} className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-[#1c1977] mb-2">{blog.title}</h4>
                            <p className="text-stone-600 text-sm mb-3 line-clamp-3">{blog.content}</p>
                            <div className="text-xs text-stone-400">{new Date(blog.createdAt).toLocaleDateString()}</div>
                          </div>
                          <button onClick={() => handleDeleteBlog(blog._id)} className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash size={16} />
                          </button>
                        </div>
                      </Card>
                    ))
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

export default ClientProfile;
