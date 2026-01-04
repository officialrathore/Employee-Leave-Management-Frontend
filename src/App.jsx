import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ApplyLeave from "./pages/ApplyLeave";
import LeaveHistory from "./pages/LeaveHistory";
import LeaveCalendarPage from "./pages/LeaveCalendarPage";
import ManagerDashboard from "./pages/ManagerDashboard";
import ApproveRequests from "./pages/ApproveRequests";
import ManagerCalendar from "./pages/ManagerCalendar";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  const { user } = useAuth();
  const getDashboardPath = (role) => {
    if (role === "admin") return "/admin/dashboard";
    if (role === "manager") return "/manager/dashboard";
    return "/employee/dashboard";
  };
  return (
    <div className={user ? "flex" : ""}>
      <ToastContainer position="top-right" autoClose={3000} pauseOnHover />

      {user && <Sidebar />}

      <main className={user ? "flex-1 w-full" : "w-full"}>
        <Routes>

          <Route 
            path="/login" 
            element={user ? <Navigate to={getDashboardPath(user.role)} replace /> : <Login />} 
          />
          <Route 
            path="/signup" 
            element={user ? <Navigate to={getDashboardPath(user.role)} replace /> : <SignUp />} 
          />
          <Route 
            path="/forgot-password" 
            element={user ? <Navigate to={getDashboardPath(user.role)} replace /> : <ForgotPassword />} 
          />


          <Route
            path="/employee/dashboard"
            element={
              <ProtectedRoute allowedRoles={["employee"]}>
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/employee/apply-leave"
            element={
              <ProtectedRoute allowedRoles={["employee"]}>
                <ApplyLeave />
              </ProtectedRoute>
            }
          />

          <Route
            path="/employee/leave-history"
            element={
              <ProtectedRoute allowedRoles={["employee"]}>
                <LeaveHistory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/employee/leave-calendar"
            element={
              <ProtectedRoute allowedRoles={["employee"]}>
                <LeaveCalendarPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/manager/dashboard"
            element={
              <ProtectedRoute allowedRoles={["manager"]}>
                <ManagerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/manager/approve-requests"
            element={
              <ProtectedRoute allowedRoles={["manager"]}>
                <ApproveRequests />
              </ProtectedRoute>
            }
          />

          <Route
            path="/manager/leave-calendar"
            element={
              <ProtectedRoute allowedRoles={["manager"]}>
                <ManagerCalendar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/"
            element={
              user
                ? <Navigate to={`/${user.role}/dashboard`} />
                : <Navigate to="/login" />
            }
          />

          <Route
            path="*"
            element={
              user
                ? <Navigate to={`/${user.role}/dashboard`} />
                : <Navigate to="/login" />
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
