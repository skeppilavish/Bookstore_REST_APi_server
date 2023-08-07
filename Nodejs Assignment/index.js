const express=require('express'); //Acquiring express
require('./mongoose') //Acquiring database through mongoose
const userR=require('./routers/users') //acquiring router for users
const bookR=require('./routers/books') //acquiring router for books
const path = require('path')
const bodyParser= require ('body-parser');
const cors = require ("cors");
 

const app=express(); // initializing express app
const port= 3000; //Defining port
app.use(express.json())

//console.log(__dirname)
//const viewPath= path.join(__dirname,'./views')
//app.set("views", viewPath)

app.use(userR)
app.use(bookR)

 
const publicDirectorypath= path.join(__dirname,'public')
app.use(express.static(publicDirectorypath))

//console.log(viewPath)
console.log(publicDirectorypath)

//Starting express server on 3000 port
app.listen(port,()=>{
    console.log('Server is up on port: '+ port)
})