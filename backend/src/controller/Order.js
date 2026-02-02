import Order from "../models/Order.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const createOrderController = async (request, response) => {
    try{
        const {
            user_id,
            postId,
            title,
            customerName,
            amount,
            date,
        } = request.body;

        if(!user_id || !customerName || !amount || !date){
            return response.status(400).json({
                success : false,
                message : "All fields are required",
                error : error.message,
            });
        }

        if(postId.length === 0){
            response.status(400).json({
                success : false,
                message : "Atleast one post should be selected.",
                error : error.message,
            });
        }

        const postedData = new Order({
            userId: user_id,
            postId,
            title,
            name : customerName,
            price : amount,
            date
        });

        await postedData.save();

        return response.status(200).send({
            success: true,
            message: "Order Successful",
        });

    }
    catch(error){
        // console.log(error);  //debugging
        return response.status(500).send({
            success: false,
            message : "Error while creating the order.",
            error,
        });
    }
}

export const getAllOrdersController = async (request, response) => {
    try {
        
        const user_id = request.query.user_id;
        // console.log(user_id);
        if(!user_id){
            return response.status(400).json({
                success: false,
                message : "Invalid User.",
                error,
            });
        }

        const userActivity = await Order.find({userId : user_id});
        // console.log("User Activity: ",userActivity);
        if(!userActivity){
            return response.status(404).send({
                success: false,
                message: "No Orders found",
            });
        }

        return response.status(200).send({
            success : true,
            message : "Orders fetched successfully.",
            userActivity,
        });

    } catch (error) {
        response.status(500).send({
            success : true,
            message : "Cannot fetch the Orders Data",
            error,
        })
    }
}

export const currentOrdersController = async (request , response) => {
    try {
        const authHeader = request.headers.authorization;
        
        if(!authHeader){
            return response.status(400).json({
                success : false,
                error : "Token Not found."
            })
        }

        const jwtToken = authHeader.split(" ")[1];
        console.log("JWT token : ",jwtToken);

        let decoded;
        try {
            decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
        } catch (error) {
            // console.log(error);
            return response.status(400).send({
                success : false,
                error : "Invalid access token."
            })
        }

        const userId = decoded?.id;

        const userExists = await User.findById(userId);

        // Check whether the user exists or not
        if(!userExists){
            return response.status(404).json({
                error : "User not found"
            });
        }

        const userOrders = await Order.find({userId : userId})
                                            .populate({
                                                path : "postId",
                                                model : "Post",
                                                match : {isAvailable : false},
                                                select : "title price hotelLocation images isAvailable"
                                            });
        
        if(!userOrders || userOrders.length===0){
            return response.status(404).send({
                message : "No orders found"
            })
        }

        const filteredOrders = userOrders.filter((order) => order.postId.length>0);
        // console.log("Filtered Orders : ",filteredOrders);
        return response.status(200).send({
            success : true,
            message : "Current Orders fetched",
            filteredOrders
        });

    } catch (error) {
        return response.status(500).send({
            success: false,
            message: "Error while creating order.",
            error,
        });
    }
}
