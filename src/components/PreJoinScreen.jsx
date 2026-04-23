import { useState } from "react";

export default function PreJoinScreen({ onJoin }) {
  const [name, setName] = useState("");

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Enter Name</h2>
      <input onChange={(e) => setName(e.target.value)} />
      <br /><br />
      <button onClick={() => onJoin(name)}>Join</button>
    </div>
  );
}