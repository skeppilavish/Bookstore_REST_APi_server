const mongoose=require('mongoose');
const validator=require('validator');


//Creating schema for book
const buyerSchema= new mongoose.Schema({
    Book_id:{
        type:String,
        unique:true,
        required: true,
        trim: true
    },
    payment_id: {
        type:String,
        required: true,
        trim: true
    },
    price:{
        type:Number,
        required: true,
        trim: true
    }},
    {
        timestamps: true
    })


const buy=mongoose.model('Buy',bookSchema) //Creating Buy model and a collection for it in database named buy
module.exports=Buy;