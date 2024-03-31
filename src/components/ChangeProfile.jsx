import React, { useState } from 'react'
import Button from './Button'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../utils/http';
import { useSelector } from 'react-redux';

const ChangeProfile = () => {
    const [email,setEmail] = useState("");
    const [fullName,setFullname] = useState("")
    const [username,setUsername] = useState("")
    const [loading,setLoading] = useState(false)
    const {user} = useSelector((state)=>state.auth)
    const navigate = useNavigate()

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            await axios.patch(`${BACKEND_URL}/users/update-account`,{email:email,fullName:fullName,username:username},{
              headers : {
                "Authorization": `Bearer ${user.accessToken}`
              }
            })
            setLoading(false)
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="min-h-screen bg-[#202020ec] flex flex-col items-center justify-center p-4">
    <div className="bg-white p-6 rounded-lg shadow-lg ">
          <div className="mt-4">
            <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
            Enter new Full Name
            </label>
            <input 
            
            onChange={(e)=>setFullname(e.target.value)}
            type="text" 
            className=" mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
     
          <div className="mt-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Enter new Email</label>
            <input 
           
            onChange={(e)=>setEmail(e.target.value)}
            type="text" 
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div className="mt-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Enter new Username</label>
            <input 
         
            onChange={(e)=>setUsername(e.target.value)}
            type="text" 
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div>
                <Button onClick={handleUpdate}>{loading?"Updating..." : "Update"}</Button>
          </div>
        </div>
      </div>
  )
}

export default ChangeProfile
