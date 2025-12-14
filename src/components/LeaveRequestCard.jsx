import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
  approved: "bg-green-100 text-green-700 border-green-300",
  rejected: "bg-red-100 text-red-700 border-red-300",
};

const LeaveRequestCard = ({ leave, onAction }) => {
  return (
    <div className="border rounded-xl p-6 shadow-md bg-white hover:shadow-lg transition-all h-[300px] flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              {leave.employee?.name}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Leave Type:{" "}
              <span className="font-semibold capitalize">
                {leave.leaveType}
              </span>
            </p>
          </div>

          <span
            className={`px-4 py-2 text-sm border rounded-full font-bold capitalize ${statusColors[leave.status]}`}
          >
            {leave.status}
          </span>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <p className="text-xs text-gray-600 uppercase font-semibold">
                From
              </p>
              <p className="text-lg font-semibold">
                {new Date(leave.startDate).toLocaleDateString("en-IN")}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600 uppercase font-semibold">
                To
              </p>
              <p className="text-lg font-semibold">
                {new Date(leave.endDate).toLocaleDateString("en-IN")}
              </p>
            </div>
          </div>

          {leave.reason && (
            <>
              <p className="text-xs text-gray-600 uppercase font-semibold mb-1">
                Reason
              </p>
              <p className="text-gray-700">{leave.reason}</p>
            </>
          )}
        </div>
      </div>

      <div className="flex gap-20">
        <button
          disabled={leave.status !== "pending"}
          onClick={() => onAction(leave._id, "approve")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold ${
            leave.status !== "pending"
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          <FaCheckCircle /> Approve
        </button>

        <button
          disabled={leave.status !== "pending"}
          onClick={() => onAction(leave._id, "reject")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold ${
            leave.status !== "pending"
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 text-white"
          }`}
        >
          <FaTimesCircle /> Reject
        </button>
      </div>
    </div>
  );
};

export default LeaveRequestCard;
