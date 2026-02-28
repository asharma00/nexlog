import axios from 'axios'
import { generatedUsername } from '../util/UsernameSelector'
import { useContext, useState } from 'react'
import { BlogContext } from '../context/BlogContext';
import { toast } from 'react-toastify';

function UsernameModal({open, setOpen}) {
    const { backendURL, token } = useContext(BlogContext);

    const [usernameManual, setUsernameManual] = useState('');
    const [usernameAutomated, setUsernameAutomated] = useState('');
    const [manualNameAvailable, setManualNameAvailable] = useState(null);

    const handleClose = () => {
        setOpen(false);
    }

    const validUsernameChar = (username) => {
        const usernameRegex = /^[a-zA-Z0-9]+$/;
        return usernameRegex.test(username);
    }

    const validUsernameLength = (username) => {
        if(!username) return false;
        return username.length >= 7 && username.length <= 25;
    }


    const checkUsernameAvailability = async(username) => {
        try {
            const response = await axios.get(backendURL + '/api/user/check', {params: { username }, headers: {token}});
            if(response.data.success)
                setManualNameAvailable(response.data.exists);
        } catch (error) {
            toast.error(error.message);
        }
    }


    const getGeneratedName = async() => {
        try {
            const generatedName = generatedUsername();
            const response = await axios.get(backendURL + '/api/user/check', {params: { generatedName }, headers: {token}});
            if(response.data.success) 
                if(response.data.exists)
                    setUsernameAutomated(generatedName)
        } catch (error) {
            toast.error(error.message);
        }
    } 


    const changeUsername = async() => {
        try {
            const username = usernameManual.length != 0 ? usernameManual : usernameAutomated;
            alert(username)
            const response = await axios.post(backendURL + '/api/user/change/username', {username}, {headers: {token}});
            if(response.data.success) {
                handleClose();
            }
        } catch (error) {
            toast.error(error.message);
        }
    }



    return (
        <div className={`${open ? '' : 'hidden'}`}>
            <div id='modal' className='fixed inset-0 bg-black/50 flex items-center justify-center'>
                <div className='bg-(--main-background) shadow-lg relative xs:w-full xl:w-1/2 w-2/3 rounded-md'>
                    <div>
                        <h2 className='bg-(--theme-background) text-center font-bold text-xl text-(--contrast-colour) p-3 rounded-t-md'>Change username</h2>
                    </div>
                    
                    <div className='py-5 px-7'>
                        <div className='flex flex-col'>
                            <div className='flex flex-row items-center'>
                                <input placeholder='New username' onChange={(e) => {
                                        setUsernameManual(e.target.value); 
                                        if(validUsernameChar(e.target.value) && validUsernameLength(e.target.value)) 
                                            checkUsernameAvailability(e.target.value)
                                    }} 
                                    value={ usernameManual } className='w-1/2 px-3 py-2 border border-gray-300 focus:border-(--theme-background) rounded-md font-semibold text-(--main-text-colour)'>
                                </input>
                                <p className={`${usernameManual.length < 7 || usernameManual.length > 25 || !validUsernameChar(usernameManual) || !validUsernameLength(usernameManual) ? 'hidden' : ''} ${manualNameAvailable ? 'text-green-500' : 'text-red-500'} w-1/2 text-center font-semibold`}> 
                                    { manualNameAvailable ? 'Available' : 'Not available' } 
                                </p>
                            </div>
                            <p className='text-(--summary-colour) text-sm mt-2 ml-2'>
                                <span className={`${usernameManual.length === 0 ? 'text-(--summary-colour)' : validUsernameLength(usernameManual) ? 'text-green-500' : 'text-red-400'}`}> 
                                    {`${usernameManual.length === 0 ? '?' : validUsernameLength(usernameManual) ? '✓' : '✗'}`} Username should be 7 - 25 characters long. 
                                </span><br />
                                <span className={`${usernameManual.length === 0 ? 'text-(--summary-colour)' : validUsernameChar(usernameManual) ? 'text-green-500' : 'text-red-400'}`}> 
                                    {`${usernameManual.length === 0 ? '?' : validUsernameChar(usernameManual) ? '✓' : '✗'}`} Username should contain only alphabets and numbers.
                                </span>
                            </p>
                        </div>

                        <hr className='mt-5 mb-5 text-(--summary-colour)' />

                        <div className='flex flex-row items-center'>
                            <button className='bg-(--theme-background) p-2 rounded-md text-(--contrast-colour) font-bold cursor-pointer w-1/2' onClick={() => getGeneratedName()}>Generate username</button>
                            <p className='w-1/2 text-center text-green-500 font-bold'> { usernameAutomated } </p>
                        </div>

                        <p className='text-xs text-(--summary-colour) mt-5'>*Note: Please remove entered username if you prefer system generated username.</p>
                    </div>

                    <div className='flex justify-end py-3 pr-5 border-t border-(--theme-background) m-3'>
                        <button className='text-(--contrast-colour-negative) font-semibold mr-7 cursor-pointer' onClick={handleClose}> CANCEL </button>
                        <button className='text-(--theme-background) font-semibold cursor-pointer' onClick={() => changeUsername()}> SUBMIT </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UsernameModal