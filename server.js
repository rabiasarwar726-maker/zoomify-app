import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AccessToken } from "livekit-server-sdk";

dotenv.config();

const app = express();

/* ========================
   MIDDLEWARE
======================== */
app.use(cors({
  origin: "*", // in production replace with your frontend URL
}));
app.use(express.json());

/* ========================
   ENV VARIABLES
======================== */
const PORT = process.env.PORT || 3001;

const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY;
const LIVEKIT_API_SECRET = process.env.LIVEKIT_API_SECRET;
const LIVEKIT_URL = process.env.LIVEKIT_URL;

/* ========================
   HEALTH CHECK ROUTE
======================== */
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Zoomify backend is running 🚀",
  });
});

/* ========================
   TOKEN API (LIVEKIT)
======================== */
app.post("/api/token", async (req, res) => {
  try {
    const { roomName, participantName, isHost } = req.body;

    if (!roomName || !participantName) {
      return res.status(400).json({
        error: "roomName and participantName are required",
      });
    }

    const at = new AccessToken(
      LIVEKIT_API_KEY,
      LIVEKIT_API_SECRET,
      {
        identity: participantName,
      }
    );

    at.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: true,
      canSubscribe: true,
      roomAdmin: isHost || false,
    });

    const token = await at.toJwt();

    res.json({
      token,
      serverUrl: LIVEKIT_URL,
    });

  } catch (error) {
    console.error("Token generation error:", error);

    res.status(500).json({
      error: "Failed to generate token",
    });
  }
});

/* ========================
   START SERVER
======================== */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
