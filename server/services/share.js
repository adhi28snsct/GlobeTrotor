import crypto from "crypto";
import { SharedTrip } from "../models/trip.models.js";

export async function createShareLink(tripId, userId, role) {
  const token = crypto.randomBytes(16).toString("hex");

  const share = await SharedTrip.create({
    tripId,
    token,
    role,
    createdBy: userId
  });

  return `https://yourapp.com/share/${share.token}`;
}

export async function validateShare(token) {
  const share = await SharedTrip.findOne({ token });
  if (!share) throw new Error("Invalid share link");
  return share;
}
