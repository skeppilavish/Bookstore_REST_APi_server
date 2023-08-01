//Routers for book

const express=require('express')
const Book=require('../models/books') //Acquiring book model
const auth=require('../middleware/auth') //Acquiring auth
const bookSchema=require('../middleware/joi')
const router= new express.Router();
const request= require("postman-request");
const { bool, string } = require('joi');
const logger= require('../models/log.js')

// GET route for gettting all books in the bookstore(Admin and Customer)
router.get('/books', async (req,res)=>{
    const limit =2;
    let page = Number(req.query.page) - 1 || 0;
    try{
        const pageCount = Math.floor((await Book.countDocuments({}) + 1)/limit);
        if(pageCount < page + 1 )
        {
            throw new Error("Total number of pages :" + pageCount + ". Take page lower than that")
        }
        const booksData = await Book.find().sort({title: 'asc'}).limit(limit).skip(limit*page);
        if(!booksData.length)
        {
            res.send("No books data found.");
        }
        res.send({booksData, "Page Number": page + 1, "Total Pages": pageCount});
    }
    catch(error){
        res.status(404).send("Invalid Request => " + error.message);
    }
})

//POST route for adding books(Admin only)
router.post('/books',auth,async (req,res)=>{
    const book=new Book(req.body)
    const {err,value}=bookSchema.validate(req.body)

    if(err){
        return res.status(404).send(err.message)
    }

    if(req.role==='customer'){
        return res.status(404).send('You cannot perform this operation.')
    }
    try{
        await book.save()
        res.status(200).send(book)
    }catch(e){
        res.status(404).send(e.message)
    }
})


//GET route for getting a book by ID
router.get('/books/:id', async (req,res)=>{
    const _id=req.params.id
    if(req.role==='customer'){
        return res.status(404).send('Customer cannot perform this operation. Only Admin can edit')
    }
    try{
        const book= await Book.findById(_id)
        if(book===null)
        {
            res.status(201).send("Such book is not available")
        }
        console.log("Book:", book)
        res.status(200).send(book)
    }catch(e){
        console.log(e)
        res.status(404).send("Fill correct id of book")
        logger.warn(" in Get book by id", e.message)
    }
})


//PUT route for updating any specific book... Accesible to admin only
router.put('/books/:id',auth,async(req,res)=>{
    const _id=req.params.id
    if(req.role==='customer'){
        return res.status(404).send('Customer cannot perform this operation.')
    }
    try{
        const book= await Book.findByIdAndUpdate(_id,req.body)
        res.status(200).send('Updated Successfully.')

    }catch(e){
        res.status(404).send(e.message)
    }
})

// create new api for buy book
//     - add book price in db.
//     - check if book is in db.
//     - check inventory.
//     - call external api for payment.
//     - on success return payment number.


router.post('/buy/book/:id', auth,async(req,res)=>{

    console.log("still on")
try{
    const book= await Book.findById(req.params.id)
    logger.info(book)
    
    if(book===null )
    {

        res.status(200).send("Wrong id")
    }
    else if(book.stock<=0){
        logger.info("Not Available in stock")
        res.status(200).send("Book is not availabe in the stock")
    } 
    else{
        var holded=book.stock;
        logger.info("in buy book else condition")
        try{
            book.stock=book.stock-1; // book stock updated
            logger.info(" at line 117 done:", book.stock)
            
            const options = {
                url: 'https://stoplight.io/mocks/skeps/book-store:master/12094368/misc/payment/process', // Replace with the actual API URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the appropriate Content-Type header for your API
                },
               body:(JSON.stringify(req.body))
            };
            //const body= JSON.stringify(req.body) 


            console.log("Entered by us:",req.body)
            console.log("2nd body you requested: ", options.body)
            request(options, async (error,response,body)=>{

                //console.log("try:",response)
                if(error)
                    {
                        logger.error(error.message)
                        // console.log("blhh")
                        res.send(error.message)
                        
                    }
                    else if(!response.body)
                    {
                        console.log("response", response.body);
                        //console.log("ft")
                        
                        logger.info("Wrong Details of card")
                        res.send("Fill correct Details")
                    }
                    // else if(response)
                    // {
                    //     res.send("Wrong Api call. Check your api", error)
                    // }
                    else{
                        if(response.body===undefined)
                        {
                            logger.error("Not able to get body from api")
                        }
                        logger.info("Done")
                        // console.log("jhjh",body)// same to response.body
                        res.send(response.body)
                        logger.info("after complete transaction -> bookid:", book.id ,"and payment id:", body )
                    } 
                console.log("to check stock beforeeee updating holder:", holded)
                holded=book.stock;  
                logger.info("to check stock after updating holder:", holded)
                //await book.save()
                logger.info("Saved")
            })
        }catch(e){
            book.stock=holded;
            // logger.error("Something went wrong. In catch of buy book Error: ", e)
            console.log("last catch",e)
            res.status(400).send(e)
        
            }
        }}
    catch(e)
    {
        //console.log("Error of id:", e.message)
        logger.warn("Wrong book id", e)
        res.status(200).send("Wrong id of book")
    }
})


//DELETE route for deleting a book(Only admin)
router.delete('/books/:id',auth,async(req,res)=>{
    const _id=req.params.id
    if(req.role==='customer'){
        return res.status(404).send('Only Admin have access of this.')
    }
    try{
        const book= await Book.findByIdAndDelete(_id)
        res.status(200).send('Deleted Successfully.')
    }catch(e){
        logger.error(e.message," at last step or line 187")
        res.status(404).send(e.message)
    }
})


module.exports=router;