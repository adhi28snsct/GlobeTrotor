import { getBudgetSummary } from "../services/budget.service.js";
import { createShareLink } from "../services/share.service.js";
import { copyTrip } from "../services/copyTrip.service.js";

export const getBudget = async (req, res) => {
  const data = await getBudgetSummary(req.params.tripId);
  res.json(data);
};

export const shareTrip = async (req, res) => {
  const { role } = req.body;
  const link = await createShareLink(req.params.tripId, req.user.id, role);
  res.json({ link });
};

export const duplicateTrip = async (req, res) => {
  const trip = await copyTrip(req.params.tripId, req.user.id);
  res.json(trip);
};
