import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../utils/http';

const Signup = () => {
    const [fullName,setFullname] = useState("");
    const [username,setusername] = useState("");
    const [email,setemail] = useState("");
    const [password,setpassword] = useState("");
    const [avatar,setavatar] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault()
        setLoading(true);
        const formData = new FormData()
        formData.append('fullName', fullName);
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('avatar', avatar);

        try {
            await axios.post(`${BACKEND_URL}/users/register`,formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                  },
            })
            navigate("/login")
        } catch (error) {
            console.error('Error signing up:', error.message);
        } finally {
            setLoading(false)
        }
    
    }

    return (
        <div className="bg-[#202020ec] flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
                <form>
                   
                    <div className="mb-4">
                        <label for="username" className="block text-gray-600 text-sm font-medium mb-2">Username</label>
                        <input type="text" 
                        id="username" 
                        name="username" 
                        onChange={(event)=>setusername(event.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required />
                    </div>

                
                    <div className="mb-4">
                        <label for="fullname" className="block text-gray-600 text-sm font-medium mb-2">Full Name</label>
                        <input 
                        type="text" 
                        id="fullname" 
                        name="fullname"
                        onChange={(event)=>setFullname(event.target.value)} 
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required/>
                    </div>

               
                    <div className="mb-4">
                        <label for="email" className="block text-gray-600 text-sm font-medium mb-2">Email</label>
                        <input 
                        type="email" 
                        id="email" 
                        name="email"
                        onChange={(event)=> setemail(event.target.value)} 
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required />
                    </div>

            
                    <div className="mb-4">
                        <label for="password" className="block text-gray-600 text-sm font-medium mb-2">Password</label>
                        <input 
                        type="password" 
                        id="password" 
                        name="password"
                        onChange={(event)=>setpassword(event.target.value)} 
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div className="mb-4">
                        <label for="avatar" className="block text-gray-600 text-sm font-medium mb-2">Avatar</label>
                        <input 
                        type="file" 
                        id="avatar" 
                        name="avatar" 
                        onChange={(event)=>setavatar(event.target.files[0])} 
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required />
                    </div>

                
                    <button 
                    type="submit"
                    onClick={handleSignup} 
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                         {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                    <div>
                        already have any account plz ? <Link to="/login">Sign in</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
