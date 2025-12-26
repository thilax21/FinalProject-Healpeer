

// import React, { useEffect, useState, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { 
//   motion, useScroll, useTransform, useSpring, AnimatePresence 
// } from "framer-motion";
// import { 
//   Heart, Edit3, ArrowLeft, Share2, 
//   Clock, Calendar, Bookmark, Sparkles, Quote
// } from "lucide-react";
// import API from "../api/api";
// import BlogPopup from "../components/BlogPopup";
// import { toast } from "react-hot-toast";

// // --- 🌿 VISUAL ASSETS ---

// const Grain = () => (
//   <div className="fixed inset-0 pointer-events-none z-[0] opacity-[0.04] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] filter contrast-150 brightness-100" />
// );

// const BlurBackground = () => (
//   <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#f4f2ed]">
//     <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#3f6212] rounded-full mix-blend-multiply filter blur-[120px] opacity-10 animate-pulse" />
//     <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-stone-400 rounded-full mix-blend-multiply filter blur-[120px] opacity-10" />
//   </div>
// );

// // --- 🏝️ DYNAMIC DOCK (The Modern Nav) ---

// const DynamicDock = ({ likes, liked, onLike, onBack, onEdit, isAuthor, progress }) => {
//   const circleLength = 2 * Math.PI * 18; // r=18
//   const strokeDashoffset = useTransform(progress, [0, 1], [circleLength, 0]);

//   return (
//     <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
//       <motion.div 
//         initial={{ y: 100, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ type: "spring", damping: 20, stiffness: 300 }}
//         className="flex items-center gap-2 p-2 bg-[#1c1917]/90 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl shadow-stone-900/20"
//       >
//         {/* Back */}
//         <button onClick={onBack} className="p-3 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors">
//           <ArrowLeft size={20} />
//         </button>

//         <div className="w-px h-6 bg-white/10 mx-1" />

//         {/* Like Action */}
//         <button 
//           onClick={onLike}
//           className={`group flex items-center gap-2 px-4 py-2.5 rounded-full transition-all ${liked ? "bg-red-500/20 text-red-400" : "hover:bg-white/10 text-white"}`}
//         >
//           <Heart size={18} className={liked ? "fill-current" : "group-hover:scale-110 transition-transform"} />
//           <span className="text-sm font-mono font-bold">{likes}</span>
//         </button>

//         {/* Edit (Conditional) */}
//         <AnimatePresence>
//           {isAuthor && (
//             <motion.button
//               initial={{ width: 0, scale: 0 }} animate={{ width: "auto", scale: 1 }}
//               onClick={onEdit}
//               className="p-3 rounded-full bg-white text-black hover:bg-stone-200 transition-colors"
//             >
//               <Edit3 size={18} />
//             </motion.button>
//           )}
//         </AnimatePresence>

//         <div className="w-px h-6 bg-white/10 mx-1" />

//         {/* Progress Indicator */}
//         <div className="relative w-10 h-10 flex items-center justify-center">
//           <svg className="w-full h-full -rotate-90">
//             <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-white/10" />
//             <motion.circle 
//               cx="20" cy="20" r="18" stroke="#3f6212" strokeWidth="2" fill="transparent" 
//               strokeDasharray={circleLength} style={{ strokeDashoffset }} strokeLinecap="round"
//             />
//           </svg>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <span className="text-[8px] font-bold uppercase text-white/50">Read</span>
//           </div>
//         </div>

//       </motion.div>
//     </div>
//   );
// };

// // --- 📖 MAIN PAGE ---

// const SingleBlog = ({ user }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [blog, setBlog] = useState(null);
//   const [liked, setLiked] = useState(false);
//   const [likesCount, setLikesCount] = useState(0);
//   const [showEdit, setShowEdit] = useState(false);
//   const [loading, setLoading] = useState(true);

//   // Scroll Physics
//   const { scrollYProgress, scrollY } = useScroll();
//   const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
//   const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
//   const heroScale = useTransform(scrollY, [0, 500], [1, 0.95]);
//   const imgY = useTransform(scrollY, [0, 800], [0, 150]);

//   // Fetch Data
//   const fetchBlog = async () => {
//     try {
//       const { data } = await API.get("/blogs/all");
//       const selected = data.data.find((b) => b._id === id);
//       if (selected) {
//         setBlog(selected);
//         setLikesCount(selected.likes?.length || 0);
//         if (user && selected.likes?.includes(user._id)) setLiked(true);
//       }
//     } catch (err) { console.error(err); } 
//     finally { setTimeout(() => setLoading(false), 600); }
//   };

