import { createContext, useContext, useState } from "react";
import * as authService from "../services/authService.js";

const AuthContext = createContext(null);
const STORAGE_KEY = "pharmacie_auth";

function readStored() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(readStored); // { user, token } or null

  function persist(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setAuth(data);
  }

  async function login(email, password) {
    persist(await authService.login(email, password));
  }

  // Creates a pharmacien account and logs it in
  async function register(fields) {
    persist(await authService.register(fields));
  }

  async function logout() {
    await authService.logout();
    localStorage.removeItem(STORAGE_KEY);
    setAuth(null);
  }

  const value = {
    user: auth?.user ?? null,
    token: auth?.token ?? null,
    isPharmacien: auth?.user?.role === "pharmacien",
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
