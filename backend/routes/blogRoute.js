import express from 'express'
import { addBlog, deleteBlog, listBlog, singleBlog, updateBlog, updateBlogState, saveBlog } from '../controllers/blogController.js'
import upload from '../middleware/multer.js'
import authUser from '../middleware/auth.js'

const blogRouter = express.Router();

blogRouter.post('/add', authUser, upload.fields([{name: 'thumbnail', maxCount: 1}]), addBlog);
blogRouter.get('/list', listBlog);
blogRouter.get('/single', singleBlog);
blogRouter.post('/delete', authUser, deleteBlog);
blogRouter.post('/update/state', authUser, updateBlogState);
blogRouter.post('/update', authUser, upload.fields([{name: 'thumbnail', maxCount: 1}]), updateBlog);
blogRouter.post('/save', authUser, saveBlog);

export default blogRouter