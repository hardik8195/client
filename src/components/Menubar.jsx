import "../index.css"
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import HistoryIcon from '@mui/icons-material/History';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logout } from "../store/authSlice";
import { useState } from "react";
import { BACKEND_URL } from "../utils/http";

export default function Menubar() {
  const navigate = useNavigate();
  const userStatus = useSelector((state) => state.auth.status)
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch()

  const handleLogout =async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await axios.post(`${BACKEND_URL}/users/logout`)
      if(res.data) dispatch(logout())
      navigate("/")
    } catch (error) {
      console.log(error.message)
    }finally{
      setLoading(false)
    }
    
  }
  return (
    <div className="flex-1 pr- bg-[#202020ec]">
      <div className="p-4   h-screen ">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="flex gap-1 cursor-pointer">
            <YouTubeIcon className="text-white" />
            <p className="text-white font-semibold mb-2">YouTube</p>
          </div>
        </Link>
        <hr className="m-3" />
        <ul>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li className="flex gap-1 my-1">
              <HomeIcon className="text-white" />
              <p className="text-white ">Home</p>
            </li>
          </Link>
          <Link to="trends" style={{ textDecoration: "none" }}>
            <li className="flex gap-1 my-1 cursor-pointer">
              <ExploreIcon className="text-white" />
              <p className="text-white">Explore</p>
            </li>
          </Link>
          <Link  to={userStatus?"subscriptions":"login"}>
          <li className="flex gap-1 my-1">
            <SubscriptionsIcon className="text-white" />
            <p className="text-white">Subscriptions</p>
          </li>
          </Link>

          <hr className="m-3" />
          <Link to="libary">
          <li className="flex gap-1 my-1">
            <LibraryAddIcon className="text-white" />
            <p className="text-white ">Libary</p>
          </li>
          </Link>
          <li className="flex gap-1 my-1">
            <HistoryIcon className="text-white" />
            <p className="text-white">History</p>
          </li>

          <hr className="m-3" />
          {
            userStatus ? <Button onClick={handleLogout}>{loading?"Signing out...":"Sign out"}</Button> :
              <div>
                <p className=" text-white">if you want to explore new things plz sign in</p>
                <Button onClick={() => navigate("/login")}>Sign In</Button>
              </div>
          }
        </ul>
      </div>
    </div>
  )
}