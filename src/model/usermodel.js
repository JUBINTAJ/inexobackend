import mongoose from "mongoose";



const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },email:{
        type:String,
        required:true
    },password:{
        type:String,
        required:true
    },role:{
        type:String,
        enum:['employee','admin'],
        default:'employee'
    },isBlocked:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

const User=mongoose.model('user',userSchema)
export default User;



