// src/api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// 요청 인터셉터
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터 (401)
let isLoggingOut = false;

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401 && !isLoggingOut) {
      isLoggingOut = true;
      alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
