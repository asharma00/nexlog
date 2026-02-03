import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import DOMPurify from 'dompurify'
import Timestamp from '../util/Timestamp.jsx'
import Avatar from '../components/Avatar.jsx'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useContext } from 'react'
import { BlogContext } from '../context/BlogContext.jsx'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore'
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

function View() {
    const { blogId } = useParams();
    const { backendURL, token } = useContext(BlogContext);

    const [filteredBlog, setFilteredBlog] = useState(null); 
    const [comment, setComment] = useState('');
    const [openComments, setOpenComments] = useState(false);

    const fetchBlogDetails = async() => {
        try {
            const response = await axios.get(backendURL + '/api/blog/single', {params: {blogId}});
            if(response.data.success) 
                setFilteredBlog(response.data.blog);    
            else
                toast.error(response.data.message);
        } 
        catch (error) {
            toast.error(error.message);
        }
    }

    const onSubmitCommentForm = async(event) => {
        event.preventDefault();
        try {
            const response = await axios.post(backendURL + '/api/comment/add', {comment, blogId}, {headers: {token}});
            if(response.data.success)
                setComment('');
            else
                toast.error(response.data.message);
        } 
        catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        fetchBlogDetails()
    }, [blogId, filteredBlog, comment])


    return filteredBlog ? (
        <>
            {/* blog heading */}
            <div className='mt-10 md:mt-20 mx-10 flex flex-col items-center text-center'>
                <img src={filteredBlog.thumbnail} className='mb-10 rounded-lg lg:w-2/3 aspect-video' />
                <h1 className='text-2xl sm:text-5xl font-bold text-(--main-text-colour)'> {filteredBlog.title} </h1>
                <div className='flex flex-row items-center justify-evenly w-full sm:w-3/4 mt-3'>
                    <div className='flex flex-row items-center justify-center'>
                        <div className='h-10 w-10 mr-1'> <Avatar src={filteredBlog.username.profile} /> </div>
                        <Link className='text-sm sm:text-base mr-3 font-semibold text-(--main-text-colour) hover:underline'><p>{filteredBlog.username.username}</p></Link>
                    </div>
                    <div className='flex flex-row items-center justify-center'>
                        <AccessTimeIcon className='text-(--main-text-colour)' />
                        <p className='text-sm sm:text-base ml-1 mr-3 font-semibold text-(--main-text-colour)'> <Timestamp savedTimestamp={filteredBlog.posted} /> </p>
                    </div>
                </div>
            </div>

            <div className='flex flex-col mx-10 my-5 md:my-10'>
                {/* blog content */}
                <div className={`lg:mx-20 xl:mx-40`}>
                    <h2 className='mb-5 text-base sm:text-lg text-(--subtext-colour) sm:mx-auto text-justify font-semibold'> {filteredBlog.summary} </h2>
                    <div className='text-sm sm:text-base prose prose-slate sm:mx-10 max-w-5xl' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(filteredBlog.blog) }}></div>
                    <div className='flex flex-wrap mt-4 sm:mx-10 max-w-5xl mb-5'>
                        {
                            Array.isArray(filteredBlog?.tags) && filteredBlog.tags.map((item, index) => (
                                <p key={index} className='block h-auto px-3 mr-2 mb-2 rounded-full text-(--contrast-colour) text-xs sm:text-sm font-semibold leading-6 bg-(--theme-background)'> {item} </p>
                            ))
                        }
                    </div>
                </div>

                {/* add comment */}
                <div className={`h-max sm:mx-10 lg:mx-30 xl:mx-50`}>
                    <h2 className='text-base sm:text-lg text-(--subtext-colour) sm:mx-auto pb-2 font-semibold'>Add a comment</h2>
                    <div className='mb-10'>
                        <form onSubmit={onSubmitCommentForm}>
                            <textarea placeholder='Comment' className='w-full p-2 border border-gray-300 rounded outline-none h-48 text-(--subtext-colour)' value={ comment } onChange={(e) => setComment(e.target.value)} />
                            <button className='bg-(--theme-background) text-(--contrast-colour) rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer' type='submit'>Add</button>
                        </form>
                    </div>
                </div>

                {/* comment section */}
                <div className={`bg-(--post-background) shadow rounded-lg ${filteredBlog.comments.length !== 0 ? '' : 'hidden'} h-max sm:mx-10 lg:mx-30 xl:mx-50 mb-8`}>
                    <div className={`p-3 font-semibold text-base sm:text-lg text-(--contrast-colour) sm:mx-auto bg-(--theme-background) flex flex-row justify-between cursor-pointer transition-all duration-300 ${openComments ? 'mb-4 rounded-t-lg' : 'mb-0 rounded-lg'}`} onClick={() => setOpenComments(!openComments)}>
                        <h2>Comments ({filteredBlog.comments.length})</h2>
                        {
                            openComments ? <UnfoldLessIcon /> : <UnfoldMoreIcon />
                        }
                    </div>
                    <div className={`lg:p-2 px-5 mb-4 transition-all duration-300 ${openComments ? '' : 'hidden'}`}>
                        {
                            filteredBlog.comments.map((item, index) => (
                                <div key={index} className='first:pt-0 last:pb-0 pt-3 pb-3 last:border-none border-b border-b-gray-200'>
                                    <div className='flex mb-3'>
                                        <div className='h-10 w-10 mr-3'> <Avatar src={item.author?.profile} /> </div>
                                        <div className='flex flex-col'>
                                            <p className='font-bold text-(--main-text-colour) text-sm'> {item.author?.username} </p>
                                            <p className='font-medium text-(--subtext-colour) text-xs'> <Timestamp savedTimestamp={item.posted} /> </p>
                                        </div>
                                    </div>
                                    <div className='text-sm sm:text-base lg:text-sm text-(--subtext-colour)'> {item.content} </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    ) : <div className='opacity-0'></div>
}

export default View