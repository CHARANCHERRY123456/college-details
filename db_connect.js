import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()
mongoose.connect(process.env.COMPASS_URI)
.then(()=>{console.log("mongoose connected don't worry")})
.catch(()=>{console.log("sorry bro please check once db not connected");})


