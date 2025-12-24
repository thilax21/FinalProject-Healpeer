

// import React, { useEffect, useState } from "react";
// import API from "../api/api";
// import PaymentButton from "../pages/PaymentButton";
// import {
//   LayoutDashboard,
//   FileText,
//   UserCheck,
//   Users,
//   PieChart,
//   LogOut,
//   Search,
//   Calendar,
//   Check,
//   X,
//   Trash2,
//   Edit,
//   Wallet,
//   ArrowUpRight,
//   ShieldAlert,
//   Mail,
//   Image as ImageIcon,
// } from "lucide-react";

// // --- 🎨 VISUAL COMPONENTS ---

// const GrainTexture = () => (
//   <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] filter contrast-150 brightness-100" />
// );

// const StatCard = ({ title, value, icon: Icon, trend }) => (
//   <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-all group">
//     <div className="flex justify-between items-start mb-4">
//       <div className="w-12 h-12 rounded-xl bg-[#f4f2ed] text-[#3f6212] flex items-center justify-center group-hover:bg-[#3f6212] group-hover:text-white transition-colors">
//         <Icon size={24} />
//       </div>
//       {trend && (
//         <div className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
//           <ArrowUpRight size={12} className="mr-1" /> {trend}%
//         </div>
//       )}
//     </div>
//     <h3 className="text-stone-500 text-xs font-bold uppercase tracking-widest mb-1">
//       {title}
//     </h3>
//     <div className="text-3xl font-serif font-bold text-[#1c1917]">{value}</div>
//   </div>
// );

// const StatusBadge = ({ status }) => {
//   const styles = {
//     Approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
//     Pending: "bg-amber-100 text-amber-700 border-amber-200",
//     Rejected: "bg-rose-100 text-rose-700 border-rose-200",
//   };
//   return (
//     <span
//       className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
//         styles[status] || "bg-stone-100 text-stone-600"
//       }`}
//     >
//       {status}
//     </span>
//   );
// };

// // --- 🏛 MAIN DASHBOARD ---

// const AdminDashboard = () => {
//   // State
//   const [data, setData] = useState({
//     blogs: [],
//     counselors: [],
//     pending: [],
//     clients: [],
//     report: [],
//   });
//   const [stats, setStats] = useState(null);        // payout dashboard stats
//   const [filters, setFilters] = useState({
//     month: new Date().getMonth() + 1,
//     year: new Date().getFullYear(),
//     search: "",
//   });
//   const [activeTab, setActiveTab] = useState("overview");
//   const [loading, setLoading] = useState(false);
//   const token = localStorage.getItem("token");

//   // --- Data Fetching ---
//   const refreshData = async () => {
//     if (!token) return;
//     setLoading(true);
//     try {
//       const headers = { Authorization: `Bearer ${token}` };

//       const [
//         blogsRes,
//         counselorsRes,
//         pendingRes,
//         clientsRes,
//         statsRes,
//         earningsRes,
//       ] = await Promise.all([
//         API.get("/blogs/admin/all", { headers }),
//         API.get("/counselors/all", { headers }),
//         API.get("/counselors/pending", { headers }),
//         API.get("/users/clients", { headers }),
//         API.get("/payout/dashboard-stats", { headers }),
//         API.get("/payout/earnings", { headers }),
//       ]);

//       // Map earnings by counselor id
//       const earningsList = earningsRes.data.counselors || [];
//       const earnMap = new Map(earningsList.map((e) => [e._id, e]));

//       // Merge counselors with earnings
//       const counselorsWithEarnings = (counselorsRes.data.data || []).map(
//         (c) => {
//           const e = earnMap.get(c._id);
//           return {
//             ...c,
//             totalEarnings: e?.totalEarnings || 0,
//             completedSessions: e?.completedSessions || 0,
//             currency: e?.currency || "LKR",
//           };
//         }
//       );

//       setStats(statsRes.data.stats || null);

//       setData((prev) => ({
//         ...prev,
//         blogs: blogsRes.data.data || [],
//         counselors: counselorsWithEarnings,
//         pending: pendingRes.data.data || [],
//         clients: clientsRes.data.data || [],
//       }));
//     } catch (e) {
//       console.error("Admin refreshData error:", e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Financial report: earnings filtered by month/year
//   const fetchReport = async () => {
//     try {
//       if (!token) return;
//       const headers = { Authorization: `Bearer ${token}` };

//       const monthName = new Date(filters.year, filters.month - 1).toLocaleString(
//         "en-US",
//         { month: "long", year: "numeric" }
//       ); // e.g. "November 2025"

//       const res = await API.get(
//         `/payout/earnings?month=${encodeURIComponent(monthName)}`,
//         { headers }
//       );

//       setData((prev) => ({
//         ...prev,
//         report: res.data.success ? res.data.counselors : [],
//       }));
//     } catch (e) {
//       console.error("Admin fetchReport error:", e);
//     }
//   };

//   useEffect(() => {
//     refreshData();
//     fetchReport();   // initial financial report for current month/year
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [token]);

//   // --- Actions ---
//   const handleApprove = async (id) => {
//     await API.put(
//       `/counselors/approve/${id}`,
//       {},
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     refreshData();
//   };

//   const handleReject = async (id) => {
//     await API.put(
//       `/counselors/reject/${id}`,
//       {},
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     refreshData();
//   };

//   const handleDeleteBlog = async (id) => {
//     if (confirm("Delete this blog?")) {
//       await API.delete(`/blogs/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       refreshData();
//     }
//   };

//   const handleUpdateBlog = (id) => {
//     window.location.href = `/update-blog/${id}`;
//   };

//   // --- Navigation Items ---
//   const menuItems = [
//     { id: "overview", icon: LayoutDashboard, label: "Dashboard" },
//     { id: "pending", icon: UserCheck, label: "Approvals", badge: data.pending.length },
//     { id: "counselors", icon: ShieldAlert, label: "Counselors" },
//     { id: "clients", icon: Users, label: "Clients" },
//     { id: "blogs", icon: FileText, label: "Content" },
//     { id: "report", icon: PieChart, label: "Financials" },
//   ];

//   return (
//     <div className="flex h-screen bg-[#f4f2ed] font-sans text-[#1c1917] overflow-hidden selection:bg-[#3f6212] selection:text-white">
//       <GrainTexture />

//       {/* 1. BLACK SIDEBAR */}
//       <aside className="w-64 bg-[#1c1917] text-[#f2f0e9] flex flex-col fixed h-full z-20 shadow-2xl border-r border-stone-800">
//         {/* Sidebar Header */}
//         <div className="p-8 flex items-center gap-3 border-b border-white/5">
//           <div className="w-10 h-10 bg-[#3f6212] rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
//             H
//           </div>
//           <div>
//             <h1 className="font-serif font-bold text-xl tracking-tight text-white">
//               HealPeer<span className="text-[#3f6212]">.</span>
//             </h1>
//             <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500">
//               Admin Portal
//             </p>
//           </div>
//         </div>

//         {/* Navigation Links */}
//         <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
//           {menuItems.map((item) => (
//             <button
//               key={item.id}
//               onClick={() => setActiveTab(item.id)}
//               className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
//                 activeTab === item.id
//                   ? "bg-[#3f6212] text-white shadow-lg"
//                   : "text-stone-400 hover:bg-white/10 hover:text-white"
//               }`}
//             >
//               <div className="flex items-center gap-3">
//                 <item.icon size={18} />
//                 {item.label}
//               </div>
//               {item.badge > 0 && (
//                 <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
//                   {item.badge}
//                 </span>
//               )}
//             </button>
//           ))}
//         </nav>

//         {/* Sidebar Footer */}
//         <div className="p-6 border-t border-white/10">
//           <button className="w-full flex items-center justify-center gap-2 text-red-400 bg-white/5 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-red-900/30 transition-colors">
//             <LogOut size={14} /> Sign Out
//           </button>
//         </div>
//       </aside>

//       {/* 2. MAIN CONTENT */}
//       <main className="flex-1 ml-64 flex flex-col h-full overflow-hidden bg-[#f8fafc] relative z-10 top-30">
//         {/* Header */}
//         <header className="h-20 bg-white border-b border-stone-200 flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
//           <div>
//             <h2 className="text-2xl font-serif font-bold capitalize text-[#1c1917]">
//               {activeTab}
//             </h2>
//             <p className="text-xs text-stone-500">Welcome back, Admin.</p>
//           </div>
//           <div className="flex items-center gap-4">
//             <div className="relative">
//               <Search
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
//                 size={16}
//               />
//               <input
//                 type="text"
//                 placeholder="Search database..."
//                 className="pl-10 pr-4 py-2 bg-[#f4f2ed] border-none rounded-lg text-sm focus:ring-2 focus:ring-[#3f6212] w-64 text-[#1c1917] outline-none placeholder:text-stone-400"
//                 value={filters.search}
//                 onChange={(e) =>
//                   setFilters((prev) => ({ ...prev, search: e.target.value }))
//                 }
//               />
//             </div>
//             <div className="w-10 h-10 bg-[#1c1917] rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
//               AD
//             </div>
//           </div>
//         </header>

//         {/* Content Scroll Area */}
//         <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
//           {/* VIEW: OVERVIEW */}
//           {activeTab === "overview" && (
//             <div className="space-y-8">
//               {/* Stats Grid */}
//               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
//                 <StatCard
//                   title="Total Revenue"
//                   value={`LKR ${stats?.totalRevenue?.toFixed(0) || 0}`}
//                   icon={Wallet}
//                 />
//                 <StatCard
//                   title="Platform Profit"
//                   value={`LKR ${stats?.platformRevenue?.toFixed(0) || 0}`}
//                   icon={PieChart}
//                 />
//                 <StatCard
//                   title="Paid Bookings"
//                   value={stats?.paidBookings || 0}
//                   icon={Check}
//                 />
//                 <StatCard
//                   title="Active Counselors"
//                   value={stats?.activeCounselors || 0}
//                   icon={ShieldAlert}
//                 />
//               </div>

