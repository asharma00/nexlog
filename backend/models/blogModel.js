import mongoose from 'mongoose'
const { Schema } = mongoose;

const blogSchema = new Schema({
    posted: { type: Date, default: Date.now },
    thumbnail: { type: String, required: true },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    category: { type: String, required: true },
    tags: { type: Array, required: false },
    blog: { type: String, required: true },
    status: { type: String, required: true, default: 'published' },
    saved : [{ type: Schema.Types.ObjectId, ref: 'user', required:true }],
    username: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'comment' }]
});

const blogModel = mongoose.models.blog || mongoose.model('blog', blogSchema);

export default blogModel;