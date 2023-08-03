const express=require('express'); //Acquiring express
require('./mongoose') //Acquiring database through mongoose
const userR=require('./routers/users') //acquiring router for users
const bookR=require('./routers/books') //acquiring router for books

const app=express(); // initializing express app
const port= 3000; //Defining port
app.use(express.json())


app.use(userR)
app.use(bookR)



//Starting express server on 3000 port
app.listen(port,()=>{
    console.log('Server is up on port: '+ port)
})