const LeaveTypeCard = ({ type, used, pending, available, colorClass }) => {
  return (
    <div className={`bg-white p-5 rounded-lg shadow border-l-4 ${colorClass}`}>
      <h3 className="text-lg font-semibold text-gray-700 mb-3 capitalize">
        {type}
      </h3>

      <div className="flex justify-between text-sm font-medium">
        <span className="text-red-600">Used:</span>
        <span>{used}</span>
      </div>

      <div className="flex justify-between text-sm font-medium mt-1">
        <span className="text-yellow-600">Pending:</span>
        <span>{pending}</span>
      </div>

      <div className="flex justify-between text-sm font-medium mt-1">
        <span className="text-green-600">Available:</span>
        <span>{available}</span>
      </div>
    </div>
  );
};

export default LeaveTypeCard;
