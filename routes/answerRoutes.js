import express from 'express'
import { submit } from '../controllers/answerController.js'
const router = express.Router()

router.post('/', submit)

export default router;