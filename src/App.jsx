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

const RoleRoute = ({ children, allowed }) => {
  const { user, loading } = useAuth();

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!user) return <Navigate to="/login" />;

  if (!allowed.includes(user.role)) {
    return <Navigate to={`/${user.role}/dashboard`} />;
  }

  return children;
};

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
              <RoleRoute allowed={["employee"]}>
                <EmployeeDashboard />
              </RoleRoute>
            }
          />

          <Route
            path="/employee/apply-leave"
            element={
              <RoleRoute allowed={["employee"]}>
                <ApplyLeave />
              </RoleRoute>
            }
          />

          <Route
            path="/employee/leave-history"
            element={
              <RoleRoute allowed={["employee"]}>
                <LeaveHistory />
              </RoleRoute>
            }
          />

          <Route
            path="/employee/leave-calendar"
            element={
              <RoleRoute allowed={["employee"]}>
                <LeaveCalendarPage />
              </RoleRoute>
            }
          />

          {/* Manager Routes */}
          <Route
            path="/manager/dashboard"
            element={
              <RoleRoute allowed={["manager"]}>
                <ManagerDashboard />
              </RoleRoute>
            }
          />

          <Route
            path="/manager/approve-requests"
            element={
              <RoleRoute allowed={["manager"]}>
                <ApproveRequests />
              </RoleRoute>
            }
          />

          <Route
            path="/manager/leave-calendar"
            element={
              <RoleRoute allowed={["manager"]}>
                <ManagerCalendar />
              </RoleRoute>
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
