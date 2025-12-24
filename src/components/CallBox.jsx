import React, { useEffect, useState } from "react";
import { StreamVideoClient, StreamVideo, StreamCall, StreamTheme } from "@stream-io/video-react-sdk";

export default function CallBox({ callInfo, videoToken, user }) {
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);

  useEffect(() => {
    if (!callInfo || !videoToken) return;
    const videoClient = new StreamVideoClient({
      apiKey: import.meta.env.VITE_STREAM_API_KEY,
      token: videoToken,
      user: { id: user._id, name: user.name },
    });
    setClient(videoClient);
    const c = videoClient.call("default", callInfo.roomId);
    setCall(c);
    return () => {
      if (videoClient) videoClient.disconnect();
    };
  }, [callInfo, videoToken, user._id, user.name]);

  if (!callInfo) return <div>Start a call to see call UI</div>;
  if (!client) return <div>Connecting to call...</div>;
  return (
    <StreamVideo client={client}>
      <StreamTheme>
        <StreamCall call={call} />
      </StreamTheme>
    </StreamVideo>
  );
}
