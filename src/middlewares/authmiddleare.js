import CustomError from '../utils/customeror.js'
import User from '../model/usermodel.js'
import { verifyToken } from '../utils/jwt.js'

const authenticate=async(req,res,next)=>{
    try{
        const token=req.cookies.accessToken
        
        if(!token){
            throw new CustomError("Access token is missing",401)
        }
        const decoded=verifyToken(token,process.env.JWT_SECRET)
        if(!decoded){
            throw new CustomError("invalid or expired acces token",403)
        }
        const user=await User.findById(decoded.id)
        if(!user){
            throw new CustomError('user not found',404)
        }
        req.user=user
        next()
    }catch(err){
        console.log('err',err)
        next(err)
    }
}

export default authenticate