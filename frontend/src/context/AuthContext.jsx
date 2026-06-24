import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true until session check completes

  // On every app load — check if cookie session is still valid
  useEffect(() => {
    axiosInstance
      .get("/auth/profile")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const register = async ({ username, email, phone, password }) => {
    const { data } = await axiosInstance.post("/auth/register", {
      username,
      email,
      phone,
      password,
    });
    setUser(data);
  };

  const login = async (usernameOrEmail, password) => {
    const { data } = await axiosInstance.post("/auth/login", {
      usernameOrEmail,
      password,
    });
    setUser(data);
  };

  const logout = async () => {
    await axiosInstance.post("/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook — use this in any component
export const useAuth = () => useContext(AuthContext);
