import UserModel from '../models/User.js';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

export const registerController = async(request,response)=>{
    try{
        const {name,email,password} = request.body;
        if(!email || !password){
            return response.status(400).json({
                error : "Please fill all the required details"
            })
        };

        const user = await UserModel.findOne({email});
        if(user){
            return response.status(400).json({
                error : "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new UserModel({
            name,
            email,
            password : hashedPassword
        });
        await newUser.save();

        return response.status(200).send({
            success: true,
            message : "User has been registered",
        })
    }
    catch(error){
        // console.log(error);
        return response.status(500).send({
            success : false,
            message: "Problem in register API",
        })
    }
}



// Login--->

export const loginController = async(request,response)=>{
    try{
        const {email, password} = request.body;
        if(!email || !password){
            return response.status(400).json({
                error: "All fields are required"
            })
        }

        const user = await UserModel.findOne({email})
        if(!user){
            return response.status(400).json({
                error: "Invalid user details"
            })
        }

        const isMatched = await bcrypt.compare(password,user.password);
        if(!isMatched){
            return response.status(400).json({
                error: "Invalid password",
            });
        }

        const jwtToken = JWT.sign({id: user._id}, process.env.JWT_SECRET,{
            expiresIn: "7d",
        })
        
        return response.status(200).send({
            success: true,
            message: "Login successful",
            jwtToken,
            user : {
                id : user._id,
                email : user.email,
                name : user.name,
                role: user.role,
            }
        })
    }
    catch (error){
        // console.log(error);
        return response.status(500).send({
            success : false,
            message: "Problem in login API. Please try again.",
        });
    }
};