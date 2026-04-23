import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Zoomify</h1>
      <button onClick={() => navigate(`/room/${uuidv4()}?host=true`)}>
        Create Meeting
      </button>
      <br /><br />
      <button onClick={() => navigate("/join")}>
        Join Meeting
      </button>
    </div>
  );
}