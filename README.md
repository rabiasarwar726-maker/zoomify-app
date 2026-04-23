# 🎥 Zoomify — Zoom Clone with LiveKit

A full-featured video conferencing application built with React + LiveKit, featuring host/participant roles, screen sharing, live chat, and a polished dark UI.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎥 HD Video | Multi-participant video grid with adaptive streaming |
| 🎤 Audio Controls | Mute/unmute with visual indicators |
| 🖥️ Screen Sharing | Share your full screen or any window |
| 💬 Live Chat | Real-time in-call messaging via LiveKit data channels |
| 👥 Participants Panel | See who's in the meeting with mute/camera status |
| 👑 Host Controls | Host gets room admin privileges |
| 🔗 Invite Links | One-click copy of invite URL or meeting code |
| ⏱️ Meeting Timer | Real-time duration display |
| 📱 Pre-Join Screen | Camera/mic preview before entering |
| 🌑 Dark Mode UI | Polished dark theme with Syne + DM Sans fonts |

---

## 🚀 Quick Start

### 1. Get LiveKit Credentials

**Option A: LiveKit Cloud (Recommended)**
1. Sign up at [https://cloud.livekit.io](https://cloud.livekit.io) — free tier available
2. Create a new project
3. Copy your **API Key**, **API Secret**, and **WebSocket URL**

**Option B: Self-hosted LiveKit**
```bash
# Install LiveKit server
brew install livekit   # macOS
# or download from https://github.com/livekit/livekit

# Start with dev config
livekit-server --dev
# This starts on ws://localhost:7880 with key=devkey, secret=secret
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env`:
```env
LIVEKIT_API_KEY=your_api_key
LIVEKIT_API_SECRET=your_api_secret
LIVEKIT_URL=wss://your-project.livekit.cloud
```

> **For local testing** with `livekit-server --dev`, use:
> ```
> LIVEKIT_URL=ws://localhost:7880
> LIVEKIT_API_KEY=devkey
> LIVEKIT_API_SECRET=secret
> ```

### 3. Install & Run

```bash
npm install
npm run dev
```

This starts:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001

---

## 🏗️ Architecture

```
zoomify/
├── server.js              # Express API — token generation
├── src/
│   ├── App.jsx            # Router
│   ├── pages/
│   │   ├── HomePage.jsx   # Landing page — host or join
│   │   ├── RoomPage.jsx   # LiveKit room wrapper
│   │   └── JoinPage.jsx   # Redirect helper
│   └── components/
│       ├── VideoConference.jsx    # Main meeting UI + controls
│       ├── PreJoinScreen.jsx      # Camera preview + settings
│       ├── ParticipantTile.jsx    # Individual video tile
│       ├── ChatPanel.jsx          # Real-time chat sidebar
│       └── ParticipantsPanel.jsx  # Participants list sidebar
└── vite.config.js
```

## 🔑 API Endpoints

### `POST /api/token`
Generates a LiveKit JWT for room access.

**Request body:**
```json
{
  "roomName": "ABC123XY",
  "participantName": "Shoaib",
  "isHost": true
}
```

**Response:**
```json
{
  "token": "eyJhbGci...",
  "serverUrl": "wss://...",
  "roomName": "ABC123XY",
  "participantName": "Shoaib",
  "isHost": true
}
```

---

## 🎯 How to Use

### As Host
1. Go to `http://localhost:3000`
2. Enter your name → click **"Start New Meeting"**
3. Preview your camera/mic → click **"Start Meeting"**
4. Share the **Meeting ID** (shown top-left) with participants

### As Participant
1. Go to `http://localhost:3000`
2. Click **"Join a Meeting"** tab
3. Enter your name + the 8-character Meeting ID
4. Click **"Join Meeting"**

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Video SDK | LiveKit Client + Components |
| Backend | Express.js |
| Token Auth | livekit-server-sdk |
| Routing | React Router v6 |
| Styling | CSS Modules |
| Fonts | Syne + DM Sans |

---

## 🔧 Customization

### Add Recording
LiveKit supports server-side recording via Egress. Add to your server:
```js
import { EgressClient } from 'livekit-server-sdk'
const egressClient = new EgressClient(LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET)
await egressClient.startRoomCompositeEgress(roomName, { file: { ... } })
```

### Add Reactions / Raise Hand
Use LiveKit's data channel (already configured) to send reaction events.

### Production Deployment
1. `npm run build` — builds frontend to `dist/`
2. Serve `dist/` as static files from Express
3. Deploy to any Node.js host (Railway, Render, Fly.io, etc.)
