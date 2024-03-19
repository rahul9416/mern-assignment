import React, { useEffect, useState } from "react";
import { registerRoute, allUsersRoute, deleteUserRoute, updateUserRoute } from "../apiRoutes";
import axios from "axios";
import Table from "./Table";

export default function Dashboard () {
    const [information, setInformation] = useState({firstName: '', lastName: '', email: '', password: '', projectDetail: ''})
    const [allUsers, setAllUsers] = useState([])
    const [currentId, setCurrentId] = useState(-1)

    const handleChangeField = (event) => {
        setInformation({ ...information, [event.target.name]: event.target.value })
    }

    const fetchAllUsers = async () => {
        const response = await axios.get(`${allUsersRoute}`);
        const data = []
        data.push(...response.data.data)
        setAllUsers(data)
    }

    useEffect(() => {
        async function fetchData () {
            await fetchAllUsers()
        }

        fetchData()
    }, [])

    const selectedUser = (user) => {
        setCurrentId(user._id)
        const currentUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            projectDetail: user.projectDetail,
        }
        setInformation(currentUser)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentId === -1){
            if (information.password.length > 6 && information.firstName.length >= 3 && information.lastName.length >= 3 && information.projectDetail.length > 5) { 
                await axios.post(registerRoute, information)
            }
        }
        else {
            console.log('hey you')
            if (information.firstName.length >= 3 && information.lastName.length >= 3 && information.projectDetail.length > 5) { 
                await axios.post(updateUserRoute, {id: currentId, ...information})
            }
        }
        await fetchAllUsers()
    }

    return (
        <div>
            <div className="bg-gray-900 text-white flex p-5 gap-10 m-5 justify-start items-start">
                <p>Clients Panel</p>
                <p>Clients</p>
            </div>
            <div className="grid grid-cols-12 mx-auto mt-20">
                <div className="col-span-8 w-full">
                    {allUsers.length && <Table data={allUsers} selectedUser={selectedUser}/>}
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
                        {
                            currentId === -1 && (<>
                            <label className="flex mb-2" htmlFor="password">Password:</label>
                            <input id="password" className="flex w-full border-2 border-gray-700 px-2 py-2 mb-10" name="password" type="password" placeholder="Enter your Password" value={information.password} onChange={handleChangeField}/>
                        </>)}
                        <label className="flex mb-2" htmlFor="projectDetail">Project Detail:</label>
                        <input id="project" className="flex w-full border-2 border-gray-700 px-2 py-2 mb-10" name="projectDetail" type="text" placeholder="Enter your Project Detail" value={information.projectDetail} onChange={handleChangeField}/>
                        <button type="submit" className="flex text-white bg-blue-600 py-4 px-6 rounded-md">{currentId === -1 ? 'Create Client' : 'Update'}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}