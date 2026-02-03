import express from 'express'
import authUser from '../middleware/auth.js'
import { addComment } from '../controllers/commentController.js'

const commentRouter = express.Router();

commentRouter.post('/add', authUser, addComment);

export default commentRouter