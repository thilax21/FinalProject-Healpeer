import React from "react";

const CalendarSlots = ({ bookedSlots, selectedDate, setSelectedDate }) => {
  const isBooked = (date) => {
    return bookedSlots.some(
      (b) => new Date(b.sessionDate).getTime() === new Date(date).getTime()
    );
  };

  const handleChange = (e) => {
    const date = e.target.value;
    if (isBooked(date)) {
      alert("This time is already booked.");
      return;
    }
    setSelectedDate(date);
  };

  return (
    <div className="mt-5">
      <label className="block font-semibold">Select Date & Time</label>
      <input
        type="datetime-local"
        className="border p-2 rounded w-full"
        min={new Date().toISOString().slice(0, 16)}
        onChange={handleChange}
      />
      {selectedDate && (
        <p className="text-green-600 mt-2">Selected: {new Date(selectedDate).toLocaleString()}</p>
      )}
    </div>
  );
};

export default CalendarSlots;
