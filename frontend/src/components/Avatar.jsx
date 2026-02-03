import { useEffect, useRef, useState } from 'react'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import { toast } from 'react-toastify'
import axios from 'axios'
import Loading from '../util/Loading.jsx'
import { useContext } from 'react'
import { BlogContext } from '../context/BlogContext.jsx'

function Avatar({ src, editable = false }) {
    const fileInputRef = useRef(null);
    const [previewSrc, setPreviewSrc] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { backendURL, token } = useContext(BlogContext);

    const handleClick = () => {
        if (editable && fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    const handleFileChange = async(e) => {
        setIsLoading(true);
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await axios.post(backendURL + '/api/user/change/profile', formData, {headers: {token}});
                if(response.data.success)
                    toast.success('Profile picture changed successfully');
                else
                    toast.error(response.data.message);
            }
            catch (error) {
                toast.error(error.message);
            }
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setPreviewSrc(src);
    }, [src])

    return (
        <div className={`relative w-full h-full rounded-full overflow-hidden border-2 border-white shadow-md group ${editable ? 'cursor-pointer' : ''}`} onClick={handleClick}>
            <img src={previewSrc} alt='User avatar' className='w-full h-full object-cover'/>

            {/* hover overlay if editable */}
            {editable && (
                <div className='absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-50 flex flex-col items-center justify-center transition-opacity'>
                    <PhotoCameraIcon className='text-white' />
                    <span className='text-white text-xs font-medium text-center'>Change profile picture</span>
                </div>
            )}

            <input type='file' accept='image/*' ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />

            <Loading isLoading={isLoading} />
        </div>
    );
}

export default Avatar;