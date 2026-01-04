import { useEffect, useState } from "react";
import { getAllLeaves, updateLeave } from "../services/managerService";
import { toast } from "react-toastify";
import LeaveRequestCard from "../components/LeaveRequestCard";
import { FaFilter } from "react-icons/fa";


const ApproveRequests = () => {
  const [requests, setRequests] = useState([]);
  const [commentModal, setCommentModal] = useState({
    show: false,
    leaveId: null,
    action: null,
  });
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);
    const [filterStatus, setFilterStatus] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getAllLeaves();
        setRequests(res);
      } catch (err) {
        console.error("Error fetching leave requests:", err);
        setError("Failed to fetch leave requests. Try again later.");
      } finally {
        setInitialLoading(false);
      }
    };
    loadData();
  }, []);

  const handleAction = async () => {
    if (!comment.trim()) {
      toast.warn("Please enter a comment");
      return;
    }

    setLoading(true);
    try {
      const response = await updateLeave(
        commentModal.leaveId,
        commentModal.action,
        comment
      );

      const updatedLeave = response.leave;

      setRequests((prev) =>
        prev.map((req) => (req._id === updatedLeave._id ? updatedLeave : req))
      );

      setCommentModal({ show: false, leaveId: null, action: null });
      setComment("");
      toast.success("Leave updated successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error updating leave");
    } finally {
      setLoading(false);
    }
  };

  
  const filteredLeaves= requests.filter((leave) => {
    const matchesStatus =
      filterStatus === "all" || leave.status === filterStatus;
    const matchesSearch =
      leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      new Date(leave.startDate)
        .toLocaleDateString("en-IN")
        .includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="w-full h-screen bg-gray-50 overflow-y-auto">
      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Leave Approval Requests
          </h2>
          <p className="text-gray-600">
            Review and approve/reject employee leave requests
          </p>
        </div>

                  <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                     <div className="flex flex-col sm:flex-row gap-4">
                       <div className="flex-1">
                         <input
                           type="text"
                           placeholder="Search by leave type or date..."
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                           className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                         />
                       </div>
       
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

        {initialLoading && filteredLeaves.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        ) : (
          <div className="space-y-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.length > 0 ? (
              filteredLeaves.map((leave) => (
                <div  key={leave._id}>
                   <LeaveRequestCard
   
    leave={leave}
    onAction={(id, action) =>
      setCommentModal({ show: true, leaveId: id, action })
    }
  />
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No leave requests found</p>
              </div>
            )}
          </div>
        )}
      </div>

      {commentModal.show && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {commentModal.action === "approve"
                ? "Approve Leave"
                : "Reject Leave"}
            </h3>
            <p className="text-gray-600 mb-4">
              Please enter a comment for your {commentModal.action}al decision.
            </p>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Enter manager comment..."
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
              rows="4"
            ></textarea>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setCommentModal({ show: false, leaveId: null, action: null });
                  setComment("");
                }}
                className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAction}
                disabled={loading}
                className={`flex-1 px-4 py-2 rounded-lg font-semibold text-white transition-all ${
                  commentModal.action === "approve"
                    ? "bg-green-600 hover:bg-green-700 disabled:bg-gray-400"
                    : "bg-red-600 hover:bg-red-700 disabled:bg-gray-400"
                }`}
              >
                {loading ? "Processing..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApproveRequests;
