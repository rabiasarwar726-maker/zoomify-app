import { useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import VideoConference from "../components/VideoConference";
import PreJoinScreen from "../components/PreJoinScreen";

export default function RoomPage() {
  const { roomId } = useParams();
  const [params] = useSearchParams();
  const isHost = params.get("host") === "true";

  const [tokenData, setTokenData] = useState(null);

  const handleJoin = async (name) => {
    const res = await fetch("/api/token", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        roomName: roomId,
        participantName: name,
        isHost
      })
    });

    const data = await res.json();
    setTokenData(data);
  };

  if (!tokenData) return <PreJoinScreen onJoin={handleJoin} />;

  return <VideoConference {...tokenData} />;
}