//               {/* Recent Pending List */}
//               <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col">
//                 <div className="flex justify-between items-center mb-6">
//                   <h3 className="font-serif font-bold text-lg text-[#1c1917]">
//                     Recent Requests
//                   </h3>
//                   <button
//                     onClick={() => setActiveTab("pending")}
//                     className="text-[#3f6212] text-xs font-bold uppercase hover:underline"
//                   >
//                     View All Requests
//                   </button>
//                 </div>

//                 <div className="space-y-4">
//                   {data.pending.length === 0 ? (
//                     <div className="text-center text-stone-400 py-10">
//                       No pending items.
//                     </div>
//                   ) : (
//                     data.pending.slice(0, 5).map((p) => (
//                       <div
//                         key={p._id}
//                         className="flex items-center justify-between p-4 bg-[#f9f8f6] rounded-xl border border-stone-100 hover:border-stone-300 transition-colors"
//                       >
//                         <div className="flex items-center gap-4">
//                           <div className="w-10 h-10 bg-stone-200 rounded-full flex items-center justify-center text-stone-500 font-bold">
//                             {p.name[0]}
//                           </div>
//                           <div>
//                             <div className="font-bold text-sm text-[#1c1917]">
//                               {p.name}
//                             </div>
//                             <div className="text-xs text-stone-500">
//                               {p.specialization} • {p.experience} years
//                             </div>
//                           </div>
//                         </div>
//                         <button
//                           onClick={() => setActiveTab("pending")}
//                           className="bg-white border border-stone-200 px-4 py-2 rounded-lg text-xs font-bold hover:bg-stone-50 transition-colors"
//                         >
//                           Review
//                         </button>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* VIEW: PENDING */}
//           {activeTab === "pending" && (
//             <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
//               <table className="w-full text-left text-sm">
//                 <thead className="bg-[#f9f8f6] text-stone-500 font-bold border-b border-stone-200">
//                   <tr>
//                     <th className="px-6 py-4">Applicant</th>
//                     <th className="px-6 py-4">Email</th>
//                     <th className="px-6 py-4">Expertise</th>
//                     <th className="px-6 py-4 text-right">Decision</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-stone-100">
//                   {data.pending.map((p) => (
//                     <tr key={p._id} className="hover:bg-[#f9f8f6]">
//                       <td className="px-6 py-4 font-medium text-[#1c1917]">
//                         {p.name}
//                       </td>
//                       <td className="px-6 py-4 text-stone-500">
//                         {p.email}
//                       </td>
//                       <td className="px-6 py-4">
//                         <span className="bg-stone-100 text-stone-600 px-2 py-1 rounded text-xs font-bold">
//                           {p.specialization}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-right space-x-2">
//                         <button
//                           onClick={() => handleReject(p._id)}
//                           className="px-3 py-1.5 border border-stone-300 rounded text-xs font-bold text-stone-600 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200"
//                         >
//                           Reject
//                         </button>
//                         <button
//                           onClick={() => handleApprove(p._id)}
//                           className="px-3 py-1.5 bg-[#3f6212] text-white rounded text-xs font-bold hover:bg-[#2f4b0d] shadow-sm"
//                         >
//                           Approve
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                   {data.pending.length === 0 && (
//                     <tr>
//                       <td
//                         colSpan="4"
//                         className="p-12 text-center text-stone-400 italic"
//                       >
//                         No pending requests.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* VIEW: CLIENTS */}
//           {activeTab === "clients" && (
//             <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
//               <div className="p-6 border-b border-stone-100 bg-[#f9f8f6]">
//                 <h2 className="font-bold text-lg text-[#1c1917] flex items-center gap-2">
//                   <Users size={20} className="text-[#3f6212]" />
//                   Registered Client Base
//                 </h2>
//               </div>
//               <table className="w-full text-left text-sm">
//                 <thead className="bg-white text-stone-500 font-bold border-b border-stone-200">
//                   <tr>
//                     <th className="px-6 py-4">Client Profile</th>
//                     <th className="px-6 py-4">Email Address</th>
//                     <th className="px-6 py-4 text-right">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-stone-100">
//                   {data.clients.length === 0 ? (
//                     <tr>
//                       <td
//                         colSpan="3"
//                         className="p-12 text-center text-stone-400 italic"
//                       >
//                         No clients found.
//                       </td>
//                     </tr>
//                   ) : (
//                     data.clients.map((c) => (
//                       <tr
//                         key={c._id}
//                         className="hover:bg-[#f9f8f6] transition-colors"
//                       >
//                         <td className="px-6 py-4 font-medium text-[#1c1917]">
//                           <div className="flex items-center gap-3">
//                             <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
//                               {c.name.charAt(0).toUpperCase()}
//                             </div>
//                             {c.name}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 text-stone-600">
//                           <div className="flex items-center gap-2">
//                             <Mail size={14} className="text-stone-400" />
//                             {c.email}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 text-right">
//                           <button className="text-xs font-bold text-[#3f6212] hover:underline">
//                             View Profile
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* VIEW: COUNSELORS */}
//           {activeTab === "counselors" && (
//             <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
//               <table className="w-full text-left text-sm">
//                 <thead className="bg-[#f9f8f6] text-stone-500 font-bold border-b border-stone-200">
//                   <tr>
//                     <th className="px-6 py-4">Name</th>
//                     <th className="px-6 py-4">Specialization</th>
//                     <th className="px-6 py-4">Status</th>
//                     <th className="px-6 py-4">Total Earned</th>
//                     <th className="px-6 py-4 text-right">Payout</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-stone-100">
//                   {data.counselors.map((c) => (
//                     <tr key={c._id} className="hover:bg-[#f9f8f6]">
//                       <td className="px-6 py-4 font-medium text-[#1c1917] flex items-center gap-3">
//                         <div className="w-8 h-8 rounded-full bg-[#3f6212]/10 text-[#3f6212] flex items-center justify-center font-bold text-xs">
//                           {c.name[0]}
//                         </div>
//                         {c.name}
//                       </td>
//                       <td className="px-6 py-4 text-stone-500">
//                         {c.specialization}
//                       </td>
//                       <td className="px-6 py-4">
//                         <StatusBadge
//                           status={c.isApproved ? "Approved" : "Pending"}
//                         />
//                       </td>
//                       <td className="px-6 py-4 font-mono font-bold text-[#1c1917]">
//                         {c.totalEarnings?.toFixed(2) || 0}{" "}
//                         {c.currency || "LKR"}
//                       </td>
//                       <td className="px-6 py-4 text-right">
//                         <PaymentButton
//                           amount={c.totalEarnings || 0}
//                           counselorId={c._id}
//                           counselorName={c.name}
//                           type="admin"
//                         />
//                       </td>
//                     </tr>
//                   ))}
//                   {data.counselors.length === 0 && (
//                     <tr>
//                       <td
//                         colSpan="5"
//                         className="p-12 text-center text-stone-400 italic"
//                       >
//                         No counselors found.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* VIEW: BLOGS (With Images) */}
//           {activeTab === "blogs" && (
//             <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
//               <table className="w-full text-left text-sm">
//                 <thead className="bg-[#f9f8f6] text-stone-500 font-bold border-b border-stone-200">
//                   <tr>
//                     <th className="px-6 py-4">Article</th>
//                     <th className="px-6 py-4">Author</th>
//                     <th className="px-6 py-4">Date</th>
//                     <th className="px-6 py-4 text-right">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-stone-100">
//                   {data.blogs.map((b) => (
//                     <tr key={b._id} className="hover:bg-[#f9f8f6]">
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-4">
//                           {/* Optional image rendering */}
//                           {/* <div className="w-16 h-12 bg-stone-200 rounded-lg overflow-hidden shrink-0 border border-stone-100">
//                             {b.image || b.imageUrl ? (
//                               <img
//                                 src={b.imageUrl || `http://localhost:3000/uploads/${b.image}`}
//                                 alt=""
//                                 className="w-full h-full object-cover"
//                               />
//                             ) : (
//                               <div className="w-full h-full flex items-center justify-center text-stone-400">
//                                 <ImageIcon size={16} />
//                               </div>
//                             )}
//                           </div> */}
//                           <div className="max-w-xs">
//                             <p className="font-bold text-[#1c1917] line-clamp-1">
//                               {b.title}
//                             </p>
//                             <p className="text-xs text-stone-500 line-clamp-1">
//                               {b.content}
//                             </p>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 text-stone-600">
//                         {b.author?.name || "Unknown"}
//                       </td>
//                       <td className="px-6 py-4 text-stone-400 text-xs">
//                         {new Date(b.createdAt).toLocaleDateString()}
//                       </td>
//                       <td className="px-6 py-4 text-right flex justify-end gap-2 items-center h-full">
//                         <button
//                           onClick={() => handleUpdateBlog(b._id)}
//                           className="p-2 bg-stone-100 rounded text-stone-600 hover:bg-[#3f6212] hover:text-white"
//                         >
//                           <Edit size={14} />
//                         </button>
//                         <button
//                           onClick={() => handleDeleteBlog(b._id)}
//                           className="p-2 bg-stone-100 rounded text-stone-600 hover:bg-rose-600 hover:text-white"
//                         >
//                           <Trash2 size={14} />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                   {data.blogs.length === 0 && (
//                     <tr>
//                       <td
//                         colSpan="4"
//                         className="p-12 text-center text-stone-400 italic"
//                       >
//                         No articles found.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* VIEW: FINANCIAL REPORT */}
//           {activeTab === "report" && (
//             <div className="space-y-6">
//               <div className="bg-white p-4 rounded-xl border border-stone-200 flex items-center gap-4 shadow-sm">
//                 <div className="flex items-center gap-2 bg-[#f4f2ed] px-4 py-2 rounded-lg border border-stone-100">
//                   <Calendar size={16} className="text-stone-400" />
//                   <select
//                     value={filters.month}
//                     onChange={(e) =>
//                       setFilters((prev) => ({
//                         ...prev,
//                         month: Number(e.target.value),
//                       }))
//                     }
//                     className="bg-transparent text-sm font-bold text-stone-700 outline-none cursor-pointer"
//                   >
//                     {Array.from({ length: 12 }, (_, i) => (
//                       <option key={i} value={i + 1}>
//                         {new Date(0, i).toLocaleString("default", {
//                           month: "long",
//                         })}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <input
//                   type="number"
//                   value={filters.year}
//                   onChange={(e) =>
//                     setFilters((prev) => ({
//                       ...prev,
//                       year: Number(e.target.value),
//                     }))
//                   }
//                   className="w-24 bg-[#f4f2ed] px-4 py-2 rounded-lg border border-stone-100 text-sm font-bold outline-none"
//                 />
//                 <button
//                   onClick={fetchReport}
//                   className="ml-auto bg-[#1c1917] text-white px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-[#3f6212] transition-colors"
//                 >
//                   Generate Report
//                 </button>
//               </div>

//               <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
//                 <table className="w-full text-left text-sm">
//                   <thead className="bg-[#f9f8f6] text-stone-500 font-bold border-b border-stone-200">
//                     <tr>
//                       <th className="px-6 py-4">Beneficiary</th>
//                       <th className="px-6 py-4">Sessions</th>
//                       <th className="px-6 py-4">Total Earnings</th>
//                       <th className="px-6 py-4 text-right">Payout</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-stone-100">
//                     {data.report.map((item) => (
//                       <tr key={item._id} className="hover:bg-[#f9f8f6]">
//                         <td className="px-6 py-4 font-medium text-[#1c1917]">
//                           {item.name}
//                         </td>
//                         <td className="px-6 py-4 text-stone-600">
//                           {item.completedSessions} Sessions
//                         </td>
//                         <td className="px-6 py-4 font-bold text-emerald-600 font-mono">
//                           {item.totalEarnings.toFixed(2)}{" "}
//                           {item.currency || "LKR"}
//                         </td>
//                         <td className="px-6 py-4 text-right">
//                           <PaymentButton
//                             amount={item.totalEarnings}
//                             counselorId={item._id}
//                             counselorName={item.name}
//                             type="admin"
//                           />
//                         </td>
//                       </tr>
//                     ))}
//                     {data.report.length === 0 && (
//                       <tr>
//                         <td
//                           colSpan="4"
//                           className="p-12 text-center text-stone-400 italic"
//                         >
//                           No data found.
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;


// import React, { useEffect, useState } from "react";
// import API from "../api/api";
// import PaymentButton from "../pages/PaymentButton";
// import { useNavigate } from "react-router-dom";
// import {
//   LayoutDashboard,
//   FileText,
//   UserCheck,
//   Users,
//   PieChart,
//   LogOut,
//   Search,
//   Calendar,
//   Check,
//   Trash2,
//   Edit,
//   Wallet,
//   ArrowUpRight,
//   ShieldAlert,
//   Mail,
// } from "lucide-react";
// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   CartesianGrid,
// } from "recharts";

// // --- 🎨 VISUAL COMPONENTS ---
// const navigate = useNavigate();
// const GrainTexture = () => (
//   <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] filter contrast-150 brightness-100" />
// );

// const StatCard = ({ title, value, icon: Icon, trend }) => (
//   <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-all group">
//     <div className="flex justify-between items-start mb-4">
//       <div className="w-12 h-12 rounded-xl bg-[#f4f2ed] text-[#3f6212] flex items-center justify-center group-hover:bg-[#3f6212] group-hover:text-white transition-colors">
//         <Icon size={24} />
//       </div>
//       {trend && (
//         <div className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
//           <ArrowUpRight size={12} className="mr-1" /> {trend}%
//         </div>
//       )}
//     </div>
//     <h3 className="text-stone-500 text-xs font-bold uppercase tracking-widest mb-1">
//       {title}
//     </h3>
//     <div className="text-3xl font-serif font-bold text-[#1c1917]">{value}</div>
//   </div>
// );

// const StatusBadge = ({ status }) => {
//   const styles = {
//     Approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
//     Pending: "bg-amber-100 text-amber-700 border-amber-200",
//     Rejected: "bg-rose-100 text-rose-700 border-rose-200",
//     paid: "bg-emerald-100 text-emerald-700 border-emerald-200",
//     pending: "bg-amber-100 text-amber-700 border-amber-200",
//   };
//   return (
//     <span
//       className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
//         styles[status] || "bg-stone-100 text-stone-600"
//       }`}
//     >
//       {status}
//     </span>
//   );
// };

// // --- 📈 MONTHLY REVENUE CHART ---

// const MonthlyRevenueChart = ({ monthlySummary }) => {
//   if (!monthlySummary) return null;

//   const data = Object.entries(monthlySummary).map(([month, v]) => ({
//     month,
//     revenue: v.revenue || 0,
//     payouts: v.payouts || 0,
//     profit: v.platformRevenue || 0,
//   }));

//   if (!data.length) return null;

//   return (
//     <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
//       <h3 className="font-serif font-bold text-lg text-[#1c1917] mb-4">
//         Financial Growth
//       </h3>
//       <div className="h-64">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={data}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//             <XAxis dataKey="month" tick={{ fontSize: 10 }} />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line
//               type="monotone"
//               dataKey="revenue"
//               stroke="#3b82f6"
//               name="Revenue"
//             />
//             <Line
//               type="monotone"
//               dataKey="payouts"
//               stroke="#ef4444"
//               name="Payouts"
//             />
//             <Line
//               type="monotone"
//               dataKey="profit"
//               stroke="#22c55e"
//               name="Profit"
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//   if (totalPages <= 1) return null;
//   const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

//   return (
//     <div className="flex items-center justify-end gap-2 mt-4 px-6 pb-4">
//       <button
//         onClick={() => onPageChange(Math.max(1, currentPage - 1))}
//         disabled={currentPage === 1}
//         className="px-3 py-1 text-xs border rounded disabled:opacity-50"
//       >
//         Prev
//       </button>
//       {pages.map((p) => (
//         <button
//           key={p}
//           onClick={() => onPageChange(p)}
//           className={`px-3 py-1 text-xs border rounded ${
//             p === currentPage
//               ? "bg-[#1c1917] text-white border-[#1c1917]"
//               : "bg-white text-stone-600"
//           }`}
//         >
//           {p}
//         </button>
//       ))}
//       <button
//         onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
//         disabled={currentPage === totalPages}
//         className="px-3 py-1 text-xs border rounded disabled:opacity-50"
//       >
//         Next
//       </button>
//     </div>
//   );
// };
// // --- 🏛 MAIN DASHBOARD ---

// const AdminDashboard = () => {
//   // State
//   const navigate = useNavigate();
//    const [data, setData] = useState({
//     blogs: [],
//     counselors: [],
//     pending: [],
//     clients: [],
//     report: [],
//     bookings: [],
//   });
//   const [stats, setStats] = useState(null);
//   const [filters, setFilters] = useState({
//     month: new Date().getMonth() + 1,
//     year: new Date().getFullYear(),
//     search: "",
//   });
//   const [activeTab, setActiveTab] = useState("overview");
//   const [loading, setLoading] = useState(false);
//   const token = localStorage.getItem("token");
//   const [bookingPage, setBookingPage] = useState(1);
//   const bookingsPerPage = 10;
//    // NEW for counselors, clients, blogs:
// const [counselorPage, setCounselorPage] = useState(1);
// const counselorsPerPage = 10;

// const [clientPage, setClientPage] = useState(1);
// const clientsPerPage = 10;

// const [blogPage, setBlogPage] = useState(1);
// const blogsPerPage = 10;

// const [selectedYear, setSelectedYear] = useState(
//   new Date().getFullYear()
// );
// const [yearlyStats, setYearlyStats] = useState(null);

// useEffect(() => {
//   setBookingPage(1);
// }, [data.bookings.length]);

// useEffect(() => {
//   setCounselorPage(1);
// }, [data.counselors.length]);

// useEffect(() => {
//   setClientPage(1);
// }, [data.clients.length]);

// useEffect(() => {
//   setBlogPage(1);
// }, [data.blogs.length]); 

// const totalBookingPages = Math.ceil(
//   (data.bookings?.length || 0) / bookingsPerPage
// );

// const paginatedBookings = (data.bookings || []).slice(
//   (bookingPage - 1) * bookingsPerPage,
//   bookingPage * bookingsPerPage
// );

// // Counselors
// const totalCounselorPages = Math.ceil(
//   (data.counselors?.length || 0) / counselorsPerPage
// );
// const paginatedCounselors = (data.counselors || []).slice(
//   (counselorPage - 1) * counselorsPerPage,
//   counselorPage * counselorsPerPage
// );

// // Clients
// const totalClientPages = Math.ceil(
//   (data.clients?.length || 0) / clientsPerPage
// );
// const paginatedClients = (data.clients || []).slice(
//   (clientPage - 1) * clientsPerPage,
//   clientPage * clientsPerPage
// );

// // Blogs
// const totalBlogPages = Math.ceil(
//   (data.blogs?.length || 0) / blogsPerPage
// );
// const paginatedBlogs = (data.blogs || []).slice(
//   (blogPage - 1) * blogsPerPage,
//   blogPage * blogsPerPage
// );

// // fetch yearly status
// const fetchYearlyStats = async (year) => {
//   try {
//     if (!token) return;
//     const headers = { Authorization: `Bearer ${token}` };
//     const { data } = await API.get(`/payout/yearly-stats?year=${year}`, {
//       headers,
//     });
//     if (data.success) {
//       setYearlyStats(data.stats);
//     }
//   } catch (err) {
//     console.error("Error fetching yearly stats:", err);
//   }
// };
//   // --- Data Fetching ---
//   const refreshData = async () => {
//     if (!token) return;
//     setLoading(true);
//     try {
//       const headers = { Authorization: `Bearer ${token}` };

//       const [
//         blogsRes,
//         counselorsRes,
//         pendingRes,
//         clientsRes,
//         statsRes,
//         earningsRes,
//         bookingsRes,
//       ] = await Promise.all([
//         API.get("/blogs/admin/all", { headers }),
//         API.get("/counselors/all", { headers }),
//         API.get("/counselors/pending", { headers }),
//         API.get("/users/clients", { headers }),
//         API.get("/payout/dashboard-stats", { headers }),
//         API.get("/payout/earnings", { headers }),
//         API.get("/booking", { headers }), // all bookings
//       ]);

//       // Map earnings by counselor id
//       const earningsList = earningsRes.data.counselors || [];
//       const earnMap = new Map(earningsList.map((e) => [e._id, e]));

//       // Merge counselors with earnings
//       const counselorsWithEarnings = (counselorsRes.data.data || []).map(
//         (c) => {
//           const e = earnMap.get(c._id);
//           return {
//             ...c,
//             totalEarnings: e?.totalEarnings || 0,
//             completedSessions: e?.completedSessions || 0,
//             currency: e?.currency || "LKR",
//           };
//         }
//       );

//       setStats(statsRes.data.stats || null);

//       setData((prev) => ({
//         ...prev,
//         blogs: blogsRes.data.data || [],
//         counselors: counselorsWithEarnings,
//         pending: pendingRes.data.data || [],
//         clients: clientsRes.data.data || [],
//         bookings: bookingsRes.data.bookings || [],
//       }));
//     } catch (e) {
//       console.error("Admin refreshData error:", e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Financial report: earnings filtered by month/year
//   const fetchReport = async () => {
//     try {
//       if (!token) return;
//       const headers = { Authorization: `Bearer ${token}` };
  
//       const monthName = new Date(
//         filters.year,
//         filters.month - 1
//       ).toLocaleString("en-US", { month: "long", year: "numeric" }); // e.g. "November 2025"
  
//       // Get earnings for that month + full payout history
//       const [earningsRes, historyRes] = await Promise.all([
//         API.get(`/payout/earnings?month=${encodeURIComponent(monthName)}`, {
//           headers,
//         }),
//         API.get("/payout/history", { headers }),
//       ]);
  
//       const counselors =
//         earningsRes.data.success && earningsRes.data.counselors
//           ? earningsRes.data.counselors
//           : [];
  
//       const history =
//         historyRes.data.success && historyRes.data.payments
//           ? historyRes.data.payments
//           : [];
  
//       // Filter payout history for the selected month
//       const monthHistory = history.filter((p) => p.month === monthName);
  
//       // Mark each counselor with isPaid for this month
//       const report = counselors.map((c) => {
//         const hasPayout = monthHistory.some(
//           (p) =>
//             // p.counselor is populated { _id, name, email }
//             p.counselor &&
//             (p.counselor._id === c._id || p.counselor._id?.toString() === c._id)
//         );
//         return {
//           ...c,
//           isPaid: hasPayout,
//         };
//       });
  
//       setData((prev) => ({
//         ...prev,
//         report,
//       }));
//     } catch (e) {
//       console.error("Admin fetchReport error:", e);
//     }
//   };



//   useEffect(() => {
//     refreshData();
//     fetchReport();
//     fetchYearlyStats(selectedYear);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [token,selectedYear]);

//   // --- Actions ---
//   const handleApprove = async (id) => {
//     await API.put(
//       `/counselors/approve/${id}`,
//       {},
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     refreshData();
//   };

//   const handleReject = async (id) => {
//     await API.put(
//       `/counselors/reject/${id}`,
//       {},
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     refreshData();
//   };

//   const handleDeleteBlog = async (id) => {
//     if (confirm("Delete this blog?")) {
//       await API.delete(`/blogs/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       refreshData();
//     }
//   };

//   const handleUpdateBlog = (id) => {
//     window.location.href = `/update-blog/${id}`;
//   };

//   // --- Navigation Items ---
//   const menuItems = [
//     { id: "overview", icon: LayoutDashboard, label: "Dashboard" },
//     { id: "pending", icon: UserCheck, label: "Approvals", badge: data.pending.length },
//     { id: "bookings", icon: Calendar, label: "Bookings" },
//     { id: "counselors", icon: ShieldAlert, label: "Counselors" },
//     { id: "clients", icon: Users, label: "Clients" },
//     { id: "blogs", icon: FileText, label: "Content" },
//     { id: "report", icon: PieChart, label: "Financials" },
//   ];

//   return (
//     <div className="flex h-screen bg-[#f4f2ed] font-sans text-[#1c1917] overflow-hidden selection:bg-[#3f6212] selection:text-white">
//       <GrainTexture />

//       {/* 1. BLACK SIDEBAR */}
//       <aside className="w-64 bg-[#1c1917] text-[#f2f0e9] flex flex-col fixed h-full z-20 shadow-2xl border-r border-stone-800">
//         {/* Sidebar Header */}
//         <div className="p-8 flex items-center gap-3 border-b border-white/5">
//           <div className="w-10 h-10 bg-[#3f6212] rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
//             H
//           </div>
//           <div>
//             <h1 className="font-serif font-bold text-xl tracking-tight text-white">
//               HealPeer<span className="text-[#3f6212]">.</span>
//             </h1>
//             <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500">
//               Admin Portal
//             </p>
//           </div>
//         </div>

//         {/* Navigation Links */}
//         <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
//           {menuItems.map((item) => (
//             <button
//               key={item.id}
//               onClick={() => setActiveTab(item.id)}
//               className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
//                 activeTab === item.id
//                   ? "bg-[#3f6212] text-white shadow-lg"
//                   : "text-stone-400 hover:bg-white/10 hover:text-white"
//               }`}
//             >
//               <div className="flex items-center gap-3">
//                 <item.icon size={18} />
//                 {item.label}
//               </div>
//               {item.badge > 0 && (
//                 <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
//                   {item.badge}
//                 </span>
//               )}
//             </button>
//           ))}
//         </nav>

//         {/* Sidebar Footer */}
//         <div className="p-6 border-t border-white/10">
//           <button className="w-full flex items-center justify-center gap-2 text-red-400 bg-white/5 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-red-900/30 transition-colors">
//             <LogOut size={14} /> Sign Out
//           </button>
//         </div>
//       </aside>

//       {/* 2. MAIN CONTENT */}
//       <main className="flex-1 ml-64 flex flex-col h-full overflow-hidden bg-[#f8fafc] relative z-10 top-30">
//         {/* Header */}
//         <header className="h-20 bg-white border-b border-stone-200 flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
//           <div>
//             <h2 className="text-2xl font-serif font-bold capitalize text-[#1c1917]">
//               {activeTab}
//             </h2>
//             <p className="text-xs text-stone-500">Welcome back, Admin.</p>
//           </div>
//           <div className="flex items-center gap-4">
//             <div className="relative">
//               <Search
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
//                 size={16}
//               />
//               <input
//                 type="text"
//                 placeholder="Search database..."
//                 className="pl-10 pr-4 py-2 bg-[#f4f2ed] border-none rounded-lg text-sm focus:ring-2 focus:ring-[#3f6212] w-64 text-[#1c1917] outline-none placeholder:text-stone-400"
//                 value={filters.search}
//                 onChange={(e) =>
//                   setFilters((prev) => ({ ...prev, search: e.target.value }))
//                 }
//               />
//             </div>
//             <div className="w-10 h-10 bg-[#1c1917] rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
//               AD
//             </div>
//           </div>
//         </header>

//         {/* Content Scroll Area */}
//         <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
//           {/* VIEW: OVERVIEW */}
//           {activeTab === "overview" && (
//             <div className="space-y-8">
//               {/* Stats Grid */}
//               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
//                 <StatCard
//                   title="Total Revenue"
//                   value={`LKR ${stats?.totalRevenue?.toFixed(0) || 0}`}
//                   icon={Wallet}
//                 />
//                 <StatCard
//                   title="Platform Profit"
//                   value={`LKR ${stats?.platformRevenue?.toFixed(0) || 0}`}
//                   icon={PieChart}
//                 />
//                 <StatCard
//                   title="Paid Bookings"
//                   value={stats?.paidBookings || 0}
//                   icon={Check}
//                 />
//                 <StatCard
//                   title="Active Counselors"
//                   value={stats?.activeCounselors || 0}
//                   icon={ShieldAlert}
//                 />
//               </div>

//                  {/* Yearly Summary Selector */}
//     <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
//       <div className="flex items-center justify-between mb-4">
//         <div>
//           <h3 className="font-serif font-bold text-lg text-[#1c1917]">
//             Yearly Summary
//           </h3>
//           <p className="text-xs text-stone-500">
//             See totals for a specific year (revenue, payouts, sessions).
//           </p>
//         </div>
//         <select
//           value={selectedYear}
//           onChange={(e) => setSelectedYear(Number(e.target.value))}
//           className="bg-[#f4f2ed] px-3 py-2 rounded-lg border border-stone-200 text-sm font-bold outline-none"
//         >
//           {Array.from({ length: 5 }, (_, i) => {
//             const y = new Date().getFullYear() - i;
//             return (
//               <option key={y} value={y}>
//                 {y}
//               </option>
//             );
//           })}
//         </select>
//       </div>

//       {yearlyStats ? (
//         <div className="grid md:grid-cols-4 gap-4">
//           <div className="bg-stone-50 p-3 rounded-xl">
//             <div className="text-[10px] text-stone-500 font-bold uppercase tracking-widest">
//               Revenue
//             </div>
//             <div className="text-lg font-bold">
//               {yearlyStats.totalRevenue.toFixed(0)} {yearlyStats.currency}
//             </div>
//           </div>
//           <div className="bg-stone-50 p-3 rounded-xl">
//             <div className="text-[10px] text-stone-500 font-bold uppercase tracking-widest">
//               Payouts
//             </div>
//             <div className="text-lg font-bold">
//               {yearlyStats.totalPayouts.toFixed(0)} {yearlyStats.currency}
//             </div>
//           </div>
//           <div className="bg-stone-50 p-3 rounded-xl">
//             <div className="text-[10px] text-stone-500 font-bold uppercase tracking-widest">
//               Platform Profit
//             </div>
//             <div className="text-lg font-bold">
//               {yearlyStats.platformRevenue.toFixed(0)} {yearlyStats.currency}
//             </div>
//           </div>
//           <div className="bg-stone-50 p-3 rounded-xl">
//             <div className="text-[10px] text-stone-500 font-bold uppercase tracking-widest">
//               Sessions
//             </div>
//             <div className="text-lg font-bold">
//               {yearlyStats.paidBookings}
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="text-sm text-stone-400 italic">
//           No data for {selectedYear}.
//         </div>
//       )}
//     </div>

//               {/* Recent Pending List */}
//               <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col">
//                 <div className="flex justify-between items-center mb-6">
//                   <h3 className="font-serif font-bold text-lg text-[#1c1917]">
//                     Recent Requests
//                   </h3>
//                   <button
//                     onClick={() => setActiveTab("pending")}
//                     className="text-[#3f6212] text-xs font-bold uppercase hover:underline"
//                   >
//                     View All Requests
//                   </button>
//                 </div>

//                 <div className="space-y-4">
//                   {data.pending.length === 0 ? (
//                     <div className="text-center text-stone-400 py-10">
//                       No pending items.
//                     </div>
//                   ) : (
//                     data.pending.slice(0, 5).map((p) => (
//                       <div
//                         key={p._id}
//                         className="flex items-center justify-between p-4 bg-[#f9f8f6] rounded-xl border border-stone-100 hover:border-stone-300 transition-colors"
//                       >
//                         <div className="flex items-center gap-4">
//                           <div className="w-10 h-10 bg-stone-200 rounded-full flex items-center justify-center text-stone-500 font-bold">
//                             {p.name[0]}
//                           </div>
//                           <div>
//                             <div className="font-bold text-sm text-[#1c1917]">
//                               {p.name}
//                             </div>
//                             <div className="text-xs text-stone-500">
//                               {p.specialization} • {p.experience} years
//                             </div>
//                           </div>
//                         </div>
//                         <button
//                           onClick={() => setActiveTab("pending")}
//                           className="bg-white border border-stone-200 px-4 py-2 rounded-lg text-xs font-bold hover:bg-stone-50 transition-colors"
//                         >
//                           Review
//                         </button>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* VIEW: PENDING COUNSELORS */}
//           {activeTab === "pending" && (
//             <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
//               <table className="w-full text-left text-sm">
//                 <thead className="bg-[#f9f8f6] text-stone-500 font-bold border-b border-stone-200">
//                   <tr>
//                     <th className="px-6 py-4">Applicant</th>
//                     <th className="px-6 py-4">Email</th>
//                     <th className="px-6 py-4">Expertise</th>
//                     <th className="px-6 py-4 text-right">Decision</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-stone-100">
//                   {data.pending.map((p) => (
//                     <tr key={p._id} className="hover:bg-[#f9f8f6]">
//                       <td className="px-6 py-4 font-medium text-[#1c1917]">
//                         {p.name}
//                       </td>
//                       <td className="px-6 py-4 text-stone-500">
//                         {p.email}
//                       </td>
//                       <td className="px-6 py-4">
//                         <span className="bg-stone-100 text-stone-600 px-2 py-1 rounded text-xs font-bold">
//                           {p.specialization}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-right space-x-2">
//                         <button
//                           onClick={() => handleReject(p._id)}
//                           className="px-3 py-1.5 border border-stone-300 rounded text-xs font-bold text-stone-600 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200"
//                         >
//                           Reject
//                         </button>
//                         <button
//                           onClick={() => handleApprove(p._id)}
//                           className="px-3 py-1.5 bg-[#3f6212] text-white rounded text-xs font-bold hover:bg-[#2f4b0d] shadow-sm"
//                         >
//                           Approve
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                   {data.pending.length === 0 && (
//                     <tr>
//                       <td
//                         colSpan="4"
//                         className="p-12 text-center text-stone-400 italic"
//                       >
//                         No pending requests.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* VIEW: BOOKINGS (MANAGE BOOKINGS) */}
//           {activeTab === "bookings" && (
//             <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
//               <table className="w-full text-left text-sm">
//                 <thead className="bg-[#f9f8f6] text-stone-500 font-bold border-b border-stone-200">
//                   <tr>
//                     <th className="px-6 py-4">Date</th>
//                     <th className="px-6 py-4">Time</th>
//                     <th className="px-6 py-4">Client</th>
//                     <th className="px-6 py-4">Counselor</th>
//                     <th className="px-6 py-4">Status</th>
//                     <th className="px-6 py-4">Amount</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-stone-100">
//   {paginatedBookings.length === 0 ? (
//     <tr>
//       <td
//         colSpan="6"
//         className="p-12 text-center text-stone-400 italic"
//       >
//         No bookings found.
//       </td>
//     </tr>
//   ) : (
//     paginatedBookings.map((b) => (
//       <tr key={b._id} className="hover:bg-[#f9f8f6]">
//         <td className="px-6 py-4">
//           {new Date(b.date).toLocaleDateString()}
//         </td>
//         <td className="px-6 py-4">{b.time}</td>
//         <td className="px-6 py-4">
//           {b.clientId?.name || "Client"}
//         </td>
//         <td className="px-6 py-4">
//           {b.counselorId?.name || "Counselor"}
//         </td>
//         <td className="px-6 py-4">
//           <StatusBadge status={b.status} />
//         </td>
//         <td className="px-6 py-4 font-mono">
//           {b.paidAmount || b.amount || 0} LKR
//         </td>
//       </tr>
//     ))
//   )}
// </tbody>
//               </table>
//               <Pagination
//   currentPage={bookingPage}
//   totalPages={totalBookingPages}
//   onPageChange={setBookingPage}
// />
//             </div>
            
//           )}

//           {/* VIEW: CLIENTS */}
//           {activeTab === "clients" && (
//             <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
//               <div className="p-6 border-b border-stone-100 bg-[#f9f8f6]">
//                 <h2 className="font-bold text-lg text-[#1c1917] flex items-center gap-2">
//                   <Users size={20} className="text-[#3f6212]" />
//                   Registered Client Base
//                 </h2>
//               </div>
//               <table className="w-full text-left text-sm">
//                 <thead className="bg-white text-stone-500 font-bold border-b border-stone-200">
//                   <tr>
//                     <th className="px-6 py-4">Client Profile</th>
//                     <th className="px-6 py-4">Email Address</th>
//                     <th className="px-6 py-4 text-right">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-stone-100">
//   {paginatedClients.length === 0 ? (
//     <tr>
//       <td
//         colSpan="3"
//         className="p-12 text-center text-stone-400 italic"
//       >
//         No clients found.
//       </td>
//     </tr>
//   ) : (
//     paginatedClients.map((c) => (
//       <tr key={c._id} className="hover:bg-[#f9f8f6] transition-colors">
//         <td className="px-6 py-4 font-medium text-[#1c1917]">
//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
//               {c.name.charAt(0).toUpperCase()}
//             </div>
//             {c.name}
//           </div>
//         </td>
//         <td className="px-6 py-4 text-stone-600">
//           <div className="flex items-center gap-2">
//             <Mail size={14} className="text-stone-400" />
//             {c.email}
//           </div>
//         </td>
//         <td className="px-6 py-4 text-right">
//           <button className="text-xs font-bold text-[#3f6212] hover:underline">
//             View Profile
//           </button>
//         </td>
//       </tr>
//     ))
//   )}
// </tbody>
//               </table>
//               <Pagination
//   currentPage={clientPage}
//   totalPages={totalClientPages}
//   onPageChange={setClientPage}
// />
//             </div>
//           )}

//           {/* VIEW: COUNSELORS (NO PAYMENT BUTTON HERE) */}
//           {activeTab === "counselors" && (
//             <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
//               <table className="w-full text-left text-sm">
//                 <thead className="bg-[#f9f8f6] text-stone-500 font-bold border-b border-stone-200">
//                   <tr>
//                     <th className="px-6 py-4">Name</th>
//                     <th className="px-6 py-4">Specialization</th>
//                     <th className="px-6 py-4">Status</th>
//                     <th className="px-6 py-4">Total Earned</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-stone-100">
//   {paginatedCounselors.length === 0 ? (
//     <tr>
//       <td
//         colSpan="4"
//         className="p-12 text-center text-stone-400 italic"
//       >
//         No counselors found.
//       </td>
//     </tr>
//   ) : (
//     paginatedCounselors.map((c) => (
//       <tr key={c._id} className="hover:bg-[#f9f8f6]">
//         <td className="px-6 py-4 font-medium text-[#1c1917] flex items-center gap-3">
//           <div className="w-8 h-8 rounded-full bg-[#3f6212]/10 text-[#3f6212] flex items-center justify-center font-bold text-xs">
//             {c.name[0]}
//           </div>
//           {c.name}
//         </td>
//         <td className="px-6 py-4 text-stone-500">
//           {c.specialization}
//         </td>
//         <td className="px-6 py-4">
//           <StatusBadge
//             status={c.isApproved ? "Approved" : "Pending"}
//           />
//         </td>
//         <td className="px-6 py-4 font-mono font-bold text-[#1c1917]">
//           {c.totalEarnings?.toFixed(2) || 0}{" "}
//           {c.currency || "LKR"}
//         </td>
//         <td className="px-6 py-4 font-mono font-bold text-[#1c1917]">
//   {c.totalEarnings?.toFixed(2) || 0} {c.currency || "LKR"}
// </td>
//  </tr>
 
//     ))
//   )}
// </tbody>
//               </table>
//               <Pagination
//   currentPage={counselorPage}
//   totalPages={totalCounselorPages}
//   onPageChange={setCounselorPage}
// />
//             </div>
//           )}

//           {/* VIEW: BLOGS */}
//           {activeTab === "blogs" && (
//             <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
//               <table className="w-full text-left text-sm">
//                 <thead className="bg-[#f9f8f6] text-stone-500 font-bold border-b border-stone-200">
//                   <tr>
//                     <th className="px-6 py-4">Article</th>
//                     <th className="px-6 py-4">Author</th>
//                     <th className="px-6 py-4">Date</th>
//                     <th className="px-6 py-4 text-right">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-stone-100">
//   {paginatedBlogs.length === 0 ? (
//     <tr>
//       <td
//         colSpan="4"
//         className="p-12 text-center text-stone-400 italic"
//       >
//         No articles found.
//       </td>
//     </tr>
//   ) : (
//     paginatedBlogs.map((b) => (
//       <tr key={b._id} className="hover:bg-[#f9f8f6]">
//         <td className="px-6 py-4">
//           <div className="flex items-center gap-4">
//             <div className="max-w-xs">
//               <p className="font-bold text-[#1c1917] line-clamp-1">
//                 {b.title}
//               </p>
//               <p className="text-xs text-stone-500 line-clamp-1">
//                 {b.content}
//               </p>
//             </div>
//           </div>
//         </td>
//         <td className="px-6 py-4 text-stone-600">
//           {b.author?.name || "Unknown"}
//         </td>
//         <td className="px-6 py-4 text-stone-400 text-xs">
//           {new Date(b.createdAt).toLocaleDateString()}
//         </td>
//         <td className="px-6 py-4 text-right flex justify-end gap-2 items-center h-full">
//           <button
//             onClick={() => handleUpdateBlog(b._id)}
//             className="p-2 bg-stone-100 rounded text-stone-600 hover:bg-[#3f6212] hover:text-white"
//           >
//             <Edit size={14} />
//           </button>
//           <button
//             onClick={() => handleDeleteBlog(b._id)}
//             className="p-2 bg-stone-100 rounded text-stone-600 hover:bg-rose-600 hover:text-white"
//           >
//             <Trash2 size={14} />
//           </button>
//         </td>
//       </tr>
//     ))
//   )}
// </tbody>
//               </table>
//               <Pagination
//   currentPage={blogPage}
//   totalPages={totalBlogPages}
//   onPageChange={setBlogPage}
// />
//             </div>
//           )}

//           {/* VIEW: FINANCIAL REPORT */}
//           {activeTab === "report" && (
//             <div className="space-y-6">
//               <div className="bg-white p-4 rounded-xl border border-stone-200 flex items-center gap-4 shadow-sm">
//                 <div className="flex items-center gap-2 bg-[#f4f2ed] px-4 py-2 rounded-lg border border-stone-100">
//                   <Calendar size={16} className="text-stone-400" />
//                   <select
//                     value={filters.month}
//                     onChange={(e) =>
//                       setFilters((prev) => ({
//                         ...prev,
//                         month: Number(e.target.value),
//                       }))
//                     }
//                     className="bg-transparent text-sm font-bold text-stone-700 outline-none cursor-pointer"
//                   >
//                     {Array.from({ length: 12 }, (_, i) => (
//                       <option key={i} value={i + 1}>
//                         {new Date(0, i).toLocaleString("default", {
//                           month: "long",
//                         })}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <input
//                   type="number"
//                   value={filters.year}
//                   onChange={(e) =>
//                     setFilters((prev) => ({
//                       ...prev,
//                       year: Number(e.target.value),
//                     }))
//                   }
//                   className="w-24 bg-[#f4f2ed] px-4 py-2 rounded-lg border border-stone-100 text-sm font-bold outline-none"
//                 />
//                 <button
//                   onClick={fetchReport}
//                   className="ml-auto bg-[#1c1917] text-white px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-[#3f6212] transition-colors"
//                 >
//                   Generate Report
//                 </button>
//               </div>

//               {/* Financial Growth Chart */}
//               <MonthlyRevenueChart
//                 monthlySummary={stats?.monthlySummary || null}
//               />

//               <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
//                 <table className="w-full text-left text-sm">
//                   <thead className="bg-[#f9f8f6] text-stone-500 font-bold border-b border-stone-200">
//                     <tr>
//                       <th className="px-6 py-4">Beneficiary</th>
//                       <th className="px-6 py-4">Sessions</th>
//                       <th className="px-6 py-4">Total Earnings</th>
//                       <th className="px-6 py-4 text-right">Payout</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-stone-100">
//                     {data.report.map((item) => (
//                       <tr key={item._id} className="hover:bg-[#f9f8f6]">
//                         <td className="px-6 py-4 font-medium text-[#1c1917]">
//                           {item.name}
//                         </td>
//                         <td className="px-6 py-4 text-stone-600">
//                           {item.completedSessions} Sessions
//                         </td>
//                         <td className="px-6 py-4 font-bold text-emerald-600 font-mono">
//                           {item.totalEarnings.toFixed(2)}{" "}
//                           {item.currency || "LKR"}
//                         </td>
//                         <td className="px-6 py-4 text-right">
//   {item.isPaid ? (
//     <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-emerald-50 text-emerald-700 border border-emerald-200">
//       Paid
//     </span>
//   ) : (
//     <PaymentButton
//       amount={item.totalEarnings}
//       counselorId={item._id}
//       counselorName={item.name}
//       type="admin"
//     />
//   )}
// </td>
//                       </tr>
//                     ))}
//                     {data.report.length === 0 && (
//                       <tr>
//                         <td
//                           colSpan="4"
//                           className="p-12 text-center text-stone-400 italic"
//                         >
//                           No data found.
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;


// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import API from "../api/api";
import PaymentButton from "../pages/PaymentButton";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  UserCheck,
  Users,
  PieChart,
  LogOut,
  Search,
  Calendar,
  Check,
  Trash2,
  Edit,
  Wallet,
  ArrowUpRight,
  ShieldAlert,
  Mail,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

// --- 🎨 VISUAL COMPONENTS ---

const GrainTexture = () => (
  <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] filter contrast-150 brightness-100" />
);

const StatCard = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-all group">
    <div className="flex justify-between items-start mb-4">
      <div className="w-12 h-12 rounded-xl bg-[#f4f2ed] text-[#3f6212] flex items-center justify-center group-hover:bg-[#3f6212] group-hover:text-white transition-colors">
        <Icon size={24} />
      </div>
      {trend && (
        <div className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
          <ArrowUpRight size={12} className="mr-1" /> {trend}%
        </div>
      )}
    </div>
    <h3 className="text-stone-500 text-xs font-bold uppercase tracking-widest mb-1">
      {title}
    </h3>
    <div className="text-3xl font-serif font-bold text-[#1c1917]">{value}</div>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    Approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Pending: "bg-amber-100 text-amber-700 border-amber-200",
    Rejected: "bg-rose-100 text-rose-700 border-rose-200",
    paid: "bg-emerald-100 text-emerald-700 border-emerald-200",
    pending: "bg-amber-100 text-amber-700 border-amber-200",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
        styles[status] || "bg-stone-100 text-stone-600"
      }`}
    >
      {status}
    </span>
  );
};

// --- 📈 MONTHLY REVENUE CHART ---

const MonthlyRevenueChart = ({ monthlySummary }) => {
  if (!monthlySummary) return null;

  const data = Object.entries(monthlySummary).map(([month, v]) => ({
    month,
    revenue: v.revenue || 0,
    payouts: v.payouts || 0,
    profit: v.platformRevenue || 0,
  }));

  if (!data.length) return null;

  return (
    <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
      <h3 className="font-serif font-bold text-lg text-[#1c1917] mb-4">
        Financial Growth
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" tick={{ fontSize: 10 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              name="Revenue"
            />
            <Line
              type="monotone"
              dataKey="payouts"
              stroke="#ef4444"
              name="Payouts"
            />
            <Line
              type="monotone"
              dataKey="profit"
              stroke="#22c55e"
              name="Profit"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-end gap-2 mt-4 px-6 pb-4">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 text-xs border rounded disabled:opacity-50"
      >
        Prev
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 text-xs border rounded ${
            p === currentPage
              ? "bg-[#1c1917] text-white border-[#1c1917]"
              : "bg-white text-stone-600"
          }`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 text-xs border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

// --- 🏛 MAIN DASHBOARD ---

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    blogs: [],
    counselors: [],
    pending: [],
    clients: [],
    report: [],
    bookings: [],
  });
  const [stats, setStats] = useState(null);
  const [filters, setFilters] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    search: "",
  });
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  // Pagination state
  const [bookingPage, setBookingPage] = useState(1);
  const bookingsPerPage = 10;

  const [counselorPage, setCounselorPage] = useState(1);
  const counselorsPerPage = 10;

  const [clientPage, setClientPage] = useState(1);
  const clientsPerPage = 10;

  const [blogPage, setBlogPage] = useState(1);
  const blogsPerPage = 10;

  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear()
  );
  const [yearlyStats, setYearlyStats] = useState(null);

  useEffect(() => {
    setBookingPage(1);
  }, [data.bookings.length]);

  useEffect(() => {
    setCounselorPage(1);
  }, [data.counselors.length]);

  useEffect(() => {
    setClientPage(1);
  }, [data.clients.length]);

  useEffect(() => {
    setBlogPage(1);
  }, [data.blogs.length]);

  // Derived paginated arrays
  const totalBookingPages = Math.ceil(
    (data.bookings?.length || 0) / bookingsPerPage
  );
  const paginatedBookings = (data.bookings || []).slice(
    (bookingPage - 1) * bookingsPerPage,
    bookingPage * bookingsPerPage
  );

  const totalCounselorPages = Math.ceil(
    (data.counselors?.length || 0) / counselorsPerPage
  );
  const paginatedCounselors = (data.counselors || []).slice(
    (counselorPage - 1) * counselorsPerPage,
    counselorPage * counselorsPerPage
  );

  const totalClientPages = Math.ceil(
    (data.clients?.length || 0) / clientsPerPage
  );
  const paginatedClients = (data.clients || []).slice(
    (clientPage - 1) * clientsPerPage,
    clientPage * clientsPerPage
  );

  const totalBlogPages = Math.ceil((data.blogs?.length || 0) / blogsPerPage);
  const paginatedBlogs = (data.blogs || []).slice(
    (blogPage - 1) * blogsPerPage,
    blogPage * blogsPerPage
  );

  // Fetch yearly stats
  const fetchYearlyStats = async (year) => {
    try {
      if (!token) return;
      const headers = { Authorization: `Bearer ${token}` };
      const { data } = await API.get(`/payout/yearly-stats?year=${year}`, {
        headers,
      });
      if (data.success) {
        setYearlyStats(data.stats);
      }
    } catch (err) {
      console.error("Error fetching yearly stats:", err);
    }
  };

  // --- Data Fetching ---
  const refreshData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };

      const [
        blogsRes,
        counselorsRes,
        pendingRes,
        clientsRes,
        statsRes,
        earningsRes,
        bookingsRes,
      ] = await Promise.all([
        API.get("/blogs/admin/all", { headers }),
        API.get("/counselors/all", { headers }),
        API.get("/counselors/pending", { headers }),
        API.get("/users/clients", { headers }),
        API.get("/payout/dashboard-stats", { headers }),
        API.get("/payout/earnings", { headers }),
        API.get("/booking", { headers }),
      ]);

      // Map earnings by counselor id
      const earningsList = earningsRes.data.counselors || [];
      const earnMap = new Map(earningsList.map((e) => [e._id, e]));

      // Merge counselors with earnings
      const counselorsWithEarnings = (counselorsRes.data.data || []).map(
        (c) => {
          const e = earnMap.get(c._id);
          return {
            ...c,
            totalEarnings: e?.totalEarnings || 0,
            completedSessions: e?.completedSessions || 0,
            currency: e?.currency || "LKR",
          };
        }
      );

      setStats(statsRes.data.stats || null);

      setData((prev) => ({
        ...prev,
        blogs: blogsRes.data.data || [],
        counselors: counselorsWithEarnings,
        pending: pendingRes.data.data || [],
        clients: clientsRes.data.data || [],
        bookings: bookingsRes.data.bookings || [],
      }));
    } catch (e) {
      console.error("Admin refreshData error:", e);
    } finally {
      setLoading(false);
    }
  };

  // Financial report: earnings filtered by month/year + payout history
  const fetchReport = async () => {
    try {
      if (!token) return;
      const headers = { Authorization: `Bearer ${token}` };

      const monthName = new Date(
        filters.year,
        filters.month - 1
      ).toLocaleString("en-US", { month: "long", year: "numeric" });

      const [earningsRes, historyRes] = await Promise.all([
        API.get(`/payout/earnings?month=${encodeURIComponent(monthName)}`, {
          headers,
        }),
        API.get("/payout/history", { headers }),
      ]);

      const counselors =
        earningsRes.data.success && earningsRes.data.counselors
          ? earningsRes.data.counselors
          : [];

      const history =
        historyRes.data.success && historyRes.data.payments
          ? historyRes.data.payments
          : [];

      const monthHistory = history.filter((p) => p.month === monthName);

      const report = counselors.map((c) => {
        const hasPayout = monthHistory.some(
          (p) =>
            p.counselor &&
            (p.counselor._id === c._id ||
              p.counselor._id?.toString() === c._id?.toString())
        );
        return {
          ...c,
          isPaid: hasPayout,
        };
      });

      setData((prev) => ({
        ...prev,
        report,
      }));
    } catch (e) {
      console.error("Admin fetchReport error:", e);
    }
  };

  useEffect(() => {
    refreshData();
    fetchReport();
    fetchYearlyStats(selectedYear);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, selectedYear]);

  // --- Actions ---
  const handleApprove = async (id) => {
    await API.put(
      `/counselors/approve/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    refreshData();
  };

  const handleReject = async (id) => {
    await API.put(
      `/counselors/reject/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    refreshData();
  };

  const handleDeleteBlog = async (id) => {
    if (confirm("Delete this blog?")) {
      await API.delete(`/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      refreshData();
    }
  };

  const handleUpdateBlog = (id) => {
    window.location.href = `/update-blog/${id}`;
  };

  // --- Navigation Items ---
  const menuItems = [
    { id: "overview", icon: LayoutDashboard, label: "Dashboard" },
    {
      id: "pending",
      icon: UserCheck,
      label: "Approvals",
      badge: data.pending.length,
    },
    { id: "bookings", icon: Calendar, label: "Bookings" },
    { id: "counselors", icon: ShieldAlert, label: "Counselors" },
    { id: "clients", icon: Users, label: "Clients" },
    { id: "blogs", icon: FileText, label: "Content" },
    { id: "report", icon: PieChart, label: "Financials" },
  ];

  return (
    <div className="flex h-screen bg-[#f4f2ed] font-sans text-[#1c1917] overflow-hidden selection:bg-[#3f6212] selection:text-white">
      <GrainTexture />

      {/* 1. BLACK SIDEBAR */}
      <aside className="w-64 bg-[#1c1917] text-[#f2f0e9] flex flex-col fixed h-full z-20 shadow-2xl border-r border-stone-800">
        {/* Sidebar Header */}
        <div className="p-8 flex items-center gap-3 border-b border-white/5">
          <div className="w-10 h-10 bg-[#3f6212] rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
            H
          </div>
          <div>
            <h1 className="font-serif font-bold text-xl tracking-tight text-white">
              HealPeer<span className="text-[#3f6212]">.</span>
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500">
              Admin Portal
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === item.id
                  ? "bg-[#3f6212] text-white shadow-lg"
                  : "text-stone-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} />
                {item.label}
              </div>
              {item.badge > 0 && (
                <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-6 border-t border-white/10">
          <button className="w-full flex items-center justify-center gap-2 text-red-400 bg-white/5 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-red-900/30 transition-colors">
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT */}
      <main className="flex-1 ml-64 flex flex-col h-full overflow-hidden bg-[#f8fafc] relative z-10 top-30">
        {/* Header */}
        <header className="h-20 bg-white border-b border-stone-200 flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-serif font-bold capitalize text-[#1c1917]">
              {activeTab}
            </h2>
            <p className="text-xs text-stone-500">Welcome back, Admin.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search database..."
                className="pl-10 pr-4 py-2 bg-[#f4f2ed] border-none rounded-lg text-sm focus:ring-2 focus:ring-[#3f6212] w-64 text-[#1c1917] outline-none placeholder:text-stone-400"
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value }))
                }
              />
            </div>
            <div className="w-10 h-10 bg-[#1c1917] rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
              AD
            </div>
          </div>
        </header>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
          {/* VIEW: OVERVIEW */}
          {activeTab === "overview" && (
  <div className="space-y-8">
    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <StatCard
        title="Total Revenue"
        value={`LKR ${stats?.totalRevenue?.toFixed(0) || 0}`}
        icon={Wallet}
      />
      <StatCard
        title="Platform Profit"
        value={`LKR ${stats?.platformRevenue?.toFixed(0) || 0}`}
        icon={PieChart}
      />
      <StatCard
        title="Paid Bookings"
        value={stats?.paidBookings || 0}
        icon={Check}
      />
      <StatCard
        title="Active Counselors"
        value={stats?.activeCounselors || 0}
        icon={ShieldAlert}
      />
    </div>

    {/* Yearly Summary */}
    <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-serif font-bold text-lg text-[#1c1917]">
            Yearly Summary
          </h3>
          <p className="text-xs text-stone-500">
            See totals for a specific year (revenue, payouts, sessions).
          </p>
        </div>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="bg-[#f4f2ed] px-3 py-2 rounded-lg border border-stone-200 text-sm font-bold outline-none"
        >
          {Array.from({ length: 5 }, (_, i) => {
            const y = new Date().getFullYear() - i;
            return (
              <option key={y} value={y}>
                {y}
              </option>
            );
          })}
        </select>
      </div>

      {yearlyStats ? (
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-stone-50 p-3 rounded-xl">
            <div className="text-[10px] text-stone-500 font-bold uppercase tracking-widest">
              Revenue
            </div>
            <div className="text-lg font-bold">
              {yearlyStats.totalRevenue.toFixed(0)} {yearlyStats.currency}
            </div>
          </div>
          <div className="bg-stone-50 p-3 rounded-xl">
            <div className="text-[10px] text-stone-500 font-bold uppercase tracking-widest">
              Payouts
            </div>
            <div className="text-lg font-bold">
              {yearlyStats.totalPayouts.toFixed(0)} {yearlyStats.currency}
            </div>
          </div>
          <div className="bg-stone-50 p-3 rounded-xl">
            <div className="text-[10px] text-stone-500 font-bold uppercase tracking-widest">
              Platform Profit
            </div>
            <div className="text-lg font-bold">
              {yearlyStats.platformRevenue.toFixed(0)}{" "}
              {yearlyStats.currency}
            </div>
          </div>
          <div className="bg-stone-50 p-3 rounded-xl">
            <div className="text-[10px] text-stone-500 font-bold uppercase tracking-widest">
              Sessions
            </div>
            <div className="text-lg font-bold">
              {yearlyStats.paidBookings}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-sm text-stone-400 italic">
          No data for {selectedYear}.
        </div>
      )}
    </div>

    {/* Yearly Chart (using yearlyStats.monthlySummary) */}
    <MonthlyRevenueChart
      monthlySummary={yearlyStats?.monthlySummary || null}
    />
  </div>
)}

          {/* VIEW: PENDING COUNSELORS */}
          {activeTab === "pending" && (
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#f9f8f6] text-stone-500 font-bold border-b border-stone-200">
                  <tr>
                    <th className="px-6 py-4">Applicant</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Expertise</th>
                    <th className="px-6 py-4 text-right">Decision</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {data.pending.map((p) => (
                    <tr key={p._id} className="hover:bg-[#f9f8f6]">
                      <td className="px-6 py-4 font-medium text-[#1c1917]">
                        {p.name}
                      </td>
                      <td className="px-6 py-4 text-stone-500">
                        {p.email}
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-stone-100 text-stone-600 px-2 py-1 rounded text-xs font-bold">
                          {p.specialization}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => handleReject(p._id)}
                          className="px-3 py-1.5 border border-stone-300 rounded text-xs font-bold text-stone-600 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleApprove(p._id)}
                          className="px-3 py-1.5 bg-[#3f6212] text-white rounded text-xs font-bold hover:bg-[#2f4b0d] shadow-sm"
                        >
                          Approve
                        </button>
                      </td>
                    </tr>
                  ))}
                  {data.pending.length === 0 && (
                    <tr>
                      <td
                        colSpan="4"
                        className="p-12 text-center text-stone-400 italic"
                      >
                        No pending requests.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* VIEW: BOOKINGS */}
          {activeTab === "bookings" && (
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#f9f8f6] text-stone-500 font-bold border-b border-stone-200">
                  <tr>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Time</th>
                    <th className="px-6 py-4">Client</th>
                    <th className="px-6 py-4">Counselor</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {paginatedBookings.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="p-12 text-center text-stone-400 italic"
                      >
                        No bookings found.
                      </td>
                    </tr>
                  ) : (
                    paginatedBookings.map((b) => (
                      <tr key={b._id} className="hover:bg-[#f9f8f6]">
                        <td className="px-6 py-4">
                          {new Date(b.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">{b.time}</td>
                        <td className="px-6 py-4">
                          {b.clientId?.name || "Client"}
                        </td>
                        <td className="px-6 py-4">
                          {b.counselorId?.name || "Counselor"}
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={b.status} />
                        </td>
                        <td className="px-6 py-4 font-mono">
                          {b.paidAmount || b.amount || 0} LKR
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <Pagination
                currentPage={bookingPage}
                totalPages={totalBookingPages}
                onPageChange={setBookingPage}
              />
            </div>
          )}

          {/* VIEW: CLIENTS */}
          {activeTab === "clients" && (
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <div className="p-6 border-b border-stone-100 bg-[#f9f8f6]">
                <h2 className="font-bold text-lg text-[#1c1917] flex items-center gap-2">
                  <Users size={20} className="text-[#3f6212]" />
                  Registered Client Base
                </h2>
              </div>
              <table className="w-full text-left text-sm">
                <thead className="bg-white text-stone-500 font-bold border-b border-stone-200">
                  <tr>
                    <th className="px-6 py-4">Client Profile</th>
                    <th className="px-6 py-4">Email Address</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {paginatedClients.length === 0 ? (
                    <tr>
                      <td
                        colSpan="3"
                        className="p-12 text-center text-stone-400 italic"
                      >
                        No clients found.
                      </td>
                    </tr>
                  ) : (
                    paginatedClients.map((c) => (
                      <tr
                        key={c._id}
                        className="hover:bg-[#f9f8f6] transition-colors"
                      >
                        <td className="px-6 py-4 font-medium text-[#1c1917]">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                              {c.name.charAt(0).toUpperCase()}
                            </div>
                            {c.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-stone-600">
                          <div className="flex items-center gap-2">
                            <Mail size={14} className="text-stone-400" />
                            {c.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-xs font-bold text-[#3f6212] hover:underline">
                            View Profile
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <Pagination
                currentPage={clientPage}
                totalPages={totalClientPages}
                onPageChange={setClientPage}
              />
            </div>
          )}

          {/* VIEW: COUNSELORS */}
          {activeTab === "counselors" && (
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#f9f8f6] text-stone-500 font-bold border-b border-stone-200">
                  <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Specialization</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Total Earned</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {paginatedCounselors.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="p-12 text-center text-stone-400 italic"
                      >
                        No counselors found.
                      </td>
                    </tr>
                  ) : (
                    paginatedCounselors.map((c) => (
                      <tr key={c._id} className="hover:bg-[#f9f8f6]">
                        <td className="px-6 py-4 font-medium text-[#1c1917] flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#3f6212]/10 text-[#3f6212] flex items-center justify-center font-bold text-xs">
                            {c.name[0]}
                          </div>
                          {c.name}
                        </td>
                        <td className="px-6 py-4 text-stone-500">
                          {c.specialization}
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge
                            status={c.isApproved ? "Approved" : "Pending"}
                          />
                        </td>
                        <td className="px-6 py-4 font-mono font-bold text-[#1c1917]">
                          {c.totalEarnings?.toFixed(2) || 0}{" "}
                          {c.currency || "LKR"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <Pagination
                currentPage={counselorPage}
                totalPages={totalCounselorPages}
                onPageChange={setCounselorPage}
              />
            </div>
          )}

          {/* VIEW: BLOGS */}
          {activeTab === "blogs" && (
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#f9f8f6] text-stone-500 font-bold border-b border-stone-200">
                  <tr>
                    <th className="px-6 py-4">Article</th>
                    <th className="px-6 py-4">Author</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {paginatedBlogs.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="p-12 text-center text-stone-400 italic"
                      >
                        No articles found.
                      </td>
                    </tr>
                  ) : (
                    paginatedBlogs.map((b) => (
                      <tr key={b._id} className="hover:bg-[#f9f8f6]">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="max-w-xs">
                              <p className="font-bold text-[#1c1917] line-clamp-1">
                                {b.title}
                              </p>
                              <p className="text-xs text-stone-500 line-clamp-1">
                                {b.content}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-stone-600">
                          {b.author?.name || "Unknown"}
                        </td>
                        <td className="px-6 py-4 text-stone-400 text-xs">
                          {new Date(b.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right flex justify-end gap-2 items-center h-full">
                          <button
                            onClick={() => handleUpdateBlog(b._id)}
                            className="p-2 bg-stone-100 rounded text-stone-600 hover:bg-[#3f6212] hover:text-white"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(b._id)}
                            className="p-2 bg-stone-100 rounded text-stone-600 hover:bg-rose-600 hover:text-white"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <Pagination
                currentPage={blogPage}
                totalPages={totalBlogPages}
                onPageChange={setBlogPage}
              />
            </div>
          )}

          {/* VIEW: FINANCIAL REPORT */}
          {activeTab === "report" && (
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-xl border border-stone-200 flex items-center gap-4 shadow-sm">
                <div className="flex items-center gap-2 bg-[#f4f2ed] px-4 py-2 rounded-lg border border-stone-100">
                  <Calendar size={16} className="text-stone-400" />
                  <select
                    value={filters.month}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        month: Number(e.target.value),
                      }))
                    }
                    className="bg-transparent text-sm font-bold text-stone-700 outline-none cursor-pointer"
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={i + 1}>
                        {new Date(0, i).toLocaleString("default", {
                          month: "long",
                        })}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="number"
                  value={filters.year}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      year: Number(e.target.value),
                    }))
                  }
                  className="w-24 bg-[#f4f2ed] px-4 py-2 rounded-lg border border-stone-100 text-sm font-bold outline-none"
                />
                <button
                  onClick={fetchReport}
                  className="ml-auto bg-[#1c1917] text-white px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-[#3f6212] transition-colors"
                >
                  Generate Report
                </button>
              </div>

              {/* Financial Growth Chart */}
              {/* <MonthlyRevenueChart
                monthlySummary={stats?.monthlySummary || null}
              /> */}

              <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#f9f8f6] text-stone-500 font-bold border-b border-stone-200">
                    <tr>
                      <th className="px-6 py-4">Beneficiary</th>
                      <th className="px-6 py-4">Sessions</th>
                      <th className="px-6 py-4">Total Earnings</th>
                      <th className="px-6 py-4 text-right">Payout</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {data.report.length === 0 ? (
                      <tr>
                        <td
                          colSpan="4"
                          className="p-12 text-center text-stone-400 italic"
                        >
                          No data found.
                        </td>
                      </tr>
                    ) : (
                      data.report.map((item) => (
                        <tr key={item._id} className="hover:bg-[#f9f8f6]">
                          <td className="px-6 py-4 font-medium text-[#1c1917]">
                            {item.name}
                          </td>
                          <td className="px-6 py-4 text-stone-600">
                            {item.completedSessions} Sessions
                          </td>
                          <td className="px-6 py-4 font-bold text-emerald-600 font-mono">
                            {item.totalEarnings.toFixed(2)}{" "}
                            {item.currency || "LKR"}
                          </td>
                          <td className="px-6 py-4 text-right">
                            {item.isPaid ? (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-emerald-50 text-emerald-700 border border-emerald-200">
                                Paid
                              </span>
                            ) : (
                              <PaymentButton
                                amount={item.totalEarnings}
                                counselorId={item._id}
                                counselorName={item.name}
                                type="admin"
                              />
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;