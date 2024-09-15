import * as dfd from 'danfojs-node';
import express from 'express'
import bodyParser  from "body-parser";
import path from 'path';
import { fileURLToPath } from "url";
import session from 'express-session';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import './db_connect.js'
import Signup from './models/Signup.js';
import charan from './routes/charan.js';
import Friend from './models/Friend.js';
dotenv.config();
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
// mongoose.connect(process.env.ATLAS_URI)
//   .then(() => {
//     console.log('Connected to MongoDB successfully!');
//   })
//   .catch((err) => {
//     console.error('Error connecting to MongoDB:', err);
//   });
// const SignupSchema = new mongoose.Schema({
//     email : String,
//     password : String,
//     account_type : Boolean,
//     token : String
// });
// const Signup = new mongoose.model("Signup" , SignupSchema);
// const FriendsSchame = new mongoose.Schema({
//     email : {
//        type:  String,
//     }
// })
// const Friend = new mongoose.model("Friend" , FriendsSchame);
const SearchDataSchema = new mongoose.Schema({
    person : String,
    searched_for : [String]
});
const SearchData = new mongoose.model("SearchData" , SearchDataSchema );
const __dirname = path.dirname(__filename);
const token_bro = process.env.TOKEN_BRO; 
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine' , 'ejs' );
app.use(cookieParser());
app.use("/charan"  , charan)
app.set("views" , path.join(__dirname , "/templates"));
app.use(express.static(path.join(__dirname , "/public")));
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
}));
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
});


let df = {};
async function oorke(req , res){
    df = await dfd.readCSV("the_data_with_rank.csv");
    // df['NAME'].print();
    df['NAME'] = df['NAME'].values.map(String);// Convert the 'NAME' column to an array of strings
}
await oorke();

export function get_name_by_email(email){
    return (df.query(df['EMAIL'].eq(email))['NAME'].values[0]);
}

app.get('/', async (req, res) => {
    if (req.cookies.rkvbros) {
        jwt.verify(req.cookies.rkvbros, token_bro, (err, decoded) => {
            if (err) {
                console.log("JWT Verification Error:", err.message);
                return res.status(401).send("Invalid token");
            }
            console.log(decoded.email);
            req.session.email = decoded.email;
            req.session.name = get_name_by_email(decoded.email);
            console.log(req.session.name);

            res.redirect('/home')
        });
    } else {
        res.render("login");
    }
});

app.get('/take_details', (req, res) => {
    res.render("take_details");
});

app.post("/take_details" ,async (req , res)=>{
    const {password , cpassword,account_type} = req.body; 
    if(password != cpassword) return res.render("signup");
    // const singup_id = singup_email.replace(/\D/g, '');
    // const hashedPassword = await bycryptjs.hash(password, 10);
    try {
        const new_friend = await Signup.findOneAndUpdate(
            { email : singup_email },
            {$set : {
                email : singup_email,
                password : password,
                account_type : Boolean(account_type),
            }},
            { new: true, upsert: true } 
            );

        console.log("new User is added "  ,new_friend );
        // if (user){
        //     // user.password = password;
        //     // return res.render("login");
        //     return res.send("User Already Exists")
        // }
        // else{
        //     const data = {
        //         email : singup_email,
        //         password : password,
        //         account_type : Boolean(account_type)
        //     };
        //     console.log(data);
        //     await Signup.insertMany([data]);
            res.render("login");
        // }
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong during signup");
    }
});
app.get("/home" , (req , res)=>{
    console.log("ented into the home");
    if (req.cookies.rkvbros) {
        jwt.verify(req.cookies.rkvbros, token_bro, (err, decoded) => {
            if (err) {
                console.log("JWT Verification Error:", err.message);
                return res.status(401).send("Invalid token");
            }
            console.log(req.session.email);
            res.render("home" , {
                email : req.session.email
            });
        });
    } else {
        res.render("login");
    }
})

