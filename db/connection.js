// define mongodb connection
const mongoose =require('mongoose')

const DB =process.env.DATABASE

mongoose.connect(DB,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log('mondodb Atlas connected successfully..');
}).catch((err)=>{
    console.log(err);
})
