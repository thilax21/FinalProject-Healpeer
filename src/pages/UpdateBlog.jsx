// src/pages/UpdateBlog.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import { toast } from "react-hot-toast";
import { Loader2, Image as ImageIcon } from "lucide-react";

const UpdateBlog = ({ user }) => {
  const { id } = useParams();       // blog id
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [blog, setBlog] = useState(null);
  const [form, setForm] = useState({ title: "", content: "" });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const token = localStorage.getItem("token");
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  // Load blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await API.get(`/blogs/${id}`, { headers: authHeaders });
        const b = data.data;
        setBlog(b);
        setForm({ title: b.title || "", content: b.content || "" });
        setPreviewImage(b.imageUrl || null);
      } catch (err) {
        console.error("Error fetching blog:", err);
        toast.error(err.response?.data?.message || "Failed to load blog");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchBlog();
  }, [id, token]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setSelectedFile(file);
    if (file) setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.content) {
      toast.error("Title and content are required");
      return;
    }
    if (!token) {
      toast.error("You must be logged in");
      return;
    }

    try {
      setSaving(true);
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("content", form.content);
      if (selectedFile) {
        formData.append("image", selectedFile); // field name "image" matches your multer config
      }

      const { data } = await API.put(`/blogs/${id}`, formData, {
        headers: { ...authHeaders, "Content-Type": "multipart/form-data" },
      });

      toast.success("Blog updated successfully");
      // Option 1: go back to previous page
      navigate(-1);
      // Option 2: go to the single blog view:
      // navigate(`/blogs/${id}`);
    } catch (err) {
      console.error("Update blog failed:", err);
      toast.error(err.response?.data?.message || "Failed to update blog");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f2ed] flex items-center justify-center">
        <div className="flex items-center gap-2 text-stone-500">
          <Loader2 className="animate-spin" size={20} />
          Loading blog...
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#f4f2ed] flex items-center justify-center">
        <div className="text-stone-500">Blog not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f2ed] text-[#1c1917] flex items-center justify-center py-16 px-4">
      <div className="bg-white rounded-3xl shadow-xl max-w-2xl w-full p-8 border border-stone-100">
        <h1 className="text-2xl font-serif font-bold mb-6">Edit Blog</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">
              Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border border-stone-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#3f6212] outline-none"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">
              Content
            </label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={8}
              className="w-full border border-stone-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#3f6212] outline-none resize-vertical"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">
              Cover Image (optional)
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 px-4 py-2 border border-stone-200 rounded-lg text-sm cursor-pointer hover:bg-stone-50">
                <ImageIcon size={16} />
                <span>Choose file</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              {previewImage && (
                <div className="w-20 h-14 border border-stone-200 rounded-lg overflow-hidden">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 border border-stone-300 rounded-lg text-sm text-stone-600 hover:bg-stone-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 bg-[#1c1917] text-white rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-[#3f6212] flex items-center gap-2 disabled:opacity-60"
            >
              {saving && <Loader2 size={16} className="animate-spin" />}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlog;