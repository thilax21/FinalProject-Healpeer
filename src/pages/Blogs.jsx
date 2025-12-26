

// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { Search, PenTool, Clock, Calendar, User } from "lucide-react";
// import API from "../api/api";

// // --- Visual Utils ---

// const GrainTexture = () => (
//   <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
//        style={{ 
//          backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
//          filter: 'contrast(170%) brightness(100%)'
//        }} />
// );

// // --- Helper Components ---

// const BlogCard = ({ blog }) => {
//   // Default Placeholder (Calm Nature Aesthetic)
//   const DEFAULT_IMAGE = "https://img.freepik.com/free-vector/abstract-hand-painted-alcohol-ink-background-with-mandala-design_1048-20172.jpg?semt=ais_hybrid&w=740&q=80";

//   // Logic to determine which image to show
//   const blogImage = blog.imageUrl 
//     ? (blog.imageUrl.startsWith('http') ? blog.imageUrl : `https://healpeer-backend.onrender.com${blog.imageUrl}`)
//     : DEFAULT_IMAGE;

//   const readTime = Math.ceil((blog.content?.length || 0) / 1000);
  
//   const date = new Date(blog.createdAt || Date.now()).toLocaleDateString("en-US", {
//     month: "short", day: "numeric", year: "numeric"
//   });

//   return (
//     <motion.div
//       layout
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       whileHover={{ y: -5 }}
//       transition={{ duration: 0.4 }}
//       className="group flex flex-col gap-4 cursor-pointer"
//     >
//       {/* Image Container */}
//       <Link to={`/blogs/${blog._id}`} className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-stone-200 shadow-sm">
//         <img
//           src={blogImage}
//           alt={blog.title}
//           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//           onError={(e) => { e.target.src = DEFAULT_IMAGE; }} // Fallback if URL is broken
//         />
        
//         <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
        
//         {/* Category Tag (Mocked) */}
//         <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-[#1c1917] shadow-sm">
//           {blog.category || "Reflection"}
//         </div>
//       </Link>

//       {/* Content */}
//       <div className="flex flex-col gap-2 px-1">
//         <div className="flex items-center gap-3 text-xs font-bold text-stone-400 uppercase tracking-widest">
//           <span className="flex items-center gap-1"><Calendar size={10} /> {date}</span>
//           <span className="w-1 h-1 rounded-full bg-stone-300" />
//           <span className="flex items-center gap-1"><Clock size={10} /> {readTime} min</span>
//         </div>

//         <Link to={`/blogs/${blog._id}`}>
//           <h3 className="text-2xl font-serif font-medium text-[#1c1917] leading-tight group-hover:text-[#3f6212] transition-colors">
//             {blog.title}
//           </h3>
//         </Link>

//         <p className="text-stone-500 text-sm line-clamp-2 leading-relaxed font-light">
//           {blog.content?.substring(0, 120).replace(/<[^>]*>?/gm, '')}...
//         </p>

//         <div className="flex items-center gap-2 mt-2 pt-2 border-t border-stone-100">
//            <div className="w-6 h-6 rounded-full bg-[#f4f2ed] flex items-center justify-center text-[#3f6212] border border-stone-200">
//              <User size={12} />
//            </div>
//            <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">
//              {blog.author?.name || "Anonymous"}
//            </span>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// const SkeletonLoader = () => (
//   <div className="flex flex-col gap-4 animate-pulse">
//     <div className="aspect-[4/3] bg-stone-200 rounded-[1.5rem]" />
//     <div className="h-6 bg-stone-200 rounded w-3/4" />
//     <div className="h-4 bg-stone-200 rounded w-full" />
//     <div className="h-4 bg-stone-200 rounded w-1/2" />
//   </div>
// );

// // --- Main Page ---

// export default function BlogsWebsiteUI({ user }) {
//   const [blogs, setBlogs] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const { data } = await API.get("/blogs/all");
//         setBlogs(data.data || []);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setTimeout(() => setLoading(false), 800); 
//       }
//     };
//     fetchBlogs();
//   }, []);

//   const filteredBlogs = blogs.filter(b =>
//     (b.title || "").toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-[#f4f2ed] text-[#1c1917] selection:bg-[#3f6212] selection:text-white font-sans">
//       <GrainTexture />
      
