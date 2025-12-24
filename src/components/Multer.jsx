import React, { useState } from "react";
import API from "../api/api";

const MulterUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const { data } = await API.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      onUpload(data.url); // pass uploaded file url to parent
      alert("File uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("File upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ margin: "10px 0" }}>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default MulterUpload;
