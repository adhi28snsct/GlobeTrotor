import mongoose from "mongoose";

/* =========================
   Trip Schema
========================= */
const TripSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    budget: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

/* =========================
   Trip Copy Schema
========================= */
const TripCopySchema = new mongoose.Schema(
  {
    originalTripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true
    },
    newTripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true
    },
    copiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

/* =========================
   Shared Trip Schema
========================= */
const SharedTripSchema = new mongoose.Schema(
  {
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true
    },
    token: {
      type: String,
      required: true,
      unique: true
    },
    role: {
      type: String,
      enum: ["viewer", "editor"],
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    expiresAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

/* =========================
   Models Export
========================= */
export const Trip = mongoose.model("Trip", TripSchema);
export const TripCopy = mongoose.model("TripCopy", TripCopySchema);
export const SharedTrip = mongoose.model("SharedTrip", SharedTripSchema);
