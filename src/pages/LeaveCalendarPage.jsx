import LeaveCalendar from "../components/LeaveCalendar";

const LeaveCalendarPage = () => {
  return (
    <div className="w-full h-screen bg-gray-50 overflow-y-auto">
      <div className="p-5">
        <div style={{ minHeight: "650px" }}>
          <LeaveCalendar />
        </div>
      </div>
    </div>
  );
};

export default LeaveCalendarPage;
