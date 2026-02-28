import { useContext } from 'react';
import { BlogContext } from '../context/BlogContext';
import { ProfileBlog } from './Blog';
import Loading from '../util/Loading';

function OtherUserContent({profileData}) {
    console.log(profileData)

    const { searchedWords } = useContext(BlogContext);
    
    const userBlogsList = profileData?.filter(item => item.status === 'published') || [];

    const filterSearchedBlogs = userBlogsList?.filter(item => item.title.toLowerCase().includes(searchedWords.toLowerCase())) || [];
    
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
                                searched = {searchedWords}
                                saved = {item.saved?.some(user => (user._id || user).toString() === item.username.toString())}
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
                <p className='text-slate-500 font-semibold'>No blogs published yet.</p>
            </div>
        )
}

export default OtherUserContent