import axios from "axios";
import Navbar from "../Navbar/Navbar";
import "./AllPosts.css"
import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import MobileNavBar from "../MobileNavBar/MobileNavBar";
import { toast } from "react-toastify";

const AllPosts = ()=>{
    const [postData, setPostData] = useState([]);
    const navigate = useNavigate();
    // console.log("All posts data : ",postData);
    const handleApi = async()=>{
        try{
            const response = await axios.get(
                `${
                    import.meta.env.VITE_BASE_URL}/api/post/get-all-posts
                `
            );
            setPostData(response.data.posts);
        }
        catch(error){
            // console.log(error);
            toast.error(error);
        }
    }

    useEffect(()=>{
        handleApi();
    },[])

    return(
        <div className="d-flex min-vh-100 w-100">
            <div className="d-none d-md-block">
                <Navbar />
            </div>
            <div 
                className="ms-3" 
                title="SideBar"
            >
                <MobileNavBar />
            </div>
            <div className="d-flex flex-column gap-2 align-items-md-start w-100">
                <h2 className="font-Raleway text-dark mt-2 fw-semibold ms-4">All Posts</h2>
                <div className="d-flex flex-column flex-md-row gap-3 w-100 flex-wrap align-items-center align-items-md-start">
                    {/* <p>Sometext</p> */}
                    {postData.map((post) => (
                        <div 
                            className="single-post-container"
                            key={post?._id}
                            onClick={() => navigate(`/product/${post.slug}`)}
                        >
                            <img 
                                src={post?.images[0]}
                                alt={post?.title}
                                className="post-image"
                            />
                            <p className="text-dark">{post?.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AllPosts;