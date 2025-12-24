// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import API from "../api/api";

// const SingleBlog = ({ user }) => {
//   const { id } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [liked, setLiked] = useState(false);

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const { data } = await API.get(`/blogs`);
//         const selected = data.data.find((b) => b._id === id);
//         setBlog(selected);

//         if (user && selected.likes?.includes(user._id)) {
//           setLiked(true); // Already liked
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchBlog();
//   }, [id, user]);

//   const handleLike = async () => {
//     if (!user) return alert("Please login to like blogs");
//     if (liked) return; // Prevent multiple likes

//     try {
//       const { data } = await API.post(`/blogs/${id}/like`);
//       setBlog(data.data);
//       setLiked(true);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (!blog) return <p>Loading...</p>;

//   return (
//     <div className="single-blog-page">
//       <div className="blog-header">
//         <h1>{blog.title}</h1>
//         {user && (
//           <Link to="/blogs/write" className="write-btn">
//             ✍️ Write
//           </Link>
//         )}
//       </div>

//       {blog.imageUrl && <img src={blog.imageUrl} alt={blog.title} className="blog-image" />}
//       <p className="blog-content">{blog.content}</p>
//       <p className="author">✍️ {blog.author?.name} ({blog.author?.role})</p>

//       <button
//         className={`like-btn ${liked ? "liked" : ""}`}
//         onClick={handleLike}
//         disabled={liked}
//       >
//         👍 Like ({blog.likes?.length || 0})
//       </button>
//     </div>
//   );
// };

// export default SingleBlog;
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import API from "../api/api";
// import BlogPopup from "../components/BlogPopup";

// const SingleBlog = ({ user }) => {
//   const { id } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [showEditPopup, setShowEditPopup] = useState(false);

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const { data } = await API.get("/blogs");
//         const selected = data.data.find((b) => b._id === id);
//         setBlog(selected);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchBlog();
//   }, [id]);

//   if (!blog) return <p>Loading...</p>;

//   const isAuthor = user && blog.author?._id === user._id;

//   return (
//     <div className="single-blog-page">
//       <h1>{blog.title}</h1>
//       {blog.imageUrl && <img src={blog.imageUrl} alt={blog.title} />}
//       <p>{blog.content}</p>
//       <p className="author">✍️ {blog.author?.name}</p>

//       {isAuthor && (
//         <button
//           className="edit-blog-btn"
//           onClick={() => setShowEditPopup(true)}
//         >
//           ✏️ Edit
//         </button>
//       )}

//       {showEditPopup && (
//         <BlogPopup
//           user={user}
//           existingBlog={blog}
//           onClose={() => setShowEditPopup(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default SingleBlog;

// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import API from "../api/api";
// import BlogPopup from "../components/BlogPopup";

// const SingleBlog = ({ user }) => {
//   const { id } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [liked, setLiked] = useState(false);
//   const [showEdit, setShowEdit] = useState(false);

//   const fetchBlog = async () => {
//     try {
//       const { data } = await API.get(`/blogs/${id}`);
//       setBlog(data.data);
//       if (user && data.data.likes?.some(l => l === user._id || l._id === user._id)) setLiked(true);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchBlog();
//     // eslint-disable-next-line
//   }, [id]);

//   const handleLike = async () => {
//     if (!user) return alert("Please login to like");
//     if (liked) return;
//     try {
//       const token = localStorage.getItem("token");
//       const { data } = await API.post(`/blogs/${id}/like`, null, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setBlog(data.data);
//       setLiked(true);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (!blog) return <div className="p-8 text-center">Loading...</div>;

//   const isAuthor = user && blog.author && (blog.author._id === user._id || blog.author === user._id);

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-12">
//       <div className="mb-6">
//         <h1 className="text-4xl font-extrabold text-gray-800 mb-3">{blog.title}</h1>
//         <div className="flex items-center gap-3 text-sm text-gray-500">
//           <div>✍️ {blog.author?.name || "Unknown"}</div>
//           <div>•</div>
//           <div>{new Date(blog.createdAt).toLocaleString()}</div>
//         </div>
//       </div>

//       {blog.imageUrl && (
//         <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
//           <img src={blog.imageUrl} alt={blog.title} className="w-full h-96 object-cover" />
//         </div>
//       )}

//       <div className="prose max-w-none mb-8">
//         {/* If you have content with newlines, preserve them */}
//         {blog.content.split("\n").map((p, idx) => (
//           <p key={idx} className="text-gray-700 leading-7">{p}</p>
//         ))}
//       </div>

