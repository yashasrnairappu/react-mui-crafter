import Location from "../models/locationSchema.js";
// import cloudinary from "../config/cloudinary.js";

import { uploadToDrive, deleteFromDrive, getDriveImageBuffer } from '../config/googleDrive.js'
import { LRUCache } from 'lru-cache'

const imageCache = new LRUCache({ max: 200, ttl: 1000 * 60 * 60 * 24 })

export const proxyImage = async (req, res) => {
  const { fileId } = req.params

  try {
    console.log('Fetching file:', fileId)

    const { buffer, contentType } = await getDriveImageBuffer(fileId)

    res.setHeader('Content-Type', contentType)
    res.setHeader('Cache-Control', 'public, max-age=86400')

    res.send(buffer)
  } catch (error) {
    console.error('Google Drive Error:')
    console.error(error.response?.data || error)

    res.status(500).json({
      message: 'Image fetch failed',
      error: error.message,
    })
  }
}


export const addLocation = async (req, res) => {
  try {
    let imageUrls = []

    if (req.files && req.files.length > 0) {
      // ✅ Upload all images in parallel
      const uploadPromises = req.files.map((file) =>
        uploadToDrive(
          file.buffer,
          `${Date.now()}-${file.originalname}`,
          file.mimetype
        )
      )

      const results = await Promise.all(uploadPromises)
      imageUrls = results.map((r) => r.imageUrl)
    }

    // console.log('Upload results:', results)
    const location = await Location.create({
      ...req.body,
      stats:  JSON.parse(req.body.stats || '{}'),
      images: imageUrls,
    })

    res.status(201).json({ success: true, location })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}


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
    const location = await Location.findById(req.params.id)
    if (!location)
      return res.status(404).json({ message: 'Location not found' })

    const existingImages = JSON.parse(req.body.existingImages || '[]')

    const removedImages = location.images.filter(
      (img) => !existingImages.includes(img)
    )
    const deletePromises = removedImages.map((url) => {
      const fileId = url.split('id=')[1]
      if (fileId) return deleteFromDrive(fileId)
    })
    await Promise.all(deletePromises)

     let newImageUrls = []
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) =>
        uploadToDrive(
          file.buffer,
          `${Date.now()}-${file.originalname}`,
          file.mimetype
        )
      )
      const results = await Promise.all(uploadPromises)
      newImageUrls = results.map((r) => r.imageUrl)
    }

    const updated = await Location.findByIdAndUpdate(
      req.params.id,
      {
        name:   req.body.name  || location.name,
        city:   req.body.city  || location.city,
        stats:  JSON.parse(req.body.stats || '{}'),
        images: [...existingImages, ...newImageUrls],
      },
      { new: true }
    )

    res.json({ success: true, location: updated })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const deleteLocation = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id)
    if (!location)
      return res.status(404).json({ message: 'Location not found' })

    const deletePromises = location.images.map((url) => {
      const fileId = url.split('/image/')[1]
      if (fileId) return deleteFromDrive(fileId)
    })
    await Promise.all(deletePromises)

    await Location.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Location deleted!' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

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