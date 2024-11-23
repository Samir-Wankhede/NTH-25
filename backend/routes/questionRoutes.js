import express from 'express'
import authenticate from '../middlewares/authMiddleware.js'

import { getAllQuestions, getCurrentQuestion, updateQuestion, addQuestion, deleteQuestion } from '../controllers/questionController.js'
import checkEventStatus from '../middlewares/timerMiddleware.js';

const router = express.Router();


router.get('/curr/', authenticate, checkEventStatus, getCurrentQuestion);

//ONLY FOR DEVELOPMENT SHOULD BE IN ADMIN PANEL ONLY
router.get('/', authenticate, getAllQuestions);
router.post('/', authenticate, addQuestion);
router.put('/', authenticate, updateQuestion); 
router.delete('/:level', authenticate, deleteQuestion);

export default router;