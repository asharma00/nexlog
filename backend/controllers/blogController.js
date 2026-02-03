import blogModel from '../models/blogModel.js'
import userModel from '../models/userModel.js'
import imageCloudinaryUploader from '../util/imageCloudinaryUploader.js'

const addBlog = async(req, res) => {
    try {
        const io = req.app.get('io');
        
        const {title, summary, tags, category, blog, status} = req.body;
        const thumbnailFile = req.files.thumbnail && req.files.thumbnail[0];
        
        const thumbnailUrl = await imageCloudinaryUploader(thumbnailFile.path, 'blog_thumbnail', 'thumbnail');
        
        const blogData = {
            posted: Date.now(),
            thumbnail: thumbnailUrl,
            title,
            summary,
            category,
            tags: tags !== '' ? JSON.parse(tags) : null,
            blog,
            status,
            username: req.userId,
            comments: []
        }

        const newBlog = new blogModel(blogData);
        await newBlog.save();

        await userModel.findByIdAndUpdate(
            req.userId, {$push: {createdBlogs: {$each: [newBlog._id], $position: 0 }}}
        );
        
        res.json({success: true, message: 'Blog posted'});
        io.emit('blogPosted');
    } 
    catch (error) {
        res.json({success: false, message: error.message});
    }
}

const listBlog = async(req, res) => {
    try {
        const io = req.app.get('io');
        const blogs = await blogModel.find({})
            .populate({
                path: 'username',
                select: 'username profile'
            })
            .populate({
                path: 'saved',
                select: 'username'
            });
        res.json({success: true, blogs});
        io.emit('blogDataFetched');
    }
    catch (error) {
        res.json({success: false, message: error.message});
    }
}

const singleBlog = async(req, res) => {
    try {
        const io = req.app.get('io');
        const { blogId } = req.query;
        const blog = await blogModel.findById(blogId)
            .populate({
                path: 'username',
                select: 'username profile'
            })
            .populate({
                path: 'comments',
                populate: {
                    path: 'author',
                    model: 'user'
                }
            });
        res.json({success: true, blog});
    } 
    catch (error) {
        res.json({success: false, message: error.message});
    }
}

const deleteBlog = async(req, res) => {
    try {
        const io = req.app.get('io');
        await blogModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: 'Blog removed'});
        io.emit('blogDeleted');
    }
    catch (error) {
        res.json({success: false, message: error.message});
    }
}

const updateBlogState = async(req, res) => {
    try {
        const io = req.app.get('io');
        await blogModel.findByIdAndUpdate(req.body.id, {status: req.body.status});
        res.json({success: true, message: 'Blog status updated'});
        io.emit('blogStatusUpdated');
    }
    catch (error) {
        res.json({success: false, message: error.message});
    }
}

const updateBlog = async(req, res) => {
    try {
        const io = req.app.get('io');
        
        const {title, summary, tags, category, blog, status, id} = req.body;

        const existingBlog = await blogModel.findById(id);
        if (!existingBlog) {
            return res.json({ success: false, message: 'Blog not found' });
        }
        
        let newThumbnail = existingBlog.thumbnail;
        const thumbnailFile = req.files?.thumbnail?.[0];
        if (thumbnailFile) {
            const thumbnailUrl = await imageCloudinaryUploader(thumbnailFile.path, 'blog_thumbnail', 'thumbnail');
            newThumbnail = thumbnailUrl;
        }
        
        const updateData = {};

        if (title !== undefined) updateData.title = title;
        if (summary !== undefined) updateData.summary = summary;
        if (category !== undefined) updateData.category = category;
        if (blog !== undefined) updateData.blog = blog;
        if (status !== undefined) updateData.status = status;
        if (tags !== undefined) updateData.tags = JSON.parse(tags);
        
        updateData.thumbnail = newThumbnail;
        await blogModel.findByIdAndUpdate(id, updateData, { new: true });
        
        res.json({success: true, message: 'Blog updated'});
        io.emit('blogUpdated');
    } 
    catch (error) {
        res.json({success: false, message: error.message});
    }
}

const saveBlog = async(req, res) => {
    try {
        const io = req.app.get('io');
        console.log(req.body.saved)
        if (req.body.saved) {
            await blogModel.findByIdAndUpdate(req.body.id, {$addToSet: {saved: req.body.userId}});
            await userModel.findByIdAndUpdate(req.userId, {$addToSet: {savedBlogs: req.body.id}});
        } 
        else {
            await blogModel.findByIdAndUpdate(req.body.id, {$pull: {saved: req.body.userId}});
            await userModel.findByIdAndUpdate(req.userId, {$pull: {savedBlogs: req.body.id}});
        }

        res.json({success: true, message: req.body.saved ? 'Blog saved' : 'Blog removed'});
        io.emit('blogSavedOrRemoved');
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export { addBlog, listBlog, singleBlog, deleteBlog, updateBlogState, updateBlog, saveBlog }