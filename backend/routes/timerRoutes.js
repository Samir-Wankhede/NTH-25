import express from 'express'
import { addOrUpdateEventStatus, startTimer } from '../controllers/timerController.js';

const router = express.Router()

router.post('/create',addOrUpdateEventStatus )
router.post('/start', startTimer)

export default router;