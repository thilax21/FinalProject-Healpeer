// export async function fetchStreamTokens(user, bookingId) {
//   if (!user || !user._id) throw new Error("User object missing _id");

//   const res = await fetch("http://localhost:3000/api/stream/token", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ userId: user._id, name: user.name, role: user.role, bookingId }),
//   });

//   if (!res.ok) {
//     const errMsg = await res.text();
//     throw new Error(`Failed to fetch Stream tokens: ${errMsg}`);
//   }
//   return res.json(); // { chatToken, videoToken, roomId }
// }


const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export async function fetchStreamTokens(user, bookingId) {
  if (!user || !user._id) throw new Error("User object missing _id");
  if (!bookingId) throw new Error("bookingId missing");

  const res = await fetch(`${BACKEND}/api/stream/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: user._id, name: user.name, role: user.role, bookingId }),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Failed to fetch tokens: ${txt}`);
  }
  return res.json(); // { chatToken, videoToken, roomId }
}
