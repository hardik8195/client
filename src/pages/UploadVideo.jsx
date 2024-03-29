import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../utils/http';

export default function UploadVideo() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("")
    const [thumbnail, setThumbnail] = useState();
    const [videoFile, setVideoFile] = useState()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!title || !desc) {
            alert("All fields are required")
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('desc', desc)
        formData.append('thumbnail', thumbnail);
        formData.append('videoFile', videoFile);

        try {
            setLoading(true)
            await axios.post(`${BACKEND_URL}/api/v1/videos`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            setLoading(false)
            navigate("/")

        } catch (error) {
            console.log(error)
        }

    }


    return (
        <div className="bg-[#202020ec] flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <form>

                    <div className="mb-4">
                        <label for="title" className="block text-gray-600 text-sm font-medium mb-2">Title</label>
                        <input
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required />
                    </div>

                    <div className="mb-4">
                        <label for="desc" className="block text-gray-600 text-sm font-medium mb-2">Description</label>
                        <input
                            type="text"
                            onChange={(e) => setDesc(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required />
                    </div>

                    <div className="mb-4">
                        <label for="thumbnail" className="block text-gray-600 text-sm font-medium mb-2">Thumbnail</label>
                        <input
                            type="file"
                            onChange={(e) => setThumbnail(e.target.files[0])}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div className="mb-4">
                        <label for="video" className="block text-gray-600 text-sm font-medium mb-2">VideoFile</label>
                        <input
                            type="file"
                            onChange={(e) => setVideoFile(e.target.files[0])}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required />
                    </div>

                    <button
                        type="submit"
                        onClick={handleUpload}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                        {loading ? "Uploading ...." : "upload"}
                    </button>
                </form>
            </div>
        </div>
    )
}