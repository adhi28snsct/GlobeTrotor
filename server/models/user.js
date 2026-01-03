import mongoose from "mongoose";

/* =========================
   User Schema
========================= */
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    authProvider: {
      type: String,
      enum: ["google", "email"],
      required: true
    }
  },
  { timestamps: true }
);

/* =========================
   User Settings Schema
========================= */
const UserSettingsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    currency: {
      type: String,
      default: "INR"
    },
    language: {
      type: String,
      default: "en"
    },
    notificationsEnabled: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

/* =========================
   Models Export
========================= */
export const User = mongoose.model("User", UserSchema);
export const UserSettings = mongoose.model("UserSettings", UserSettingsSchema);
