import React from 'react'
import { useSelector } from 'react-redux'
import Button from '../components/Button'
import { Link } from 'react-router-dom'

const Profile = () => {
    const {user} = useSelector((state)=>state.auth)
    return (
        <div className="min-h-screen bg-[#202020ec] flex flex-col items-center justify-center p-4">
            <div className="bg-white text-white p-6 rounded-lg shadow-lg">
                <div className="flex flex-col items-center">
                    {/* Circular Image Container */}
                    <div className="w-32 h-32 mb-4">
                        <img className="w-full h-full rounded-full object-cover" 
                        src={user.data.loggedInUser.avatar} alt="Profile Picture" />
                    </div>
                    {/* User Information */}
                    <div className="text-center">
                        <h2 className="text-gray-600 text-lg font-semibold">{user.data.loggedInUser.fullName}</h2>
                        <p className="text-gray-600">Username: {user.data.loggedInUser.username}</p>
                        <p className="text-gray-600">Email: {user.data.loggedInUser.email}</p>
                        <div className='flex gap-2'>
                            <Link to="/change-profile"><Button>Change Profile</Button></Link>
                            <Button>Change Password</Button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
