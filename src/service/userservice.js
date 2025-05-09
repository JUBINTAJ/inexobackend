import bcrypt from 'bcrypt'
import User from '../model/usermodel.js'
import CustomError from '../utils/customeror.js'
import { generateAccessToken, verifyToken } from '../utils/jwt.js'


export const userRegister=async(data)=>{
    const {username,email,password}=data

    const userExists=await User.findOne({email})
    if(userExists){
        throw new CustomError("user already exists",400)
    }
    const newuser=new User({
        username,
        email,
        password,
    })
    const saveduser=await newuser.save()
    return saveduser;
}




export const loginUser=async (email,password)=>{
    const userData =await User.findOne({email,password})
    if(!userData){
        throw new CustomError("Please register ",400)
    }
    return userData
}


export const refreshAccessTokenService=async(refreshToken)=>{

    if(!refreshToken){
         throw new CustomError("Refresh token missing",401)
    }
    const decoded=verifyToken(refreshToken,process.env.JWT_REFRESH_SECRET)
    
    if(!decoded){
        throw new CustomError("Invalid or expired refresh token", 403)
    }
    const user=await User.findById(decoded.id)
    if(!user){
        throw new CustomError("User not found",404)
    }
    const newAccessToken=generateAccessToken(user)
    return {newAccessToken}
  }


