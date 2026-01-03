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
    
    activities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Activity",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Stop", stopSchema);
