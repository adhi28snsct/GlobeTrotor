import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CityCard from "../components/CityCard";
import AddCityModal from "../modals/AddCityModal";
import AddActivityModal from "../modals/AddActivityModal";
import api from "../services/api";

export default function ItineraryBuilder() {
  const { tripId } = useParams();
  const [stops, setStops] = useState([]);
  const [activeStop, setActiveStop] = useState(null);
  const [showCityModal, setShowCityModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchStops = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/stops/${tripId}`);
      setStops(res.data);
    } catch (err) {
      console.error("Failed to fetch stops", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tripId) fetchStops();
  }, [tripId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          ✈️ Itinerary Builder
        </h1>
        <button
          onClick={() => setShowCityModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl shadow-lg transition"
        >
          + Add City
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="space-y-4">
          <div className="h-28 bg-white rounded-xl shadow animate-pulse" />
          <div className="h-28 bg-white rounded-xl shadow animate-pulse" />
        </div>
      ) : stops.length === 0 ? (
        <div className="text-center text-gray-500 italic mt-20">
          No cities added yet. Start building your journey 🌍
        </div>
      ) : (
        <div className="space-y-6">
          {stops.map((stop) => (
            <CityCard
              key={stop._id}
              stop={stop}
              onAddActivity={() => setActiveStop(stop)}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      {showCityModal && (
        <AddCityModal
          tripId={tripId}
          onClose={() => setShowCityModal(false)}
          onSuccess={fetchStops}
        />
      )}

      {activeStop && (
        <AddActivityModal
          stop={activeStop}
          onClose={() => setActiveStop(null)}
          onSuccess={fetchStops}
        />
      )}
    </div>
  );
}
