import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../utils/http.js";


export default function Card({video}){
    const [channel,setChannel] = useState({});
    const {status} = useSelector((state)=>state.auth)
    useEffect(()=>{
        (async () => {
            const res = await axios.get(`${BACKEND_URL}/users/find/${video.userId}`)
            setChannel(res.data)
        })()
    },[video.userId])
    return (
        <Link to={status?`/video/${video._id}`: "/login" } style={{textDecoration:"none"}}>
        <div  className="w-360 mb-45 cursor-pointer">
            <img className="w-full h-202 rounded-lg" src={video.thumbnail}/>
            <div className={`my-3 flex flex-wrap gap-2`}>
                <img src={channel.avatar} className="w-9 h-9 border rounded-full bg-black" />
                <p className="text-white">{video.title}</p>
            </div>
            <div className="text-white">
                <p>{channel.username}</p>
                <div className="flex gap-3">
                    <p>{video.views} views -</p>
                    <p></p>
                </div>     
            </div>
        </div>
        </Link>
    )
}