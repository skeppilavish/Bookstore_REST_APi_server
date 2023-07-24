const mongoose=require('mongoose');

const connectionURL='mongodb://localhost:27017/';

mongoose.connect(connectionURL).then(()=>{
    console.log('Database connect hoogya')
}).catch(()=>{
    console.log('Error:Nahi hua connect')
})