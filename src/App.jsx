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

const App = () => {
  const { user } = useAuth();

  return (
    <div className="flex">
      <ToastContainer position="top-right" autoClose={3000} pauseOnHover />

      {/* SHOW SIDEBAR ONLY IF USER LOGGED IN */}
      {user && <Sidebar />}

      <main className="flex-1 w-full">
        <Routes>

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Employee Routes */}
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

          {/* Manager Routes */}
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

          {/* Auto Redirect based on ROLE */}
          <Route
            path="/"
            element={
              user
                ? <Navigate to={`/${user.role}/dashboard`} />
                : <Navigate to="/login" />
            }
          />

          {/* Wrong URL → go to relevant dashboard */}
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
