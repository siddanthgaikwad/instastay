import "./Payment.css";
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import {toast} from "react-toastify";
import {useBook} from "../../context/Booking";
import {useAuth} from "../../context/UserContext";
import { useLocation,useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";

function Payment(){
    const stripe = useStripe();
    const elements = useElements();
    const location = useLocation();
    const [book, setBook] = useBook();
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    // console.log("Token from payment page :",auth?.token);
    // console.log("User Id from payment page : ",auth?.user?.id);
    
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState(0);
    const [titles, setTitle] = useState("");
    const [postId, setPostId] = useState([]);
    const [customerName, setCustomerName] = useState("");
    const [customerAddress, setCustomerAddress] = useState({
        line1: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
    });

    // console.log("titles : ", titles);
    // console.log("Post Id Array : ",postId);
    // console.log("Amount : ",amount);

    useEffect(() => {
        if(location?.state){

            // Set amount from either checkIn or from wishlist page

            // console.log("location.state.totalPrice",location.state.totalPrice.toString().replace(/[^0-9.]/g,""));
            // console.log("location.state.price",location.state.price);
            setAmount(location.state.price || location.state.totalPrice.toString().replace(/[^0-9.]/g,"") || 0);
            

            // Set title if from checkIn title is single if from cartPage then title is multiple so join them using ,

            const titlesFromProducts = location.state.products && location?.state?.products.map((p => p?.title)).join(", ");
            setTitle(titlesFromProducts || location.state.product);


            // Set PostId if is from the cartPage or from checkIn i.e from products component
            
            const postIdArray = location.state.products && location.state.products.map( obj => obj?.postid);
            setPostId(postIdArray || [location.state.postId]);
            
            
        }
    }, [location]);

    const handleCountryCodeConversion = (country) => {
        const countryMapping = {
            India: "IN",
        };
        return countryMapping[country] || country;
    }

    const handlePayment = async (e) => {
        e.preventDefault();

        const user_id = auth?.user?.id;
        if(!user_id){
            toast.error("Please login to proceed.");
            navigate("/login");
        }

        if(!stripe || !elements){
            toast.error("Stripe has not loaded yet. Please try again.");
            return;
        }

        if(
            !customerName || 
            !customerAddress.line1 ||
            !customerAddress.city || 
            !customerAddress.country
        ){
            toast.error("Please fill out all the required fields.");
            return;
        }

        const convertedCountry = handleCountryCodeConversion(
            customerAddress.country
        );

        setLoading(true);

        try{
            const {data} = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/payment/create-payment-intent`,
                {
                    amount: Math.round(amount*100),
                    currency: "usd",
                    description: `Payment for ${titles}`,
                    customerName,
                    customerAddress: { ...customerAddress, country: convertedCountry},
                }
            );

            const clientSecret = data.clientSecret;

            // Confirm the payment on the client;S
            const {paymentIntent, error} = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: {
                        card: elements.getElement(CardElement),
                        billing_details: {
                            name: customerName,
                            address: {
                                line1: customerAddress.line1,
                                city: customerAddress.city,
                                state: customerAddress?.state,
                                postal_code: customerAddress.postalCode,
                                country: convertedCountry,
                            },
                        },
                    },
                }
            );

            if(error){
                // console.log("Error : ",error);
                toast.error(`Payment failed: ${error.message}`);
                setLoading(false);
                return;
            }
            if(paymentIntent.status === "succeeded"){
                // After payment success, create the booking

                const bookingData = {
                    token : auth?.token,
                    postId : postId,
                    bookingDate : new Date(),
                    transactionId: paymentIntent.id,
                };
                // console.log("Booking data : ",bookingData);
                // console.log("Booking data Sent : ",bookingData);
                await axios.post(
                    `${import.meta.env.VITE_BASE_URL}/api/payment/create-booking`,
                    bookingData
                );
                const updateBooking = [
                    ...book,
                    {
                        user_id,
                        title: titles, 
                        amount, 
                        customerName, 
                        postId,
                        date: new Date(),
                    },

                ];
                

                // Update product availability
                await axios.patch(
                    `${import.meta.env.VITE_BASE_URL}/api/payment/update-availability`,
                    {
                        postId: postId,
                        isAvailable: false,
                    }
                );

                // Create order in dataBase
                await axios.post(
                    `${import.meta.env.VITE_BASE_URL}/api/order/create-order`,
                    {
                        user_id,
                        title: titles, 
                        amount, 
                        customerName, 
                        postId,
                        date: new Date(),
                    }
                )
                // console.log("Posted Order Data to Backend.");
                // console.log("Auth token for current-orders : ",auth?.token);
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/api/order/current-orders`,
                    {
                        headers : {
                            Authorization : `Bearer ${auth?.token}`
                        }
                    }
                );

                // console.log("Current Booked Orders : ",response?.data?.filteredOrders);
                const updatedData = [...response?.data?.filteredOrders];
                // console.log("Updated Array Data : ",updatedData);
                setBook(updatedData);

                // Redirect to orders
                toast.success("Payment and booking succesful.");
                navigate("/user/your-orders");
                
            }

        }
        catch(error){
            // console.error("Error processing payment:",error.message);
            toast.error("Payment failed. Please try again.");
        }
        finally{
            setLoading(false);
        }
    }
    return(
        <div className="payment-container">
            <h1 className="payment-heading">Payment</h1>

            {/* Product Info */}
            <div className="product-box">
                <h2 className="product-title">
                    Selected Hotels: {titles}
                </h2>
                <p className="product-price">
                    Price:{" "}
                    <span className="price-highlight">
                        {amount.toLocaleString("en-US",{
                            style: "currency",
                            currency: "USD",
                        })}
                    </span>
                </p>
            </div>

            <form onSubmit={handlePayment} className="payment-form">
                <div className="form-group">
                    <label htmlFor="name">
                        Full Name 
                    </label>
                    <input 
                        type="text"
                        id="name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder={auth.user?.name}
                        required
                    />
                </div>
                    <div className="form-group">
                        <label htmlFor="address">Address Line1</label>
                        <input
                            type="text"
                            id="address"
                            value={customerAddress.line1}
                            onChange={(e) => setCustomerAddress({...customerAddress, line1: e.target.value})}
                            placeholder= "Enter address"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input 
                            type="text"
                            id="city"
                            value={customerAddress.city}
                            onChange={(e)=>setCustomerAddress({...customerAddress, city: e.target.value})}
                            placeholder = "Enter city"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="state">State</label>
                        <input 
                            type="text"
                            id="state"
                            value={customerAddress.state}
                            onChange={(e)=>setCustomerAddress({...customerAddress, state: e.target.value})}
                            placeholder= "Enter State"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="postalCode">Postal Code</label>
                        <input 
                            type="text"
                            id="postalCode"
                            value={customerAddress.postalCode}
                            onChange={(e)=> setCustomerAddress({...customerAddress, postalCode: e.target.value})}
                            placeholder="Enter postal code"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="country">Country</label>
                        <input 
                            type="text"
                            id="country"
                            value={customerAddress.country}
                            onChange={(e)=> setCustomerAddress({...customerAddress, country: e.target.value})}
                            placeholder="Enter country (e.g., India)"
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="card">Card Details</label>
                        <CardElement id="card" className="card-element" />
                    </div>

                    <button 
                        type="submit"
                        disabled={!stripe || loading}
                        className={`submit-btn ${loading ? "btn-disabled" : ""}` }
                    >
                        {loading ? "Processing..." : "Pay Now"}
                    </button>
                
            </form>
        </div>
    )
};

export default Payment;