import { useState } from "react";
import api from "../services/api";

export default function AddCityModal({ tripId, onClose, onSuccess }) {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!city || !country) return alert("City and Country required");

    try {
      setLoading(true);

      await api.post("/stops", {
        tripId,       // 🔥 REQUIRED
        city,
        country,
      });

      onSuccess();   // 🔥 REFRESH LIST
      onClose();     // 🔥 CLOSE MODAL
    } catch (err) {
      console.error(err);
      alert("Failed to add city");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Add City</h2>

        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          className="w-full border rounded-lg px-3 py-2 mb-3"
        />

        <input
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country"
          className="w-full border rounded-lg px-3 py-2 mb-5"
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="text-gray-500">
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={loading}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
