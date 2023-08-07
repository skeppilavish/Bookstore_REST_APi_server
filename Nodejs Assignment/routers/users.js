//Routers for users

const express=require('express');
const User=require('../models/users.js') //Acqiring user model
const signUpSchema=require('../middleware/joi.js')
const loginSchema=require('../middleware/joi.js')
const router= new express.Router()



//POST route for registering a user
router.post('/auth/register', async(req,res)=>{
    const user= new User(req.body)
    const {err,value}= signUpSchema.validate(req.body)
    if(err){
        return res.status(404).send(err.message)
    }
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(200).send({user,token})
    }catch(e){
        res.status(404).send(e.message)
    }
})


//POST route for login 
router.post('/auth/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        res.send({
            email: user.email,
            '_id': user._id,
            'role': user.role,
            'token': user.tokens,
            'Time to login': user.createdAt
        })
    } catch (e) {
        res.status(404).send({"message":"Fill Correct Details"})
    }
})


// //logout in a account
// router.post('/auth/logout', async (req, res) => {
//     try {
//         req.user.tokens = req.user.tokens.filter((token) => {
//             return token.token !== req.token
//         })
//         await req.user.save()

//         res.send()
//     } catch (e) {
//         res.status(500).send()
//     }
// })


module.exports=router;