import { useEffect, useState } from "react";
import { getAllLeaves, updateLeave } from "../services/managerService";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
  approved: "bg-green-100 text-green-700 border-green-300",
  rejected: "bg-red-100 text-red-700 border-red-300",
};

const ApproveRequests = () => {
  const [requests, setRequests] = useState([]);
  const [commentModal, setCommentModal] = useState({ show: false, leaveId: null, action: null });
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);

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

    const updatedLeave = response.leave; // ✅ VERY IMPORTANT

    setRequests((prev) =>
      prev.map((req) =>
        req._id === updatedLeave._id ? updatedLeave : req
      )
    );

    setCommentModal({ show: false, leaveId: null, action: null });
    setComment("");
    toast.success("Leave updated successfully");
  } catch (error) {
    console.error(error);
    toast.error(
      error.response?.data?.message || "Error updating leave"
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="w-full h-screen bg-gray-50 overflow-y-auto">
      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Leave Approval Requests</h2>
          <p className="text-gray-600">Review and approve/reject employee leave requests</p>
        </div>

        {initialLoading ? (
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
            requests.map((leave) => (
              <div
                key={leave._id}
                className="border rounded-xl p-6 shadow-md bg-white hover:shadow-lg transition-all h-full flex flex-col justify-between"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {leave.employee?.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Leave Type: <span className="font-semibold capitalize">{leave.leaveType}</span>
                    </p>
                  </div>

                  <span
                    className={`px-4 py-2 text-sm border rounded-full font-bold capitalize ${
                      statusColors[leave.status]
                    }`}
                  >
                    {leave.status}
                  </span>
                </div>

                {/* Dates & Reason */}
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-600 uppercase font-semibold">From</p>
                      <p className="text-lg font-semibold text-gray-800">{new Date(leave.startDate).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 uppercase font-semibold">To</p>
                      <p className="text-lg font-semibold text-gray-800">{new Date(leave.endDate).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })}</p>
                    </div>
                  </div>
                  {leave.reason && (
                    <div>
                      <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Reason</p>
                      <p className="text-gray-700">{leave.reason}</p>
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex gap-4 justify-between">
                  <button
                    disabled={leave.status !== "pending"}
                    onClick={() => setCommentModal({ show: true, leaveId: leave._id, action: "approve" })}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                      leave.status !== "pending"
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                  >
                    <FaCheckCircle /> Approve
                  </button>

                  <button
                    disabled={leave.status !== "pending"}
                    onClick={() => setCommentModal({ show: true, leaveId: leave._id, action: "reject" })}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                      leave.status !== "pending"
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700 text-white"
                    }`}
                  >
                    <FaTimesCircle /> Reject
                  </button>
                </div>
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

      {/* Comment Modal */}
      {commentModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {commentModal.action === "approve" ? "Approve Leave" : "Reject Leave"}
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
