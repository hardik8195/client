import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from './Button';
import Comment from './Comment';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, setItems } from '../store/commentSlice';
import { BACKEND_URL } from '../utils/http';

const Comments = () => {
    const [usercomment, setComment] = useState("")
    const [loading,setLoading] = useState(false)
    const {comment} = useSelector((state)=>state.comment)
    const {video} = useSelector((state)=>state.video)
    const dispatch = useDispatch()
    useEffect(() => {
        (async () => {

            try {
                const CommentRes = await axios.get(`${BACKEND_URL}/api/v1/comments/${video._id}`)
                dispatch(setItems(CommentRes.data))
            } catch (error) {
                console.log(error)
            }
        })()
    }, [video._id])
    const handleComment = async (e) => {
        e.preventDefault();

        try {
        setLoading(true)
            const res = await axios.post(`${BACKEND_URL}/api/v1/comments`, { desc: usercomment, videoId: video._id })
            dispatch(addComment({_id:res.data._id,userId:res.data.userId,desc:usercomment}))
        setLoading(false)
            
        } catch (error) {
            console.log(error)
        }
        setComment("")
    }
    return (
        <>
            <div className='flex my-3'>
                <div className='gap-2 flex-1'>
                    <input
                        className='w-10/12 h-20 border rounded-md p-2'
                        placeholder='Add a comment ...'
                        value={usercomment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <div>
                    </div>
                </div>
            </div>
            <Button onClick={handleComment}>{loading?"Adding...":"ADD"}</Button>
            {
                comment.map((fetchComment)=>(
                    <Comment key={fetchComment._id} comment={fetchComment}/>
                ))
            }
        </>
    )
}

export default Comments
