import { useState, useEffect } from "react";

export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("loggedIn") === "true");
  const [username, setUsername] = useState(localStorage.getItem("username") || "User");

  const login = (email, password) => {
    const storedUser = JSON.parse(localStorage.getItem(email));
    if (storedUser && storedUser.password === password) {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("username", storedUser.username);
      window.dispatchEvent(new Event("auth:updated"));
      return storedUser;
    }
    return null;
  };

  const register = (data) => {
    const existing = JSON.parse(localStorage.getItem(data.email));
    if (existing) return false;
    localStorage.setItem(data.email, JSON.stringify(data));
    return true;
  };

  const logout = () => {
    localStorage.setItem("loggedIn", false);
    localStorage.removeItem("username");
    window.dispatchEvent(new Event("auth:updated"));
  };

  useEffect(() => {
    const updateAuth = () => {
      setIsLoggedIn(localStorage.getItem("loggedIn") === "true");
      const stored = localStorage.getItem("username");
      setUsername(stored && stored !== "undefined" && stored.trim() !== "" ? stored : "User");
    };
    window.addEventListener("auth:updated", updateAuth);
    return () => window.removeEventListener("auth:updated", updateAuth);
  }, []);

  return { isLoggedIn, username, login, register, logout };
}