//       <div className="flex items-center gap-3">
//         <button
//           onClick={handleLike}
//           disabled={liked}
//           className={`px-4 py-2 rounded-lg border ${liked ? "bg-gray-100 text-gray-500" : "bg-indigo-600 text-white hover:bg-indigo-700"}`}
//         >
//           👍 {liked ? "Liked" : "Like"} ({blog.likes?.length || 0})
//         </button>

//         {isAuthor && (
//           <button onClick={() => setShowEdit(true)} className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50">
//             ✏️ Edit
//           </button>
//         )}

//         <Link to="/blogs" className="ml-auto text-sm text-indigo-600 hover:underline">← Back to blogs</Link>
//       </div>

//       {showEdit && (
//         <BlogPopup
//           user={user}
//           existingBlog={blog}
//           onClose={() => { setShowEdit(false); fetchBlog(); }}
//           onSaved={() => fetchBlog()}
//         />
//       )}
//     </div>
//   );
// };

// export default SingleBlog;

import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  motion, useScroll, useTransform, useSpring, AnimatePresence 
} from "framer-motion";
import { 
  Heart, Edit3, ArrowLeft, Share2, 
  Clock, Calendar, Bookmark, Sparkles, Quote
} from "lucide-react";
import API from "../api/api";
import BlogPopup from "../components/BlogPopup";
import { toast } from "react-hot-toast";

// --- 🌿 VISUAL ASSETS ---

const Grain = () => (
  <div className="fixed inset-0 pointer-events-none z-[0] opacity-[0.04] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] filter contrast-150 brightness-100" />
);

const BlurBackground = () => (
  <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#f4f2ed]">
    <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#3f6212] rounded-full mix-blend-multiply filter blur-[120px] opacity-10 animate-pulse" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-stone-400 rounded-full mix-blend-multiply filter blur-[120px] opacity-10" />
  </div>
);

// --- 🏝️ DYNAMIC DOCK (The Modern Nav) ---

const DynamicDock = ({ likes, liked, onLike, onBack, onEdit, isAuthor, progress }) => {
  const circleLength = 2 * Math.PI * 18; // r=18
  const strokeDashoffset = useTransform(progress, [0, 1], [circleLength, 0]);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="flex items-center gap-2 p-2 bg-[#1c1917]/90 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl shadow-stone-900/20"
      >
        {/* Back */}
        <button onClick={onBack} className="p-3 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </button>

        <div className="w-px h-6 bg-white/10 mx-1" />

        {/* Like Action */}
        <button 
          onClick={onLike}
          className={`group flex items-center gap-2 px-4 py-2.5 rounded-full transition-all ${liked ? "bg-red-500/20 text-red-400" : "hover:bg-white/10 text-white"}`}
        >
          <Heart size={18} className={liked ? "fill-current" : "group-hover:scale-110 transition-transform"} />
          <span className="text-sm font-mono font-bold">{likes}</span>
        </button>

        {/* Edit (Conditional) */}
        <AnimatePresence>
          {isAuthor && (
            <motion.button
              initial={{ width: 0, scale: 0 }} animate={{ width: "auto", scale: 1 }}
              onClick={onEdit}
              className="p-3 rounded-full bg-white text-black hover:bg-stone-200 transition-colors"
            >
              <Edit3 size={18} />
            </motion.button>
          )}
        </AnimatePresence>

        <div className="w-px h-6 bg-white/10 mx-1" />

        {/* Progress Indicator */}
        <div className="relative w-10 h-10 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90">
            <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-white/10" />
            <motion.circle 
              cx="20" cy="20" r="18" stroke="#3f6212" strokeWidth="2" fill="transparent" 
              strokeDasharray={circleLength} style={{ strokeDashoffset }} strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[8px] font-bold uppercase text-white/50">Read</span>
          </div>
        </div>

      </motion.div>
    </div>
  );
};

// --- 📖 MAIN PAGE ---

