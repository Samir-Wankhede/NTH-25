import express from 'express'
import { register, login, logout } from '../controllers/authController.js'
// import authenticate from '../middlewares/authMiddleware.js'
import {rateLimit} from 'express-rate-limit'
const router = express.Router()

const registerLimiter = rateLimit({
    windowMs: 15*60*1000,
    limit: 5,
    message: "Too many attempts. Please try again after a while.",
    standardHeaders: true,
    legacyHeaders: true
})
const loginLimiter = rateLimit({
    windowMs: 5*60*1000,
    limit: 10,
    message: "Too many attempts. Please try again after a while.",
    standardHeaders: true,
    legacyHeaders: true
})

router.post('/register', registerLimiter, register)
router.post('/login', loginLimiter, login)
router.post('/logout', loginLimiter, logout)
//ONLY DEVELOPMENT ONLY TO BE REMOVED IN PROD
// router.post('/update', authenticate(), updateUser)
export default router;

