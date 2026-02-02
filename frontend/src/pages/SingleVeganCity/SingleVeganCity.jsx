import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SingleVeganCity.css"
import { toast } from "react-toastify";

function SingleVeganCity(){
    const [posts,setPosts] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    const title = params.slug.split(" ").map((str) => str.charAt(0).toUpperCase()+str.slice(1)).join(" ");
    const slug = params.slug.toLowerCase();
    const fetchApi = async ()=>{
        try{
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/post/get-all-posts`);
            // console.log("Response data : ", response?.data);
            const allPosts = response?.data?.posts;
            const filteredPosts = allPosts.filter((post) => 
                                        post?.title.toLowerCase().includes(slug)
                                        || post?.hotelLocation.toLowerCase().includes(slug)
                                        || post?.slug.includes(slug)
                                )
            
            // console.log("SingleVeganPosts : ",filteredPosts);
            setPosts(filteredPosts);
        }
        catch(error){
            // console.log("Error SingleVeganCityPage : ",error);
            toast.error(error);
        }
    }
    useEffect(()=>{
        fetchApi();
    },[])

    return(
        <div className="singleVeganCity-container">
            <h1>{title}</h1>
            <div className="images-container">
                {posts.map(post => (
                    <div
                        key={post?._id}
                        className="single-image-container"
                        onClick= {() => navigate(`/product/${post?.slug}`)}
                    >
                        <img src={post?.images[0]} alt={post?.title} className="veganHotel-image" />
                        <p>{post?.title}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SingleVeganCity;