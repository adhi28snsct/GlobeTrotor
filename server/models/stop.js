const mongoose = require("mongoose");

const stopSchema = new mongoose.Schema(
  {
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    startDate: Date,
    endDate: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Stop", stopSchema);
