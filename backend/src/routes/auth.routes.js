import express from 'express'
const router = express.Router()
import {loginUser,logoutUser,verify} from "../controllers/user.controller.js"

router.post('/auth/login',loginUser)
router.post('/auth/logout',logoutUser)
router.get('/auth/verify',verify)

export default router