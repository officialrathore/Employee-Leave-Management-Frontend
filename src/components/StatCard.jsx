const StatCard = ({ title, value, color, icon: Icon }) => {
  const colorMap = {
    blue: "border-blue-500 text-blue-500",
    red: "border-red-500 text-red-500",
    yellow: "border-yellow-500 text-yellow-500",
    green: "border-green-500 text-green-500",
  };

  return (
    <div
      className={`bg-white p-4 sm:p-6 rounded-lg shadow-md border-l-4 ${colorMap[color]}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-600 uppercase">
            {title}
          </p>
          <p className="text-3xl sm:text-4xl font-bold mt-1">{value}</p>
        </div>

        {Icon && <Icon className={`text-4xl ${colorMap[color].split(" ")[1]}`} />}
      </div>
    </div>
  );
};

export default StatCard;
