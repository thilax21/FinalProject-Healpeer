import React, { useState } from "react";
import MulterUpload from "../components/Multer";

const ProfileEdit = () => {
  const [profileImage, setProfileImage] = useState("");

  return (
    <div>
      <h2>Update Profile</h2>
      <MulterUpload onUpload={(url) => setProfileImage(url)} />
      {profileImage && <img src={profileImage} alt="Profile" width="100" />}
    </div>
  );
};

export default ProfileEdit;
