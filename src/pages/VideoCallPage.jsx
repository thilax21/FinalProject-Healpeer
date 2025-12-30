

import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import * as StreamVideoSDK from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";

console.log("StreamVideoSDK exports:", Object.keys(StreamVideoSDK));



const {
  StreamVideoClient,
  StreamVideo,
  StreamCall,
  SpeakerLayout,
  // CallControls,  // we won’t use this now
} = StreamVideoSDK;

const VideoCallPage = ({ user }) => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [error, setError] = useState(null);

  // Prevent double-join in React StrictMode dev
  const joinedRef = useRef(false);

  const CustomControls = ({ call, isCounselor = false }) => {
    const [micOff, setMicOff] = useState(false);
    const [camOff, setCamOff] = useState(false);
  
    const toggleMic = async () => {
      try {
        if (micOff) {
          await call.microphone.enable();
        } else {
          await call.microphone.disable();
        }
        setMicOff(!micOff);
      } catch (e) {
        console.error("Mic toggle failed", e);
      }
    };
  
    const toggleCam = async () => {
      try {
        if (camOff) {
          await call.camera.enable();
        } else {
          await call.camera.disable();
        }
        setCamOff(!camOff);
      } catch (e) {
        console.error("Camera toggle failed", e);
      }
    };
  
    const leaveCall = async () => {
      try {
        // counselor: end for everyone, client: just leave
        if (isCounselor) {
          await call.endCall();
        } else {
          await call.leave();
        }
      } catch (e) {
        console.error("Leave/end failed", e);
      } finally {
        window.history.back(); // or window.location.href = "/some-route"
      }
    };
  
    return (
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 bg-slate-900/80 px-4 py-2 rounded-xl">
        <button
          onClick={toggleMic}
          className="px-3 py-1 rounded bg-gray-700 text-sm"
        >
          {micOff ? "Unmute" : "Mute"}
        </button>
  
        <button
          onClick={toggleCam}
          className="px-3 py-1 rounded bg-gray-700 text-sm"
        >
          {camOff ? "Camera On" : "Camera Off"}
        </button>
  
        <button
          onClick={leaveCall}
          className="px-3 py-1 rounded bg-red-600 text-sm"
        >
          {isCounselor ? "End Call" : "Leave"}
        </button>
      </div>
    );
  };

  useEffect(() => {
    let streamClient;
    let callInstance;



const init = async () => {
  if (joinedRef.current) return;
  joinedRef.current = true;

  try {
    const { data } = await API.get(`/stream/token/${bookingId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!data.success) {
      throw new Error(data.message || "Not allowed to join this call");
    }

    const { apiKey, userId, token } = data;

    streamClient = StreamVideoClient.getOrCreateInstance({
      apiKey,
      user: {
        id: userId,
        name: user?.name || user?.fullName || userId,
      },
      token,
    });

    const callInstance = streamClient.call("default", bookingId);
    await callInstance.join({ create: true });

    setClient(streamClient);
    setCall(callInstance);
  } catch (err) {
    console.error("Error initializing video call:", err);
    setError(err.message || "Failed to join call");
  } finally {
    setLoading(false);
  }
};

    init();

    return () => {
      // Leave call when component unmounts
      callInstance?.leave();
      // Do NOT disconnectUser when using getOrCreateInstance
    };
  }, [bookingId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-pulse">Connecting to video call…</div>
      </div>
    );
  }

  if (error || !client || !call) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center flex-col gap-2">
        <div className="font-semibold">Unable to join call.</div>
        {error && <div className="text-sm text-red-400">{error}</div>}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <SpeakerLayout />
          {/* Set isCounselor={true} for counselor user */}
          <CustomControls call={call} isCounselor={false} />
        </StreamCall>
      </StreamVideo>
    </div>
  );
};

export default VideoCallPage;

//     const init = async () => {
//   if (joinedRef.current) return;
//   joinedRef.current = true;

//   try {
//     const { data } = await API.get(`/stream/token/${bookingId}`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });

//     if (!data.success) {
//       throw new Error(data.message || "Not allowed to join this call");
//     }

//     const { apiKey, userId, token } = data;

//     streamClient = StreamVideoClient.getOrCreateInstance({
//       apiKey,
//       user: {
//         id: userId,
//         name: user?.name || user?.fullName || userId,
//       },
//       token,
//     });

//     const callInstance = streamClient.call("default", bookingId);
//     await callInstance.join({ create: true });

//     setClient(streamClient);
//     setCall(callInstance);
//   } catch (err) {
//     console.error("Error initializing video call:", err);
//     setError(err.message || "Failed to join call");
//   } finally {
//     setLoading(false);
//   }
// };