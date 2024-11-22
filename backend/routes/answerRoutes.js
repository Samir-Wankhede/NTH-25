import express from 'express'
import { submit } from '../controllers/answerController.js'
import authenticate from '../middlewares/authMiddleware.js'


const router = express.Router()

router.post('/',authenticate(), submit)

export default router;