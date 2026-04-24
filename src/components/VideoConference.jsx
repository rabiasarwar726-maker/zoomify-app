import { useState, useEffect } from "react";
import {
  LiveKitRoom,
  VideoConference,
  RoomAudioRenderer,
  ControlBar,
  useRoomContext,
} from "@livekit/components-react";

function ChatBox() {
  const room = useRoomContext();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const receiveMessage = (payload, participant) => {
      const text = new TextDecoder().decode(payload);
      setMessages((prev) => [
        ...prev,
        `${participant?.identity || "User"}: ${text}`,
      ]);
    };

    room.on("dataReceived", receiveMessage);

    return () => room.off("dataReceived", receiveMessage);
  }, [room]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const data = new TextEncoder().encode(message);
    await room.localParticipant.publishData(data);

    setMessages((prev) => [...prev, `Me: ${message}`]);
    setMessage("");
  };

  return (
    <div
      style={{
        position: "absolute",
        right: "10px",
        top: "10px",
        width: "250px",
        background: "white",
        padding: "10px",
        borderRadius: "10px",
        zIndex: 1000,
      }}
    >
      <div style={{ height: "200px", overflowY: "auto", marginBottom: "10px" }}>
        {messages.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message"
        style={{ width: "100%", marginBottom: "5px" }}
      />

      <button onClick={sendMessage} style={{ width: "100%" }}>
        Send
      </button>
    </div>
  );
}

export default function VC({ token, serverUrl }) {
  return (
    <LiveKitRoom
      token={token}
      serverUrl={serverUrl}
      connect
      video
      audio
      style={{ height: "100vh" }}
    >
      <VideoConference />
      <RoomAudioRenderer />
      <ControlBar />
      <ChatBox />
    </LiveKitRoom>
  );
}