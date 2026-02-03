import Blog from '../components/Blog.jsx'
import { BlogContext } from '../context/BlogContext.jsx'
import { useContext } from 'react'

function Home() {
    const { blogs, searchedWords } = useContext(BlogContext);
    const blogsList = blogs?.filter(item => item.status === 'published');

    const filterSearchedBlogs = blogsList?.filter(item => item.title.toLowerCase().includes(searchedWords.toLowerCase()));
    
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mx-8 sm:mx-16 xl:mx-40'>
            {
                filterSearchedBlogs.map((item, index) => {
                    return (
                        <Blog
                            key = {index}
                            id = {item._id}
                            title = {item.title}
                            username = {item.username.username}
                            summary = {item.summary}
                            posted = {item.posted}
                            category = {item.category}
                            tags = {item.tags}
                            profile = {item.username.profile}
                            thumbnail = {item.thumbnail}
                            searched = {searchedWords}
                            saved = {item.saved?.some(user => (user._id || user).toString() === item.username._id.toString())}
                            userId = {item.username._id}
                        />
                    )
                })
            }
        </div>
    )
}

export default Home