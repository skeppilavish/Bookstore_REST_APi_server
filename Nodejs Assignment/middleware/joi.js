const Joi = require('joi')

const signUpSchema=Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    name: Joi.string().min(1).required()
})
const loginSchema= Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required()
})
const bookSchema=Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    price: Joi.number().required(),
    stock: Joi.number().required(),
    genre: Joi.string().required()
})



module.exports=loginSchema
module.exports=signUpSchema
module.exports=bookSchema