import "./DreamVacation.css"
import Image1 from "../../assets/Post/Rectangle 8.png"
import Image2 from "../../assets/Post/Rectangle 9.png"
import Image3 from "../../assets/Post/Rectangle 10.png"
import Image4 from "../../assets/Post/Rectangle 11.png"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { CSpinner } from "@coreui/react"
import { toast } from "react-toastify"

const DreamVacation = () => {
    const [categories, setCategories] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [categoryImages, setCategoryImages] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();


    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/category/get-category`);
            // console.log("Categories",response.data);
            setCategories(response.data.categories || []);

        }
        catch (error) {
            // console.log("Cannott fetch categories : ",error);
            toast.error("Cannot fetch categories.", error);
        }
    }

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/post/get-all-posts`);
            // console.log("All posts from DreamVacation : ",response.data);
            setAllPosts(response.data.posts || []);
        }
        catch (error) {
            // console.log("Cannot fetch posts : ",error);
            toast.error("Cannot fetch posts.", error);
        }
    }

    const fetchCategoryImages = () => {
        const allImages = (categories || []).map((category) => {

            const hotel = (allPosts || []).find(hot => hot?.category === category?._id);

            return {
                ...category,
                image: hotel ? hotel.images[0] : null,
            };
        });
        // console.log("Category name with image : ",allImages);
        const filteredAllImages = allImages.filter((data) => data.image !== null);
        setCategoryImages(filteredAllImages);

    }

    useEffect(() => {
        if (location.pathname === "/") {
            fetchCategories();
            fetchPosts();
        }
    }, [location.pathname])

    useEffect(() => {
        if ((categories?.length ?? 0) > 0 && (allPosts?.length ?? 0) > 0) {
            fetchCategoryImages();
        }
    }, [categories, allPosts])

    if (categoryImages.length < 1) {
        return (
            <div className="d-flex align-items-center justify-content-center min-vh-100">
                <CSpinner />
            </div>
        )
    }

    return (
        <div className="custom-dreamVacation-layout container">
            <h1 className="custom-dreamVacation-heading">
                Enjoy your dream vacation
            </h1>
            {/* Description */}
            <p className="custom-dreamVacation-paragraph">
                Plan and book your perfect trip with expert advice, travel tips,
                destination information, and inspiration from us
            </p>

            {/* Destinations */}
            <div className='d-flex flex-wrap gap-4 justify-content-sm-start ms-4 ps-3' >
                {
                    categoryImages.map((category, index) => (
                        <div
                            key={index}
                            className="text-center w-sm-18rem category-container"
                            onClick={() => navigate(`category/${category?.slug}`)}
                        >
                            <img
                                src={category?.image}
                                alt={category?.name}
                                className="destination-image"
                            />
                            <h2 className="fs-5 fw-semibold mt-2">{category?.name}</h2>
                            {/* <p className="text-secondary fw-semibold">{destination.properties}</p> */}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default DreamVacation;