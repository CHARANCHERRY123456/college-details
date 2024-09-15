import express from 'express'
import dotenv from 'dotenv'
import Signup from '../models/Signup.js'
import { verifyCharan } from '../middlewares/authMiddleware.js'
import Friend from '../models/Friend.js'
dotenv.config()

const charan = express.Router()


charan.get('/get_users',verifyCharan ,async (req , res)=>{
    var users = await Signup.find().lean();
    res.render("charan" ,{
        users : users
    });
});

charan.get('/get_friends',verifyCharan ,async (req , res)=>{
    var friends = await Friend.find().lean();
    res.render("charan" ,{
        friends : friends
    });
});

// charan.get('/get_friends',verifyCharan ,async (req , res)=>{
//     var users = await Friend.find().lean();
//     res.render("get_users" ,{
//         users : users
//     });
// });





export default charan