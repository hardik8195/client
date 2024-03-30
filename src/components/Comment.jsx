import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../store/commentSlice';
import { BACKEND_URL } from '../utils/http';

const Comment = ({comment}) => {
  const [channel,setChannel] = useState({})
  const dispatch  = useDispatch()
  const {user} = useSelector((state)=>state.auth)
  useEffect(()=>{
    (async()=>{
      try {
        const res = await axios.get(`${BACKEND_URL}/users/find/${comment.userId}`,{
          headers: {
            "Authorization": `Bearer ${user.accessToken}`
          }
        }

        )
        setChannel(res.data)
      } catch (error) {
        console.log(error)
      }
    })()
  },[comment.userId,user.accessToken])

  const handleDelete =async (e) => {
    e.preventDefault();

    try {
      await axios.delete(`${BACKEND_URL}/comments/${comment._id}`,{
        headers: {
          "Authorization": `Bearer ${user.accessToken}`
        }
      })
      dispatch(deleteComment(comment._id))
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='flex justify-between my-3 text-white '>
      <div className='flex gap-2 '>
        <img src={channel.avatar} className="w-9 h-9 border rounded-full bg-black" />
        <div>
          <h1 style={{ fontSize: 'large' }}>{channel.username}</h1>
          <p style={{ fontSize: 'medium' }}>{comment.desc}</p>
        </div>
      </div>
      {user.data._id===comment.userId?
      <Button onClick={handleDelete} className='cursor-pointer'>
        <DeleteIcon/>
      </Button>
      :null}

    </div>
  )
}

export default Comment
