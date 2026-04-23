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
    // optionally: setError(err.message) to show UI feedback
  }
};