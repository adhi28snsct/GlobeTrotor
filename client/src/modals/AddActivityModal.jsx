import { useState } from "react";
import api from "../services/api";

export default function AddActivityModal({ stop, onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [cost, setCost] = useState("");

  const submit = async () => {
    await api.post("/activities", {
      stopId: stop._id,
      name,
      type,
      cost,
    });
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-96">
        <h2 className="text-xl font-bold mb-4">
          Add Activity – {stop.city}
        </h2>

        <input
          placeholder="Activity name"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Type (Sightseeing, Food...)"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setType(e.target.value)}
        />
        <input
          placeholder="Cost"
          type="number"
          className="w-full mb-4 p-2 border rounded"
          onChange={(e) => setCost(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={submit}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
