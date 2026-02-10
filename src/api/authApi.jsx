import axios from "axios";

const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// ✅ Request interceptor – token attach
authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Response interceptor – refresh ONLY if token exists
authApi.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const token = localStorage.getItem("accessToken");

    if (error.response?.status === 401 && token && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/refreshtoken`,
          {},
          { withCredentials: true },
        );

        localStorage.setItem("accessToken", res.data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;

        return authApi(originalRequest);
      } catch (err) {
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default authApi;
