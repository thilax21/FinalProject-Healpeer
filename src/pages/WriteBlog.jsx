import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/api";

const WriteBlog = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const editingBlog = location.state?.blog; // Get blog data if editing

  const [newBlog, setNewBlog] = useState({
    title: editingBlog?.title || "",
    content: editingBlog?.content || "",
    image: null,
  });

  useEffect(() => {
    if (editingBlog) setNewBlog({ title: editingBlog.title, content: editingBlog.content });
  }, [editingBlog]);

  const handleChange = (e) => setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  const handleImageChange = (e) => setNewBlog({ ...newBlog, image: e.target.files[0] });

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", newBlog.title);
      formData.append("content", newBlog.content);
      if (newBlog.image) formData.append("image", newBlog.image);

      if (editingBlog) {
        // Update blog
        await API.put(`/blogs/${editingBlog._id}`, newBlog, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // Create new blog
        await API.post("/blogs", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      navigate("/blogs");
    } catch (err) {
      console.error(err);
      alert("Failed to save blog");
    }
  };

  return (
    <div className="editor-card">
      <h2>{editingBlog ? "Edit Blog" : "Write a New Blog"}</h2>
      <input name="title" placeholder="Blog title..." value={newBlog.title} onChange={handleChange} />
      <textarea name="content" placeholder="Write your story..." value={newBlog.content} onChange={handleChange} />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleSubmit}>{editingBlog ? "Update Blog" : "Publish Blog"}</button>
    </div>
  );
};

export default WriteBlog;
