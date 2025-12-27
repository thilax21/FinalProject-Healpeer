import axios from "axios";


const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:3000/api",
});

// attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Fetch all bookings for a client
export const getClientBookings = (clientId) => API.get(`/bookings/client/${clientId}`);

// Create a new booking
export const createBooking = (bookingData) => API.post("/bookings", bookingData);

// Get booking by session ID
export const getBookingBySession = (sessionId) => API.get(`/bookings/session/${sessionId}`);

// Create Stripe checkout session
export const createCheckoutSession = (bookingId) =>
  API.post("/payment/create-checkout-session", { bookingId });

export default API;
