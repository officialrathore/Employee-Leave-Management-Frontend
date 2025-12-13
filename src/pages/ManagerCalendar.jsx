import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import {
  format,
  parse,
  startOfWeek,
  getDay,
  addMonths,
  subMonths,
} from "date-fns";
import enUS from "date-fns/locale/en-US";
import { getManagerCalendar } from "../services/managerService";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { toast } from "react-toastify";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const ManagerCalendar = () => {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("month");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getColor = (event) => {
    if (event.status === "approved") return "#22C55E";
    return "#6B7280";
  };

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getManagerCalendar();
        const formatted = data
          .filter((event) => event.status === "approved")
          .map((event) => ({
            ...event,
            start: new Date(event.start),
            end: new Date(event.end),
            allDay: true,
            color: getColor(event),
          }));
        setEvents(formatted);
      } catch (err) {
        console.error("Error fetching calendar data:", err);
        setError("Failed to fetch calendar data. Try again later.");
        toast.error("Failed to load calendar");
      } finally {
        setLoading(false);
      }
    };
    load();
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
          className={`p-2 rounded ${
            currentView === "month"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Month
        </button>
        <button
          onClick={() => setCurrentView("week")}
          className={`p-2 rounded ${
            currentView === "week"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Week
        </button>
        <button
          onClick={() => setCurrentView("day")}
          className={`p-2 rounded ${
            currentView === "day"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Day
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

  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="w-full h-screen bg-gray-50 overflow-y-auto">
      <div className="p-7">
        <h2 className="text-2xl font-bold mb-4">Team Leave Calendar</h2>

        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{
            minHeight: 590,
            height: "calc(100vh - 200px)",
            width: "100%",
          }}
          eventPropGetter={eventStyleGetter}
          date={currentDate}
          view={currentView}
          onNavigate={(date) => setCurrentDate(date)}
          onView={(view) => setCurrentView(view)}
          components={{ toolbar: CustomToolbar }}
          onSelectEvent={(event) => {
            toast.info(
              `Employee: ${event.employee}\n` +
                `Leave: ${event.title}\n` +
                `Status: ${event.status}\n` +
                `Reason: ${event.reason || "N/A"}`
            );
          }}
        />
      </div>
    </div>
  );
};

export default ManagerCalendar;
