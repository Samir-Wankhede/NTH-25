import express from 'express'
import {getTimer } from '../controllers/timerController.js';
import {rateLimit} from 'express-rate-limit'

const timerLimit = rateLimit({
    windowMs: 1*60*1000,
    limit: 8,
    message: "Too many requests.",
    standardHeaders: true,
    legacyHeaders: true
})

const router = express.Router()

// router.post('/create',addOrUpdateEventStatus )
// router.post('/start', startTimer)
router.get('/time',timerLimit, getTimer)

export default router;