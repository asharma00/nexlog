import mongoose from 'mongoose'
const { Schema } = mongoose;

const commentSchema = new Schema({
    content: { type: String, required: true },
    posted: { type: Date, default: Date.now },
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    blogId: { type: Schema.Types.ObjectId, ref: 'blog', required: true }
})

const commentModel = mongoose.models.comment || mongoose.model('comment', commentSchema);

export default commentModel;