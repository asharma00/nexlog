import mongoose from 'mongoose'
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profile: {type: String, required: true},
    googleId: {type: String, unique: true, sparse: true},
    theme: {type: String, required: true},
    createdBlogs: [{ type: Schema.Types.ObjectId, ref: 'blog' }],
    createdComments: [{ type: Schema.Types.ObjectId, ref: 'comment' }],
    savedBlogs: [{ type: Schema.Types.ObjectId, ref: 'blog' }]
}, {minimize: false})

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;