//   useEffect(() => { fetchBlog(); }, [id, user]);

//   const handleLike = async () => {
//     if (!user) return toast.error("Please login to like.");
//     if (liked) return;
//     try {
//       await API.post(`/blogs/${id}/like`);
//       setLiked(true);
//       setLikesCount(p => p + 1);
//       toast.success("Story liked!");
//     } catch (err) { console.error(err); }
//   };

//   if (loading) return (
//     <div className="h-screen bg-[#f4f2ed] flex items-center justify-center">
//       <div className="flex flex-col items-center gap-4">
//         <Sparkles className="animate-spin text-[#3f6212]" />
//         <span className="font-serif text-[#1c1917] tracking-widest text-sm">Preparing Story...</span>
//       </div>
//     </div>
//   );

//   if (!blog) return <div className="h-screen flex items-center justify-center">Story not found.</div>;

//   const readTime = Math.ceil((blog.content?.length || 0) / 1000);
//   const imageUrl = blog.imageUrl ? (blog.imageUrl.startsWith('http') ? blog.imageUrl : `http://localhost:3000${blog.imageUrl}`) : null;

//   return (
//     <div className="min-h-screen font-sans text-[#1c1917] selection:bg-[#3f6212] selection:text-white overflow-x-hidden relative ">
//       <Grain />
//       <BlurBackground />

//       {/* --- HERO SECTION --- */}
//       <motion.header 
//         style={{ opacity: heroOpacity, scale: heroScale }}
//         className="relative min-h-[80vh] flex flex-col justify-center items-center text-center px-6 pt-20 top-5"
//       >
//         <motion.div 
//           initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
//           className="flex items-center gap-3 mb-8"
//         >
//           <span className="px-3 py-1 rounded-full border border-[#1c1917]/10 text-[10px] font-bold uppercase tracking-widest bg-white/50 backdrop-blur-md">
//             The Journal
//           </span>
//           <span className="text-stone-400 text-xs font-bold">•</span>
//           <span className="text-xs font-bold uppercase tracking-widest text-stone-500">{readTime} Min Read</span>
//         </motion.div>

//         <motion.h1 
//           initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1, duration: 0.8 }}
//           className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-[0.95] tracking-tight max-w-5xl text-[#1c1917] mb-12"
//         >
//           {blog.title}
//         </motion.h1>

//         <motion.div 
//           initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
//           className="flex items-center gap-4"
//         >
//           <div className="w-12 h-12 rounded-full bg-white p-1 shadow-sm">
//             <div className="w-full h-full rounded-full bg-stone-200 flex items-center justify-center font-bold text-stone-500 text-lg">
//               {blog.author?.name?.[0]}
//             </div>
//           </div>
//           <div className="text-left">
//             <p className="text-sm font-bold text-[#1c1917]">{blog.author?.name}</p>
//             <p className="text-[10px] uppercase tracking-widest text-stone-500">Published {new Date(blog.createdAt).toLocaleDateString()}</p>
//           </div>
//         </motion.div>
//       </motion.header>

//       {/* --- VISUAL COVER --- */}
//       {imageUrl && (
//         <div className="w-full max-w-[1200px] mx-auto px-6 mb-24">
//           <div className="relative aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-2xl">
//             <motion.div style={{ y: imgY }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
//               <img src={imageUrl} alt="Cover" className="w-full h-full object-cover" />
//             </motion.div>
//             <div className="absolute inset-0 bg-black/10" />
//           </div>
//         </div>
//       )}

//       {/* --- CONTENT BODY --- */}
//       <article className="max-w-3xl mx-auto px-6 pb-48">
//         {blog.content.split('\n').map((para, i) => (
//           <React.Fragment key={i}>
//             <motion.p 
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: "-100px" }}
//               transition={{ duration: 0.6, delay: 0.1 }}
//               className={`mb-10 font-serif text-xl leading-[1.8] text-stone-800 font-light ${
//                 i === 0 ? "first-letter:text-7xl first-letter:font-bold first-letter:mr-4 first-letter:float-left first-letter:text-[#1c1917]" : ""
//               }`}
//             >
//               {para}
//             </motion.p>
            
//             {/* Decorative Quote Break */}
//             {i === 2 && (
//               <motion.div 
//                 initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
//                 className="my-16 p-10 bg-white rounded-[2rem] border border-stone-100 shadow-sm text-center"
//               >
//                 <Quote className="mx-auto mb-4 text-[#3f6212] opacity-50" />
//                 <p className="text-2xl font-serif italic text-[#1c1917]">"Healing is an art. It takes time, it takes practice, and it takes love."</p>
//               </motion.div>
//             )}
//           </React.Fragment>
//         ))}

