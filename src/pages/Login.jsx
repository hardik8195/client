import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';
import { BACKEND_URL } from '../utils/http';

const Login = () => {
    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [error, seterror] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username) {
            alert("plz enter all fields");
            return;
        }
        if (!email) {
            alert("plz enter all fields");
            return;
        }
        if (!password) {
            alert("plz enter all fields");
            return;
        }
        setLoading(true)
        
        try {
            const res = await axios.post(`${BACKEND_URL}/users/login`, { username, email, password })
            dispatch(loginSuccess(res.data))
            navigate("/")
        } catch (error) {
            seterror("The user does not exist !!")
        } finally {
            setLoading(false)
        }

    }

    return (
        <div className="bg-[#202020ec] flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-6">Sign In</h2>
                <form>

                    <div className="mb-4">
                        <label for="username" className="block text-gray-600 text-sm font-medium mb-2">Username</label>
                        <input type="text"
                            id="username"
                            onChange={(event) => setusername(event.target.value)}
                            name="username"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required />
                    </div>

                    <div className="mb-4">
                        <label for="email" className="block text-gray-600 text-sm font-medium mb-2">Email</label>
                        <input type="email"
                            id="email"
                            name="email"

                            onChange={(event) => setemail(event.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required />
                    </div>

                    <div className="mb-4">
                        <label for="password" className="block text-gray-600 text-sm font-medium mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"

                            onChange={(event) => setpassword(event.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required />
                    </div>

                    <button
                        type="submit"
                        onClick={handleLogin}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                    <div>
                        {error}
                    </div>
                    <div>
                        does not have any account plz ? <Link to="/register">Signup</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
