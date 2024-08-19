import csvtojson from 'csvtojson'
import mongoose, { mongo } from "mongoose";
import {MongoClient} from 'mongodb'
import dotenv from 'dotenv';
dotenv.config();

// mongoose.connect(process.env.COMPASS_URI).then(()=>{
//     console.log("mongoose connected");

// }).catch((err)=>{
//     console.log("sorry bro mongoose got an error");
// });



export async function import_csv_to_db(req , res){
    const client = new MongoClient("mongodb://0.0.0.0:27017/mydatabase");
    console.log("i am before try block");
    try{
        console.log("i am in try block");
        await client.connect();
        console.log('connected to mongodb');
    }catch(err){
        console.log(err);
        console.log("not connected to mongodb");
    }
}

import_csv_to_db()