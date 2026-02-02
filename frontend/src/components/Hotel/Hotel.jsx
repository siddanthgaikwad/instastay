import axios from "axios";
import "./Hotel.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { CSpinner } from "@coreui/react";
import { toast } from "react-toastify";

const Hotel = () => {
    const [posts, setPosts] = useState([]);
    const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
    const navigate = useNavigate();
    // console.log("All posts data : ",posts);

    useEffect(() => {
        const checkScreen = () => {
            setIsMobileOrTablet(window.innerWidth <= 1024);
            // 1024  = tablet breakpoint;
        }

        checkScreen();
        window.addEventListener("resize", checkScreen);

        return () => window.removeEventListener("resize", checkScreen);
    }, [])

    // Fetch all posts
    const handleApi = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL
                }/api/post/get-all-posts`
            )
            setPosts(response.data.posts || []);
        }
        catch (error) {
            // console.log("Error while fetching posts : ",error);
            toast.error("Failed to fetch posts.", error);
        }
    }

    useEffect(() => {
        handleApi();
    }, [])

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    //   Image rotation logic 
    const [imageIndexes, setImageIndexes] = useState({});
    useEffect(() => {
        if (!Array.isArray(posts) || posts.length === 0) return;

        const interval = setInterval(() => {
            setImageIndexes((prevIndexes) => {
                const newIndexes = { ...prevIndexes };
                posts.forEach((post) => {
                    const currentIndex = newIndexes[post._id] || 0;
                    const imagesLength = post?.images?.length || 0;
                    if (imagesLength > 0) {
                        newIndexes[post._id] = (currentIndex + 1) % imagesLength;
                    } else {
                        newIndexes[post._id] = 0;
                    }
                });
                return newIndexes;
            });
        }, 3500);

        return () => clearInterval(interval);
    }, [posts])

    if (posts.length < 1) {
        return (
            <div className="min-vh-25 d-flex justify-content-center align-items-center">
                <CSpinner size="sm" />
            </div>
        )
    }
    return (
        <div className="fluid-container mx-auto custom-hotel-margin">
            <h2 className="custom-hotel-heading">Popular Hotels</h2>
            <Carousel
                responsive={responsive}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                swipeable={true}
                draggable={true}
                infinite={false}
                showDots={isMobileOrTablet}

            >
                {posts.map((hotel) => (
                    <div
                        key={hotel._id}
                        className="bg-white overflow-hidden mx-auto custom-hotel-card"
                        onClick={() => navigate(`product/${hotel.slug}`)}
                    >
                        <img
                            src={(hotel?.images?.[imageIndexes[hotel._id] || 0]) || ""}
                            alt={hotel?.title || "hotel"}
                            className="w-100 custom-hotel-image"
                        />
                        <div className="p-3">
                            <Link
                                to={`product/${hotel.slug}`}
                                className="custom-hotel-link"
                            >
                                {hotel.title}
                            </Link>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Hotel;
