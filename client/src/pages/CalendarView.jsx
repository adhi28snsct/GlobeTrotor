import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../services/api";

export default function CalendarView({ tripId }) {
  const [calendarData, setCalendarData] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [tripId]);

  const loadData = async () => {
    try {
      setLoading(true);

      const stopsRes = await api.get(`/stops/${tripId}`);
      const data = {};

      for (let stop of stopsRes.data) {
        const actRes = await api.get(`/activities/${stop._id}`);
        actRes.data.forEach((act) => {
          if (!act.date) return;
          const date = act.date.split("T")[0];
          if (!data[date]) data[date] = [];
          data[date].push(act);
        });
      }

      setCalendarData(data);
    } catch (err) {
      console.error("Failed to load calendar", err);
    } finally {
      setLoading(false);
    }
  };

  const days = Object.keys(calendarData);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gray-100 p-6"
    >
      <h1 className="text-3xl font-bold mb-6">Trip Calendar</h1>

      {/* Loading */}
      {loading ? (
        <div className="grid grid-cols-7 gap-3 mb-8">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="h-20 bg-gray-200 rounded-lg animate-pulse"
            />
          ))}
        </div>
      ) : days.length === 0 ? (
        <p className="text-gray-500 italic">
          No activities scheduled yet ✨
        </p>
      ) : (
        <>
          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-3 mb-8">
            {days.map((day) => (
              <motion.button
                key={day}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedDate(day)}
                className={`bg-white rounded-lg p-3 shadow ${
                  selectedDate === day
                    ? "ring-2 ring-indigo-500"
                    : "hover:bg-indigo-50"
                }`}
              >
                <p className="text-sm font-semibold">{day}</p>
                <p className="text-xs text-gray-500">
                  {calendarData[day].length} activities
                </p>
              </motion.button>
            ))}
          </div>

          {/* Day details */}
          {selectedDate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow p-6"
            >
              <h2 className="text-xl font-semibold mb-4">
                Activities on {selectedDate}
              </h2>

              <div className="space-y-3">
                {calendarData[selectedDate].map((act) => (
                  <div
                    key={act._id}
                    className="flex justify-between bg-gray-50 p-3 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{act.name}</p>
                      <p className="text-xs text-gray-500">{act.type}</p>
                    </div>
                    <span className="font-semibold text-indigo-600">
                      ₹{act.cost}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
}
