import Joi from "joi";

export const signupvalidation = Joi.object({
    username:Joi.string().required().min(3).max(25),
    email:Joi.string().email().required(),
    password:Joi.string().required().min(8)
})

export const  loginvalidation=Joi.object({
    email : Joi.string().email().required(),
    password:Joi.string().required().min(8)
})