const express = require("express");
const Activity = require("../models/Activity");
const Stop = require("../models/Stop");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { stopId } = req.body;

    const activity = await Activity.create(req.body);

    await Stop.findByIdAndUpdate(stopId, {
      $push: { activities: activity._id },
    });

    res.status(201).json(activity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/:stopId", async (req, res) => {
  try {
    const activities = await Activity.find({ stopId: req.params.stopId });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
