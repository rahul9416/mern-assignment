import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css"

export default function Dashboard() {
    // Fetching if is user is already logged in
    const isAuthenticated = Cookies.get('user');
    const navigate = useNavigate()

    const [userName, setUserName] = useState('')

    const handleLogout = () => {
        Cookies.remove('user')
        Cookies.remove('token')
        navigate('/login')
    }

    // Checking if user is not logged in navigate to login page
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
        } else {
            const user = JSON.parse(isAuthenticated)
            setUserName(user.user.User.name)
        }
    }, [isAuthenticated])

    return (
        <div className="text-lg">
            <div>
            Welcome <span className="font-bold">{userName}</span>, to your authorised system!!!.
            </div>
            <div className="flex items-center justify-center">
            <button className="bg-blue-600 py-2 px-3 rounded-lg hover:bg-blue-700 text-white" onClick={() => handleLogout()}>
                Logout
            </button>
            </div>
        </div>
    )
}