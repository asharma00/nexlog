import { useContext } from 'react'
import { CommentBlog } from './Blog.jsx'
import { BlogContext } from '../context/BlogContext.jsx'

function UserComments() {
    const { userData, searchedWords } = useContext(BlogContext);
    const comments = userData.createdComments;
    const filterSearchedBlogs = comments?.filter(item => item.blogId.title.toLowerCase().includes(searchedWords.toLowerCase()));

    if(filterSearchedBlogs?.length != 0)
        return (
            <div>
                {
                    filterSearchedBlogs.map((item, index) => {
                        return (
                            <CommentBlog
                                key = {index}
                                id = {item._id}
                                title = {item.blogId.title}
                                summary = {item.blogId.summary}
                                posted = {item.posted}
                                comment = {item.content}
                                blogId = {item.blogId._id}
                                searched={searchedWords}
                            />
                        )
                    })
                }
            </div>
        )
    else
        return (
            <div className='flex items-center justify-center'>
                <p className='text-slate-500 font-semibold'>No comments posted yet.</p>
            </div>
        )
}

export default UserComments