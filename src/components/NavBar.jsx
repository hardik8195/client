import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import VideoCallIcon from '@mui/icons-material/VideoCall';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";

export default function NavBar() {
    const { user,status } = useSelector((state) => state.auth)
    const [q, setQ] = useState("")
    const navigate = useNavigate()
    return (
        <nav className=" px-4 py-2">
            <div className="container mx-auto flex items-center justify-between">
                <div className="relative flex items-center">
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        type="text" placeholder="Search"
                        className="border border-gray-300 bg-white h-8 px-4 pr-8 rounded-l-full focus:outline-none focus:border-blue-500" />
                    <button
                        onClick={()=>navigate(`/search?q=${q}`)}
                        className="bg-blue-500 text-white h-8 px-4 rounded-r-full hover:bg-blue-600">
                        <SearchIcon />
                    </button>
                </div>
                {status ? (<div className="my-3 flex gap-4">
                    <Link to="addVideo"><VideoCallIcon style={{ color: "white", fontSize: '40px' }} /></Link>
                    <Link to="profile"><img src={user.avatar} className="w-9 h-9 border rounded-full bg-black" /></Link>
                    <p className="text-white">{user.username}</p>
                </div>) : (<button onClick={() => navigate("/login")} className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700">
                    Sign In
                </button>)}

            </div>
        </nav>

    )
}