app.post("/add_friend", async (req, res) => {
    try {
        const { email } = req.body; // Extract email from req.body

        // Use findOneAndUpdate to either update the friend if they exist or create a new one
        const updatedFriend = await Friend.findOneAndUpdate(
            { email: email }, // Search criteria: find by email
            { $set: { email: email } }, // Update email (even though it's redundant here)
            { new: true, upsert: true } // Create the document if it doesn't exist
        );

        console.log("Friend added or updated:", updatedFriend);
    } catch (error) {
        console.error("Error adding or updating the Friend:", error); // Log the error
    } finally {
        res.redirect("/home"); // Always redirect to /home
    }
});



app.post("/login" , async(req , res)=>{
    var {email , password }  = req.body;
    try{
        const user = await Signup.findOne({ email : email});
        if (!user) {
            return res.status(400).send("User does not exist");
        }   
        const isMatch = (password == user.password);
        // const isMatch = await bycryptjs.compare(password , user.password);
        if (!isMatch) {
            return res.status(400).send("Invalid credentials");
        };
        req.session.email = email;
        const token = jwt.sign(
            { email: email },
            token_bro,
            { expiresIn: "30d" } // Set token to expire in 30 days
            );
        user.token = token;
        const updated_user = await user.save();
        res.cookie('rkvbros', token, {
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            httpOnly: true
        });        
        res.render("home" , {
            isYou : email
        })
    }catch(err){
        console.log(err);
        res.status(500).send("Something went wrong in login");
    }
});

var singup_email = undefined;
app.post('/send-otp', (req, res) => {
    const { email } = req.body;
    singup_email = email;
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
    // Store OTP in session
    req.session.otp = otp;
    req.session.email = email;

    // Send OTP email
    console.log("an email is sent to the " , email , "opt is " , otp);
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Your OTP for Signup',
        text: `This is a messaage from the RKVBros . Your OTP is: ${otp}`
    };
    // return res.json({ success: true, message: 'OTP sent successfully!' });
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.json({ success: false, message: 'Error sending OTP' });
        } else {
            res.json({ success: true, message: 'OTP sent successfully!(also check in spam)' });
        }
    });
});

app.post('/verify-otp', (req, res) => {
    const { otp } = req.body;
    if (req.session.otp && req.session.otp == otp) {
        res.json({ success: true, message: 'OTP verified! Signup successful.' });
    } else {
        res.json({ success: false, message: 'Invalid OTP. Please try again.' });
    }
});

app.get('/signup' , (req , res)=>{
    res.render("signup");
});












app.get('/search', (req, res) => {
    const query = req.query.name.toUpperCase();
    const filteredNames = df.values.filter(row => row[1].includes(query)).map(row => row[1]);
    const suggestions = {
        "names" : filteredNames
    }
    res.json(suggestions);
});
async function update_search_history(email, NAME){
    try{
        await SearchData.findOneAndUpdate(
            {person : email},
            {$push : {searched_for : NAME}},
            {new : true , upsert : true}
        )
    }catch{
        console.log("error in updating the name");
    }
}
app.get("/get_id" ,async (req , res)=>{
    const NAME = req.query.name;
    // Updating the search history
    update_search_history(req.session.name , NAME);
    const sid_row = df.query(df['NAME'].eq(NAME));
    if(!sid_row) return res.json({success : false});
    const email = sid_row? sid_row['EMAIL'].values[0]: undefined;
    // if(id == undefined) return json({success:false});
    var json_df = dfd.toJSON(sid_row, { format: 'row' });
    try{
        const bros = await Friend.findOne({
            email : req.session.email
        });
        const user = await Signup.findOne({
            email : req.session.email
        });
        if(!user) return res.json({success : false});
        const account_type = user.account_type;
        if(bros || req.session.email == email){
            return res.json(json_df)
        }
        else res.json({
            success : false
        });
    }catch{
        console.log("error Finding the friend");
    }
    // const session_email = req.session.email;
    // const actual_digits = id.replace(/\D/g, '');
    // const session_digits = session_email.replace(/\D/g, '');
    // if(actual_digits == session_digits) res.json(json_df);
    // else res.json({
    //     success : false
    // });
});

app.listen(port, () => {
    console.log('Server is running on port ' , port);
});
