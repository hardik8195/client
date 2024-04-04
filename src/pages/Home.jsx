import { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import { BACKEND_URL } from "../utils/http.js";
import { useSelector } from "react-redux";



export default function Home({ type }) {
    const [videos, setVideos] = useState([]);
    const { user } = useSelector((state) => state.auth)
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                let config = {};
                if (type === "sub" && user && user.accessToken) { // Check if user and accessToken are available
                    config = {
                        headers: {
                            "Authorization": `Bearer ${user.accessToken}`
                        }
                    };
                }
           
                const res = await axios.get(`${BACKEND_URL}/videos/${type}`, config);
                setLoading(false)
                setVideos(res.data);
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        })()
    }, [type,user])
    return (
        <div className=" h-screen my-3">
            <div style={{ position: "relative" }}>
            {loading && (
                <div
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        color: "white",
                        padding: "20px",
                        borderRadius: "8px",
                        zIndex: "9999"
                    }}
                >
                    Loading...
                </div>
            )}

            <div className="flex flex-wrap justify-between p-6">
                {videos.map((video) => (
                    <Card key={video._id} video={video} />
                ))}
            </div>
        </div>
        </div>
    )
}