import express from 'express'
import { submit } from '../controllers/answerController.js'
import authenticate from '../middlewares/authMiddleware.js'
import checkEventStatus from '../middlewares/timerMiddleware.js'


const router = express.Router()
//add check event status
router.post('/',authenticate(), submit)

export default router;