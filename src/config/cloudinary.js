import dotenv from 'dotenv'
import multer from 'multer'
import {v2 as cloudinary } from 'cloudinary'
import{CloudinaryStorage} from 'multer-storage-cloudinary'


dotenv.config()

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})


const storage=new CloudinaryStorage({
    cloudinary,
    params:{
        folder:'products',
        allowedFormats:['jpg','jpeg','png','webp']
    }
})

const upload=multer({storage})
export  {cloudinary,upload} 