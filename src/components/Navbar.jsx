import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  const homePath = user
    ? user.role === "manager"
      ? "/manager/dashboard"
      : "/employee/dashboard"
    : "/login";

  return (
    <nav className="w-full bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <Link to={homePath} className="text-xl font-semibold">
        Employee Leave System
      </Link>

      <div className="flex items-center gap-4">
        {!user ? (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          </>
        ) : (
          <>
            {user.role === "employee" && (
              <>
                <Link to="/employee/apply-leave">Apply Leave</Link>
                <Link to="/employee/leave-history">My Leaves</Link>
              </>
            )}

            {user.role === "manager" && (
              <>
                <Link to="/manager/dashboard">Dashboard</Link>
                <Link to="/manager/approve-requests">Approve</Link>
              </>
            )}

            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;