//       {/* Hero Section */}
//       <section className="pt-32 pb-16 px-6 relative">
//         <div className="max-w-7xl mx-auto text-center relative z-10">
//           <motion.span 
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
//             className="inline-block mb-4 px-4 py-1.5 rounded-full border border-stone-200 bg-white/40 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest text-stone-500"
//           >
//             The Journal
//           </motion.span>
          
//           <motion.h1 
//             initial={{ y: 20, opacity: 0 }} 
//             animate={{ y: 0, opacity: 1 }} 
//             transition={{ delay: 0.1 }}
//             className="text-6xl md:text-8xl font-serif mb-6 tracking-tight text-[#1c1917] leading-[0.9]"
//           >
//             Voices of <span className="italic text-stone-400 font-light">Healing</span>
//           </motion.h1>
          
//           <motion.p 
//             initial={{ y: 20, opacity: 0 }} 
//             animate={{ y: 0, opacity: 1 }} 
//             transition={{ delay: 0.2 }}
//             className="text-xl text-stone-500 max-w-2xl mx-auto font-light"
//           >
//             Stories, insights, and reflections from our community of healers and seekers.
//           </motion.p>
//         </div>
//       </section>

//       {/* Toolbar */}
//       <div className="sticky top-24 z-30 max-w-5xl mx-auto px-6 mb-16">
//         <div className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg shadow-stone-200/50 rounded-full p-2 flex flex-col md:flex-row items-center justify-between gap-2 transition-all hover:border-[#3f6212]/20 hover:shadow-xl">
           
//            {/* Search */}
//            <div className="relative w-full group">
//              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-[#3f6212] transition-colors" size={18} />
//              <input
//                type="text"
//                placeholder="Search for topics..."
//                value={search}
//                onChange={(e) => setSearch(e.target.value)}
//                className="w-full bg-transparent pl-12 pr-4 py-3 rounded-full outline-none text-[#1c1917] placeholder-stone-400 text-sm font-medium"
//              />
//            </div>

//            {/* Write Button */}
//            {user && (
//              <motion.button
//                whileHover={{ scale: 1.05 }}
//                whileTap={{ scale: 0.95 }}
//                onClick={() => navigate('/blogs/write')}
//                className="w-full md:w-auto px-8 py-3 rounded-full bg-[#1c1917] text-[#f2f0e9] flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest hover:bg-[#3f6212] transition-colors shadow-md shrink-0"
//              >
//                <PenTool size={14} /> Write
//              </motion.button>
//            )}
//         </div>
//       </div>

//       {/* Content Grid */}
//       <div className="max-w-7xl mx-auto px-6 pb-32">
//         {loading ? (
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
//              {[1,2,3,4,5,6].map(i => <SkeletonLoader key={i} />)}
//           </div>
//         ) : filteredBlogs.length === 0 ? (
//           <div className="text-center py-32 border border-dashed border-stone-300 rounded-[3rem]">
//             <div className="text-6xl mb-4 grayscale opacity-50">🌿</div>
//             <h3 className="text-2xl font-serif text-[#1c1917] mb-2">Quiet Space</h3>
//             <p className="text-stone-500">No stories found. Be the first to share your thoughts.</p>
//           </div>
//         ) : (
//           <motion.div 
//             layout
//             className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
//           >
//             <AnimatePresence>
//               {filteredBlogs.map(blog => (
//                 <BlogCard key={blog._id} blog={blog} />
//               ))}
//             </AnimatePresence>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }

// src/pages/BlogsWebsiteUI.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, PenTool, Clock, Calendar, User } from "lucide-react";
import API from "../api/api";

// --- Visual Utils ---

const GrainTexture = () => (
  <div
    className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
    style={{
      backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
      filter: "contrast(170%) brightness(100%)",
    }}
  />
);

// --- Helper Components ---

