

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, LogOut, User, MessageCircle, 
  LayoutDashboard, ChevronDown, Home, BookOpen, Users, Sparkles, ArrowRight
} from "lucide-react";
import logo from "../assets/healpeer.png"; 

// --- 🌿 VISUALS ---
const Grain = () => (
  <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.04] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] filter contrast-150 brightness-100" />
);

// --- 🧭 NAVBAR COMPONENT ---

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(location.pathname);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileMenuOpen(false);
    setHoveredPath(location.pathname);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUser(null);
    navigate("/");
  };

  const getInitials = () => user?.name ? user.name.charAt(0).toUpperCase() : "U";

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Blogs", path: "/blogs" },
    { name: "Counselors", path: "/counselors" },
    { name: "About", path: "/about" },
    ...(user ? [{ name: "Chat", path: "/chat", isLive: true }] : [])
  ];

  const getDashboardPath = (role) => {
    if (role === "admin") return "/admin/dashboard";
    if (role === "counselor") return "/counselor/dashboard";
    return "/client/dashboard"; // default for client/normal user
  };

  return (
    <>
      {/* --- 🛸 THE FLOATING DOCK --- */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed left-0 right-0 z-50 flex justify-center transition-all duration-500 ${
          scrolled ? "top-4" : "top-6"
        }`}
      >
        <motion.div 
          layout
          className={`
            relative flex items-center justify-between rounded-full transition-all duration-500
            bg-white/80 backdrop-blur-2xl border border-white/50 shadow-[0_8px_40px_-10px_rgba(0,0,0,0.08)]
            ${scrolled ? "w-[90%] md:w-auto px-2 py-2" : "w-[95%] max-w-7xl px-6 py-3"}
          `}
        >
          
          {/* 1. BRAND IDENTITY */}
          <Link to="/" className="flex items-center gap-3 group px-2 shrink-0">
            <div className="relative  flex items-center justify-center">
              <img 
                src={logo} 
                alt="HealPeer" 
                className="h-[40px] w-[100px] object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-300" 
              />
            </div>
            {/* <span className={`font-serif font-bold text-xl tracking-tight text-[#1c1917] hidden ${scrolled ? 'lg:block' : 'sm:block'}`}>
              Heal<span className="text-[#3f6212]">Peer</span>.
            </span> */}
          </Link>

          {/* 2. MAGNETIC NAVIGATION (Desktop) */}
          <nav 
            className="hidden md:flex items-center gap-1 bg-[#f4f2ed]/50 p-1.5 rounded-full border border-[#1c1917]/5 mx-4"
            onMouseLeave={() => setHoveredPath(location.pathname)}
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onMouseEnter={() => setHoveredPath(link.path)}
                  className={`relative px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors z-10 ${
                    isActive ? "text-[#1c1917]" : "text-stone-500 hover:text-[#1c1917]"
                  }`}
                >
                  {/* The Magnetic Pill Background */}
                  {hoveredPath === link.path && (
                    <motion.div
                      layoutId="navbar-pill"
                      className="absolute inset-0 bg-white rounded-full shadow-sm border border-stone-100 -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="flex items-center gap-2 relative z-20">
                    {link.name}
                    {link.isLive && <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]" />}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* 3. ACTION AREA */}
          <div className="flex items-center gap-2 px-1">
            {!user ? (
              <>
                <Link to="/login" className="hidden md:block px-5 py-2 text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-[#1c1917] transition-colors">
                  Log In
                </Link>
                <Link 
                  to="/register" 
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#1c1917] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#3f6212] transition-all shadow-lg hover:shadow-xl active:scale-95"
                >
                  Register <ArrowRight size={14} />
                </Link>
              </>
            ) : (
              <div className="relative">
                <button 
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center gap-2 pl-1 pr-3 py-1 bg-white border border-stone-200 rounded-full hover:border-stone-300 transition-all group shadow-sm"
                >
                  <div className="w-9 h-9 bg-[#3f6212] text-white rounded-full flex items-center justify-center text-sm font-bold border-2 border-white group-hover:scale-105 transition-transform">
                    {getInitials()}
                  </div>
                  <ChevronDown size={14} className={`text-stone-400 transition-transform duration-300 ${profileMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Profile Dropdown (Floating Card) */}
                <AnimatePresence>
                  {profileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95, rotateX: -10 }}
                      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      style={{ transformOrigin: "top right" }}
                      className="absolute top-full right-0 mt-3 w-64 bg-white/90 backdrop-blur-xl rounded-[1.5rem] shadow-2xl border border-white/60 overflow-hidden p-2 z-50"
                    >
                      <div className="p-4 bg-[#1c1917] rounded-2xl text-white mb-2 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-[#3f6212] rounded-full blur-[30px] opacity-50 translate-x-1/2 -translate-y-1/2" />
                        <div className="relative z-10">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-1">Account</p>
                          <p className="text-sm font-bold truncate">{user.email}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        {/* <Link to={user.role === 'admin' ? "/admin/dashboard" : "/profile"} className="flex items-center gap-3 px-4 py-3 text-xs font-bold text-stone-600 hover:text-[#1c1917] hover:bg-[#f4f2ed] rounded-xl transition-colors">
                          <LayoutDashboard size={16} /> Dashboard
                        </Link> */}
                        <Link
  to={getDashboardPath(user.role)}
  className="flex items-center gap-3 px-4 py-3 text-xs font-bold text-stone-600 hover:text-[#1c1917] hover:bg-[#f4f2ed] rounded-xl transition-colors"
>
  <LayoutDashboard size={16} /> Dashboard
</Link>
                        <Link to="/chat" className="flex items-center gap-3 px-4 py-3 text-xs font-bold text-stone-600 hover:text-[#1c1917] hover:bg-[#f4f2ed] rounded-xl transition-colors">
                          <MessageCircle size={16} /> Active Chats
                        </Link>
                      </div>
                      
                      <div className="h-px bg-stone-100 my-2" />
                      
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                        <LogOut size={16} /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Mobile Toggle */}
            <button 
              className="md:hidden p-3 bg-stone-100 rounded-full text-[#1c1917] hover:bg-stone-200 transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </button>
          </div>

        </motion.div>
      </motion.header>

      {/* --- MOBILE FULLSCREEN MENU --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[100] bg-[#1c1917] text-[#f2f0e9] flex flex-col"
          >
            <Grain />
            
            {/* Mobile Header */}
            <div className="flex justify-between items-center p-8 border-b border-white/10">
               <div className="flex items-center gap-3">
                 <img src={logo} alt="" className="h-8 w-auto brightness-0 invert" /> 
                 <span className="font-serif font-bold text-2xl">HealPeer.</span>
               </div>
               <button onClick={() => setMobileMenuOpen(false)} className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                 <X size={24} />
               </button>
            </div>

            {/* Links */}
            <div className="flex-1 flex flex-col justify-center px-8 gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + (i * 0.05) }}
                >
                  <Link 
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between group border-b border-white/5 py-4"
                  >
                    <span className="text-4xl md:text-5xl font-serif font-light group-hover:text-[#3f6212] group-hover:pl-4 transition-all duration-300">
                      {link.name}
                    </span>
                    <ArrowRight className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#3f6212]" size={24} />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Footer */}
            <div className="p-8 bg-[#1c1917] border-t border-white/10 relative z-10">
              {!user ? (
                <div className="flex flex-col gap-4">
                  <Link to="/register" className="w-full py-4 bg-[#f2f0e9] text-[#1c1917] rounded-2xl text-center font-bold uppercase tracking-widest text-xs hover:bg-white" onClick={() => setMobileMenuOpen(false)}>
                    Create Account
                  </Link>
                  <Link to="/login" className="w-full py-4 border border-white/20 rounded-2xl text-center font-bold uppercase tracking-widest text-xs hover:bg-white/5" onClick={() => setMobileMenuOpen(false)}>
                    Log In
                  </Link>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#3f6212] rounded-full flex items-center justify-center font-bold text-lg">
                      {getInitials()}
                    </div>
                    <div>
                      <p className="font-bold text-lg">{user.name}</p>
                      <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="text-xs text-red-400 uppercase tracking-widest font-bold mt-1 hover:text-red-300">
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;