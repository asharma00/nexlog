import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { socket } from '../util/Socket.js'

export const BlogContext = createContext();

const BlogContextProvider = (props) => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    const initialToken = localStorage.getItem('token');

    const [token, setToken] = useState(initialToken);
    const [blogs, setBlogs] = useState([]);
    const [userData, setUserData] = useState({});
    const [refreshKey, setRefreshKey] = useState(0);
    const [searchedWords, setSearchedWords] = useState('');
    
    const [darkMode, setDarkMode] = useState(() =>
        localStorage.getItem('darkTheme') === 'dark'
    );

    const triggerRefresh = () => setRefreshKey(prev => prev + 1);

    const getBlogList = async() => {
        try {
            const response = await axios.get(backendURL + '/api/blog/list');
            if(response.data.success) 
                setBlogs(response.data.blogs);    
        } 
        catch (error) {
            toast.error(error.message);
        }
    }

    const getUserData = async() => {
        try {
            const response = await axios.get(backendURL + '/api/user/get', {headers: { token }});
            if(response.data.success) {
                setUserData(response.data.userData);
                if(response.data.userData.theme === 'dark')
                    setDarkMode(true);
            }
        } 
        catch (error) {
            toast.error(error.message);    
        }
    }

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
        setUserData(null);
        setDarkMode(false);
    }

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (!token && storedToken) setToken(storedToken);
    }, []);


    useEffect(() => {
        getBlogList();
    }, []);


    useEffect(() => {
        if (!refreshKey || !token) return;
        const timer = setTimeout(() => {
            getUserData();
        }, 5000);
        return () => clearTimeout(timer);
    }, [refreshKey, token]);


    useEffect(() => {
        if (!refreshKey) return;
        const timer = setTimeout(() => {
            getBlogList();
        }, 5000);
        return () => clearTimeout(timer);
    }, [refreshKey]);


    useEffect(() => {
        if (token) getUserData();
    }, [token]);


    useEffect(() => {
        const root = document.documentElement;
        if (darkMode) {
            root.classList.add('theme-dark');
            localStorage.setItem('theme', 'dark');
        } 
        else {
            root.classList.remove('theme-dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);


    useEffect(() => {
        if (!socket) return;

        socket.on('userDataFetched', () => triggerRefresh());
        socket.on('blogDataFetched', () => triggerRefresh());
        socket.on('commentPosted', () => triggerRefresh());
        socket.on('blogPosted', () => triggerRefresh());
        socket.on('blogDeleted', () => triggerRefresh());
        socket.on('blogStatusUpdated', () => triggerRefresh());
        socket.on('blogUpdated', () => triggerRefresh());
        socket.on('userProfileUpdated', () => triggerRefresh());
        socket.on('userThemeUpdated', () => triggerRefresh());
        socket.on('blogSavedOrRemoved', () => triggerRefresh());

        return () => {
            socket.off('userDataFetched');
            socket.off('blogDataFetched');
            socket.off('commentPosted');
            socket.off('blogPosted');
            socket.off('blogDeleted');
            socket.off('blogStatusUpdated');
            socket.off('blogUpdated');
            socket.off('userProfileUpdated');
            socket.off('userThemeUpdated');
            socket.off('blogSavedOrRemoved');
            // socket.off('commentPosted');
        };
    }, [socket]);


    const value = {
        backendURL, navigate,
        token, setToken, logout,
        blogs, userData, searchedWords, setSearchedWords,
        darkMode, setDarkMode
    }


    return (
        <BlogContext.Provider value={ value }>
            { props.children }
        </BlogContext.Provider>
    )
}

export default BlogContextProvider