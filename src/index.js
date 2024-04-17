//require('dotenv').config({path:'./env'})
import dotenv from "dotenv"

import { mongoose } from "mongoose";
import {DB_NAME} from "./constants.js"
import connectDB from "./bd/index.js";

connectDB()

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