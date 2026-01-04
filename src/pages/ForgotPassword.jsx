import axios from '../services/axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

    const handleUpdatePassword= async (e) => {
      e.preventDefault();
      setError("");
      try {
          await axios.post("/auth/update-password", { email, password, confirmPassword });
          navigate("/login");
          toast.success("Password Updated successful!");
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
          Forgot Password to continue to LeaveHub
        </p>
        <form onSubmit={handleUpdatePassword} className="space-y-4">
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
          <div>
            <label className="block text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Enter your confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Update
          </button>
        </form>
        <div className="flex items-center justify-center">
        <p className="mt-4 text-sm text-gray-500 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword