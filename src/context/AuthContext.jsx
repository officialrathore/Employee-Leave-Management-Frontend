import { createContext, useContext, useState, useEffect } from "react";
import axios from "../services/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage when app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } catch (error) {
        console.error("Error loading user from localStorage:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }

    // Set loading to false after user data is loaded
    setLoading(false);
  }, []);

  /** LOGIN FUNCTION */
  const login = async (email, password) => {
    const response = await axios.post("/auth/login", { email, password });
    // console.log("Login response:", response.data);

    const { user, token } = response.data;

    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    return response.data;
  };

  /** SIGNUP FUNCTION */
  const signup = async (name, email, password, role) => {
    const response = await axios.post("/auth/signup", {
      name,
      email,
      password,
      role,
    });

    return response.data; // FIXED
  };

  /** LOGOUT FUNCTION */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

