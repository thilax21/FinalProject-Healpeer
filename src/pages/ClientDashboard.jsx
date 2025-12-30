
// src/pages/ClientDashboard.jsx
import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import {
  Edit2,
  Edit,
  Trash,
  User,
  FileText,
  Calendar,
  Phone,
  Mail,
  Video,
  MessageSquare,
  Clock,
} from "lucide-react";

// --- Visual Components ---
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
    className={`bg-white rounded-2xl border border-slate-100 shadow-sm ${className}`}
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

const PRE_JOIN_MINUTES = 10; // join is allowed from 10 mins before start

const ClientDashboard = ({ user }) => {
  const navigate = useNavigate();

  // Profile + data states
  const [profile, setProfile] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [bookings, setBookings] = useState([]); // paid/all bookings
  const [pendingBookings, setPendingBookings] = useState([]); // kept for future use
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Tabs: upcoming, completed, blogs
  const [activeTab, setActiveTab] = useState("upcoming");

  // Pagination state
  const [completedPage, setCompletedPage] = useState(1);
  const completedPerPage = 5;
  const [blogPage, setBlogPage] = useState(1);
  const blogsPerPage = 5;

  const token = localStorage.getItem("token");
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};
  const clientId = user?.id || user?._id || localStorage.getItem("userId");

  // Fetch own profile
  useEffect(() => {
    if (!clientId) return;
    const fetchProfile = async () => {
      try {
        const { data } = await API.get(`/users/${clientId}`, {
          headers: authHeaders,
        });
        setProfile(data.data);
        setProfileData({
          name: data.data.name || "",
          bio: data.data.bio || "",
          contactNumber: data.data.contactNumber || "",
        });
        setPreviewImage(
          data.data.profileImage
            ? data.data.profileImage.startsWith("http")
              ? data.data.profileImage
              : `https://healpeer-backend.onrender.com${data.data.profileImage}`
            : null
        );
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };
    fetchProfile();
  }, [clientId, token]);

  // Fetch bookings (paid + pending) + blogs
  useEffect(() => {
    const fetchData = async () => {
      if (!clientId || !token) return;
      try {
        const [blogsRes, paidRes, pendingRes] = await Promise.all([
          API.get("/blogs/my-blogs", { headers: authHeaders }),
          API.get(`/booking/client/${clientId}`, { headers: authHeaders }),
          API.get(`/booking/client/${clientId}?status=pending`, {
            headers: authHeaders,
          }),
        ]);

        setBlogs(blogsRes.data.data || []);
        setBookings(paidRes.data.bookings || []);
        setPendingBookings(pendingRes.data.bookings || []);
      } catch (err) {
        console.error("Data fetch error:", err);
      }
    };
    fetchData();
  }, [clientId, token]);

  // Reset pagination when data size changes
  useEffect(() => {
    setCompletedPage(1);
  }, [bookings.length]);

  useEffect(() => {
    setBlogPage(1);
  }, [blogs.length]);

  // --- Handlers ---

  const handleProfileChange = (e) =>
    setProfileData({ ...profileData, [e.target.name]: e.target.value });

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

      setProfile(data.data);
      setProfileData({
        name: data.data.name,
        bio: data.data.bio,
        contactNumber: data.data.contactNumber,
      });
      setPreviewImage(
        data.data.profileImage
          ? data.data.profileImage.startsWith("http")
            ? data.data.profileImage
            : `https://healpeer-backend.onrender.com${data.data.profileImage}`
          : null
      );
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

  const handleEditBlog = (id) => {
    navigate(`/update-blog/${id}`);
  };

  const handleStartSession = (booking) => {
    // Chat session
    if (
      booking.sessionType &&
      booking.sessionType.toLowerCase() === "chat" &&
      booking.chatRoom
    ) {
      navigate(`/chat/${booking.chatRoom}`);
      return;
    }

    // Video session
    const callId = booking._id || booking.id;
    if (!callId) {
      toast.error("Missing booking ID for video call.");
      return;
    }
    navigate(`/video/${callId}`);
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500">
        <div className="animate-pulse text-xs tracking-[0.25em] uppercase">
          Preparing your space...
        </div>
      </div>
    );
  }

  const getCounselorName = (b) => b?.counselorId?.name || "Counselor";
  const getCounselorId = (b) => b?.counselorId?._id || b?.counselorId?.id;

  // Split bookings into upcoming & completed
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

  const { upcoming: upcomingBookings, completed: completedBookings } =
    splitBookingsByTime(bookings);

  // Next session for header (first upcoming)
  const nextSession = upcomingBookings[0];

  // Join window for Next Session (10 mins before start until end)
  let nextCanJoin = false;
  if (nextSession) {
    let start = nextSession.startDateTime
      ? new Date(nextSession.startDateTime)
      : null;
    let end = nextSession.endDateTime
      ? new Date(nextSession.endDateTime)
      : null;

    if (!start && nextSession.date && nextSession.time) {
      const [year, month, day] = nextSession.date.split("-");
      const [hour, minute] = nextSession.time.split(":");
      start = new Date(year, month - 1, day, hour, minute);
    }
    if (!end && start) {
      const duration = nextSession.durationMin || 60;
      end = new Date(start.getTime() + duration * 60 * 1000);
    }

    if (start && end) {
      const now = new Date();
      const joinOpensAt = new Date(
        start.getTime() - PRE_JOIN_MINUTES * 60 * 1000
      );
      nextCanJoin = now >= joinOpensAt && now <= end;
    }
  }

  // Pagination slices
  const totalCompletedPages = Math.max(
    1,
    Math.ceil(completedBookings.length / completedPerPage)
  );
  const completedSlice = completedBookings.slice(
    (completedPage - 1) * completedPerPage,
    completedPage * completedPerPage
  );

  const totalBlogPages = Math.max(1, Math.ceil(blogs.length / blogsPerPage));
  const blogsSlice = blogs.slice(
    (blogPage - 1) * blogsPerPage,
    blogPage * blogsPerPage
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
              {profile.name || "Your Space"}
            </h1>
            <p className="text-sm text-slate-500 mt-2 max-w-md">
              View your upcoming and completed sessions and keep your journal
              updated.
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
                  Journals
                </div>
                <div className="text-base font-semibold">{blogs.length}</div>
              </div>
            </Card>
          </div>
        </div>

        {/* GRID LAYOUT */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* LEFT: PROFILE PANEL */}
          <aside className="lg:col-span-4 space-y-6">
            <Card className="p-6 md:p-7 relative overflow-hidden">
              {/* Edit button */}
              <button
                onClick={() => setEditingProfile((s) => !s)}
                className="absolute top-4 right-4 inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/80 hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors w-9 h-9"
              >
                <Edit2 size={16} />
              </button>

              {/* Avatar & profile */}
              <div className="flex flex-col items-center text-center mb-5">
                <div className="relative w-28 h-28 mb-3">
                  <div className="absolute inset-0 rounded-full bg-emerald-100 blur-xl" />
                  <img
                    src={
                      previewImage ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt="Profile"
                    className="relative w-full h-full rounded-full object-cover border-4 border-white shadow-md"
                  />
                </div>

                <AnimatePresence mode="wait">
                  {editingProfile ? (
                    <motion.form
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      onSubmit={submitProfileUpdate}
                      className="w-full space-y-3 mt-1"
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
                        placeholder="Short bio"
                      />
                      <input
                        name="contactNumber"
                        value={profileData.contactNumber}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        placeholder="Contact Number"
                      />
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">
                          Profile Photo
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="w-full text-xs"
                        />
                      </div>
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
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      className="space-y-2 mt-1"
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
                            Client
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>
          </aside>

          {/* RIGHT: MAIN AREA */}
          <div className="lg:col-span-8 space-y-5">
            {/* Next session highlight */}
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
                          {getCounselorName(nextSession)}
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

                  {nextSession.status === "paid" && (
                    <button
                      onClick={() =>
                        nextCanJoin && handleStartSession(nextSession)
                      }
                      disabled={!nextCanJoin}
                      className={`inline-flex items-center gap-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.16em] px-4 py-2
                        ${
                          nextCanJoin
                            ? "bg-emerald-500 text-white hover:bg-emerald-400"
                            : "bg-slate-100 text-slate-400 cursor-not-allowed"
                        }`}
                    >
                      {nextSession.sessionType === "chat" ? (
                        <MessageSquare size={14} />
                      ) : (
                        <Video size={14} />
                      )}
                      {nextCanJoin ? "Join" : "Not ready yet"}
                    </button>
                  )}
                </div>
              </Card>
            )}

            {/* Tabs: Upcoming, Completed, Journal */}
            <div className="flex gap-2 border-b border-slate-200 pb-1">
              {[
                { id: "upcoming", label: "Upcoming" },
                { id: "completed", label: "Completed" },
                { id: "blogs", label: "Journal" },
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

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === "upcoming" && (
                <motion.div
                  key="upcoming"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="space-y-4"
                >
                  {upcomingBookings.length === 0 ? (
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
                    upcomingBookings.map((b) => {
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

                      const now = new Date();
                      const joinOpensAt =
                        start &&
                        new Date(
                          start.getTime() - PRE_JOIN_MINUTES * 60 * 1000
                        );
                      const canJoinNow =
                        start &&
                        end &&
                        now >= joinOpensAt &&
                        now <= end;

                      return (
                        <Card key={b._id} className="p-4 md:p-5">
                          <div className="flex flex-wrap items-start justify-between gap-4">
                            <div className="flex gap-3">
                              {/* Simple icon instead of counselor image */}
                              <div
                                className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center cursor-pointer"
                                onClick={() => {
                                  const cid = getCounselorId(b);
                                  if (cid) navigate(`/counselor/${cid}`);
                                }}
                              >
                                <User size={18} className="text-slate-500" />
                              </div>
                              <div>
                                <div
                                  className="text-sm font-semibold text-slate-900 cursor-pointer hover:underline"
                                  onClick={() => {
                                    const cid = getCounselorId(b);
                                    if (cid) navigate(`/counselor/${cid}`);
                                  }}
                                >
                                  {getCounselorName(b)}
                                </div>
                                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                                  <span className="inline-flex items-center gap-1">
                                    <Calendar size={12} />
                                    {new Date(
                                      b.date
                                    ).toLocaleDateString()}
                                  </span>
                                  <span className="inline-flex items-center gap-1">
                                    <Clock size={12} />
                                    {b.time}
                                  </span>
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

              {activeTab === "completed" && (
                <motion.div
                  key="completed"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="space-y-4"
                >
                  {completedBookings.length === 0 ? (
                    <Card className="p-6 text-center">
                      <p className="text-sm text-slate-500">
                        No completed sessions yet.
                      </p>
                    </Card>
                  ) : (
                    <>
                      {completedSlice.map((b) => (
                        <Card key={b._id} className="p-4 md:p-5">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex gap-3">
                              {/* Simple icon instead of counselor image */}
                              <div
                                className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center cursor-pointer"
                                onClick={() => {
                                  const cid = getCounselorId(b);
                                  if (cid) navigate(`/counselor/${cid}`);
                                }}
                              >
                                <User size={18} className="text-slate-500" />
                              </div>
                              <div>
                                <div
                                  className="text-sm font-semibold text-slate-900 cursor-pointer hover:underline"
                                  onClick={() => {
                                    const cid = getCounselorId(b);
                                    if (cid) navigate(`/counselor/${cid}`);
                                  }}
                                >
                                  {getCounselorName(b)}
                                </div>
                                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                                  <span className="inline-flex items-center gap-1">
                                    <Calendar size={12} />
                                    {new Date(
                                      b.date
                                    ).toLocaleDateString()}
                                  </span>
                                  <span className="inline-flex items-center gap-1">
                                    <Clock size={12} />
                                    {b.time}
                                  </span>
                                  <span className="inline-flex items-center gap-1">
                                    <span className="w-1 h-1 rounded-full bg-slate-400" />
                                    {b.durationMin || 60} min
                                  </span>
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
                      {/* Pagination for completed */}
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
                          Page {completedPage} of {totalCompletedPages}
                        </span>
                        <button
                          disabled={completedPage === totalCompletedPages}
                          onClick={() =>
                            setCompletedPage((p) =>
                              Math.min(totalCompletedPages, p + 1)
                            )
                          }
                          className={`px-3 py-1 rounded-full border text-xs ${
                            completedPage === totalCompletedPages
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

              {activeTab === "blogs" && (
                <motion.div
                  key="blogs"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="space-y-4"
                >
                  <div className="flex justify-between items-center mb-1">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        Your Journal
                      </h3>
                      <p className="text-xs text-slate-500">
                        Capture thoughts, feelings, and reflections.
                      </p>
                    </div>
                    <button
                      onClick={() => navigate("/blogs/write")}
                      className="px-4 py-2 rounded-full bg-emerald-500 text-white text-[11px] font-semibold uppercase tracking-[0.16em] hover:bg-emerald-400 transition-colors"
                    >
                      New Entry
                    </button>
                  </div>

                  {blogs.length === 0 ? (
                    <Card className="p-8 text-center">
                      <FileText
                        className="mx-auto text-slate-300 mb-4"
                        size={42}
                      />
                      <p className="text-sm text-slate-500">
                        You haven&apos;t written any entries yet.
                      </p>
                    </Card>
                  ) : (
                    <>
                      {blogsSlice.map((blog) => (
                        <Card
                          key={blog._id}
                          className="p-5 bg-white cursor-pointer hover:border-emerald-300 transition-colors"
                          onClick={() => navigate(`/blogs/${blog._id}`)}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h4 className="text-sm font-semibold text-slate-900 mb-1.5">
                                {blog.title}
                              </h4>
                              <p className="text-xs text-slate-500 mb-3 line-clamp-3">
                                {blog.content}
                              </p>
                              <div className="text-[11px] text-slate-400">
                                {new Date(
                                  blog.createdAt
                                ).toLocaleDateString()}
                              </div>
                            </div>
                            <div className="flex gap-1.5">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditBlog(blog._id);
                                }}
                                className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-emerald-500 hover:text-white transition-colors"
                              >
                                <Edit size={14} />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteBlog(blog._id);
                                }}
                                className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-rose-500 hover:text-white transition-colors"
                              >
                                <Trash size={14} />
                              </button>
                            </div>
                          </div>
                        </Card>
                      ))}
                      {/* Pagination for journal */}
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
                          Page {blogPage} of {totalBlogPages}
                        </span>
                        <button
                          disabled={blogPage === totalBlogPages}
                          onClick={() =>
                            setBlogPage((p) =>
                              Math.min(totalBlogPages, p + 1)
                            )
                          }
                          className={`px-3 py-1 rounded-full border text-xs ${
                            blogPage === totalBlogPages
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

export default ClientDashboard;