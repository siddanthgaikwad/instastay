import "./ProductList.css"
import { useNavigate } from "react-router-dom"
import { FaLocationDot } from "react-icons/fa6"

const ProductList = ({ products }) => {
    const navigate = useNavigate();
    // console.log("Products: ",products);
    return (
        <div
            className="d-flex flex-column flex-md-row flex-wrap justify-content-md-center align-items-center w-100 gap-3"
        >
            {/* ProductsList */}
            {(products || []).map((product) => (
                <div
                    key={product?._id}
                    className="search-item-container"
                    onClick={() => navigate(`/product/${product.slug}`)}
                >
                    <img
                        src={product?.images[0]}
                        alt={product?.title}
                        className="search-image"
                    />
                    <p className="search-item-title">{product?.title}</p>
                    <div className="search-item-location">
                        <FaLocationDot />
                        {product?.hotelLocation}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProductList;