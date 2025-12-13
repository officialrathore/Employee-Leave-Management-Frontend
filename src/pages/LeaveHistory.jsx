import { useEffect, useState } from "react";
import { getMyLeaves } from "../services/leaveService";
import LeaveCard from "../components/LeaveCard";
import { FaFilter, FaSort } from "react-icons/fa";

const LeaveHistory = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await getMyLeaves();
        setLeaves(res);
      } catch (error) {
        console.error("Error fetching leaves:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaves();
  }, []);

  // Calculate stats
  const stats = {
    total: leaves.length,
    approved: leaves.filter((l) => l.status === "approved").length,
    pending: leaves.filter((l) => l.status === "pending").length,
    rejected: leaves.filter((l) => l.status === "rejected").length,
  };

  // Filter leaves
  const filteredLeaves = leaves.filter((leave) => {
    const matchesStatus =
      filterStatus === "all" || leave.status === filterStatus;
    const matchesSearch =
      leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      new Date(leave.startDate).toLocaleDateString("en-IN").includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="w-full h-screen bg-gray-50 overflow-y-auto">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            My Leave History
          </h1>
          <p className="text-gray-600">
            Track and manage all your leave requests
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            {leaves.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <StatCard title="Total" value={stats.total} color="blue" />
                <StatCard
                  title="Approved"
                  value={stats.approved}
                  color="green"
                />
                <StatCard
                  title="Pending"
                  value={stats.pending}
                  color="yellow"
                />
                <StatCard title="Rejected" value={stats.rejected} color="red" />
              </div>
            )}

            {/* Filter & Search Bar */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search by leave type or date..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* Filter Button */}
                <div className="flex items-center gap-2">
                  <FaFilter className="text-gray-600" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Leave Cards */}
            {filteredLeaves.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg shadow-md">
                <div className="mb-4 text-5xl">📋</div>
                <p className="text-gray-600 text-lg mb-2">
                  {leaves.length === 0
                    ? "No leave requests yet."
                    : "No leaves found matching your filters."}
                </p>
                {leaves.length === 0 && (
                  <p className="text-gray-500">
                    Click "Apply Leave" to submit your first request.
                  </p>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLeaves.map((leave) => (
                  <LeaveCard key={leave._id} leave={leave} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

/* Stats Card Component */
const StatCard = ({ title, value, color }) => {
  const colors = {
    blue: "border-blue-500 text-blue-600 bg-blue-50",
    green: "border-green-500 text-green-600 bg-green-50",
    yellow: "border-yellow-500 text-yellow-600 bg-yellow-50",
    red: "border-red-500 text-red-600 bg-red-50",
  };

  return (
    <div className={`p-4 rounded-lg border-2 ${colors[color]}`}>
      <p className="text-sm font-semibold uppercase opacity-80">{title}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
  );
};

export default LeaveHistory;
