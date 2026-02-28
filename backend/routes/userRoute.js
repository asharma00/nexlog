import express from 'express'
import { loginUser, registerUser, getUserData, updateUserProfile, updateUserTheme, getOtherUserData, checkUsernameAvailability, updateUsername } from '../controllers/userController.js'
import upload from '../middleware/multer.js'
import passport from '../middleware/passport.js'
import authUser from '../middleware/auth.js'

const userRouter = express.Router();

userRouter.post('/register', upload.fields([{name: 'profile', maxCount: 1}]), registerUser);
userRouter.post('/login', loginUser);

// userRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// userRouter.get('/google/redirect', 
//     passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login' }), 
//     (req, res) => { res.redirect('http://localhost:5173/'); 
// });

userRouter.get('/get/other', getOtherUserData);

userRouter.get('/get/self', authUser, getUserData);
userRouter.post('/change/profile', upload.fields([{name: 'image', maxCount: 1}]), authUser, updateUserProfile);
userRouter.post('/change/theme', authUser, updateUserTheme);
userRouter.get('/check', authUser, checkUsernameAvailability);
userRouter.post('/change/username', authUser, updateUsername);

export default userRouter