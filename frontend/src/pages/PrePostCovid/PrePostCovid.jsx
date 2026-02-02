import axios from "axios";
import "./PrePostCovid.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { CSpinner } from "@coreui/react";
import { toast } from "react-toastify";

const array = ["hawai", "new-zealand", "maldives", "mexico", "spain", "greece", "vietnam", "uae"]

function PrePostCovid() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    // console.log("Final PrePostCovid Posts : ",posts);
    const fetchApi = async () => {
        try {
            let categories = [];
            for (let i = 1; i < array.length; i++) {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/category/single-category/${array[i]}`);
                // console.log("Category wise data : ",res?.data);
                const categoryWiseData = res?.data?.post;
                for (let post of categoryWiseData) {
                    categories.push(post);
                }
            }
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/post/get-all-posts`);
            const posts = response?.data?.posts;
            const hawaiData = posts.filter(post =>
                post?.title.toLowerCase().includes(array[0])
                || post?.hotelLocation.toLowerCase().includes(array[0])
            )
            const data = [...categories, ...hawaiData];
            setPosts(data);
            // console.log("Data from PrePostCovid : ",posts);
        }
        catch (error) {
            // console.log("Error fetching pre post covid data : ",error);
            toast.error(error);
        }
    }

    useEffect(() => {
        fetchApi();
    }, [])
    if (posts.length < 1) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <CSpinner size="sm" />
            </div>
        )
    }
    return (
        <div className="covid-container">
            <h1>World's top destinations During and Post covid timeline</h1>
            <div className="covid-images-container">
                {posts.map(post => (
                    <div
                        className="image-container"
                        key={post?._id}
                        onClick={() => navigate(`/product/${post?.slug}`)}
                    >
                        <img src={post?.images[0]} alt={post?.title} className="covid-image" />
                        <p>{post?.title}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PrePostCovid;