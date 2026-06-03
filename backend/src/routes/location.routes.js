import express from 'express'
const router = express.Router()
import { protectAdmin } from "../middleware/auth.js";
import { addLocation, city, deleteLocation, getLocations, getSingleLocation, updateLocation ,proxyImage} from '../controllers/location.controller.js';
import upload from '../middleware/upload.js';

router.post("/addlocations",protectAdmin,upload.array("images", 10),addLocation)
router.get("/locations", getLocations);
router.get('/location/cities',city)
router.get('/image/:fileId', proxyImage)
router.get("/location/:id", getSingleLocation);
router.put("/location/:id", protectAdmin,upload.array("images", 10),updateLocation);
router.delete("/location/:id",protectAdmin, deleteLocation);


export default router