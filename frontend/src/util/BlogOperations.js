import { toast } from 'react-toastify'
import axios from 'axios'

const deleteBlog = async(backendURL, token, id) => {
    try {
        const response = await axios.post(backendURL + '/api/blog/delete', {id}, {headers: {token}});
        if(response.data.success) 
            toast.success('Blog deleted successfully');    
        else
            toast.error(response.data.message);
    } 
    catch (error) {
        toast.error(error.message);
    }
}

const updateBlogState = async(backendURL, token, id, status) => {
    try {
        const response = await axios.post(backendURL + '/api/blog/update/state', {id, status}, {headers: {token}});
        if(response.data.success) {
            if(status === 'published')
                toast.success('Blog published successfully');
            else
                toast.success('Blog unpublished and saved to drafts');
        }    
        else
            toast.error(response.data.message);
    } 
    catch (error) {
        toast.error(error.message);
    }
}

const addBlog = async(backendURL, token, formData) => {
    const response = await axios.post(backendURL + '/api/blog/add', formData, {headers: {token}});
    if(response.data.success) {
        if(blogState === 'published')
            toast.success('Blog posted successfully');
        else
            toast.success('Blog saved as draft');
    }
    else
        toast.error(response.data.message);
}

const updateBlog = async(backendURL, token, formData, blogState) => {
    const response = await axios.post(backendURL + '/api/blog/update', formData, {headers: {token}});
    if(response.data.success) {
        if(blogState === 'published')
            toast.success('Blog updated and posted successfully');
        else
            toast.success('Blog saved as draft');
    }
    else
        toast.error(response.data.message);
}

const saveBlog = async(backendURL, token, id, userId, saved) => {
    const response = await axios.post(backendURL + '/api/blog/save', {id, userId, saved}, {headers: {token}});
    if(response.data.success) 
        toast.success(saved ? 'Blog bookmarked' : 'Blog removed from bookmarks');
    else
        toast.error(response.data.message);
}

export { deleteBlog, updateBlogState, addBlog, updateBlog, saveBlog }