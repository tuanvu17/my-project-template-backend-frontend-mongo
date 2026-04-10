import { useState, useEffect } from "react";
import { User } from "../types";

/**
 * Hook quản lý xác thực người dùng.
 * - Đọc token và user từ localStorage khi mount.
 * - Cung cấp hàm login() để lưu token/user vào localStorage và state.
 * - Cung cấp hàm logout() để xóa token/user khỏi localStorage và state.
 * - Trả về trạng thái isAuthenticated dựa trên token và user hiện tại.
 */
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse user data");
      }
    }
    setLoading(false);
  }, []);

  const login = (newToken: string, newUser: User) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token && !!user;

  return { user, token, loading, isAuthenticated, login, logout };
};
