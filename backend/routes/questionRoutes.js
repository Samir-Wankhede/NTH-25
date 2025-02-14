import express from 'express'
import authenticate from '../middlewares/authMiddleware.js'

import {getCurrentQuestion, takeHint } from '../controllers/questionController.js'
import checkEventStatus from '../middlewares/timerMiddleware.js';
import {rateLimit} from 'express-rate-limit'

const questionLimit = rateLimit({
    windowMs: 1*60*1000,
    limit: 10,
    message: "Too many requests.",
    standardHeaders: true,
    legacyHeaders: true
})

const router = express.Router();
// router.use(checkEventStatus)

//add checkevent status here
router.get('/curr', checkEventStatus, questionLimit,authenticate(), getCurrentQuestion);
router.post('/hint', checkEventStatus, questionLimit, authenticate(),takeHint)

//ONLY FOR DEVELOPMENT SHOULD BE IN ADMIN PANEL ONLY
// router.get('/', authenticate(), getAllQuestions);
// router.post('/', authenticate(), addQuestion);
// router.put('/', authenticate() ,updateQuestion); 
// router.delete('/:level', authenticate(), deleteQuestion);

export default router;