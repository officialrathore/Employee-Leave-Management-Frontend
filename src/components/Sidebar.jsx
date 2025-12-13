import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaFileAlt,
  FaSignOutAlt,
  FaCheckCircle,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import axios from "../services/axios";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [showLogoutModal, setShowLogoutModal] = useState(false);


  useEffect(() => {
    if (user?.role === "manager") {
      const fetchPendingCount = async () => {
        try {
          const res = await axios.get("/manager/requests");
          const pending = (res.data || []).filter(l => l.status === "pending").length;
          setPendingCount(pending);
        } catch (error) {
          console.error("Error fetching pending count:", error);
        }
      };
      fetchPendingCount();
      const interval = setInterval(fetchPendingCount, 30000); 
      return () => clearInterval(interval);
    }
  }, [user]);
  // Close sidebar on mobile when navigating to a new page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        setIsOpen(true); // Always open on desktop
      } else {
        setIsOpen(false); // Close on mobile/tablet
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  }, [location]);

  const employeeLinks = [
    { name: "Dashboard", path: "/employee/dashboard", icon: <FaTachometerAlt /> },
    { name: "Apply Leave", path: "/employee/apply-leave", icon: <FaFileAlt /> },
    { name: "Leave Calendar", path: "/employee/leave-calendar", icon: <FaCalendarAlt /> },
    { name: "Leave History", path: "/employee/leave-history", icon: <FaFileAlt /> },
  ];

  const managerLinks = [
    { name: "Dashboard", path: "/manager/dashboard", icon: <FaTachometerAlt /> },
    {
      name: "Approve Requests",
      path: "/manager/approve-requests",
      icon: <FaCheckCircle />,
      badge: pendingCount > 0 ? pendingCount : null
    },  
    { name: "Leave Calendar", path: "/manager/leave-calendar", icon: <FaCalendarAlt /> },
  ];

  const links = user?.role === "manager" ? managerLinks : employeeLinks;

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg lg:hidden ${isOpen ? 'hidden' : ''}`}
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative top-0 left-0 h-full w-64 bg-linear-to-b from-slate-800 to-slate-900 text-white flex flex-col shadow-2xl transition-transform duration-300 z-40 overflow-y-auto ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-700 relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white lg:hidden"
          >
            <FaTimes size={16} />
          </button>
          <h1 className="text-2xl font-bold text-blue-400">LeaveHub</h1>
          <p className="text-slate-400 text-xs mt-1">Employee Leave Management</p>
        </div>

        {/* User Profile */}
        <div className="p-4 bg-slate-700 m-4 rounded-lg border border-slate-600">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold text-white">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{user?.name}</p>
              <p className="text-xs text-slate-300 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {links.map((link, idx) => (
            <Link
              key={idx}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${location.pathname === link.path
                ? "bg-blue-600 text-white font-semibold shadow-lg"
                : "text-slate-300 hover:bg-slate-700"
                }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{link.icon}</span>
                <span>{link.name}</span>
              </div>
              {link.badge && (
                <span className="bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all font-semibold"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>

        {/* Version */}
        <div className="p-3 text-center text-xs text-slate-500 border-t border-slate-700">
          v1.0.0 • Leave Management
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-2xl p-6 max-w-sm mx-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Confirm Logout</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                  setShowLogoutModal(false);
                }}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-35 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
