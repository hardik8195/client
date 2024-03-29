import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import Button from '../components/Button';
import Recommendation from '../components/Recommendation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dislike, like, setVideo } from '../store/videoSlice';
import { savedVideos, subscription } from '../store/authSlice';
import Comments from '../components/Comments';
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { BACKEND_URL } from '../utils/http';

const Video2 = () => {
    const path = useLocation().pathname.split("/")[2]
    const { video } = useSelector((state) => state.video)
    const { user } = useSelector((state) => state.auth)
    const [channel, setChannel] = useState({})
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        (async () => {
            try {
                const videoRes = await axios.get(`${BACKEND_URL}/videos/find/${path}`)
                const channelRes = await axios.get(`${BACKEND_URL}/users/find/${videoRes.data.userId}`)
                dispatch(setVideo(videoRes.data))
                setChannel(channelRes.data)

            } catch (error) {

            }
        })()
    }, [path, dispatch])
    const handleLike = async () => {
        await axios.put(`${BACKEND_URL}/users/like/${video._id}`)
        dispatch(like(user._id))
    }
    const handleDislike = async () => {
        await axios.put(`${BACKEND_URL}/users/dislike/${video._id}`)
        dispatch(dislike(user._id))
    }
    const handleSubscribe = async () => {
        user.subscribedUsers.includes(channel._id) ?
            await axios.put(`${BACKEND_URL}/users/unsub/${channel._id}`) :
            await axios.put(`${BACKEND_URL}/users/sub/${channel._id}`)

        dispatch(subscription(channel._id))
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            await axios.delete(`${BACKEND_URL}/videos/${video._id}`)
            setLoading(false)
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }
    const handleLibary = async () => {
        user.savedVideos.includes(video._id) ?
            await axios.put(`${BACKEND_URL}/users/unsave/${video._id}`) :
            await axios.put(`${BACKEND_URL}/users/save/${video._id}`)

        dispatch(savedVideos(video._id))
    }
    return (
        <div className="flex gap-5">
            <div className="flex-5">
                <iframe
                    src={video.videoFile}
                    allowFullScreen
                    width="100%"
                    height="525"
                />
                <div className="text-white my-3">
                    <h1>{video.title}</h1>
                    <div className="flex">
                        <div className="flex-1">
                            <p>{video.views} views . </p>
                        </div>
                        <div className="flex gap-3">
                            {
                                user._id == video.userId ?
                                    (<div>
                                        <button onClick={handleDelete}>
                                            <DeleteIcon />{loading ? "Deleting" : "Delete"}</button>
                                    </div>) : null
                            }{" "}

                            <div className='flex gap-1' >
                                <div className='cursor-pointer' onClick={handleLibary}>
                                    {user.savedVideos.includes(video._id) ?
                                        (<BookmarkIcon />) :
                                        (<BookmarkBorderIcon />)
                                    }
                                </div>
                                <p>{user.savedVideos.includes(video._id) ?
                                    "Unsave" : "Save"
                                }</p>
                            </div>

                            <div className='flex gap-1' >
                                <div className='cursor-pointer' onClick={handleLike}>
                                    {video.likes.includes(user._id) ?
                                        (<ThumbUpIcon />) :
                                        (<ThumbUpOffAltIcon />)
                                    }{" "}
                                </div>
                                <p>Like</p>
                            </div>
                            <div className='flex gap-1' >
                                <div className='cursor-pointer' onClick={handleDislike}>
                                    {video.dislikes.includes(user._id) ?
                                        (<ThumbDownIcon />) :
                                        (<ThumbDownOffAltIcon />)
                                    }{" "}
                                </div>
                                <p>Dislike</p>
                            </div>
                        </div>
                    </div>
                    <hr className='my-4' />
                    <div className='flex my-3'>
                        <div className='flex gap-2 flex-1'>
                            <img src={channel.avatar} className="w-9 h-9 border rounded-full bg-black" />
                            <div>
                                <h1 style={{ fontSize: 'large' }}>{channel.username}</h1>
                                <p style={{ fontSize: 'small' }}>{channel.subscribers} subcribers</p>
                                <p>{video.desc}</p>
                            </div>
                        </div>
                        <div>
                            <Button
                                onClick={handleSubscribe}
                            >
                                {user.subscribedUsers.includes(channel._id) ? "Subscribed" : "Subscribe"}
                            </Button>
                        </div>
                    </div>
                </div>

                <Comments />
            </div>

            <div className="flex-2">
                <Recommendation />
            </div>

        </div>

    )
}

export default Video2
