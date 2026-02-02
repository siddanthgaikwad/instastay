import "./Products.css"
import {FaWifi, FaBriefcase, FaSwimmingPool, FaCar, FaStar} from "react-icons/fa"
import {MdLocationOn} from "react-icons/md"
import axios from "axios"
import { CSpinner } from "@coreui/react"
import RelatedProducts from "../RelatedProducts/RelatedProducts"
import { useParams,useNavigate } from "react-router-dom"
import { useState,useEffect } from "react"
import { useCart } from "../../../context/Cart"
import { toast } from "react-toastify"
import { useAuth } from "../../../context/UserContext"

const Products = ()=>{
    const params = useParams();
    const [postDetails, setPostDetails] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [cart, setCart] = useCart();
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    // Dev Checks
    // console.log("User id",auth?.user?.id);
    // console.log("Post id",postDetails?._id);
    // console.log("User token : ",auth?.token);
    // console.log("Posts Details : ",postDetails);
    // console.log("Related Post : ",relatedPost);

    const handlePostDetails = async ()=>{
        try{
            const response = await axios.get(`
                ${
                import.meta.env.VITE_BASE_URL}/api/post/get-post/${params.slug}`
            );
            const post = response.data.post;
            setPostDetails(response.data.post);
            getRelatedProducts(post?._id,post?.category._id);
        }   
        catch(error){
            // console.log(error);
            toast.error(error);
        }
    }

    const getRelatedProducts = async (pid, cid)=>{

        try{
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/api/post/related-post/${pid}/${cid}`
            )
            setRelatedProducts(response.data.relatedPost);
        }
        catch(error){
            // console.log(error);
            toast.error(error);
        }
    }

    useEffect(()=>{
        handlePostDetails();
    },[params.slug])

    const handleCheckIn = ()=>{
        if(!auth?.token){
            toast.error("Please login to continue");
            navigate("/login");
        }
        else{
            navigate("/payment", {
                state : {
                    price: postDetails?.price,
                    product: postDetails?.title,
                    postId: postDetails?._id,
                }
            });
        }
    }   

    const handleAddToCart = ()=>{
        if(postDetails?.isAvailable){
            setCart([...cart, postDetails]);
            localStorage.setItem("cart",JSON.stringify([...cart, postDetails]));
            toast.success("Added to cart");
        }
    }

    if(!postDetails){
        <div className="d-flex align-items-center justify-content-center min-vh-100">
            <CSpinner />
        </div>
    }

    return( 
        <div className="custom-products-container">
            <div className="custom-products-layout-container">
                {/* Image Section */}
                <div className="post-images-container">
                    {postDetails?.images?.length > 0 && (
                        <>
                            <img 
                                src={postDetails.images[0]}
                                alt="Main Image"
                                className="custom-products-image-card"
                            />

                            <div className="custom-products-grid">
                                {postDetails?.images.slice(1).map((image,idx)=>(
                                    <img 
                                        key={idx}
                                        src={image}
                                        alt={`Additional Image ${idx+1}`}
                                        className="custom-products-image-card-full"
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Details Section */}
                <div className="custom-products-details-container">
                    <h1 className="custom-products-details-heading">
                        {postDetails?.title}
                        <i style={{fontSize: 18}}>{!postDetails?.isAvailable?" (Reserved)":""}</i>
                    </h1>
                
                
                {/* Rating */}
                <div className="custom-products-details-innerContainer">
                    <FaStar />
                    <span className="custom-products-details-span1">4.5</span>
                    <span className="custom-products-details-span2">(1.5k+ Reviews)</span>
                </div>

                {/* Location */}
                <p className="custom-products-details-paragraph">
                    <MdLocationOn className="fs-5" />
                    {postDetails?.hotelLocation || "Location unavailable"}
                </p>
                
                {/* Buttons */}
                <div className="custom-products-details-btnContainer">
                    <button
                        className={`custom-products-checkIn-btn ${
                            postDetails?.isAvailable 
                            ? "available"
                            : "disabled"
                        }`}
                        disabled={!postDetails?.isAvailable}
                        onClick={handleCheckIn}
                    >
                        Check-In
                    </button>

                    <button
                        className={`custom-products-checkIn-btn ${
                            postDetails?.isAvailable 
                            ? "available"
                            : "disabled"
                        }`}
                        disabled={!postDetails?.isAvailable}
                        onClick={handleAddToCart}
                    >
                        Add to Wishlist
                    </button>
                </div>
                
                {/* Description */}
                <div style= {{marginBottom: "24px"}}>
                    <span className="custom-heading-overview">Overview</span>
                    <p className="custom-products-post-description">
                        {postDetails?.description}
                    </p>
                </div>
                
                {/* Price Display */}
                <div className="mt-3">
                    <p className="custom-products-price">
                        Price Per Day :{" "}
                        <span className="custom-product-price-display">
                            {postDetails?.price.toLocaleString("en-US",{
                                style: "currency",
                                currency: "USD",
                            })}
                        </span>
                    </p>
                </div>

                
                <div className="d-flex justify-content-between">
                    {/* NearBy Areas */}
                    <div style={{marginTop: "32px"}}>
                        <h2 className="custom-products-nearArea">NearBy Areas</h2>
                        <ul className="custom-products-list">
                            {postDetails?.nearArea?.flatMap((area,idx) => 
                                area
                                    .split(",")
                                    .map((subArea,subIdx) => (
                                        <li key={`${idx}-${subIdx}`}>
                                            {subArea.trim()}
                                        </li>
                                    ))
                            )}
                        </ul>
                    </div>
                    {/* Facilities */}
                    <div className="custom-facilities-container">
                        <h2 className="custom-facilities-heading">Facilities</h2>
                        <ul className="custom-products-list">
                            {postDetails?.facilities.flatMap((facility, idx) => 
                                facility 
                                    .split(",")
                                    .map((subFacility, subIdx) => (
                                        <li key={`${idx}-${subIdx}`}>
                                            {subFacility.trim()}
                                        </li>
                                    ))
                            )}
                        </ul>
                    </div>
                </div>

            </div>
        </div>

        <h1 className="custom-products-related-products">
            You may also like this:
        </h1>
        <RelatedProducts relatedProducts={relatedProducts}/>
        </div>

        
    )
}

export default Products;