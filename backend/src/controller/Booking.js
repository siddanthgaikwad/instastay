import Stripe from "stripe";
import BookingModel from "../models/Booking.js"
import Post from "../models/Post.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import mongoose from "mongoose";

const stripe = new Stripe(
    "REDACTED_STRIPE_KEY"
);

export const CreatePaymentIntentController = async (request, response)=>{
    try {
        const {amount, currency, description, customerName, customerAddress} = request.body;
        // console.log("Creating paymentIntent with : ", amount, currency,description,customerAddress,customerName);
        if(!amount || !currency || !description || !customerName || !customerAddress){
            return response.status(400).json({
                success : false,
                message: "All values are required",
            })
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount, 
            currency,
            payment_method_types : ["card"],
            description,
            shipping: {
                name: customerName,
                address: {
                    line1: customerAddress.line1,
                    city: customerAddress.city,
                    state: customerAddress.state,
                    postal_code: customerAddress.postalCode,
                    country: customerAddress.country
                },
            },
        });

        response.status(200).send({
            success: true,
            clientSecret: paymentIntent.client_secret,
        });

    } catch (error) {
        // console.error("Error creating payment Intent: ",error);
        response.status(500).json({
            success: false,
            message: "Failed to create Payment Intent",
            error: error.message,
        });
    }
};

export const updateAvailabilityController = async (request, response) => {
    const {postId, isAvailable} = request.body;
    if(!Array.isArray(postId) || postId.length === 0){
        return response.status(400).json({
            success : false,
            error : "PostId must be a non-empty array.",
        });
    }
    console.log("Post ID : ",postId);
    const isValid = postId.every((id) => mongoose.Types.ObjectId.isValid(id));
    console.log("Is Valid : ",isValid);
    if(!isValid){
        return response.status(400).json({
            success : false,
            error : "Each post Id is not valid.",
        });
    }
    console.log("Error checks");
    try {
        const post = await Post.updateMany(
            { _id : { $in : postId} },
            { $set : {isAvailable} },
            { new : true }
        );

        if(post.matchedCount === 0){
            return response.status(404).json({
                error: "No Post found."
            });
        }

        const updatedPosts = await Post.find({ _id : {$in : postId}})

        return response.status(200).send({
            success: true,
            updatedPosts,
        })

    } catch (error) {
        // console.log(error);
        response.status(500).send({
            success: false,
            error: error.message
        })
    }
};

export const createBookingController = async (request, response)=>{
    try{
        const {token, postId, bookingDate, transactionId} = request.body;
        // console.log("Parameters for create-booking: ",token,postId,bookingDate,transactionId);
        if(!token || !bookingDate || !transactionId){
            return response.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        if(!Array.isArray(postId) || postId.length===0){
            return response.status(400).json({
                success : false,
                message : "PostId must be a non empty Array.",
            });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return response.status(401).json({
                success: false,
                message: "Invalid or expired token."
            })
        }

        const userId = decoded?.id;

        const userExists = await User.findById(userId);

        // Validate user
        if(!userExists){
            return response.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Validate post
        const posts = await Post.find({ _id : {$in : postId}});
        if(!posts || posts.length===0){
            return response.status(404).json({
                success: false,
                message: "Post not found"
            })
        }

        // Create new booking
        const booking = new BookingModel({
            user: userId,
            post: postId,
            bookingDate,
            transactionId,
            paymentStatus: "paid"
        });

        const savedBooking = await booking.save();

        response.status(201).json({
            success: true,
            message: "Booking created successfully.",
            booking: savedBooking
        });

    }
    catch(error){
        // console.log("Create booking error : ",error);
        return response.status(500).send({
            success : false,
            message: "Error while creating Booking",
            error : error.message
        });
    }
}


export const getBookingsController = async (request, response) => {
    try {

        const bookings = await BookingModel.find({}).populate("user post", "name title");
        return response.status(200).json({
            success: true,
            message: "All bookings List",
            bookings
        });

    } catch (error) {
        return response.status(500).json({
            success: false,
            message: "Error while fetching booking data.",
            error: error.message
        })
    }
}

export const searchBookingsController = async (request, response) => {
    try {
        const {keyword} = request.params;

        const words = keyword.split(" ");

        // Build the query to match any word in description
        const results = await Post.find({
            $or: [
                {title: {$regex: keyword, $options: "i"}},
                {
                    description: {
                        $regex: words.join("|"), //Matches any of the words
                        $options: "i", //case-insensitive
                    },
                },
            ],
        }).select("title hotelLocation images description");

        response.json(results);

    } catch (error) {
        return response.status(500).json({
            success: false,
            message: "No Booking data found",
            error: error.message
        })
    }
}