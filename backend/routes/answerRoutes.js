import express from 'express'
import { submit } from '../controllers/answerController.js'
import authenticate from '../middlewares/authMiddleware.js'
import checkEventStatus from '../middlewares/timerMiddleware.js'
import {rateLimit} from 'express-rate-limit'

const answerLimit = rateLimit({
    windowMs: 1*60*1000,
    limit: 10,
    message: "Too many submissions.",
    standardHeaders: true,
    legacyHeaders: true
})

const router = express.Router()
//add check event status
router.post('/',answerLimit,authenticate(), checkEventStatus, submit)

export default router;