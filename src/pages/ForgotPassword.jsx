
// import React, { useState } from "react";
// import API from "../api/api";
// import { useNavigate } from "react-router-dom";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await API.post("/auth/forgot-password", { email });
//       alert(data.message); // OTP sent

//        // Pass email to reset page via state
//        navigate("/reset-password", { state: { email } });
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Error sending OTP");
//     }
//   };

//   return (
//     <div>
//       <h2>Forgot Password</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <button type="submit">Send OTP</button>
//       </form>
//     </div>
//   );  
// };

// export default ForgotPassword;

import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import "../styles/ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/forgot-password", { email });
      alert(data.message); // OTP sent

      // Pass email to reset page via state
      navigate("/reset-password", { state: { email } });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error sending OTP");
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send OTP</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
