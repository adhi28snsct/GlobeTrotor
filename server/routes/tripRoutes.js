const express = require("express");
const Trip = require("../models/Trip");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const trip = await Trip.create(req.body);
    res.status(201).json(trip);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  const trip = await Trip.findById(req.params.id);
  res.json(trip);
});

module.exports = router;
