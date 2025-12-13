import LeaveCalendar from "../components/LeaveCalendar";

const LeaveCalendarPage = () => {
  return (
    <div className="w-full h-screen bg-gray-50 overflow-y-auto">
      <div className="p-5">
        {/* <div className="bg-white rounded-lg shadow-lg p-6"> */}
          {/* <h1 className="text-3xl font-bold text-gray-800 mb-2">Leave Calendar</h1> */}
          {/* <p className="text-gray-600 mb-6">View all your leaves in a calendar format</p> */}
          <div style={{ minHeight: "650px" }}>
            <LeaveCalendar />
          </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default LeaveCalendarPage;
