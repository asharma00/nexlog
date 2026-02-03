import { useContext, useState } from 'react'
import googleIcon from '../assets/google_icon.png'
import { useEffect } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { BlogContext } from '../context/BlogContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'

function Login() {
    const heading_texts = {
        login: 'Login into account',
        register: 'Create account'
    }

    const buttonClass = 'bg-(--theme-background) hover:bg-(--theme-dark-background) text-white font-bold px-8 py-2 cursor-pointer w-full rounded-md mb-5 disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed';

    const { backendURL, token, setToken, navigate } = useContext(BlogContext);

    const [loginState, setloginState] = useState('login');
    const [headingText, setHeadingText] = useState(heading_texts.login);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true);
    const [buttonState, setButtonState] = useState(false);

    const disableEnableButton = () => {
        if(loginState === 'login') {
            const isValid = email.trim() !== '' && password.trim() !== '';
            setButtonState(isValid);
        }
        else {
            const isValid = email.trim() !== '' && password.trim() !== '' && confirmPassword.trim() !== '' && password === confirmPassword;
            setButtonState(isValid);
        }
    }

    useEffect(() => {
        disableEnableButton()
    }, [loginState, email, password, confirmPassword])

    const setFieldsEmpty = () => {
        setEmail('');   setRememberMe(true);
        setPassword('');    setConfirmPassword('');
        setShowPassword(false);     setShowConfirmPassword(false);
    }

    // const handleGoogleLogin = async() => {
    //     alert(backendURL)
    //     window.location.href = `${ backendURL }/api/user/google`;
    // }

    const onSubmitHandler = async(event) => {
        event.preventDefault();
        try {
            if(loginState === 'register') {
                const response = await axios.post(backendURL + '/api/user/register', {email, password});
                if(response.data.success) {
                    setToken(response.data.token);
                    localStorage.setItem('token', response.data.token);
                }
                else
                    toast.error(response.data.message);
            }
            else {
                const response = await axios.post(backendURL + '/api/user/login', {email, password, rememberMe});
                if(response.data.success) {
                    setToken(response.data.token);
                    localStorage.setItem('token', response.data.token);
                }
                else
                    toast.error(response.data.message);
            }
        }
        catch (error) {
            toast.error(error.message);
        }
    }
    
    useEffect(() => {
        if(token)
            navigate('/');
    }, [token])

    return (
        <div className='bg-(--post-background) shadow rounded-lg px-10 py-10 w-[90%] sm:max-w-96 m-auto mt-14 mb-14 gap-4 text-slate-800'>
            <form className='flex flex-col items-center' onSubmit={ onSubmitHandler }>
                <div className='mb-5'>
                    <p className='font-bold text-3xl'> { headingText } </p>
                </div>

                <div className='w-full mb-4'>
                    <p className='font-semibold text-sm'>Email <span className='text-red-700 text-base font-bold'>*</span> </p>
                    <input type='email' className='w-full px-3 py-2 border border-gray-300 focus:border-(--theme-background) rounded-md font-semibold' placeholder='Email' required onChange={(e) => setEmail(e.target.value)} value={ email } />
                </div>

                <div className='w-full mb-4'>
                    <p className='font-semibold text-sm'>Password <span className='text-red-700 text-base font-bold'>*</span> </p>
                    <div className='relative'>
                        <input type={showPassword ? 'text' : 'password'} className='w-full px-3 py-2 border border-gray-300 focus:border-(--theme-background) rounded-md font-semibold' placeholder='Password' required onChange={(e) => setPassword(e.target.value)} value={ password } />
                        <span className='absolute right-3 top-2 cursor-pointer text-gray-500' onClick={() => setShowPassword(!showPassword)}> { showPassword ? <VisibilityIcon /> : <VisibilityOffIcon /> } </span>
                    </div>
                </div>

                {
                    loginState === 'login' ? '' :
                        <div className='w-full mb-4'>
                            <p className='font-semibold text-sm'>Confirm password <span className='text-red-700 text-base font-bold'>*</span> </p>
                            <div className='relative'>
                                <input type={showConfirmPassword ? 'text' : 'password'} className='w-full px-3 py-2 border border-gray-300 focus:border-(--theme-background) rounded-md font-semibold' placeholder='Confirm password' required onChange={(e) => setConfirmPassword(e.target.value)} value={ confirmPassword } />
                                <span className='absolute right-3 top-2 cursor-pointer text-gray-500' onClick={() => setShowConfirmPassword(!showConfirmPassword)}> { showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon /> } </span>
                            </div>
                        </div>
                }
                
                {
                    loginState !== 'login' ? '' :
                        <div className='w-full flex justify-between text-sm mb-4'>
                            <p className='text-sm font-semibold flex flex-row items-center'> <input type='checkbox' className='mr-1' checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} /> Remember me</p>
                            <p className='cursor-pointer text-sm text-(--theme-background) hover:underline hover:text-(--theme-dark-background) font-semibold'>Forgot your password?</p>
                        </div>
                }

                { loginState === 'login' ?
                    <button className={`${ buttonClass }`} disabled={!buttonState} type='submit'> Login </button> :
                    <button className={`${ buttonClass }`} disabled={!buttonState} type='submit'> Register </button>
                }
            </form>

            {/* { 
                loginState !== 'login' ? '' :
                    <div className='mb-5'>
                        <div className='flex flex-row justify-center items-center'>
                            <hr className='border-none h-[0.5px] w-full bg-gray-300'></hr>
                            <p className='text-gray-600 font-semibold px-2'>or</p>
                            <hr className='border-none h-[0.5px] w-full bg-gray-300'></hr>
                        </div>
                        <button onClick={ handleGoogleLogin } className='w-full border border-gray-300 rounded-md cursor-pointer px-8 py-2 mt-4 font-semibold flex flex-row items-center justify-center hover:bg-gray-100'> 
                            <img src={ googleIcon } className='w-6 h-6 mr-3' /> Login with Google 
                        </button> 
                    </div>
            } */}

            <div className='text-center text-sm font-semibold'>
                { 
                    loginState === 'login' ? 
                        <p>
                            Don't have an account?
                            <span className='cursor-pointer text-(--theme-background) underline hover:text-(--theme-dark-background) ml-1' onClick={() => {setloginState('register'); setHeadingText(heading_texts.register); setFieldsEmpty();}}>Register here</span>
                        </p> 
                    :
                        <p>
                            Already have an account?
                            <span className='cursor-pointer text-(--theme-background) underline hover:text-(--theme-dark-background) ml-1' onClick={() => {setloginState('login'); setHeadingText(heading_texts.login); setFieldsEmpty();}}>Login here</span>
                        </p>
                }
            </div>
        </div>
    )
}

export default Login