import mongoose from "mongoose";

const CitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  }
});

export default mongoose.model("City", CitySchema);
