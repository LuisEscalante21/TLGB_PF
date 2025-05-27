import React, { createContext, useEffect, useState } from "react";
import { Global } from "../helpers/Global";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    userId: null,
    role: null,  // Changed from userType to role for clarity
    email: null
  });
  const [loading, setLoading] = useState(true);

  // Leer cookie userData
  const getUserDataFromCookies = () => {
    const cookies = document.cookie.split("; ");
    const userDataCookie = cookies.find((row) => row.startsWith("userData="));
    if (userDataCookie) {
      try {
        return JSON.parse(decodeURIComponent(userDataCookie.split("=")[1]));
      } catch (e) {
        console.error("Error parsing userData cookie:", e);
        return null;
      }
    }
    return null;
  };

  const saveUserDataToCookies = (userData) => {
    document.cookie = `userData=${encodeURIComponent(
      JSON.stringify(userData)
    )}; path=/; max-age=86400`; // 1 día
  };

  const deleteUserDataCookie = () => {
    document.cookie = "userData=; Max-Age=0; path=/;";
  };

  const authUser = () => {
    const userData = getUserDataFromCookies();
    if (userData) {
      setAuth(userData);
      setLoading(false);
      return true;
    } else {
      setLoading(false);
      return false;
    }
  };

  useEffect(() => {
    authUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(Global.url + "login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.status === "success") {
        const userData = {
          userId: data.user.userId,
          role: data.user.role || data.user.userType, // Support both role and userType from backend
          email: data.user.email,
        };

        // Guardar en cookie y estado
        saveUserDataToCookies(userData);
        setAuth(userData);

        return { success: true, role: userData.role };
      }

      return { success: false, message: data.message };
    } catch (error) {
      return { success: false, message: "Error de conexión" };
    }
  };

  const logout = async () => {
    try {
      await fetch(Global.url + "logout", {
        method: "POST",
        credentials: "include",
      });
    } finally {
      setAuth({ userId: null, role: null, email: null });
      deleteUserDataCookie();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading,
        login,
        logout,
        isAuthenticated: !!auth.userId,
        isAdmin: auth.role === "Admin",
        isManager: auth.role === "Manager",
        isEmployee: auth.role === "Employee",
        isClient: auth.role === "Client",
        userRole: auth.role // Direct access to the role
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;