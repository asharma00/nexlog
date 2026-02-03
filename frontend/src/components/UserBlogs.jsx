import { useContext, useState } from 'react'
import { ProfileBlog } from './Blog.jsx'
import { BlogContext } from '../context/BlogContext.jsx'
import Loading from '../util/Loading.jsx'

function UserBlogs({type, userBlogType}) {
    const { userData, searchedWords } = useContext(BlogContext);
    
    const blogsList = type === 'blogs' ? userData.createdBlogs : userData.savedBlogs;
    const userBlogsList = blogsList && type === 'blogs' ? 
                            userBlogType === 'posted' ? 
                                blogsList.filter(item => item.status === 'published') : 
                                userBlogType === 'drafts' ?
                                    blogsList.filter(item => item.status === 'unpublished'):
                                    blogsList
                            : blogsList;

    const filterSearchedBlogs = userBlogsList?.filter(item => item.title.toLowerCase().includes(searchedWords.toLowerCase()));
    
    if(!filterSearchedBlogs)
        return(
            <Loading isLoading={true} />
        )

    if(filterSearchedBlogs.length != 0)
        return (
            <div className='101010'>
                {
                    filterSearchedBlogs.map((item, index) => {
                        return (
                            <ProfileBlog
                                key = {item._id}
                                id = {item._id}
                                title = {item.title}
                                username = {item.username.username}
                                summary = {item.summary}
                                posted = {item.posted}
                                tags = {item.tags}
                                profile = {item.username.profile}
                                thumbnail = {item.thumbnail}
                                type = {type}
                                userBlogType = {userBlogType}
                                status = {item.status}
                                searched = {searchedWords}
                                saved = {item.saved?.some(user => (user._id || user).toString() === item.username._id.toString())}
                                userId = {item.username._id}
                            />
                        )
                    })
                }
            </div>
        )
    else
        return (
            <div className='flex items-center justify-center'>
                <p className='text-slate-500 font-semibold'>No blogs {type === 'blogs' ? 'created' : 'saved'} yet.</p>
            </div>
        )
}

export default UserBlogs