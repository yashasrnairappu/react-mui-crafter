import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],

    stats: {
      seats: String,
      bills: String,
      time: String,
      footfall: String,
      size: String,
      nearestPlaces: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Location", locationSchema);