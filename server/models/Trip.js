const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    startDate: Date,
    endDate: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);
