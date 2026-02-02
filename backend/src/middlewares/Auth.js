import jwt from "jsonwebtoken"
import User from '../models/User.js'

// Product route  based on token

export const requireSignIn = async (request, response, next)=>{
    try{
        const authHeader = request.headers.authorization;
        // console.log("Authorization Header : ",authHeader);

        if(!authHeader){
            return response.status(401).send({
                success: false,
                message: "Authorization header is missing"
            });
        } 

        // Support for both "Bearer <token> and token without Bearer prefix"
        const token = authHeader.startsWith("Bearer ")
                ? authHeader.split(" ")[1]
                : authHeader;
        if(!token){
            return response.status(401).send({
                success : false,
                message: "no token provided"
            });
        }

        const decode = jwt.verify(token,
            process.env.JWT_SECRET
        );
        // console.log("Decoded Token Object : ",decode);
        if(!decode._id && !decode.id){
            return response.status(401).send({
                success: false,
                message: "Token does not contain user ID"
            });
        }

        request.user = decode;
        next();
    }
    catch(error){
        // console.log("JWT verification error: ",error.message);
        return response.status(401).send({
            success: false,
            message : "invalid or expired token",
        });
    }
}

export const isAdmin = async(request, response, next)=>{
    try{
        const userId = request.user?._id || request.user?.id;
        // console.log("User ID from token: ",userId);
        if(!userId){
            return response.status(401).send({
                success: false, 
                message: "No user ID found in token"
            });
        }
        const user = await User.findById(userId);
        if(!user){
            return response.status(404).send({
                success : false,
                message: "User not found in database"
            });
        }
        // console.log("User from Database : ", user);
        if(user?.role !== "admin"){
            return response.status(401).send({
                success: false,
                message: "Unauthorized Access",
            });
        }
        
        next();
        
    }
    catch(error){
        // console.log("Error in admin middleware: ",error);
        response.status(401).send({
            success: false,
            message: "Error in admin middleware",
        });
    }
};