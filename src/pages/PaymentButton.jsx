


// import React, { useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import API from "../api/api.js";

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// export default function PaymentButton({ bookingId, amount }) {
//   const [loading, setLoading] = useState(false);
//   const MIN_AMOUNT = 200; // Minimum amount for Stripe

//   const handlePayment = async () => {
//     if (!bookingId) {
//       alert("Booking ID is required");
//       return;
//     }

//     if (amount < MIN_AMOUNT) {
//       alert(`Minimum payment amount is Rs. ${MIN_AMOUNT}`);
//       return;
//     }

//     setLoading(true);
//     try {
//       const { data } = await API.post("/payment/create-checkout-session", { bookingId });
      
//       if (data.url) {
//         window.location.href = data.url;
//       } else {
//         alert("No checkout URL returned.");
//       }
//     } catch (err) {
//       console.error("Payment error:", err);
//       alert("Payment error: " + (err.response?.data?.message || err.message));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <button
//       onClick={handlePayment}
//       disabled={loading || !bookingId}
//       className="w-full bg-[#1c1917] text-white py-4 rounded-full font-bold uppercase tracking-widest disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
//     >
//       {loading ? (
//         <>
//           <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//           Processing...
//         </>
//       ) : (
//         <>Pay Rs. {amount || 1000}</>
//       )}
//     </button>
//   );
// }

// src/pages/PaymentButton.jsx
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import API from "../api/api.js";
import { toast } from "react-hot-toast";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function PaymentButton({
  type = "client",    // "client" | "admin"
  bookingId,          // required for client
  amount,
  counselorId,        // required for admin
  counselorName,      // optional, for admin toast
}) {
  const [loading, setLoading] = useState(false);
  const MIN_AMOUNT = 200; // Minimum amount for Stripe (client payments)

  // ---------- CLIENT FLOW (Stripe) ----------
  const handleClientPayment = async () => {
    if (!bookingId) {
      alert("Booking ID is required");
      return;
    }

    if (!amount || amount < MIN_AMOUNT) {
      alert(`Minimum payment amount is Rs. ${MIN_AMOUNT}`);
      return;
    }

    setLoading(true);
    try {
      const { data } = await API.post("/payment/create-checkout-session", {
        bookingId,
      });

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("No checkout URL returned from server.");
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert(
        "Payment error: " +
          (err.response?.data?.message || err.message || "Unknown error")
      );
    } finally {
      setLoading(false);
    }
  };

  // ---------- ADMIN FLOW (payout to counselor) ----------
  const handleAdminPayout = async () => {
    if (!counselorId) {
      alert("Counselor ID is required for payout");
      return;
    }
    if (!amount || amount <= 0) {
      alert("Invalid payout amount");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Admin is not authenticated");
      return;
    }

    setLoading(true);
    try {
      // Use current month/year as payout period label, e.g. "November 2025"
      const monthLabel = new Date().toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      });

      await API.post(
        `/payout/pay/${counselorId}`,
        { amount, month: monthLabel },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(
        `Payout of ${amount} LKR sent to ${counselorName || "counselor"}`
      );
    } catch (err) {
      console.error("Admin payout error:", err);
      toast.error(err.response?.data?.message || "Failed to process payout");
    } finally {
      setLoading(false);
    }
  };

  // ---------- Decide which flow to run ----------
  const handleClick = () => {
    if (type === "admin") {
      return handleAdminPayout();
    }
    return handleClientPayment();
  };

  const isDisabled =
    loading ||
    (type === "client" && !bookingId) ||
    (type === "admin" && (!counselorId || !amount));

  const label =
    type === "admin"
      ? `Pay Counselor Rs. ${amount || 0}`
      : `Pay Rs. ${amount || 1000}`;

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className="w-full bg-[#1c1917] text-white py-4 rounded-full font-bold uppercase tracking-widest disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
    >
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Processing...
        </>
      ) : (
        <>{label}</>
      )}
    </button>
  );
}