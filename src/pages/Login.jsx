import React, { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "../services/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, setUserFromExternal } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const userParam = searchParams.get('user');
    const errorParam = searchParams.get('error');

    if (token && userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));
        setUserFromExternal(user, token);
        // Navigate based on role
        if (user.role === "manager") {
          navigate("/manager/dashboard");
        } else if (user.role === "employee") {
          navigate("/employee/dashboard");
        } else if (user.role === "admin") {
          navigate("/admin/dashboard");
        }
        toast.success("Login successful!");
      } catch (err) {
        toast.error("Login failed");
      }
    } else if (errorParam) {
      toast.error("Google login failed");
    }
  }, [searchParams, navigate]);

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BASE_URL}/auth/google`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await login(email, password);

      if (data.user.role === "manager") {
        navigate("/manager/dashboard");
      } else if (data.user.role === "employee") {
        navigate("/employee/dashboard");
      }else if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      }
      toast.success("Login successful!");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-b from-sky-50 to-white">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 mx-5 lg:mx-0">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
            LH
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">
          Welcome back
        </h2>
        <p className="text-sm text-center text-gray-500 mb-4">
          Sign in to continue to LeaveHub
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Login
          </button>
        </form>
        <div className="mt-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Login with Google
          </button>
        </div>
        <div className="flex items-center justify-between">

        <p className="mt-4 text-sm text-gray-500 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
        <p className="mt-4 text-sm text-gray-500 text-center">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
           forgot password ?
          </Link>
        </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
