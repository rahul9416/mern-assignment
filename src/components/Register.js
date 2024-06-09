import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import api from '../apiService';
import Cookies from 'js-cookie';
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { showMessage } from "../helper";

const Register = () => {

    // Fetching if is user is already logged in
    const isAuthenticated = Cookies.get('user');

    const [information, setInformation] = useState({userName: '', email: '', password: ''})
    const navigate = useNavigate()
    const handleChangeField = (event) => {
        setInformation({ ...information, [event.target.name]: event.target.value })
    }

    /**
     * Function to create a new User
     * @param {Event} e 
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (information.password.length >= 6 && information.userName.length >= 3) { 
                const res = await api.post('/createUser', information);
                
                showMessage('You have successfully registered', 'success')
                // Setting token with secure options
                Cookies.set('user', res.data.token, { expires: 1, secure: true, sameSite: 'Strict' }); 
                navigate('/')
            } else {
                if (information.password.length >= 6) showMessage('Password length must be 6', 'error')
                else showMessage('User Name length must be 3', 'error')
            }
        } catch (error) {
            showMessage(error.response.data.error[0].msg, 'error') 
        }
    }


    // Checking if user is not logged in navigate to login page
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated])

    return (
        <div className='w-fit mt-32 py-10 px-6 rounded-lg border-2 shadow-xl border-gray-400 mx-auto'>
            <h2 className='text-3xl font-semibold mb-20'>REGISTER</h2>
            <div className="flex h-full justify-center space-y-10">
                <form className="w-[30rem] h-fit" onSubmit={(e) => handleSubmit(e)}>
                    <label className="flex mb-2" htmlFor="userName">User Name:</label>
                    <input id="userName" className="flex w-full border-2 border-gray-700 px-2 py-2 mb-10" name="userName" type="text" placeholder="Enter your User Name" value={information.userName} onChange={handleChangeField} />
                    <label className="flex mb-2" htmlFor="email">Email:</label>
                    <input id="email" className="flex w-full border-2 border-gray-700 px-2 py-2 mb-10" name="email" type="email" placeholder="Enter your Email" value={information.email} onChange={handleChangeField} />
                    <label className="flex mb-2" htmlFor="password">Password:</label>
                    <input id="password" className="flex w-full border-2 border-gray-700 px-2 py-2 mb-10" name="password" type="password" placeholder="Enter your Password" value={information.password} onChange={handleChangeField} />
                    <button type="submit" className="flex text-white bg-blue-600 py-4 px-6 rounded-md mb-16">Register</button>
                </form>
            </div>
            <Link to='/' className='hover:text-indigo-700 underline'>Already a User? Login Now</Link>
            <ToastContainer />
        </div>
    )
}

export default Register
