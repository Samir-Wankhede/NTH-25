import express from 'express'
import { register, login, logout, updateUser } from '../controllers/authController.js'
import authenticate from '../middlewares/authMiddleware.js'
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
//ONLY DEVELOPMENT ONLY TO BE REMOVED IN PROD
router.post('/update', authenticate(), updateUser)
export default router;