const SingleBlog = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  // Scroll Physics
  const { scrollYProgress, scrollY } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.95]);
  const imgY = useTransform(scrollY, [0, 800], [0, 150]);

  // Fetch Data
  const fetchBlog = async () => {
    try {
      const { data } = await API.get("/blogs/all");
      const selected = data.data.find((b) => b._id === id);
      if (selected) {
        setBlog(selected);
        setLikesCount(selected.likes?.length || 0);
        if (user && selected.likes?.includes(user._id)) setLiked(true);
      }
    } catch (err) { console.error(err); } 
    finally { setTimeout(() => setLoading(false), 600); }
  };

  useEffect(() => { fetchBlog(); }, [id, user]);

  const handleLike = async () => {
    if (!user) return toast.error("Please login to like.");
    if (liked) return;
    try {
      await API.post(`/blogs/${id}/like`);
      setLiked(true);
      setLikesCount(p => p + 1);
      toast.success("Story liked!");
    } catch (err) { console.error(err); }
  };

  if (loading) return (
    <div className="h-screen bg-[#f4f2ed] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Sparkles className="animate-spin text-[#3f6212]" />
        <span className="font-serif text-[#1c1917] tracking-widest text-sm">Preparing Story...</span>
      </div>
    </div>
  );

  if (!blog) return <div className="h-screen flex items-center justify-center">Story not found.</div>;

  const readTime = Math.ceil((blog.content?.length || 0) / 1000);
  const imageUrl = blog.imageUrl ? (blog.imageUrl.startsWith('http') ? blog.imageUrl : `http://localhost:3000${blog.imageUrl}`) : null;

  return (
    <div className="min-h-screen font-sans text-[#1c1917] selection:bg-[#3f6212] selection:text-white overflow-x-hidden relative ">
      <Grain />
      <BlurBackground />

      {/* --- HERO SECTION --- */}
      <motion.header 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-[80vh] flex flex-col justify-center items-center text-center px-6 pt-20 top-5"
      >
        <motion.div 
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="px-3 py-1 rounded-full border border-[#1c1917]/10 text-[10px] font-bold uppercase tracking-widest bg-white/50 backdrop-blur-md">
            The Journal
          </span>
          <span className="text-stone-400 text-xs font-bold">•</span>
          <span className="text-xs font-bold uppercase tracking-widest text-stone-500">{readTime} Min Read</span>
        </motion.div>

        <motion.h1 
          initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1, duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-[0.95] tracking-tight max-w-5xl text-[#1c1917] mb-12"
        >
          {blog.title}
        </motion.h1>

        <motion.div 
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
          className="flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-full bg-white p-1 shadow-sm">
            <div className="w-full h-full rounded-full bg-stone-200 flex items-center justify-center font-bold text-stone-500 text-lg">
              {blog.author?.name?.[0]}
            </div>
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-[#1c1917]">{blog.author?.name}</p>
            <p className="text-[10px] uppercase tracking-widest text-stone-500">Published {new Date(blog.createdAt).toLocaleDateString()}</p>
          </div>
        </motion.div>
      </motion.header>

      {/* --- VISUAL COVER --- */}
      {imageUrl && (
        <div className="w-full max-w-[1200px] mx-auto px-6 mb-24">
          <div className="relative aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-2xl">
            <motion.div style={{ y: imgY }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
              <img src={imageUrl} alt="Cover" className="w-full h-full object-cover" />
            </motion.div>
            <div className="absolute inset-0 bg-black/10" />
          </div>
        </div>
      )}

      {/* --- CONTENT BODY --- */}
      <article className="max-w-3xl mx-auto px-6 pb-48">
        {blog.content.split('\n').map((para, i) => (
          <React.Fragment key={i}>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`mb-10 font-serif text-xl leading-[1.8] text-stone-800 font-light ${
                i === 0 ? "first-letter:text-7xl first-letter:font-bold first-letter:mr-4 first-letter:float-left first-letter:text-[#1c1917]" : ""
              }`}
            >
              {para}
            </motion.p>
            
            {/* Decorative Quote Break */}
            {i === 2 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                className="my-16 p-10 bg-white rounded-[2rem] border border-stone-100 shadow-sm text-center"
              >
                <Quote className="mx-auto mb-4 text-[#3f6212] opacity-50" />
                <p className="text-2xl font-serif italic text-[#1c1917]">"Healing is an art. It takes time, it takes practice, and it takes love."</p>
              </motion.div>
            )}
          </React.Fragment>
        ))}

        <div className="mt-24 pt-12 border-t border-[#1c1917]/10 text-center">
          <Sparkles className="mx-auto mb-4 text-[#3f6212]" size={24} />
          <h3 className="text-2xl font-serif font-bold mb-2">End of Story</h3>
          <p className="text-stone-500 text-sm">Thank you for reading.</p>
        </div>
      </article>

      {/* --- THE DOCK --- */}
      <DynamicDock 
        progress={smoothProgress} 
        likes={likesCount} 
        liked={liked}
        onLike={handleLike}
        onBack={() => navigate('/blogs')}
        onEdit={() => setShowEdit(true)}
        isAuthor={user && blog.author?._id === user._id}
      />

      {/* --- MODALS --- */}
      <AnimatePresence>
        {showEdit && (
          <BlogPopup 
            user={user} 
            existingBlog={blog} 
            onClose={() => setShowEdit(false)} 
            onSaved={() => { fetchBlog(); setShowEdit(false); }} 
          />
        )}
      </AnimatePresence>

    </div>
  );
};

export default SingleBlog;