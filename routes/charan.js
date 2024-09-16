import express from 'express'
import dotenv from 'dotenv'
import Signup from '../models/Signup.js'
import { verifyCharan } from '../middlewares/authMiddleware.js'
import Friend from '../models/Friend.js'
import SearchData from '../models/SearchData.js'
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

charan.get('/get_search_data',verifyCharan ,async (req , res)=>{
    var search = await SearchData.find().lean();
    res.render("charan" ,{
        search : search 
    });
});





export default charan