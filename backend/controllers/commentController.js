import blogModel from '../models/blogModel.js'
import commentModel from '../models/commentModel.js'
import userModel from '../models/userModel.js'

const addComment = async(req, res) => {
    const io = req.app.get('io');
    const {comment, blogId} = req.body;

    const commentData = {
        content: comment,
        posted: Date.now(),
        author: req.userId,
        blogId
    }

    const newComment = new commentModel(commentData);
    await newComment.save();

    await userModel.findByIdAndUpdate(req.userId, {$push: {createdComments: {$each: [newComment._id], $position: 0 }}});
    await blogModel.findByIdAndUpdate(blogId, {$push: {comments: {$each: [newComment._id], $position: 0}}});

    res.json({success: true, message: 'Comment posted'});
    io.emit('commentPosted');
}

const updateComment = async(req, res) => {

}

const deleteComment = async(req, res) => {

}

export { addComment, updateComment, deleteComment }