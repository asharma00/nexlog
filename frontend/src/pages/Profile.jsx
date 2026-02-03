import { useContext, useState } from 'react'
import Avatar from '../components/Avatar.jsx'
import UserBlogs from '../components/UserBlogs.jsx'
import UserComments from '../components/UserComments.jsx'
import { BlogContext } from '../context/BlogContext.jsx'
import Loading from '../util/Loading.jsx'
import UsernameModal from '../components/UsernameModal.jsx'
import { Link } from 'react-router-dom'
import Switch from '@mui/material/Switch'
import { alpha, styled } from '@mui/material/styles'
import { toast } from 'react-toastify'
import axios from 'axios'


function Profile() {
    const content_types = {
        blogs: 'blogs',
        comments: 'comments',
        saved: 'saved',
    };

    const tab_items = [
        { label: 'My blogs', value: content_types.blogs },
        { label: 'My comments', value: content_types.comments },
        { label: 'Saved blogs', value: content_types.saved },
    ];


    const [contentType, setContentType] = useState(content_types.blogs);
    const [blogType, setBlogType] = useState('all');
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { userData, backendURL, token, setDarkMode, darkMode } = useContext(BlogContext);

    const publishedBlogsLength = (userData.createdBlogs?.filter(blog => blog.status === 'published') || []).length;
    const unpublishedBlogsLength = (userData.createdBlogs?.filter(blog => blog.status === 'unpublished') || []).length;

    const baseColour = userData.theme === 'dark' ? '#7CCF00' : '#615FFF';
    const BaseColourSwitch = styled(Switch) (({ theme }) => ({
        '& .MuiSwitch-switchBase.Mui-checked': {
            color: baseColour,
            '&:hover': { backgroundColor: alpha(baseColour, theme.palette.action.hoverOpacity) }
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: baseColour,
        }
    }))

    const handleChange = async(event) => {
        setIsLoading(true);
        const checked = event.target.checked;
        const themeType = checked ? 'dark' : 'light';
        try {
            const response = await axios.post(backendURL + '/api/user/change/theme', {themeType}, {headers: {token}});
            if(response.data.success)
                setDarkMode(response.data.themeType === 'dark');
            else
                toast.error(response.data.message);
            setIsLoading(false);
        } 
        catch (error) {
            toast.error(error.message);
        }
    }


    return userData ? 
    (
        <div>
            <div className='flex justify-between items-center mx-6 sm:mx-16 xl:mx-40 mb-5'>
                <Link to={'/create'}> <button className='bg-(--theme-background) w-max px-4 py-2 rounded-md text-(--contrast-colour) shadow font-semibold cursor-pointer'>Create blog</button> </Link>
                <div className='flex items-center justify-center'>
                    <p className='mr-2 font-semibold text-(--main-text-colour)'>Dark theme:</p>
                    <BaseColourSwitch onChange={handleChange} checked={ darkMode } />
                </div>
            </div>
            <div>
                {/* profile banner */}
                <div className='bg-(--theme-background) flex flex-col md:flex-row mx-6 sm:mx-16 xl:mx-40 p-5 rounded-t-xl'>
                    <div className='md:w-1/2 lg:w-1/3'>
                        <div className='w-full flex items-center justify-center mb-5'>
                            <div className='h-35 w-35 sm:h-25 sm:w-25'> 
                                <Avatar src={ userData.profile } editable /> 
                            </div>
                        </div>

                        <div className='flex flex-col w-full items-center justify-center mb-5 md:mb-0'> 
                            <p className='text-(--contrast-colour) font-bold text-2xl text-center'> { userData.username } </p> 
                            <p className='text-(--contrast-colour) text-sm text-center cursor-pointer hover:underline hover:scale-102' onClick={() => setOpen(true)}>Change the username</p> 
                        </div>
                    </div>

                    <div className='grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 w-full md:w-1/2 lg:w-2/3 items-center justify-center'>
                        <div className='bg-(--theme-light-background) p-3 rounded-lg shadow text-center w-full hover:scale-102 cursor-pointer hover:shadow-primary/25 duration-300 md:h-max'
                            onClick={() => { setContentType(content_types.blogs); setBlogType('posted'); }}> 
                            <p className='text-white font-bold text-xl text-center'> { publishedBlogsLength } </p>
                            <p className='text-(--contrast-colour) font-semibold text-base text-center'>Blogs</p>  
                        </div>
                        <div className='bg-(--theme-light-background) p-3 rounded-lg shadow text-center w-full hover:scale-102 cursor-pointer hover:shadow-primary/25 duration-300 md:h-max'
                            onClick={() => setContentType(content_types.comments)}> 
                            <p className='text-white font-bold text-xl text-center'> { userData.createdComments?.length } </p>
                            <p className='text-(--contrast-colour) font-semibold text-base text-center'>Comments</p>  
                        </div>
                        <div className='bg-(--theme-light-background) p-3 rounded-lg shadow text-center w-full hover:scale-102 cursor-pointer hover:shadow-primary/25 duration-300 md:h-max'
                            onClick={() => { setContentType(content_types.blogs); setBlogType('drafts'); }}> 
                            <p className='text-white font-bold text-xl text-center'> { unpublishedBlogsLength } </p>
                            <p className='text-(--contrast-colour) font-semibold text-base text-center'>Drafts</p>  
                        </div>
                    </div>
                </div>


                {/* profile content */}
                <div className='bg-(--post-background) shadow rounded-b-lg mx-6 sm:mx-16 xl:mx-40 p-5 mb-10'>
                    <div className='grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 pb-3 border-b border-b-gray-200'>
                        {
                            tab_items.map((tab) => (
                                <p
                                    key={tab.value}
                                    onClick={() => setContentType(tab.value)}
                                    className={`cursor-pointer text-base text-center underline transition-transform transform hover:scale-105 ${
                                    contentType === tab.value
                                        ? 'text-(--main-text-colour) font-bold'
                                        : 'text-(--subtext-colour) hover:text-(--main-text-colour) font-semibold'
                                    }`}
                                >
                                    {tab.label}
                                </p>
                            ))
                        }
                    </div>
                    {
                        contentType !== content_types.blogs ? '' :
                            <div className='mt-3 flex justify-center'>
                                <div className='flex flex-row w-full md:w-1/2 lg:w-1/3 justify-evenly text-(--contrast-colour-negative)'>
                                    <div className='flex flex-row justify-center items-center' onClick={() => setBlogType('all')}>
                                        <p className='w-3.5 h-3.5 border border-gray-300 rounded-full bg-(--post-background) flex items-center justify-center'>
                                            <span className={`w-2.5 h-2.5 rounded-full ${blogType === 'all' ? 'bg-(--theme-background)' : 'bg-(--post-background)'}`}></span>
                                        </p>
                                        <p className='font-bold ml-1.5'>All</p>
                                    </div>
                                    <div className='flex flex-row justify-center items-center' onClick={() => setBlogType('posted')}>
                                        <p className='w-3.5 h-3.5 border border-gray-300 rounded-full bg-(--post-background) flex items-center justify-center'>
                                            <span className={`w-2.5 h-2.5 rounded-full ${blogType === 'posted' ? 'bg-(--theme-background)' : 'bg-(--post-background)'}`}></span>
                                        </p>
                                        <p className='font-bold ml-1.5'>Posted</p>
                                    </div>
                                    <div className='flex flex-row justify-center items-center' onClick={() => setBlogType('drafts')}>
                                        <p className='w-3.5 h-3.5 border border-gray-300 rounded-full bg-(--post-background) flex items-center justify-center'>
                                            <span className={`w-2.5 h-2.5 rounded-full ${blogType === 'drafts' ? 'bg-(--theme-background)' : 'bg-(--post-background)'}`}></span>
                                        </p>
                                        <p className='font-bold ml-1.5'>Drafts</p>
                                    </div>
                                </div>
                            </div>
                    }
                    <div className='mt-4 mx-4'>
                        {
                            contentType === content_types.comments ? <UserComments /> : <UserBlogs type={contentType} userBlogType={contentType !== 'saved' ? blogType : ''} />
                        }
                    </div>
                </div>


                {/* modal for changing username */}
                <div>
                    <UsernameModal open={open} setOpen={setOpen} />
                </div>
            </div>

            <Loading isLoading={isLoading} />
        </div>
    ) :
    (
        <Loading isLoading={true} />
    )
}

export default Profile