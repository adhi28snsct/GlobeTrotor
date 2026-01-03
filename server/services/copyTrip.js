import { Trip, TripCopy } from "../models/trip.models.js";
import Stop from "../models/stop.model.js";

export async function copyTrip(originalTripId, userId) {
  const originalTrip = await Trip.findById(originalTripId);
  if (!originalTrip) throw new Error("Trip not found");

  const newTrip = await Trip.create({
    ownerId: userId,
    title: originalTrip.title + " (Copy)",
    startDate: originalTrip.startDate,
    endDate: originalTrip.endDate,
    budget: originalTrip.budget
  });

  const stops = await Stop.find({ tripId: originalTripId });

  const newStops = stops.map(s => ({
    ...s.toObject(),
    tripId: newTrip._id,
    _id: undefined,
    createdAt: undefined,
    updatedAt: undefined
  }));

  await Stop.insertMany(newStops);

  await TripCopy.create({
    originalTripId,
    newTripId: newTrip._id,
    copiedBy: userId
  });

  return newTrip;
}
