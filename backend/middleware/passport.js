import GoogleStrategy from 'passport-google-oauth2'
import passport from 'passport'
import generateUsername from '../util/sequenceGenerator.js'
import selectedImage from '../util/profileImageSelector.js'
import imageCloudinaryUploader from '../util/imageCloudinaryUploader.js'

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/redirect'
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const googleEmail = profile.emails[0].value;
            console.log(profile);
            
            let currentUser = await User.findOne({ 
                $or: [{ googleId: profile.id }, { email: googleEmail }] 
            });

            if(currentUser) {
                if (!currentUser.googleId) {
                    currentUser.googleId = profile.id;
                    await currentUser.save();
                    console.log(`Account linked for: ${currentUser.email}`);
                }
                
                console.log('Existing user logged in:', currentUser.email);
                return done(null, currentUser);
            } 
            else {
                const username = await generateUsername();
                
                const relativeImagePath = await selectedImage();
                const profileImageUrl = await imageCloudinaryUploader({relativeImagePath});
                
                const newUser = await User.create({
                    googleId: profile.id,
                    email: googleEmail, 
                    username: username,
                    profile: profileImageUrl,
                });
                
                console.log('New user created via Google:', newUser.email);
                return done(null, newUser);
            }
        } catch (error) {
            console.error('Error during Google OAuth:', error);
            return done(error, null);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id); 
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    }).catch(err => done(err, null));
});

export default passport