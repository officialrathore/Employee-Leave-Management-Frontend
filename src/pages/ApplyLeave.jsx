import { useState, useEffect } from "react";
import Calendar from "../components/Calendar";
import { applyLeave, getLeaveBalance } from "../services/leaveService";
import { toast } from "react-toastify";

const LEAVE_TYPES = [
  { value: "sick", label: "Sick Leave" },
  { value: "casual", label: "Casual Leave" },
  { value: "paid", label: "Paid Leave" },
  { value: "vacation", label: "Vacation Leave" },
];

const ApplyLeave = () => {
  const [leaveType, setLeaveType] = useState("");
  const [range, setRange] = useState({ start: "", end: "" });
  const [reason, setReason] = useState("");
  const [leaveBalance, setLeaveBalance] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 fetch leave balance
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const data = await getLeaveBalance();
        setLeaveBalance(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBalance();
  }, []);

  // 🔹 calculate requested days
  const calculateDays = () => {
    if (!range.start || !range.end) return 0;
    const s = new Date(range.start);
    const e = new Date(range.end);
    return Math.round((e - s) / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = new Date(range.start);
    const end = new Date(range.end);

    if (start < today || end < today) {
      toast.error("Past dates are not allowed");
      return;
    }

    if (end < start) {
      toast.error("End date cannot be before start date");
      return;
    }

    const requestedDays = calculateDays();
    const available =
      leaveBalance?.perType?.[leaveType]?.available ?? 0;

    // 🔥 MAIN CHECK
    if (requestedDays > available) {
      toast.error(
        `You only have ${available} ${leaveType} leave days available`
      );
      return;
    }

    setLoading(true);
    try {
      await applyLeave({
        leaveType,
        startDate: range.start,
        endDate: range.end,
        reason,
      });

      toast.success("Leave requested successfully");
      setTimeout(() => {
        window.location.href = "/employee/leave-history";
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6">Apply Leave</h2>

        {/* Leave Type */}
        <label className="font-semibold">Leave Type</label>
        <select
          className="border p-2 w-full mb-2 rounded-lg"
          value={leaveType}
          onChange={(e) => setLeaveType(e.target.value)}
          required
        >
          <option value="">Select Leave Type</option>
          {LEAVE_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>

        {/* Balance info */}
        {leaveType && leaveBalance && (
          <p className="text-sm text-gray-600 mb-3">
            Available:{" "}
            <span className="font-semibold">
              {leaveBalance.perType[leaveType]?.available || 0} days
            </span>
          </p>
        )}

        {/* Calendar */}
        <label className="font-semibold">Select Date Range</label>
        <Calendar onRangeSelect={setRange} />

        {/* Reason */}
        <label className="font-semibold mt-3 block">Reason</label>
        <textarea
          className="border p-2 w-full rounded-lg"
          rows="3"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading || !leaveType || !range.start || !range.end}
          className={`w-full mt-6 py-3 rounded-lg text-white font-semibold ${
            loading
              ? "bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Submitting..." : "Submit Leave"}
        </button>
      </form>
    </div>
  );
};

export default ApplyLeave;
