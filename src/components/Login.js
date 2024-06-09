import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from '../apiService';
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { showMessage } from "../helper";

const Login = () => {

    // Fetching if is user is already logged in
    const isAuthenticated = Cookies.get('user');

    const [information, setInformation] = useState({email: '', password: ''})
    const navigate = useNavigate()
    const handleChangeField = (event) => {
        setInformation({ ...information, [event.target.name]: event.target.value })
    }

    /**
     * Function to check credentials and login user with a maintainsed session
     * @param {Event} e 
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (information.password.length >= 6) { 
                const res = await api.post('/login', information);

                showMessage('You have successfully registered', 'success')
                // Setting authentication token for 1 day
                Cookies.set('user', JSON.stringify(res.data), { expires: 1, secure: true, sameSite: 'Strict' });
                navigate('/')
            } else {
                showMessage('Password Length must be 6', 'error')
            }
        } catch (error) {
            showMessage(error.response.data.errors[0].msg, 'error') 
        }
    }

    // Checking if user is not logged in navigate to login page
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated])

    return (
        <div className='w-fit mt-40 py-10 px-6 rounded-lg border-2 shadow-xl border-gray-400 mx-auto'>
            <h2 className='text-3xl font-semibold mb-20'>LOGIN</h2>
            <div className="flex h-full justify-center space-y-10">
                <form className="w-96 h-fit" onSubmit={(e) => handleSubmit(e)}>
                    <label className="flex mb-2" htmlFor="email">Email:</label>
                    <input id="email" className="flex w-full border-2 border-gray-700 px-2 py-2 mb-10" name="email" type="email" placeholder="Enter your Email" value={information.email} onChange={handleChangeField} />
                    <label className="flex mb-2" htmlFor="password">Password:</label>
                    <input id="password" className="flex w-full border-2 border-gray-700 px-2 py-2 mb-10" name="password" type="password" placeholder="Enter your Password" value={information.password} onChange={handleChangeField} />
                    <button type="submit" className="flex text-white bg-blue-600 py-4 px-6 rounded-md mb-16">Login</button>
                </form>
            </div>
            <Link to='/register' className='hover:text-indigo-700 underline'>Not a User? Register Now</Link>
            <ToastContainer />
        </div>
    )
}

export default Login
