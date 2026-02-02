import axios from "axios";
import { useEffect } from "react";
import "./Activities.css"
import { useAuth } from "../../context/UserContext";
import { useState } from "react";
import notFound from "/assets/not-found.jpg";

// console.log("Activities : ",activities);

function Activities() {
    const [auth, setAuth] = useAuth();
    const [activities, setActivities] = useState([]);
    // console.log("Auth from Activity : ",auth);
    useEffect(() => {
        const fetchActivities = async () => {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/order/get-all-orders`, {
                params: {
                    user_id: auth?.user?.id,
                }
            });
            const activityData = response?.data?.userActivity ? [...response.data.userActivity] : [];
            setActivities(activityData);
        }

        fetchActivities();
    }, [])

    const formatDate = (isoString) => {
        const date = new Date(isoString);

        const day = date.getDate();
        const month = date.toLocaleString("default", { month: "short" });
        const year = date.getFullYear();

        const suffix =
            day % 10 === 1 && day !== 11
                ? "st"
                : day % 10 === 2 && day !== 12
                    ? "nd"
                    : day % 10 === 3 && day !== 13
                        ? "rd"
                        : "th";

        const formattedDate = `${day}${suffix} ${month} ${year}`;
        if (formattedDate === "NaNth Invalid Date NaN") {
            return "NA";
        }
        return formattedDate;
    }



    return (
        <div className="activities-container">
            <h1 className="activityVacation-heading">Your Vacations</h1>
            {activities.length > 0 ? (
                <div className="your-orders">
                    {activities.map(item =>
                        <div
                            className="single-order"
                            key={item.postId}
                        >
                            <p className="name">Ordered By : {item.name}</p>
                            <p className="item-details">Order : {item.title}</p>
                            <p className="item-details">Amount Paid: ${item.price}</p>
                            <p className="item-details">Date of Order : {formatDate(item.date)}</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="notFound-container">
                    <img src={notFound} alt="cannot load image" className="notFound-image" />
                    <h1
                        className="no-orders"
                    >Oops! Orders found</h1>
                </div>
            )}
        </div>
    )

}

export default Activities;