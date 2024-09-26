require('dotenv').config()

const express=require('express')

const cors =require('cors')

// import connection file
require('./db/connection')


// import router
 const router =require('./routes/router')

// create server app
const server =express()

// to store port number
const PORT = 3200

// use cors express.json and router in server app
server.use(cors())
server.use(express.json())
  server.use(router)


// run app
server.listen(PORT,()=>{
  console.log(`foodapp server started at port ${PORT}`);
})
