import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

const client = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auto-attach Authorization header if token exists in localStorage
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// ============ AUTH APIs ============
export async function apiLogin(username: string, password: string) {
  return client.post("/api/auth/login", { username, password });
}

export async function apiRegister(payload: Record<string, any>) {
  return client.post("/api/auth/register", payload);
}

export async function apiGetMe() {
  return client.get("/api/auth/me");
}

export async function apiUpdateMe(payload: Record<string, any>) {
  return client.put("/api/auth/me", payload);
}

export async function apiLogout() {
  return client.get("/api/auth/logout");
}

// ============ GENERIC HELPERS ============
export async function apiGet<T = any>(path: string, params?: Record<string, any>) {
  return client.get<T>(path, { params });
}

export async function apiPost<T = any>(path: string, payload?: Record<string, any>) {
  return client.post<T>(path, payload);
}

export async function apiPut<T = any>(path: string, payload?: Record<string, any>) {
  return client.put<T>(path, payload);
}

export async function apiDelete<T = any>(path: string) {
  return client.delete<T>(path);
}

export default client;
