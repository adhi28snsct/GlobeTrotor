import Stop from "../models/stop.model.js";
import { Trip } from "../models/trip.models.js";

export async function getBudgetSummary(tripId) {
  const stops = await Stop.find({ tripId });

  const totalCost = stops.reduce((sum, s) => sum + s.cost, 0);

  const byDay = {};
  for (const s of stops) {
    byDay[s.day] = (byDay[s.day] || 0) + s.cost;
  }

  const trip = await Trip.findById(tripId);

  return {
    totalCost,
    budget: trip.budget,
    overBudget: totalCost > trip.budget,
    byDay
  };
}
