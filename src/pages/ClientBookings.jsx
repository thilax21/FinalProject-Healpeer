import React, { useEffect, useState } from "react";
import axios from "axios";

const ClientBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const loadBookings = async () => {
      const { data } = await axios.get(
        "http://localhost:3000/api/booking/client",
        { withCredentials: true }
      );
      setBookings(data.data);
    };

    loadBookings();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">My Bookings</h1>

      {bookings.length === 0 && <p>No bookings found.</p>}

      <div className="space-y-4 mt-4">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="border p-4 rounded-lg shadow-sm bg-white"
          >
            <h2 className="text-xl font-semibold">
              Counselor: {b.counselor.name}
            </h2>
            <p>Date: {new Date(b.dateTime).toLocaleString()}</p>
            <p>Amount: ${b.amount}</p>
            <p className="mt-1">
              Status:{" "}
              <span
                className={
                  b.paymentStatus === "paid"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {b.paymentStatus}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientBookings;
