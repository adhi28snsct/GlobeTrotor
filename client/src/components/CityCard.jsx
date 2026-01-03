export default function CityCard({ stop, onAddActivity }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-indigo-500">
      {/* City Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {stop.city}
          </h2>
          <p className="text-sm text-gray-500">
            {stop.country} •{" "}
            {stop.startDate
              ? new Date(stop.startDate).toLocaleDateString()
              : "—"}{" "}
            →{" "}
            {stop.endDate
              ? new Date(stop.endDate).toLocaleDateString()
              : "—"}
          </p>
        </div>

        <button
          onClick={onAddActivity}
          className="bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-200 transition"
        >
          + Activity
        </button>
      </div>

      {/* Activities */}
      {stop.activities?.length === 0 ? (
        <p className="text-gray-400 text-sm italic">
          No activities added yet
        </p>
      ) : (
        <div className="space-y-3">
          {stop.activities.map((activity) => (
            <div
              key={activity._id}
              className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-700">
                  {activity.name}
                </p>
                <p className="text-xs text-gray-500">
                  {activity.type || "General"} •{" "}
                  {activity.duration
                    ? `${activity.duration} hrs`
                    : "—"}
                </p>
              </div>

              <div className="text-sm font-semibold text-gray-700">
                ₹{activity.cost || 0}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
