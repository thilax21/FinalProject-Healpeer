import React from "react";

export default function CallButtons({ user, onStartCall }) {
  const startAudio = () => onStartCall({ mode: "audio", roomId: `session_${Date.now()}_${user._id}` });
  const startVideo = () => onStartCall({ mode: "video", roomId: `session_${Date.now()}_${user._id}` });

  return (
    <div className="mb-4">
      <button className="mr-3 px-4 py-2 bg-blue-600 text-white rounded" onClick={startAudio}>Start Audio</button>
      <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={startVideo}>Start Video</button>
    </div>
  );
}
