const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    stopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stop",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: String,
    date: Date,
    cost: {
      type: Number,
      default: 0,
    },
    duration: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);
