import express from 'express'
import authenticate from '../middlewares/authMiddleware.js'

import { getAllQuestions, getCurrentQuestion, updateQuestion, addQuestion, deleteQuestion, takeHint } from '../controllers/questionController.js'
import checkEventStatus from '../middlewares/timerMiddleware.js';

const router = express.Router();
router.use(checkEventStatus)

//add checkevent status here
router.get('/curr', authenticate(), getCurrentQuestion);
router.post('/hint', authenticate(),takeHint)

//ONLY FOR DEVELOPMENT SHOULD BE IN ADMIN PANEL ONLY
router.get('/', authenticate(), getAllQuestions);
router.post('/', authenticate(), addQuestion);
router.put('/', authenticate() ,updateQuestion); 
router.delete('/:level', authenticate(), deleteQuestion);

export default router;