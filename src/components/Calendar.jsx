import { useState } from "react";
import { toast } from "react-toastify";

const Calendar = ({ onRangeSelect }) => {
  const [range, setRange] = useState({
    start: "",
    end: "",
  });

  const today = new Date().toISOString().split("T")[0];

  const updateRange = (field, value) => {
    const newRange = { ...range, [field]: value };

    if (field === "end" && range.start && value < range.start) {
      toast.error("End date cannot be before start date");
      return;
    }

    setRange(newRange);
    if (onRangeSelect) onRangeSelect(newRange);
  };

  return (
    <div className="flex flex-col gap-3">
      <div>
        <label className="font-semibold">Start Date</label>
        <input
          type="date"
          value={range.start}
          min={today}
          onChange={(e) => updateRange("start", e.target.value)}
          className="border p-2 w-full rounded-lg"
        />
      </div>

      <div>
        <label className="font-semibold">End Date</label>
        <input
          type="date"
          value={range.end}
          min={range.start || today}
          onChange={(e) => updateRange("end", e.target.value)}
          className="border p-2 w-full rounded-lg"
        />
      </div>
    </div>
  );
};

export default Calendar;
