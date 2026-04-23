import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function JoinPage() {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Join Meeting</h2>
      <input onChange={(e) => setRoomId(e.target.value)} />
      <br /><br />
      <button onClick={() => navigate(`/room/${roomId}`)}>
        Join
      </button>
    </div>
  );
}