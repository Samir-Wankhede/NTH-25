import express from 'express'
import { addOrUpdateEventStatus, getTimer, startTimer } from '../controllers/timerController.js';

const router = express.Router()

router.post('/create',addOrUpdateEventStatus )
router.post('/start', startTimer)
router.get('/time', getTimer)

export default router;