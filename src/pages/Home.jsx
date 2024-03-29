import { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import { BACKEND_URL } from "../utils/http.js";


export default function Home({type}){
    const [videos,setVideos] = useState([]);

    useEffect(()=>{
        (async () => {
            const res = await axios.get(`${BACKEND_URL}/videos/${type}`)
            setVideos(res.data);
        })()
    },[type,setVideos])
    return (
        <div className="flex flex-wrap justify-between p-6">
            {
                videos.map((video)=>(
                    <Card key={video._id} video={video} />
                ))
            }
        </div>
    )
}