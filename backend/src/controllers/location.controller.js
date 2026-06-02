import Location from "../models/locationSchema.js";
import cloudinary from "../config/cloudinary.js";
import { uploadToCloudinary } from "../config/cloudinary.js";

export const addLocation = async (req, res) => {
  try {
    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      // ✅ Upload all images in parallel from buffer
      const uploadPromises = req.files.map((file) =>
        uploadToCloudinary(file.buffer)
      );

      const results = await Promise.all(uploadPromises);
      imageUrls = results.map((r) => r.secure_url);
    }

    const location = await Location.create({
      ...req.body,
      stats: JSON.parse(req.body.stats || "{}"),
      images: imageUrls,
    });

    res.status(201).json({ success: true, location });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getLocations = async (req, res) => {
  try {
    const locations = await Location.find({ isActive: true });

    res.status(200).json({
      success: true,
      count: locations.length,
      locations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSingleLocation = async (req, res) => {
try {
    const location = await Location.findById(req.params.id);

    if (!location) {
      return res.status(404).json({
        success: false,
        message: "Location not found",
      });
    }

    res.status(200).json({
      success: true,
      location,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateLocation = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location)
      return res.status(404).json({ message: "Location not found" });

    let imageUrls = [];

    // Keep existing images
    const existingImages = JSON.parse(req.body.existingImages || "[]");

    // Upload new images from buffer
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) =>
        uploadToCloudinary(file.buffer)
      );
      const results = await Promise.all(uploadPromises);
      imageUrls = results.map((r) => r.secure_url);
    }

    const updated = await Location.findByIdAndUpdate(
      req.params.id,
      {
        name:   req.body.name   || location.name,
        city:   req.body.city   || location.city,
        stats:  JSON.parse(req.body.stats || "{}"),
        images: [...existingImages, ...imageUrls],
      },
      { new: true }
    );

    res.json({ success: true, location: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete(
      req.params.id
    );

    if (!location) {
      return res.status(404).json({
        success: false,
        message: "Location not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Location deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const city = async (req, res) => {
  try {
    const cities = await Location.aggregate([
      {
        $group: {
          _id: { $toLower: { $trim: { input: '$city' } } },
          name: { $first: { $trim: { input: '$city' } } },
          count: { $sum: 1 }
        }
      },
      { $sort: { name: 1 } },
      { $project: { _id: 0, name: 1, count: 1 } } 
    ])
    res.json({ success: true, cities })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}