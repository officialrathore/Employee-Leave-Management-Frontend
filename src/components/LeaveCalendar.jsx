import { useEffect, useState } from "react";
import { getMyLeaves } from "../services/leaveService";
import { format, parse, startOfWeek, getDay, addMonths, subMonths } from "date-fns";
import enUS from "date-fns/locale/en-US";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

const LeaveCalendar = () => {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("month");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getColor = (leave) => {
    if (leave.status === "approved") return "#22C55E";
    if (leave.status === "pending") return "#F59E0B";
    if (leave.status === "rejected") return "#EF4444";

    if (leave.leaveType === "sick") return "#3B82F6";
    if (leave.leaveType === "casual") return "#8B5CF6";
    if (leave.leaveType === "paid") return "#EC4899";
    if (leave.leaveType === "vacation") return "#F97316";

    return "#6B7280";
  };

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await getMyLeaves();
        const formatted = res.map((leave) => ({
          title: `${leave.leaveType} (${leave.status})`,
          start: new Date(leave.startDate),
          end: new Date(leave.endDate),
          allDay: true,
          color: getColor(leave),
        }));
        setEvents(formatted);
      } catch (err) {
        console.error("Error fetching leaves:", err);
        setError("Failed to fetch leave data. Try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchLeaves();
  }, []);

  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: event.color,
      color: "white",
      borderRadius: "6px",
      border: "0px",
      padding: "3px 6px",
      fontSize: "12px",
      whiteSpace: "normal",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  });

  // Custom toolbar
  const CustomToolbar = ({ label }) => (
    <div className="flex flex-wrap justify-between mb-4 items-center gap-2">
      <div className="flex flex-wrap gap-2 mb-2 sm:mb-0">
        <button
          onClick={() => setCurrentDate(subMonths(currentDate, 1))}
          className="p-2 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          Back
        </button>
        <button
          onClick={() => setCurrentDate(new Date())}
          className="p-2 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          Today
        </button>
        <button
          onClick={() => setCurrentDate(addMonths(currentDate, 1))}
          className="p-2 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          Next
        </button>
      </div>
      <div className="font-bold text-lg mb-2 sm:mb-0">{label}</div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setCurrentView("month")}
          className={`p-2 rounded ${currentView === "month" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
        >
          Month
        </button>
        <button
          onClick={() => setCurrentView("week")}
          className={`p-2 rounded ${currentView === "week" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
        >
          Week
        </button>
        <button
          onClick={() => setCurrentView("day")}
          className={`p-2 rounded ${currentView === "day" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
        >
          Day
        </button>
        <button
          onClick={() => setCurrentView("agenda")}
          className={`p-2 rounded ${currentView === "agenda" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
        >
          Agenda
        </button>
      </div>
    </div>
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
      </div>
    );

  if (error)
    return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full overflow-x-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">Leave Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ minHeight: 500, height: "calc(100vh - 200px)", width: "100%" }}
        eventPropGetter={eventStyleGetter}
        date={currentDate}
        view={currentView}
        onNavigate={(date) => setCurrentDate(date)}
        onView={(view) => setCurrentView(view)}
        components={{ toolbar: CustomToolbar }}
      />
    </div>
  );
};

export default LeaveCalendar;
