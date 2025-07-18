import express from 'express'
import { register, login, logout, updateUser } from '../controllers/authController.js'
import authenticate from '../middlewares/authMiddleware.js'
import {rateLimit} from 'express-rate-limit'
const router = express.Router()

const registerLimiter = rateLimit({
    windowMs: 1*60*1000,
    limit: 2,
    message: "Too many registration attempts. Please try again after a while.",
    standardHeaders: true,
    legacyHeaders: true
})

router.post('/register', registerLimiter, register)
router.post('/login', login)
router.post('/logout', logout)
//ONLY DEVELOPMENT ONLY TO BE REMOVED IN PROD
router.post('/update', authenticate(), updateUser)
export default router;

