import React, { useEffect, useState } from "react";
import { registerRoute, allUsersRoute, deleteUserRoute, updateUserRoute } from "../apiRoutes";
import axios from "axios";
import Table from "./Table";

export default function Dashboard () {
    const basicInformation = {firstName: '', lastName: '', email: '', mobileNumber: '', projectDetail: ''}
    const [information, setInformation] = useState(basicInformation)
    const [allUsers, setAllUsers] = useState([])
    const [currentId, setCurrentId] = useState(-1)

    // Function to update the fields
    const handleChangeField = (event) => {
        setInformation({ ...information, [event.target.name]: event.target.value })
    }

    // Function to fetch all the users from database
    const fetchAllUsers = async () => {
        const response = await axios.get(`${allUsersRoute}`);
        const data = []
        data.push(...response.data.data)
        setAllUsers(data)
    }

    // function to update selected user information
    const selectedUser = (user) => {
        setCurrentId(user._id)
        const currentUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            mobileNumber: user.mobileNumber,
            projectDetail: user.projectDetail,
        }
        setInformation(currentUser)
    }
    
    //  Function to submit the data
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentId === -1){
            if (information.mobileNumber.length === 10 && information.firstName.length >= 3 && information.lastName.length >= 3 && information.projectDetail.length > 5) { 
                await axios.post(registerRoute, information)
                setInformation(basicInformation)
            }
            else {
                alert('Wrong Information')
            }
        }
        else {
            if (information.firstName.length >= 3 && information.lastName.length >= 3 && information.projectDetail.length > 5 && information.mobileNumber.length === 10) { 
                await axios.post(`${updateUserRoute}`, {id: currentId, ...information})
                setInformation(basicInformation)
            }
            else {
                alert('Wrong Credentials')
            }
        }
        await fetchAllUsers()
    }
    
    //  Function to delete the user
    const deleteUser = async (user) => {
        try {
            await axios.post(`${deleteUserRoute}`, {id: user._id})
            await fetchAllUsers()
        } catch (error) {
            console.log(error)
        }
    }

    // To fetch all users in the beginning
    useEffect(() => {
        async function fetchData () {
            await fetchAllUsers()
        }

        fetchData()
    }, [])

    return (
        <div>
            <div className="bg-gray-900 text-white flex p-5 gap-10 m-5 justify-start items-start">
                <p>Clients Panel</p>
                <p>Clients</p>
            </div>
            <div className="grid grid-cols-12 mx-auto mt-10">
                <div className="col-span-8 h-[75vh] overflow-auto mx-10 mr-20">
                <h1 className="flex text-3xl font-bold mb-10">Clients</h1>
                    <Table data={allUsers} selectedUser={selectedUser} deleteUser={deleteUser}/>
                </div>
                <div className="col-span-4 space-y-10">
                    <h1 className="flex text-3xl font-bold">Create Client</h1>
                    <form className="pr-16" onSubmit={(e) => handleSubmit(e)}>
                        <label className="flex mb-2" htmlFor="firstname">First Name:</label>
                        <input id="firstname" className="flex w-full border-2 border-gray-700 px-2 py-2 mb-10" name="firstName" type="text" placeholder="Enter your First Name" value={information.firstName} onChange={handleChangeField}/>
                        <label className="flex mb-2" htmlFor="lastName">Last Name:</label>
                        <input id="lastname" className="flex w-full border-2 border-gray-700 px-2 py-2 mb-10" name="lastName" type="text" placeholder="Enter your Last Name" value={information.lastName} onChange={handleChangeField}/>
                        <label className="flex mb-2" htmlFor="email">Email:</label>
                        <input id="email" className="flex w-full border-2 border-gray-700 px-2 py-2 mb-10" name="email" type="email" placeholder="Enter your Email" value={information.email} onChange={handleChangeField}/>
                        <label className="flex mb-2" htmlFor="mobileNumber">Mobile Number:</label>
                        <input id="mobileNumber" className="flex w-full border-2 border-gray-700 px-2 py-2 mb-10" name="mobileNumber" type="number" placeholder="Enter your Mobile Number" value={information.mobileNumber} onChange={handleChangeField}/>
                        <label className="flex mb-2" htmlFor="projectDetail">Project Detail:</label>
                        <input id="project" className="flex w-full border-2 border-gray-700 px-2 py-2 mb-10" name="projectDetail" type="text" placeholder="Enter your Project Detail" value={information.projectDetail} onChange={handleChangeField}/>
                        <button type="submit" className="flex text-white bg-blue-600 py-4 px-6 rounded-md">{currentId === -1 ? 'Create Client' : 'Update'}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}