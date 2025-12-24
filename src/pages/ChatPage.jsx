import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StreamChat } from "stream-chat";
import { Chat, Channel, ChannelHeader, MessageList, MessageInput } from "stream-chat-react";
// import "stream-chat-react/dist/css/styles.css";
import { fetchStreamTokens } from "../lib/streamClient";
import CallButtons from "../components/CallButtons";
import CallBox from "../components/CallBox";

export default function ChatPage({ user }) {
  const { bookingId } = useParams();
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [videoToken, setVideoToken] = useState(null);
  const [callInfo, setCallInfo] = useState(null);

  useEffect(() => {
    if (!bookingId) return;
    let mounted = true;
    const init = async () => {
      try {
        const { chatToken, videoToken: vt, roomId } = await fetchStreamTokens(user, bookingId);
        setVideoToken(vt);

        const client = StreamChat.getInstance(import.meta.env.VITE_STREAM_API_KEY);
        await client.connectUser({ id: user._id, name: user.name }, chatToken);

        const ch = client.channel("messaging", roomId, {
          members: [user._id], // server should add other member (counselor)
        });
        await ch.watch();
        if (!mounted) return;
        setChannel(ch);
        setChatClient(client);
      } catch (err) {
        console.error("Init error:", err);
      }
    };
    init();
    return () => {
      mounted = false;
      if (chatClient) chatClient.disconnectUser();
    };
    // eslint-disable-next-line
  }, [bookingId]);

  if (!channel) return <div>Loading chat...</div>;

  return (
    <div className="flex h-screen">
      <div className="w-1/3 p-4 border-r">
        <Channel channel={channel}>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Channel>
      </div>

      <div className="flex-1 p-4">
        <CallButtons user={user} onStartCall={(c)=>setCallInfo(c)} />
        <CallBox callInfo={callInfo} videoToken={videoToken} user={user} />
      </div>
    </div>
  );
}
