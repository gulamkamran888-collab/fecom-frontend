import axios from "axios";

const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // cookies (refresh token) ke liye
});

export default publicApi;
