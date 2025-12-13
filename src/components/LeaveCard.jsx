import {
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaHeartbeat,
  FaUmbrellaBeach,
  FaBriefcase,
  FaPlane,
} from "react-icons/fa";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
  approved: "bg-green-100 text-green-700 border-green-300",
  rejected: "bg-red-100 text-red-700 border-red-300",
};

const statusIcons = {
  pending: <FaClock className="text-yellow-600" />,
  approved: <FaCheckCircle className="text-green-600" />,
  rejected: <FaTimesCircle className="text-red-600" />,
};

const leaveTypeIcon = {
  sick: <FaHeartbeat className="text-red-500 text-2xl" />,
  casual: <FaUmbrellaBeach className="text-yellow-500 text-2xl" />,
  paid: <FaBriefcase className="text-blue-500 text-2xl" />,
  vacation: <FaPlane className="text-indigo-500 text-2xl" />,
};

const LeaveCard = ({ leave }) => {
  const startDate = new Date(leave.startDate);
  const endDate = new Date(leave.endDate);

  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const days = Math.round((endDate - startDate) / MS_PER_DAY) + 1;

  return (
    <div className="border border-gray-200 rounded-xl p-6 shadow-md bg-white hover:shadow-xl transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl">
            {leaveTypeIcon[leave.leaveType] || <FaCalendarAlt />}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 capitalize">
              {leave.leaveType} Leave
            </h3>
            <p className="text-sm text-gray-600">
              {days} day{days > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <span
          className={`px-4 py-2 text-sm border-2 rounded-full font-bold capitalize flex items-center gap-2 ${
            statusColors[leave.status]
          }`}
        >
          <span>{statusIcons[leave.status]}</span>
          {leave.status}
        </span>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaCalendarAlt className="text-blue-600 text-lg" />
            <div>
              <p className="text-sm text-gray-600">From</p>
              <p className="font-semibold text-gray-800">
                {startDate.toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          <div className="text-gray-400">→</div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-gray-600">To</p>
              <p className="font-semibold text-gray-800">
                {endDate.toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <FaClock className="text-indigo-600 text-lg" />
          </div>
        </div>
      </div>

      {leave.reason && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 font-semibold mb-1">Reason</p>
          <p className="text-gray-700 italic">{leave.reason}</p>
        </div>
      )}

      {leave.managerComment && (
        <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-400 rounded-lg">
          <p className="text-sm text-gray-700">
            <span className="font-bold text-purple-700">Manager's Note:</span>
            <br />
            {leave.managerComment}
          </p>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>
            Submitted on{" "}
            {new Date(leave.createdAt).toLocaleDateString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
          {leave.updatedAt && leave.updatedAt !== leave.createdAt && (
            <>
              <span>•</span>
              <span>
                Updated on{" "}
                {new Date(leave.updatedAt).toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveCard;