const BlogCard = ({ blog }) => {
  // Default Placeholder
  const DEFAULT_IMAGE =
    "https://img.freepik.com/free-vector/abstract-hand-painted-alcohol-ink-background-with-mandala-design_1048-20172.jpg?semt=ais_hybrid&w=740&q=80";

  // Backend already sends absolute imageUrl (http/https)
  const blogImage = blog.imageUrl || DEFAULT_IMAGE;

  const readTime = Math.ceil((blog.content?.length || 0) / 1000);

  const date = new Date(blog.createdAt || Date.now()).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4 }}
      className="group flex flex-col gap-4 cursor-pointer"
    >
      {/* Image Container */}
      <Link
        to={`/blogs/${blog._id}`}
        className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-stone-200 shadow-sm"
      >
        <img
          src={blogImage}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            e.target.src = DEFAULT_IMAGE;
          }}
        />

        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />

        {/* Category Tag (Mocked) */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-[#1c1917] shadow-sm">
          {blog.category || "Reflection"}
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col gap-2 px-1">
        <div className="flex items-center gap-3 text-xs font-bold text-stone-400 uppercase tracking-widest">
          <span className="flex items-center gap-1">
            <Calendar size={10} /> {date}
          </span>
          <span className="w-1 h-1 rounded-full bg-stone-300" />
          <span className="flex items-center gap-1">
            <Clock size={10} /> {readTime} min
          </span>
        </div>

        <Link to={`/blogs/${blog._id}`}>
          <h3 className="text-2xl font-serif font-medium text-[#1c1917] leading-tight group-hover:text-[#3f6212] transition-colors">
            {blog.title}
          </h3>
        </Link>

        <p className="text-stone-500 text-sm line-clamp-2 leading-relaxed font-light">
          {blog.content
            ?.substring(0, 120)
            .replace(/<[^>]*>?/gm, "")}
          ...
        </p>

        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-stone-100">
          <div className="w-6 h-6 rounded-full bg-[#f4f2ed] flex items-center justify-center text-[#3f6212] border border-stone-200">
            <User size={12} />
          </div>
          <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">
            {blog.author?.name || "Anonymous"}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const SkeletonLoader = () => (
  <div className="flex flex-col gap-4 animate-pulse">
    <div className="aspect-[4/3] bg-stone-200 rounded-[1.5rem]" />
    <div className="h-6 bg-stone-200 rounded w-3/4" />
    <div className="h-4 bg-stone-200 rounded w-full" />
    <div className="h-4 bg-stone-200 rounded w-1/2" />
  </div>
);

// --- Main Page ---

export default function BlogsWebsiteUI({ user }) {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await API.get("/blogs/all");
        setBlogs(data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((b) =>
    (b.title || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f4f2ed] text-[#1c1917] selection:bg-[#3f6212] selection:text-white font-sans">
      <GrainTexture />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block mb-4 px-4 py-1.5 rounded-full border border-stone-200 bg-white/40 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest text-stone-500"
          >
            The Journal
          </motion.span>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-serif mb-6 tracking-tight text-[#1c1917] leading-[0.9]"
          >
            Voices of{" "}
            <span className="italic text-stone-400 font-light">Healing</span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-stone-500 max-w-2xl mx-auto font-light"
          >
            Stories, insights, and reflections from our community of healers
            and seekers.
          </motion.p>
        </div>
      </section>

      {/* Toolbar */}
      <div className="sticky top-24 z-30 max-w-5xl mx-auto px-6 mb-16">
        <div className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg shadow-stone-200/50 rounded-full p-2 flex flex-col md:flex-row items-center justify-between gap-2 transition-all hover:border-[#3f6212]/20 hover:shadow-xl">
          {/* Search */}
          <div className="relative w-full group">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-[#3f6212] transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Search for topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent pl-12 pr-4 py-3 rounded-full outline-none text-[#1c1917] placeholder-stone-400 text-sm font-medium"
            />
          </div>

          {/* Write Button */}
          {user && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/blogs/write")}
              className="w-full md:w-auto px-8 py-3 rounded-full bg-[#1c1917] text-[#f2f0e9] flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest hover:bg-[#3f6212] transition-colors shadow-md shrink-0"
            >
              <PenTool size={14} /> Write
            </motion.button>
          )}
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-32">
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonLoader key={i} />
            ))}
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-32 border border-dashed border-stone-300 rounded-[3rem]">
            <div className="text-6xl mb-4 grayscale opacity-50">🌿</div>
            <h3 className="text-2xl font-serif text-[#1c1917] mb-2">
              Quiet Space
            </h3>
            <p className="text-stone-500">
              No stories found. Be the first to share your thoughts.
            </p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
          >
            <AnimatePresence>
              {filteredBlogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}