import "./CartPage.css"

import {FaTrashAlt} from "react-icons/fa"
import {useAuth} from "../../context/UserContext"
import {useCart} from "../../context/Cart"
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"



const CartPage = ()=>{
    const [auth,setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const navigate = useNavigate();

    // console.log("All Cart Info from  cartPage : ", cart);
    // console.log("Auth from Cart : ",auth)
    const handleCheckIn=()=>{
        if(!auth?.token){
            toast.error("Authentication required to proceed!");
            return navigate("/login");
        }

        if(!cart.length){
            toast.error("Your cart is empty.");
            return;
        }

        // console.log("Total Price : ", totalPrice());

        navigate("/payment",{
            state: {
                totalPrice: totalPrice(),
                products: cart.map((product) => ({
                    title: product.title,
                    postid: product._id,
                    price: product.price,
                })),
            },
        });
    };

    const handleRemove = (id)=>{
        try{
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === id);
            if(index !== -1){
                myCart.splice(index,1);
                setCart(myCart);
                localStorage.setItem("cart",JSON.stringify(myCart));
            }
        }
        catch(error){
            // console.log(error);
            toast.error(error);
        }
    }

    const totalPrice = ()=>{
        try{
            return cart
                    .reduce((total, item) => total + item.price, 0)
                    .toLocaleString("en-US",{
                        style : "currency",
                        currency: "USD",
                    });
        }
        catch(error){
            // console.log(error);
            toast.error(error);
            return "$0.00";
        }
    }

    return(
        <div className="d-flex flex-column flex-lg-row w-100 gap-3 bg-light pr-3">
        {/* Left Side - product Details */}
            <div className="cart-product-details">
                <h2 className="cart-heading">Your Cart</h2>
                {
                    cart?.length > 0 ? (
                        cart.map((product)=>{
                            console.log("Product Details : ",product);
                            return(
                                <div
                                    key = {product._id}
                                    className="cart-item"
                                >
                                    {/* Remove Button */}
                                    <button
                                        onClick={()=> handleRemove(product._id)}
                                        className="cart-delete-btn"
                                    >
                                        <FaTrashAlt size={20} />
                                    </button>

                                    {/* Product Image */}
                                    <img 
                                        src={product?.images[0]}
                                        alt={product?.title}
                                        className="cart-image"
                                    />

                                    {/* Product Info */}
                                    <div className="d-flex flex-column">
                                        <h3 className="product-title">{product?.title}</h3>
                                        <p className="product-description">{product.description.substring(0,50)}...</p>
                                    </div>

                                    {/* Product Price */}
                                    <div className="product-price">
                                        ${product?.price}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="d-flex align-items-center justify-content-center">
                            <h3 className="font-Raleway">Your Cart is Empty</h3>
                        </div>
                    )
                }
            </div>

            {/* Right Side - Price Summary */}
            <div className="cart-price-summary">
                <h2 className="price-details-heading">Price Details</h2>
                {cart.length>0 ? (
                    <>
                        <div className="d-flex flex-column gap-4">
                            {cart.map((product) => (
                                <div 
                                    key={product?._id}
                                    className="each-product"
                                >
                                    <span>{product?.title}</span>
                                    <span className="fw-semibold">${product?.price}</span>
                                </div>
                            ))}
                        </div>
                        <hr className="divider"/>  
                        <div className="cart-summary-row">
                            <span>Total:{" "}</span>
                            <span>{totalPrice()}</span>
                        </div>
                        {auth?.token ? (
                            <button
                                className="cart-checkout-btn"
                                onClick={handleCheckIn}
                            >
                                Proceed to CheckOut
                            </button>
                        ):(
                            <button 
                                className="cart-checkout-btn"
                                onClick={()=> navigate("/login")}
                            >
                                Please Login
                            </button>
                        )}
                    </>
                ) : (
                    <>
                        <div className="d-flex align-items-center justify-content-center">
                            <h3 className="font-Raleway">No items to display.</h3>
                        </div>
                    </>
                )}
            </div>

        </div>
    )
}

export default CartPage; 