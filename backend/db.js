// import mongoose from "mongoose";
const mongoose = require("mongoose");
const csv = require('csvtojson');
const User = require('./models/user');
// import dotenv from 'dotenv';
const dotenv = require("dotenv")
dotenv.config()
mongoose.connect(process.env.COMPASS_URI)
.then(()=>{console.log("mongoose connected don't worry")})
.catch(()=>{console.log("sorry bro please check once db not connected");})

// const csvFilePath = '../r20_section_rank.csv';

// async function importCSVtoDB() {
//     try {
//         // Step 1: Convert CSV to JSON array
//         const jsonArray = await csv().fromFile(csvFilePath);

//         // Step 2: Insert JSON data into MongoDB using the User schema
//         await User.insertMany(jsonArray);
//         console.log('CSV data successfully imported to MongoDB.');
//     } catch (error) {
//         console.error('Error importing CSV data:', error);
//     } finally {
//         // Close the MongoDB connection
//         mongoose.connection.close();
//     }
// }

// // Run the import function
// importCSVtoDB();
