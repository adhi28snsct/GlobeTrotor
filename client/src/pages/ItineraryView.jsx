import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../services/api";

export default function ItineraryView({ tripId }) {
  const [stops, setStops] = useState([]);
  const [activitiesMap, setActivitiesMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [tripId]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const stopRes = await api.get(`/stops/${tripId}`);
      setStops(stopRes.data);

      const map = {};
      for (let stop of stopRes.data) {
        const actRes = await api.get(`/activities/${stop._id}`);
        map[stop._id] = actRes.data;
      }
      setActivitiesMap(map);
    } catch (err) {
      console.error("Failed to load itinerary", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gray-100 p-6"
    >
      <h1 className="text-3xl font-bold mb-6">Itinerary Timeline</h1>

      {/* Loading state */}
      {loading ? (
        <div className="space-y-6">
          <div className="h-32 bg-gray-200 rounded-xl animate-pulse" />
          <div className="h-32 bg-gray-200 rounded-xl animate-pulse" />
        </div>
      ) : stops.length === 0 ? (
        <p className="text-gray-500 italic">
          No itinerary found. Add cities to begin ✨
        </p>
      ) : (
        <div className="space-y-8">
          {stops.map((stop) => (
            <motion.div
              key={stop._id}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl shadow p-6"
            >
              {/* City Header */}
              <h2 className="text-2xl font-semibold text-indigo-600">
                {stop.city}, {stop.country}
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                {new Date(stop.startDate).toDateString()} –{" "}
                {new Date(stop.endDate).toDateString()}
              </p>

              {/* Timeline */}
              <div className="relative border-l-2 border-indigo-200 ml-4 space-y-6">
                {(activitiesMap[stop._id] || []).map((act) => (
                  <motion.div
                    key={act._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="ml-6 relative"
                  >
                    {/* Dot */}
                    <span className="absolute -left-3 top-1 w-4 h-4 bg-indigo-500 rounded-full"></span>

                    {/* Activity Card */}
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-semibold">{act.name}</p>
                          <p className="text-xs text-gray-500">
                            {act.type} •{" "}
                            {act.date
                              ? new Date(act.date).toDateString()
                              : "No date"}
                          </p>
                        </div>
                        <span className="text-sm font-bold text-indigo-600">
                          ₹{act.cost}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {(activitiesMap[stop._id] || []).length === 0 && (
                  <p className="ml-6 text-sm text-gray-400 italic">
                    No activities added for this city
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
