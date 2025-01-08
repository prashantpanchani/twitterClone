import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (uid,res)=>{
    const token = jwt.sign({uid},process.env.JWT_SECRET,{
        expiresIn: '7d'
    })
    res.cookie("jwt",token,{
        maxAge: 7*24*60*60*1000, //7days in mili seconds
        httpOnly: true,  //prevent xss attack cross site scripting attack
        sameSite: "strict",  //csrf attack cross site request forgery attack
        secure: process.env.NODE_ENV !== 'development' //cookie will only be sent in production
    })
} 