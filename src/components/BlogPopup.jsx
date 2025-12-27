

import React, { useState, useEffect } from "react";
import API from "../api/api";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Image as ImageIcon, Loader2, 
  Trash2, Clock, AlignLeft 
} from "lucide-react";
import { toast } from "react-hot-toast";

// --- Visual Utils ---
const GrainTexture = () => (
  <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] filter contrast-150 brightness-100" />
);

const BlogPopup = ({ user, existingBlog = null, onClose, onSaved }) => {
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    image: null,
    preview: null,
  });
  const [saving, setSaving] = useState(false);
  const [stats, setStats] = useState({ words: 0, readTime: 1 });

  // Load Data
  useEffect(() => {
    if (existingBlog) {
      setBlog({
        title: existingBlog.title || "",
        content: existingBlog.content || "",
        image: null,
        preview: existingBlog.imageUrl 
          ? (existingBlog.imageUrl.startsWith('http') ? existingBlog.imageUrl : `https://healpeer-backend.onrender.com${existingBlog.imageUrl}`)
          : null,
      });
    }
  }, [existingBlog]);

  // Update Stats
  useEffect(() => {
    const words = blog.content.trim().split(/\s+/).length;
    const time = Math.ceil(words / 200);
    setStats({ words: blog.content ? words : 0, readTime: time });
  }, [blog.content]);

  const handleChange = (e) => setBlog({ ...blog, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setBlog({ ...blog, image: file, preview: URL.createObjectURL(file) });
  };

  const removeImage = () => setBlog({ ...blog, image: null, preview: null });

  const handleSubmit = async () => {
    if (!blog.title.trim() || !blog.content.trim())
      return toast.error("Title and content are required.");
  
    setSaving(true);
  
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
  
      formData.append("title", blog.title);
      formData.append("content", blog.content);
      if (blog.image) formData.append("image", blog.image);
  
      const config = { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }};

      if (existingBlog) {
        await API.put(`/blogs/${existingBlog._id}`, formData, config);
        toast.success("Changes saved.");
      } else {
        await API.post("/blogs", formData, config);
        toast.success("Published successfully.");
      }
  
      if (onSaved) onSaved();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save.");
    } finally {
      setSaving(false);
    }
  };
  
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 bg-[#1c1917]/40 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl h-[85vh] bg-[#f4f2ed] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col border border-stone-100"
        >
          <GrainTexture />

          {/* --- 1. HEADER --- */}
          <div className="relative z-20 px-8 py-5 border-b border-[#1c1917]/5 bg-white/50 backdrop-blur-md flex items-center justify-between">
            <h3 className="font-serif font-bold text-xl text-[#1c1917]">
              {existingBlog ? "Edit Story" : "New Story"}
            </h3>
            <div className="flex items-center gap-3">
              <button 
                onClick={onClose} 
                className="p-2 text-stone-400 hover:text-[#1c1917] hover:bg-stone-200/50 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="px-6 py-2.5 bg-[#1c1917] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#3f6212] transition-all disabled:opacity-50 flex items-center gap-2 shadow-md"
              >
                {saving && <Loader2 size={14} className="animate-spin" />}
                {saving ? "Saving" : "Publish"}
              </button>
            </div>
          </div>

          {/* --- 2. EDITOR CANVAS (Scrollable) --- */}
          <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10 bg-white">
            <div className="max-w-3xl mx-auto px-8 py-10 pb-24">
              
              {/* Image Uploader */}
              <div className="group relative mb-10">
                {blog.preview ? (
                  <div className="relative rounded-2xl overflow-hidden shadow-sm aspect-[21/9] group-hover:shadow-md transition-all border border-stone-100">
                    <img src={blog.preview} alt="preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    <button 
                      onClick={removeImage}
                      className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur rounded-full text-red-500 hover:text-red-700 shadow-sm opacity-0 group-hover:opacity-100 transition-all transform hover:scale-110"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-stone-200 rounded-2xl cursor-pointer hover:border-[#3f6212] hover:bg-stone-50 transition-all group">
                    <div className="flex flex-col items-center justify-center text-stone-400 group-hover:text-[#3f6212]">
                      <div className="p-3 bg-stone-100 rounded-full mb-3 group-hover:bg-[#3f6212]/10 transition-colors">
                        <ImageIcon size={24} />
                      </div>
                      <p className="text-sm font-bold text-stone-600">Add Cover Image</p>
                    </div>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                )}
              </div>

              {/* Title */}
              <input
                name="title"
                value={blog.title}
                onChange={handleChange}
                placeholder="Title..."
                className="w-full text-4xl font-serif font-bold text-[#1c1917] placeholder:text-stone-300 outline-none border-none bg-transparent p-0 mb-6 leading-tight"
                autoFocus={!existingBlog}
              />

              {/* Content */}
              <textarea
                name="content"
                value={blog.content}
                onChange={handleChange}
                placeholder="Tell Your Story..."
                className="w-full min-h-[40vh] text-lg text-stone-600 placeholder:text-stone-300 outline-none border-none bg-transparent resize-none leading-relaxed p-0 font-light font-serif"
              />
            </div>
          </div>

          {/* --- 3. FOOTER STATS --- */}
          <div className="relative z-20 h-12 border-t border-[#1c1917]/5 bg-[#f4f2ed] flex items-center justify-between px-8 text-stone-400 text-[10px] font-bold uppercase tracking-widest">
             <div className="flex items-center gap-6">
               <span className="flex items-center gap-2">
                 <AlignLeft size={12} /> {stats.words} words
               </span>
               <span className="flex items-center gap-2">
                 <Clock size={12} /> {stats.readTime} min read
               </span>
             </div>
             <div>Draft</div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BlogPopup;