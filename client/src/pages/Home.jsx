import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

export default function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const createTrip = async () => {
    try {
      setLoading(true);
      const res = await api.post("/trips", {
        name: "My New Trip",
      });
      navigate(`/trip/${res.data._id}/builder`);
    } catch (err) {
      alert("Failed to create trip");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center px-4">
      <section
        aria-labelledby="app-title"
        className="bg-white max-w-xl w-full rounded-2xl shadow-xl p-8 text-center"
      >
        <h1
          id="app-title"
          className="text-3xl font-bold text-gray-800 mb-3"
        >
          🌍 GlobeTrotter
        </h1>

        <p className="text-gray-600 mb-8">
          Plan multi-city trips, manage activities, and visualize your journey.
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={createTrip}
            disabled={loading}
            className="bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {loading ? "Creating Trip..." : "➕ Create New Trip"}
          </button>

          <p className="text-sm text-gray-400">
            You can add cities, activities, and view timelines after creating a trip.
          </p>
        </div>
      </section>
    </main>
  );
}
