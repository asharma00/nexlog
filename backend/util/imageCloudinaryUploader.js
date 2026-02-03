import path from 'path'
import { fileURLToPath } from 'url'
import { v2 as cloudinary } from 'cloudinary'

const imageCloudinaryUploader = async(relativeImagePath, imageType, imageUserType) => {
    let imageUrl = null;

    if(imageType === 'user_profile' && imageUserType === 'default') {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
    
        const FRONTEND_PUBLIC_DIR = path.resolve(__dirname, '..', '..', 'frontend');
        const imagePath = path.join(FRONTEND_PUBLIC_DIR, relativeImagePath);

        if (imagePath) {
            const result = await cloudinary.uploader.upload(imagePath, { folder: 'nexlog_users', resource_type: 'image' });
            imageUrl = result.secure_url;
        }
    }
    else {
        if(imageUserType === 'selected')
            var result = await cloudinary.uploader.upload(relativeImagePath, { folder: 'nexlog_users', resource_type: 'image' });
        else
            var result = await cloudinary.uploader.upload(relativeImagePath, { folder: 'nexlog_blog_thumbnails', resource_type: 'image' });
        imageUrl = result.secure_url;
    }

    return imageUrl;
}

export default imageCloudinaryUploader;