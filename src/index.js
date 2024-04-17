//require('dotenv').config({path:'./env'})
import dotenv from "dotenv"

import { mongoose } from "mongoose";
import {DB_NAME} from "./constants.js"
import connectDB from "./bd/index.js";

dotenv.config({
    path:'./env'
})

connectDB()  //helps to connect db
.then(()=>{  //server starts working
    application.listen(process.env.PORT ||8000, ()=>{
        console.log(`Server is running at port: ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed !!!", err);
})



































/*import express from 'express'
const app = express()

(async ()=>{
    try{
        await Mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("ERR: ",error);
            throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on port ${process.env.PORT}`);
        })
    }
})*/