const mongoose=require('mongoose');
//const Sentry=require('Sentry')
const connectionURL='mongodb://localhost:27017/';

mongoose.connect(connectionURL).then(()=>{
    console.log('Database connect hoogya')
}).catch((error)=>{
    // Sentry.
    console.log('Error:Nahi hua connect')
   
})

