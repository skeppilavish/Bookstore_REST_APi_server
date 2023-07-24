const mongoose=require('mongoose');
const validator=require('validator');


//Creating schema for book
const bookSchema= new mongoose.Schema({
    title:{
        type:String,
        unique:true,
        required: true,
        trim: true
    },
    author:{
        type:String,
        required: true,
        trim: true
    },
    genre:{
        type:String,
        required: true,
        trim: true
    },
    price:{
        type:Number,
        required: true,
        trim: true
    },
    stock:{
        type:Number,
        required: true,
        trim: true
    }},
    {
        timestamps: true
    })


const Book=mongoose.model('Books',bookSchema) //Creating Book model and a collection for it in database named books
module.exports=Book;