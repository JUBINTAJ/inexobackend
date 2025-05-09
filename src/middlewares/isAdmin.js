import CustomError from "../utils/customeror.js"
import asyncHandler from "./asynchandler.js"


const isAdmin=asyncHandler((req,res,next)=>{

    if(req.user && req.user.role === "admin"){
        next()
    }else{
        throw new CustomError("Access denied.Admin only",403)
    }
})

export default isAdmin