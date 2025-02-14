import express from 'express'
import { getLeaderBoard } from '../controllers/leaderboardController.js'
import {rateLimit} from 'express-rate-limit'

const leaderboardLimit = rateLimit({
    windowMs: 1*60*1000,
    limit: 3,
    message: "Too many requests.",
    standardHeaders: true,
    legacyHeaders: true
})

const router = express.Router()

router.get('/',leaderboardLimit,getLeaderBoard )

export default router;