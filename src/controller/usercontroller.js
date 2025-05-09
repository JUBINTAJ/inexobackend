import asyncHandler from "../middlewares/asynchandler.js";
import { userRegister ,loginUser, refreshAccessTokenService } from "../service/userservice.js";
import { STATUS } from "../utils/constand.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";



export const regiseterUser=asyncHandler(async(req,res)=>{
    
    const data=req.body;
    
    const createuser=await userRegister(data)
    res.status(201).json({
        status:STATUS.SUCCESS,
        message:`user registered successfully`,
        user:{
            id:createuser._id,
            username:createuser.username,
            email:createuser.email,
            password:createuser.password,
            role:createuser.role
        }
    })
    
})


export const userLogin=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    const user=await loginUser(email,password)

    const accessToken  = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user) 

    res
       .cookie('accessToken',accessToken,{httpOnly : true , secure: true  ,sameSite: 'None', maxAge : 3 * 24 * 60 * 60 * 1000 , path:'/'})
       .cookie('refreshToken',refreshToken ,{httpOnly :true , secure : true ,sameSite: 'None', maxAge : 7 * 24 * 60 * 60 * 1000})
        
       .status(200).json({
        status : STATUS.SUCCESS,
        message:'user Logged in Successfull',
        user :{
            id :user._id,
            username:user.username,
            email:user.email,
            role:user.role
        },accessToken,
        // refreshToken


       })
    })



 export const refreshToken=asyncHandler(async(req,res)=>{
    const { refreshToken } = req.cookies;

    const {newAccessToken }=await refreshAccessTokenService(refreshToken)
      res
      .cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: false,
        maxAge: 15 * 60 * 1000,
      })
      .status(200)
      .json({
        status: STATUS.SUCCESS,
        message: "Access token refereshed",
      });
  });
 
  
export const logout =asyncHandler(async(req,res)=>{
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: '/'
    });
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: '/'
    });
  
    res.status(200).json({ message: 'Logged out successfully' });
})  


