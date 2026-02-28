import userModel from '../models/userModel.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import selectedImage from '../util/profileImageSelector.js'
import generateUsername from '../util/sequenceGenerator.js'
import imageCloudinaryUploader from '../util/imageCloudinaryUploader.js'

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

const registerUser = async(req, res) => {
    try {
        const {email, password} = req.body;

        const exists = await userModel.findOne({email});
        if(exists)
            return res.json({success: false, message: 'User already exists'});
        
        if(!validator.isEmail(email))
            return res.json({success: false, message: 'Please enter a valid email'});
        if(password.length < 8 || password.length > 25)
            return res.json({success: false, message: 'Password should be 8 to 25 characters long'});

        const relativeImagePath = await selectedImage(); 
        const profileImageUrl = await imageCloudinaryUploader(relativeImagePath, 'user_profile', 'default');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const username = await generateUsername();
        const newUser = new userModel({
            username, email, password: hashedPassword, profile: profileImageUrl, theme: 'light', createdBlogs: [], createdComments: [], savedBlogs: []
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success: true, token});
    }
    catch (error) {
        res.json({success: false, message: error.message});
    }
}

const loginUser = async(req, res) => {
    try {
        const {email, password, rememberMe} = req.body;
        const user = await userModel.findOne({email});
    
        if(!user) 
            return res.json({success: false, message: 'User doesn\'t exists'});
            
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch) {
            const tokenOptions = {};
            const cookieOptions = { httpOnly: true };
            if (rememberMe) {
                tokenOptions.expiresIn = '60d';
                cookieOptions.maxAge = 60 * 24 * 60 * 60 * 1000;
            } 
            else {
                tokenOptions.expiresIn = '30m';
                cookieOptions.maxAge = 30 * 60 * 1000;
            }

            const token = createToken(user._id, tokenOptions);
            res.cookie('token', token, cookieOptions);
            res.json({success: true, token})
        }
        else 
            res.json({success: false, message: 'Invalid credentials'});
    }
    catch(error) {
        res.json({success: false, message: error.message});
    }
}

const getUserData = async(req, res) => {
    try {
        const io = req.app.get('io');
        const userData = await userModel.findById(req.userId)
            .select('-password -email -googleId')
            .populate('createdBlogs')
            .populate({
                path: 'createdComments',
                populate: {
                    path: 'blogId',
                    model: 'blog'
                }
            })
            .populate({
                path: 'savedBlogs',
                populate: {
                    path: 'username',
                    model: 'user'
                }
            });

        res.json({success: true, userData});
        io.emit('userDataFetched'); 
    }
    catch (error) {
        res.json({success: false, message: error.message});
    }
}

const updateUserProfile = async(req, res) => {
    try {
        const io = req.app.get('io');

        const profile = req.files.image && req.files.image[0];
        const profileUrl = await imageCloudinaryUploader(profile.path, 'user_profile', 'selected');
        await userModel.findByIdAndUpdate(req.userId, {profile: profileUrl});

        res.json({success: true, message: 'User profile image updated'});
        io.emit('userProfileUpdated');
    } 
    catch (error) {
        res.json({success: false, message: error.message});
    }
}

const updateUserTheme = async(req, res) => {
    try {
        const io = req.app.get('io');
        const { themeType } = req.body;
        await userModel.findByIdAndUpdate(req.userId, {theme: themeType});

        res.json({success: true, themeType});
        io.emit('userThemeUpdated');
    } 
    catch (error) {
        res.json({success: false, message: error.message});
    }
}

const getOtherUserData = async(req, res) => {
    try {
        const io = req.app.get('io');
        const { userId } = req.query;
        const userData = await userModel.findById(userId)
            .select('username profile')
            .populate({
                path: 'createdBlogs',
                populate: {
                    path: 'username',
                    model: 'user',
                    select: 'username profile'
                }
            });

        res.json({success: true, userData});
        io.emit('userOtherDataFetched'); 
    }
    catch (error) {
        res.json({success: false, message: error.message});
    }
}

const checkUsernameAvailability = async(req, res) => {
    try {
        const io = req.app.get('io');
        const { username } = req.query;
        const exists = await userModel.findOne({username: username});

        res.json({success: true, exists: exists ? false : true});
        io.emit('usernameChecked');
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

const updateUsername = async(req, res) => {
    try {
        const io = req.app.get('io');
        const { username } = req.body;
        await userModel.findByIdAndUpdate(req.userId, {username: username});

        res.json({success: true, username});
        io.emit('usernameUpdated');
    }
    catch (error) {
        res.json({success: false, message: error.message});
    }
}

export { registerUser, loginUser, getUserData, updateUserProfile, updateUserTheme, getOtherUserData, checkUsernameAvailability, updateUsername }