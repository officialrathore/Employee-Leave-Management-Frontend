import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllLeaves, getAllEmployees } from "../services/managerService";
import { FaCheckCircle, FaTimesCircle, FaClock, FaUsers } from "react-icons/fa";

const ManagerDashboard = () => {
  const [leaves, setLeaves] = useState([]);
  const [employeesList, setEmployeesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leavesData = await getAllLeaves();
        setLeaves(leavesData);

        const employeesData = await getAllEmployees();
        setEmployeesList(employeesData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const pending = leaves.filter((l) => l.status === "pending").length;
  const approved = leaves.filter((l) => l.status === "approved").length;
  const rejected = leaves.filter((l) => l.status === "rejected").length;
  const employeesCount = employeesList.length;

  const recentLeaves = [...leaves]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="w-full h-screen bg-gray-50 overflow-y-auto">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Manager Dashboard
          </h1>
          <p className="text-gray-600">
            Manage and approve employee leave requests
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-semibold uppercase">
                      Pending Requests
                    </p>
                    <p className="text-4xl font-bold text-yellow-600 mt-2">
                      {pending}
                    </p>
                  </div>
                  <FaClock className="text-yellow-500 text-4xl" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-semibold uppercase">
                      Approved
                    </p>
                    <p className="text-4xl font-bold text-green-600 mt-2">
                      {approved}
                    </p>
                  </div>
                  <FaCheckCircle className="text-green-500 text-4xl" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-semibold uppercase">
                      Rejected
                    </p>
                    <p className="text-4xl font-bold text-red-600 mt-2">
                      {rejected}
                    </p>
                  </div>
                  <FaTimesCircle className="text-red-500 text-4xl" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-semibold uppercase">
                      Team Members
                    </p>
                    <p className="text-4xl font-bold text-blue-600 mt-2">
                      {employeesCount}
                    </p>
                  </div>
                  <FaUsers className="text-blue-500 text-4xl" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Quick Actions
              </h3>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/manager/approve-requests"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all"
                >
                  Review All Requests ({pending} pending)
                </Link>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Recent Leave Requests
              </h3>
              {recentLeaves.length > 0 ? (
                <div className="space-y-3">
                  {recentLeaves.map((leave) => (
                    <div
                      key={leave._id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">
                          {leave.employee?.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(leave.startDate).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}{" "}
                          -{" "}
                          {new Date(leave.endDate).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                            leave.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : leave.status === "approved"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {leave.status}
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold capitalize">
                          {leave.leaveType}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No leave requests yet
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ManagerDashboard;
