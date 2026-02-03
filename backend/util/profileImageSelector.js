import profileImage from '../../frontend/src/assets/profile_image.js'

const selectedImage = async() => {
    const selectedIndex = Math.floor(Math.random() * profileImage.length);
    const image = profileImage[selectedIndex];
    return image;
}

export default selectedImage