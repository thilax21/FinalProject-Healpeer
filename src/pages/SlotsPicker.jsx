import React, { useEffect, useState } from "react";
import API from "../api/api";

export default function SlotsPicker({ counselorId, onSelect }) {
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    if (!date) return;
    const fetch = async () => {
      const res = await API.get(`/availability/slots/check?counselorId=${counselorId}&date=${date}`);
      setSlots(res.data.slots || []);
    };
    fetch();
  }, [date, counselorId]);

  return (
    <div>
      <label>
        Date: <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      </label>
      <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
        {slots.length === 0 ? <div>No slots</div> : slots.map(s => (
          <button key={s.start} onClick={() => onSelect(date, s.start)}>{s.start} - {s.end}</button>
        ))}
      </div>
    </div>
  );
}
