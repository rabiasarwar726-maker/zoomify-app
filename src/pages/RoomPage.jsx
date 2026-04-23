const handleJoin = async (name) => {
  const res = await fetch("https://zoomify-app.onrender.com/api/token", {
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