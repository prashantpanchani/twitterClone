import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';

export const protectRoute = async (req, res, next) => {
    try{
        const token  = req.cookies.jwt;
        if(!token){
            return res.status(401).json({message: "Unauthorized Access"});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({message: "invalid token"});
        }
        const user = await User.findById(decoded.uid).select("-password");
        if(!user){
            return res.status(401).json({message: "User not found"});
        }
        req.user = user;
        next();
    }catch(error){
        console.log("Error while protecting route",error.message);
        res.status(500).json({message: "Internal server error while protecting route"});
    }
}
