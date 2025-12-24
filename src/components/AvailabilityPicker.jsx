import React, { useEffect, useState } from "react";
import api from "../api/api";

const AvailabilityPicker = ({ counselorId, date, onSelectSlot }) => {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    if (!date) return;
    const load = async () => {
      const res = await api.get(`/availability/slots/check?counselorId=${counselorId}&date=${date}`);
      setSlots(res.data.slots || []);
    };
    load().catch(console.error);
  }, [counselorId, date]);

  return (
    <div className="mt-4">
      <h3 className="font-semibold">Available slots for {date}</h3>
      <div className="flex flex-wrap gap-2 mt-2">
        {slots.length === 0 && <div>No available slots</div>}
        {slots.map((s, idx) => (
          <button key={idx} onClick={() => onSelectSlot(s)} className="px-3 py-2 border rounded hover:bg-gray-100">
            {s.start} - {s.end}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AvailabilityPicker;
