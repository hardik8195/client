import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { BACKEND_URL } from '../utils/http'

const Search = () => {
    const [videos,setVideos] = useState([])
    const query = useLocation().search
    useEffect(()=>{
        (async()=>{
            try {
                const fetchVideos = await axios.get(`${BACKEND_URL}/videos/search${query}`)
                setVideos(fetchVideos.data)
            } catch (error) {
                console.log(error)
            }
        })()
    },[query])
  return (
    <div className='flex flex-wrap gap-3'>
    {
        videos.map((video)=>(
            
            <Card key={video._id} video={video}/>
            
        ))
    }
    </div>
  
  )
}

export default Search
