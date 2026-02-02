
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SydneyDetails.css"
import axios from "axios";
import { CSpinner } from "@coreui/react";
import { toast } from "react-toastify";

function SydneyDetails() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    const handleApi = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/post/get-all-posts`);

            // console.log("Response from Sydney page : ",response);
            const allPosts = response?.data?.posts;

            // Filter the posts which contain sydney in title or hotellocation or nearArea for sydney page
            const filteredPosts = allPosts.filter((post) => (post?.title?.toLowerCase().includes("sydney")
                || post?.nearArea?.some(item => item?.toLowerCase().includes("sydney"))
                || post?.hotelLocation?.includes("sydney")))

            // console.log("Sydney details : ",filteredPosts);
            const shuffled = filteredPosts.sort(() => Math.random() - 0.5);
            setPosts(shuffled.slice(0, 10));
        }
        catch (error) {
            // console.log("Error in this page : ",error);
            toast.error(error);
        }
    }

    useEffect(() => {
        handleApi();
    }, []);

    if (posts.length < 1) {
        return (
            <div className="spinner-container">
                <CSpinner size="sm" />
            </div>
        )
    }

    return (
        <div className="sydney-main-container">
            <h1>Sydney's 10 most fashionable 5 start hotels</h1>
            <div className="sydney-container">
                {posts.map((post) => (
                    <div
                        key={post?._id}
                        className="each-post"
                        onClick={() => navigate(`/product/${post?.slug}`)}
                    >
                        <img src={post?.images[0]} alt="image" className="post-image" />
                        <p className="post-title">{post?.title}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SydneyDetails;