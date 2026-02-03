import { Link, useLocation } from 'react-router-dom'
import Avatar from './Avatar'
import { useContext, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import logo from '../assets/site_icon.png'
import { BlogContext } from '../context/BlogContext.jsx'
import CloseIcon from '@mui/icons-material/Close'

function Navbar({ setToken }) {
    const [profileMenu, setProfileMenu] = useState(false);
    const [smallSearchBar, setSmallSearchBar] = useState(false);

    const { token, logout, userData, searchedWords, setSearchedWords } = useContext(BlogContext);
    const location = useLocation();

    const profileMenuStyle = 'font-semibold py-2 pl-3 pr-6 text-(--main-text-colour) hover:text-(--theme-background) hover:font-bold cursor-pointer';
    const profileMenuBorderStyle = 'border-b border-b-gray-200';

    if(location.pathname !== '/login') {
        return (
            <>
                <div className='bg-(--theme-background) py-1 mb-10 flex flex-col'>
                    <div className='flex flex-row items-center justify-around pr-5'>
                        <Link to={'/'} className='flex flex-col sm:flex-row items-center'>
                            <img src={logo} className='h-15 w-15 sm:h-20 sm:w-20' />
                            <p className='text-slate-900 font-bold text-xl sm:text-3xl'>Nexlog</p>
                        </Link>
                        
                        <div className='md:w-2/4 relative hidden sm:block'>
                            <input type='text' className='w-full px-3 py-2 border border-(--contrast-colour) focus:border-(--contrast-colour) focus:outline-(--contrast-colour) rounded-md font-semibold text-(--contrast-colour)' placeholder='Search blogs by title' onChange={(e) => setSearchedWords(e.target.value)} value={searchedWords} />
                            <span className='absolute right-3 top-2 cursor-pointer text-(--post-background)'> <SearchIcon /> </span>
                        </div>

                        <div className='flex flex-row items-center justify-center'>
                            <p className={`${token ? 'hidden' : ''} sm:hidden text-white hover:underline font-semibold cursor-pointer`} onClick={() => setSmallSearchBar(!smallSearchBar)}>Search blog</p>
                            <div className={`w-0.5 h-5 bg-(--post-background) mx-2 sm:hidden ${token ? 'hidden' : ''}`}></div>
                            <Link to={!token ? '/login' : '/create'} className={`text-white hover:underline font-semibold ${token ? 'hidden' : ''}`}> Create blog </Link>
                            <div className={`w-0.5 h-5 bg-(--post-background) mx-2 ${token ? 'hidden' : ''}`}></div>
                            <Link to={'/login'} className={`text-white hover:underline font-semibold ${token ? 'hidden' : ''}`}> Login </Link>
                            
                            <button className={`h-15 w-15 cursor-pointer ${!token ? 'hidden' : ''}`} onClick={() => setProfileMenu(!profileMenu)}>
                                <Avatar src={ userData?.profile } />
                            </button>
                        </div>
                    </div>
                </div>

                <div className={`${smallSearchBar ? '' : 'hidden'} pb-5 mt-5 flex flex-row justify-center sm:hidden transition delay-300 ease-in`}>
                    <input type='text' className='w-4/5 px-3 py-2 border border-(--theme-background) focus:outline-(--theme-background) rounded-md font-semibold text-(--main-text-colour) focus:bg-(--post-background) mr-3' placeholder='Search blogs by title' onChange={(e) => setSearchedWords(e.target.value)} value={searchedWords} />
                    <div className='h-100vh flex items-center'> <CloseIcon className='text-(--main-text-colour) cursor-pointer' onClick={() => setSmallSearchBar(!smallSearchBar)} /> </div>
                </div>

                <div className={`${profileMenu ? '' : 'hidden'} bg-(--post-background) flex flex-col w-max shadow rounded-md absolute right-0 top-1/8 sm:top-1/9 mr-10 z-999`}>
                    <p className={`${!token ? 'hidden' : ''} ${profileMenuStyle} ${profileMenuBorderStyle} sm:hidden`} onClick={() => {setProfileMenu(!profileMenu); setSmallSearchBar(!smallSearchBar)}}>Search blog</p>
                    <Link to={'/create'} className={`${profileMenuStyle} ${profileMenuBorderStyle}`} onClick={() => setProfileMenu(!profileMenu)}> Create blog </Link>
                    <Link to={'/profile'} className={`${profileMenuStyle} ${profileMenuBorderStyle}`} onClick={() => setProfileMenu(!profileMenu)}> My profile </Link>
                    <Link to={'/'} className={`${profileMenuStyle}`} onClick={() => {setProfileMenu(!profileMenu); logout()}}> Logout </Link>
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <div className='bg-(--theme-background) py-1 mb-10 flex pl-5'>
                    <Link to={'/'} className='flex flex-col sm:flex-row items-center'>
                        <img src={logo} className='h-15 w-15 sm:h-20 sm:w-20' />
                        <p className='text-slate-900 font-bold text-xl sm:text-3xl'>Nexlog</p>
                    </Link>
                </div>
            </>
        )
    }
    
}

export default Navbar