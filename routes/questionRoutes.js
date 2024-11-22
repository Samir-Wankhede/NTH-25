import express from 'express'
import authenticate from '../middlewares/authMiddleware.js'

import { getAllQuestions, getCurrentQuestion, updateQuestion, addQuestion, deleteQuestion } from '../controllers/questionController.js'

const router = express.Router();

router.get('/', authenticate(), getAllQuestions);
router.get('/curr/', authenticate(), getCurrentQuestion);
router.post('/', authenticate(), addQuestion);
router.put('/', authenticate(), updateQuestion);
router.delete('/:level', authenticate(), deleteQuestion);

export default router;