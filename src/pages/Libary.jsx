import React from 'react'
import { useSelector } from 'react-redux'
import SavedVideoCard from '../components/SavedVideoCard'

const Libary = () => {

    const {user}  = useSelector((state)=>state.auth)
  return (
    <div className='flex flex-wrap gap-3'>
      {
        user.data.savedVideos.map((savedVideo) => (
          <SavedVideoCard key={savedVideo} videoId={savedVideo}/>
        ))
      }
    </div>
  )
}

export default Libary
