const express = require("express");
const mongoose = require("mongoose");
const Stop = require("../models/Stop");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const stop = await Stop.create(req.body);
    res.status(201).json(stop);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/:tripId", async (req, res) => {
  try {
    // 🔥 PREVENT Mongo crash
    if (!mongoose.Types.ObjectId.isValid(req.params.tripId)) {
      return res.status(400).json({ message: "Invalid tripId" });
    }

    const stops = await Stop.find({ tripId: req.params.tripId })
      .populate("activities");

    res.json(stops);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