//         <div className="mt-24 pt-12 border-t border-[#1c1917]/10 text-center">
//           <Sparkles className="mx-auto mb-4 text-[#3f6212]" size={24} />
//           <h3 className="text-2xl font-serif font-bold mb-2">End of Story</h3>
//           <p className="text-stone-500 text-sm">Thank you for reading.</p>
//         </div>
//       </article>

//       {/* --- THE DOCK --- */}
//       <DynamicDock 
//         progress={smoothProgress} 
//         likes={likesCount} 
//         liked={liked}
//         onLike={handleLike}
//         onBack={() => navigate('/blogs')}
//         onEdit={() => setShowEdit(true)}
//         isAuthor={user && blog.author?._id === user._id}
//       />

//       {/* --- MODALS --- */}
//       <AnimatePresence>
//         {showEdit && (
//           <BlogPopup 
//             user={user} 
//             existingBlog={blog} 
//             onClose={() => setShowEdit(false)} 
//             onSaved={() => { fetchBlog(); setShowEdit(false); }} 
//           />
//         )}
//       </AnimatePresence>

//     </div>
//   );
// };

// export default SingleBlog;

// src/pages/Blog.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import API from "../api/api";

const GrainTexture = () => (
  <div
    className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] mix-blend-overlay"
    style={{
      backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
      filter: "contrast(170%) brightness(100%)",
    }}
  />
);

const DEFAULT_IMAGE =
  "https://img.freepik.com/free-vector/abstract-hand-painted-alcohol-ink-background-with-mandala-design_1048-20172.jpg?semt=ais_hybrid&w=740&q=80";

const SingleBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await API.get(`/blogs/${id}`);
        setBlog(data.data || data.blog || null);
      } catch (err) {
        console.error("Failed to load blog:", err);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f2ed] flex items-center justify-center text-[#3f6212] font-serif text-xl animate-pulse">
        Loading story...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#f4f2ed] flex flex-col items-center justify-center text-stone-600">
        <p className="mb-4">Blog not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="text-xs font-bold uppercase tracking-widest text-[#3f6212] underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Backend sends full imageUrl (http/https)
  const imageUrl = blog.imageUrl || DEFAULT_IMAGE;

  const createdAt = new Date(blog.createdAt || Date.now()).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );

  const readTime = Math.ceil((blog.content?.length || 0) / 1000);

  return (
    <div className="min-h-screen bg-[#f4f2ed] text-[#1c1917] selection:bg-[#3f6212] selection:text-white font-sans relative">
      <GrainTexture />

      <main className="max-w-5xl mx-auto px-6 pt-24 pb-24 relative z-10">
        {/* Back button */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-[#1c1917] transition-colors"
          >
            <ArrowLeft size={16} /> Back
          </button>

          <Link
            to="/blogs"
            className="text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-[#3f6212] transition-colors"
          >
            All Articles
          </Link>
        </div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-[2rem] overflow-hidden shadow-md bg-stone-200"
        >
          <img
            src={imageUrl}
            alt={blog.title}
            className="w-full h-[260px] md:h-[360px] object-cover"
            onError={(e) => {
              e.target.src = DEFAULT_IMAGE;
            }}
          />
        </motion.div>

        {/* Meta & Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">
            <span className="flex items-center gap-1">
              <Calendar size={12} /> {createdAt}
            </span>
            <span className="w-1 h-1 rounded-full bg-stone-300" />
            <span className="flex items-center gap-1">
              <Clock size={12} /> {readTime} min read
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-serif text-[#1c1917] mb-3 leading-tight">
            {blog.title}
          </h1>

          <div className="flex items-center gap-2 text-xs font-bold text-stone-600 uppercase tracking-wider mb-6">
            <div className="w-7 h-7 rounded-full bg-[#f4f2ed] flex items-center justify-center text-[#3f6212] border border-stone-200">
              <User size={14} />
            </div>
            <span>{blog.author?.name || "Anonymous"}</span>
          </div>
        </motion.div>

        {/* Content */}
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="prose prose-stone max-w-none prose-headings:font-serif prose-p:text-stone-700 prose-p:leading-relaxed"
        >
          {/* If content is HTML (rich text) */}
          <div
            className="text-sm md:text-base leading-relaxed text-stone-700"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </motion.article>
      </main>
    </div>
  );
};

export default SingleBlog;