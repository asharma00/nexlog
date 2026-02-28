import { Link } from 'react-router-dom'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import Avatar from './Avatar.jsx'
import Timestamp from '../util/Timestamp.jsx'
import { deleteBlog, updateBlogState, saveBlog } from '../util/BlogOperations.js'
import { useContext } from 'react'
import { BlogContext } from '../context/BlogContext.jsx'
import HighlightWord from '../util/HighlightWord.jsx'


function Blog({id, username, posted, title, summary, category, tags, profile, thumbnail, searched, saved, userId}) {
    const { backendURL, token, userData } = useContext(BlogContext);
    const bookmarkVisibleToAuthor = userData?._id === userId ? false : true; 
    
    return (
        <Link to={`/view/${id}`} className='relative w-full rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-primary/25 duration-300 cursor-pointer bg-(--post-background)'>
            {
                bookmarkVisibleToAuthor ? 
                    <div className='absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-md z-10 bg-(--main-background)'
                        onClick={(e) => {e.preventDefault(); saveBlog(backendURL, token, id, userId, !saved)}}>
                        {   
                            saved && token ? 
                            <BookmarkIcon className='text-(--theme-background)' /> : 
                            <BookmarkBorderIcon className='text-(--theme-background)' />
                        }
                    </div> : ''
            }

            <p className='absolute top-5 left-3 block h-6 px-3 rounded-full text-(--theme-background) border border-(--theme-background) text-xs font-bold leading-6 bg-(--contrast-colour)/75 mb-4 w-max'> {category} </p>

            <div>
                <img src={thumbnail} className='aspect-video w-full mb-6' />
                <div className='px-5 pb-5'>
                    <div className='flex mb-5'>
                        <div className='h-10 w-10 mr-3'> <Avatar src={profile} /> </div>
                        <div className='flex flex-col'>
                            <p className='font-bold text-(--main-text-colour) text-sm'> {username} </p>
                            <p className='font-medium text-(--subtext-colour) text-xs'> <Timestamp savedTimestamp={posted} /> </p>
                        </div>
                    </div>
                    <h5 className='mb-3 font-bold text-(--main-text-colour) text-lg'> <HighlightWord text={title} search={searched} /> </h5>
                    <p className='mb-3 font-medium text-(--subtext-colour) text-sm'> {summary} </p>
                    <div className='flex flex-wrap mt-4'>
                        {
                            tags.map((item, index) => (
                                <p key={index} className='block h-6 px-3 mr-2 mb-2 rounded-full text-(--contrast-colour) text-xs font-bold leading-6 bg-(--theme-background)'> {item} </p>
                            ))
                        }
                    </div>
                </div>
            </div>
        </Link>
    )
}


