// import React from "react";
// import { useNavigate } from "react-router-dom";

// const PaymentCancel = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-red-50 text-center px-6">
//       <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md w-full animate-fadeIn">
//         <div className="text-red-500 text-5xl mb-4">✕</div>

//         <h2 className="text-3xl font-bold text-gray-800 mb-3">
//           Payment Canceled
//         </h2>

//         <p className="text-gray-600 text-lg mb-6">
//           Your payment was not completed.  
//           You can try again anytime.
//         </p>

//         <button
//           onClick={() => navigate("/counselors")}
//           className="px-6 py-3 bg-red-500 text-white rounded-xl shadow hover:bg-red-600 transition"
//         >
//           Go Back
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PaymentCancel;

const PaymentCancel = () => {
  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Cancelled</h1>
      <p className="text-gray-700 text-lg">
        Your booking was not completed.
      </p>

      <a
        href="/counselors"
        className="mt-6 inline-block bg-gray-800 px-4 py-2 text-white rounded-md"
      >
        Go Back
      </a>
    </div>
  );
};

export default PaymentCancel;
