import MobileNavBar from "../MobileNavBar/MobileNavBar";
import Navbar from "../Navbar/Navbar";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useBook } from "../../../context/Booking";
import "./YourOrder.css"
import { useAuth } from "../../../context/UserContext";
import { useEffect } from "react";
import { useState } from "react";

const YourOrder = ()=>{
    const [book, setBook] = useBook();
    const [auth,setAuth] = useAuth();
    // const [currentOrders, setCurrentOrders] = useState([]);
    const navigate = useNavigate();
    // console.log("Book : ",book);

    useEffect(()=>{
        const fetchApi = async ()=>{
            try{
                const response = await axios.get(
                            `${import.meta.env.VITE_BASE_URL}/api/order/current-orders`,
                            {
                                headers : {
                                    Authorization : `Bearer ${auth?.token}`
                                }
                            }
                        );
                // console.log("Current Booked Orders : ",response.data.filteredOrders);
                // setCurrentOrders(response?.data?.filteredOrders);
            }
            catch(error){
                // console.error("Error while fetching current Orders : ",error);
                toast.error(error);

            }

        }
        fetchApi();
    },[])

    

    const handleCheckOut = async (orderId, postId) => {
        try{
            // console.log("PostId : ",postId[0]?._id);
            // Filter out the completed order
            const updateBooking = book.filter((item) => item.postId !== postId);
            setBook(updateBooking);

            await axios.patch(
                `${import.meta.env.VITE_BASE_URL}/api/payment/update-availability`,
                {
                    postId : [postId[0]?._id],
                    isAvailable: true,
                }
            );
            toast.success("Order completed and room is now available again!");
            navigate("/thank-you");
        }
        catch(error){
            // console.log("Error : ",error);
            // console.error("Error during checkout: ",error.message);
            toast.error("Failed to complete the order. Please try again.");
        }
    };

    return(
        <div className="orders-container">
            <div className="d-none d-md-block">
                <Navbar />
            </div>
            <div className="d-md-none mt-2 ms-3 mobile-navbar">
                <MobileNavBar />
            </div>
            <div className="orders-content">
                {book && Array.isArray(book) && book.length>0 ? (
                    book.map((order,index)=> (
                        <div key={index} className="order-card">
                            <h1 className="order-title">Order: {order?.title}</h1>
                            <div className="order-details">
                                <p>
                                    <span className="label">Customer:</span> {order?.name}
                                </p>
                                <p>
                                    <span className="label">Price:</span> ${order?.price}
                                </p>
                            </div>
                            <div className="order-actions">
                                <button 
                                    className="checkout-btn"
                                    onClick={() => handleCheckOut(order?._id, order?.postId)}
                                >
                                    <FaShoppingCart />
                                    <span>checkout</span>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-orders">No orders found</p>
                )}
            </div>
        </div>
    )
}

export default YourOrder;