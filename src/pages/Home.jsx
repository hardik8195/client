import { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import { BACKEND_URL } from "../utils/http.js";
import { useSelector } from "react-redux";



export default function Home({type}){
    const [videos,setVideos] = useState([]);
    const {user} = useSelector((state)=>state.auth)

    useEffect(()=>{
        (async () => {
           try {
             let config = {}; 
             if (type === "sub") { 
                
                 config = {
                     headers: {
                         "Authorization": `Bearer${user.accessToken}`
                     }
                 };
             }
             const res = await axios.get(`${BACKEND_URL}/videos/${type}`,config);
             setVideos(res.data);
           } catch (error) {
                console.log(error)
           }
        })()
    },[type,setVideos])
    return (
        <>
        {videos ? (

        <div className="flex flex-wrap justify-between p-6">
            {
                videos.map((video)=>(
                    <Card key={video._id} video={video} />
                ))
            }
        </div>
        ) : (<div className="text-white" style={{"fontSize":"large"}}>Loading......</div>)

        }
        </>
    )
}