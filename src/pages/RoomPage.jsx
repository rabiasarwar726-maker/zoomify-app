import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import PreJoinScreen from "../components/PreJoinScreen";
import VC from "../components/VideoConference";

export default function RoomPage() {
  const { roomId } = useParams();
  const location = useLocation();
  const isHost = new URLSearchParams(location.search).get("host") === "true";
  const [tokenData, setTokenData] = useState(null);

  const handleJoin = async (name) => {
    try {
      const res = await fetch("https://zoomify-app.onrender.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomName: roomId,
          participantName: name,
          isHost
        })
      });
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
      const data = await res.json();
      setTokenData(data);
    } catch (err) {
      console.error("Failed to fetch token:", err);
    }
  };

  if (tokenData) {
    return <VC token={tokenData.token} serverUrl={tokenData.serverUrl} />;
  }

  return <PreJoinScreen onJoin={handleJoin} />;
}