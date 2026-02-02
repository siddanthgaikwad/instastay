import "./RelatedProducts.css"
import {
    FaBed, 
    FaUser, 
    FaRulerCombined, 
    FaPlaneDeparture
} from "react-icons/fa"
// import related1 from "../../../assets/related/Rectangle 70.png"
import frame from "../../../assets/Frame.png"
import { useNavigate,useParams } from "react-router-dom"

const RelatedPost = ({relatedProducts})=>{
    // console.log("Releted Products : ",relatedProducts);
    const navigate = useNavigate();
    const {slug} = useParams();
    return(
        <div className="related-products-main-container">
            {/* Coupon Card */}
            <div className="related-products-couponCard-container">
                <div className="d-flex align-items-center mb-4">
                    <FaPlaneDeparture size={30} className="me-2" />
                    <h3 className="fs-4 fw-bold">My Dream Place</h3>
                </div>
                <p className="related-products-discount-text mb-2">20% OFF</p>
                <p className="mb-1 fs-6">Use Promo Code:</p>
                <p className="promo-badge">Orlando</p>
                <img src={frame} alt="Traveler Icon" style={{width: "24px",height:"96px",marginTop:"16px"}} />
            </div>

            {/* Related products */}
            {
                relatedProducts.length>0 ? (
                relatedProducts.map((related,index) => (
                    <div 
                        className="custom-relatedProducts"
                        key={related._id || index}
                        onClick={()=> navigate(`/product/${related.slug}`)}
                    >
                        <img 
                            src={related?.images[0]}
                            alt={`Image of ${related?.title}`}
                            className="related-product-image1"
                        />
                        <div className="p-4">
                            <h3 className="relatedProducts-title">{related?.title}</h3>
                            <div className="d-flex align-items-center mb-2 text-secondary fs-6 fw-semibold">
                                <FaRulerCombined className="me-2"/> 300 sq ft{" "}
                            </div>
                            <div className="d-flex align-items-center mb-2 text-secondary fs-6 fw-semibold" >
                                <FaUser className="me-2" /> Sleeps {related?.guest} 
                            </div>
                            <div className="d-flex align-items-center mb-2 text-secondary fs-6 fw-semibold" >
                                <FaBed className="me-2" /> 1 double bed and 1 twin bed{" "}
                            </div>
                            <button
                                className="related-products-btn"
                                onClick={()=> navigate(`/product/${related.slug}`)}
                            >
                                Try it
                            </button>
                        </div>
                    </div>
                
                ))
            ) : (
                <div className="d-flex align-items-center justify-content-center">
                    <h1 className="font-Raleway">Related Posts Not found</h1>
                </div>
            )
            }
        </div>
    )
}

export default RelatedPost;