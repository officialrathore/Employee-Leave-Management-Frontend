import { useEffect, useState } from "react";
import { getLeaveBalance } from "../services/leaveService";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const Card = ({ title, value, color }) => {
  const colors = {
    blue: "border-blue-500 text-blue-600",
    red: "border-red-500 text-red-600",
    yellow: "border-yellow-500 text-yellow-600",
    green: "border-green-500 text-green-600",
  };

  return (
    <div
      className={`bg-white p-4 sm:p-6 rounded-lg shadow-md border-l-4 ${colors[color]}`}
    >
      <h3 className="text-sm font-semibold text-gray-600 uppercase">{title}</h3>
      <p className="text-3xl sm:text-4xl font-bold mt-1">{value}</p>
    </div>
  );
};
const EmployeeDashboard = () => {
  const [leaveBalance, setLeaveBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const data = await getLeaveBalance();
        setLeaveBalance(data);
      } catch (err) {
        console.error("Error fetching leave balance:", err);
        setError("Failed to fetch leave balance. Try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBalance();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
      </div>
    );

  if (error)
    return <div className="p-8 text-center text-red-500 text-lg">{error}</div>;

  const pieData = [
    { name: "Used", value: leaveBalance.usedDays },
    { name: "Pending", value: leaveBalance.pendingDays },
    { name: "Available", value: leaveBalance.available },
  ];

  const pieColors = pieData.map((d) =>
    d.name === "Used" ? "#F87171" : d.name === "Pending" ? "#FBBF24" : "#34D399"
  );

  const perType = leaveBalance.perType
    ? Object.entries(leaveBalance.perType).map(([type, info]) => ({
        type: type.replace("_", " "),
        used: info.used,
        pending: info.pending,
        available: info.available,
      }))
    : [];

  const typeColors = {
    sick: "border-red-500 text-red-600",
    casual: "border-yellow-500 text-yellow-600",
    paid: "border-green-500 text-green-600",
    vacation: "border-blue-500 text-blue-600",
  };

  const barData = perType.map((item) => ({
    type: item.type,
    Used: item.used,
    Pending: item.pending,
    Available: item.available,
  }));

  return (
    <div className="w-full h-screen bg-gray-50 overflow-y-auto">
      <div className="p-8">
        <div className="mb-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            My Dashboard
          </h1>
          <p className="text-gray-600">Welcome to your employee dashboard</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card
            title="Total Leave"
            value={leaveBalance.totalDays}
            color="blue"
          />
          <Card title="Used Leave" value={leaveBalance.usedDays} color="red" />
          <Card
            title="Pending"
            value={leaveBalance.pendingDays}
            color="yellow"
          />
          <Card
            title="Available"
            value={leaveBalance.available}
            color="green"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {perType.map((item, index) => (
            <div
              key={index}
              className={`bg-white p-5 rounded-lg shadow border-l-4 ${
                typeColors[item.type.toLowerCase()] || "border-gray-500"
              }`}
            >
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                {item.type}
              </h3>
              <div className="flex justify-between text-sm font-medium">
                <span className="text-red-600">Used:</span>
                <span>{item.used}</span>
              </div>
              <div className="flex justify-between text-sm font-medium mt-1">
                <span className="text-yellow-600">Pending:</span>
                <span>{item.pending}</span>
              </div>
              <div className="flex justify-between text-sm font-medium mt-1">
                <span className="text-green-600">Available:</span>
                <span>{item.available}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold mb-4 text-gray-700">
              Overall Leave Overview
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={pieColors[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold mb-4 text-gray-700">
              Leave By Type
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={barData}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Used" stackId="a" fill="#F87171" />
                <Bar dataKey="Pending" stackId="a" fill="#FBBF24" />
                <Bar dataKey="Available" stackId="a" fill="#34D399" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
