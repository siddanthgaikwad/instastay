import { useEffect, useState } from "react";
import "./Discover.css"
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import { CSpinner } from "@coreui/react";
import { useNavigate } from "react-router-dom";
import SlideShow from "../../components/SlideShow/SlideShow";
import { toast } from "react-toastify";

function Discover() {
    const [posts, setPosts] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    // console.log("Posts : ",posts);
    let filtered = searchValue ? (
        (posts || []).filter(post => post?.title?.toLowerCase().includes(searchValue))
    ) : (posts || []);
    filtered = (filtered || []).sort(() => Math.random() - 0.5);

    const fetchApi = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/post/get-all-posts`);
            // console.log("discover :",response );
            setPosts(response?.data?.posts || []);
        }
        catch (error) {
            // console.log("Discover Page error : ",error)
            toast.error(error);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchApi();
    }, []);


    return (
        <div className="discover-container">

            <div className="slide-show">
                <SlideShow />
                {/* Search Bar */}
                <div className="search-container">
                    <input
                        type="search"
                        className="search-input"
                        placeholder="Search here"
                        onChange={(e) => setSearchValue(e.target.value)}
                        value={searchValue}
                    />
                    <BsSearch
                        size={22}
                        className="search-icon"
                    />
                </div>
            </div>

            <h1>Discover your Favourite hotels</h1>

            {/* Loading Status */}
            {isLoading ?
                (
                    <div className="d-flex justify-content-center align-items-center min-vh-100">
                        <CSpinner size="sm" />
                    </div>
                ) : (filtered.length < 1) ? (
                    <div className="d-flex justify-content-center align-items-center min-vh-100">
                        <h1 style={{ fontFamily: "Raleway, sans-serif", fontSize: "45px", fontWeight: 700 }}>No Posts found</h1>
                    </div>
                ) : null
            }

            {/* Posts Container */}
            <div className="posts-container">
                {filtered.map(post => (
                    <div
                        className="image-container"
                        key={post?._id}
                        onClick={() => navigate(`/product/${post?.slug}`)}
                    >
                        <img src={post?.images[0]} alt={post?.title} className="image" />
                        <p>{post?.title}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Discover;