function ProfileBlog({id, username, posted, title, summary, tags, profile, thumbnail, type, userBlogType, status, searched, saved, userId}) {
    const buttonStyling = 'w-max px-4 py-2 rounded-md text-white shadow font-semibold text-sm cursor-pointer';
    const { backendURL, token } = useContext(BlogContext);

    return (
        <div className='mb-10 last:mb-0 sm:mb-5 border-b border-b-gray-200 pb-10 last:pb-0 sm:pb-5 last:border-b-0'>
            <Link to={`/view/${id}`} className='relative w-full overflow-hidden cursor-pointer'>
                {
                    type === 'blogs' ? '' :
                        <div onClick={(e) => {e.preventDefault(); saveBlog(backendURL, token, id, userId, !saved)}}>
                            <div className='absolute top-6 sm:top-4 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-md z-10 save-post'>
                                {   
                                    saved ? 
                                    <BookmarkIcon className='text-(--theme-background)' /> : 
                                    <BookmarkBorderIcon className='text-(--theme-background)' />
                                }
                            </div>
                        </div>
                }
                <div className='flex flex-col sm:flex-row'>
                    <img src={thumbnail} className={`${type === 'blogs' ? 'sm:p-5 pb-2' : 'pb-2 sm:p-5'} aspect-video sm:w-2/5 pr-0`} />
                    <div className={`${type === 'blogs' ? 'sm:p-5 pb-2' : 'sm:pb-2 sm:p-5'} sm:w-3/5`}>
                        <div className={`${type === 'blogs' ? '' : 'flex mb-3'}`}>
                            { 
                                type === 'blogs' ? '' : <div className='h-10 w-10 mr-3'> <Avatar src={profile} /> </div> 
                            }
                            <div className='flex flex-col'>
                                { 
                                    type === 'blogs' ? '' : <p className='font-bold text-(--main-text-colour) text-sm'> {username} </p> 
                                }
                                <p className={`font-medium text-(--subtext-colour) ${type === 'blogs' ? 'text-sm' : 'text-xs'}`}> 
                                    { type === 'blogs' 
                                        ? <span><b className='mr-1'>Posted on: </b>{new Date(posted).toLocaleString([], {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}</span>  
                                        : <Timestamp savedTimestamp={posted} />}  
                                </p>
                            </div>
                        </div>
                        <h5 className='mb-3 font-bold text-(--main-text-colour) text-lg'> <HighlightWord text={title} search={searched} /> </h5>
                        <p className='mb-3 sm:mb-0 font-medium text-(--subtext-colour) text-sm'> {summary} </p>
                        {
                            type === 'blogs' ? '' :
                                <div className='flex flex-wrap mt-4'>
                                    {tags.map((item, index) => (
                                            <p key={index} className='block h-6 px-3 mr-2 mb-2 rounded-full text-(--contrast-colour) text-xs font-bold leading-6 bg-(--theme-background)'> {item} </p>
                                    ))}
                                </div>
                        }
                    </div>
                </div>
            </Link>
            {
                type !== 'blogs' ? '' :
                    <div className='flex flex-row sm:px-5 justify-end'>
                        <Link to={`/edit/${id}`}><button className={`${buttonStyling} bg-(--theme-background) mr-3 ${userBlogType === 'posted' || (type === 'blogs' && status === 'published') ? 'hidden' : ''}`}>Edit</button></Link>
                        <button className={`${buttonStyling} bg-green-700 mr-3 ${userBlogType === 'posted' || (type === 'blogs' && status === 'published') ? 'hidden' : ''}`} onClick={() => updateBlogState(backendURL, token, id, 'published')}>Publish</button>
                        <button className={`${buttonStyling} bg-red-400 mr-3 ${userBlogType === 'posted' || (type === 'blogs' && status === 'published') ? '' : 'hidden'}`} onClick={() => updateBlogState(backendURL, token, id, 'unpublished')}>Unpublish</button>
                        <button className={`${buttonStyling} bg-red-500`} onClick={() => deleteBlog(backendURL, token, id)}>Delete</button>
                    </div>
            }
        </div>
    )
}


function CommentBlog({id, title, summary, posted, comment, blogId, searched}) {
    return(
        <div className='border-b border-b-gray-300 last:border-b-0 last:pb-0 pb-10 sm:pb-5 last:mb-0 mb-10 sm:mb-5'>
            <Link to={`/view/${blogId}`} className='relative w-full overflow-hidden cursor-pointer'>
                <div className='flex flex-col'>
                    <h5 className='font-bold text-(--main-text-colour) text-lg'> <HighlightWord text={title} search={searched} /> </h5>
                    <p className='mb-3 text-(--summary-colour) text-sm'> {summary.length > 125 ? (summary.substring(0, 122) + '...') : summary.length} </p>
                    <p className='text-(--main-text-colour) text-base font-semibold'> {comment} </p>
                    <p className='mb-3 text-(--main-text-colour) text-sm'> <b className='mr-1'>Commented on:</b> 
                        {new Date(posted).toLocaleString([], {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                        })} 
                    </p>
                </div>
            </Link>
        </div>
    )
}


export default Blog
export { ProfileBlog, CommentBlog }