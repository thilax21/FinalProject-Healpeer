import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ user, children }) => {
  // ✅ If not logged in, go to login page
  if (!user) return <Navigate to="/login" replace />;

  // ✅ If not an admin, redirect to home
  if (user.role !== "admin") return <Navigate to="/" replace />;

  // ✅ If admin, allow access
  return children;
};

export default AdminRoute;
