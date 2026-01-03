const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const stopRoutes = require("./routes/stopRoutes");
const activityRoutes = require("./routes/activityRoutes");
const tripRoutes = require("./routes/tripRoutes");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected (globe_trotter)");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

app.get("/", (req, res) => {
  res.json({ message: "Server running" });
});

app.use("/api/stops", stopRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/trips", tripRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
