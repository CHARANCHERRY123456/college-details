import * as dfd from 'danfojs-node';
import express from 'express'
import bodyParser  from "body-parser";
import nodemailer from 'nodemailer'
import session from 'express-session';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import './db_connect.js'
import Signup from './models/Signup.js';
import charan from './routes/charan.js';
// import requests from './requests.js';
import Friend from './models/Friend.js';
import SearchData from './models/SearchData.js';
import { verifyToken } from './middlewares/authMiddleware.js';
// import df , {get_email_by_name , get_name_by_email} from './staticobjects/dataf.js';
dotenv.config();
const app = express();
const port = 3001;
const token_bro = process.env.TOKEN_BRO; 
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine' , 'ejs' );
app.use(cookieParser());
app.use(express.static('public'));
app.use("/charan"  , charan);
// app.use("/requests" , requests);
app.use(express.static("/public"));
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
  let r20 = {};
  let r21 = {};
  async function oorke(query){
      r20 = await dfd.readCSV("r20_section_rank.csv");
      r21 = await dfd.readCSV("r21.csv");
  }
  await oorke();

//   console.log(df);
  export function get_name_by_email(email){
      return (r20.query(r20['EMAIL'].eq(email))['NAME'].values[0]);
  }
  
  export function get_email_by_name(name){
      return (r20.query(r20['NAME'].eq(name))['EMAIL'].values[0]);
  }
  
app.get("/test" , (req , res)=>{
    res.render("navbar")
})

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

app.get("/r21_girls")

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
            res.render("login");
        // }
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong during signup");
    }
});
app.get("/home" ,verifyToken , (req , res)=>{
    console.log("ented into the home");
    try{
        const {email} = req.user
        res.render("home" , {
            email : email,
            isYou : email
        });
    }catch(err){
        console.log(err.message);
        res.send("dorry not getting home");
    }
    // if (req.cookies.rkvbros) {
    //     jwt.verify(req.cookies.rkvbros, token_bro, (err, decoded) => {
    //         if (err) {
    //             console.log("JWT Verification Error:", err.message);
    //             return res.status(401).send("Invalid token");
    //         }
    //         console.log(req.session.email);
    //         res.render("home" , {
    //             email : req.session.email,
    //             isYou : req.session.eamil
    //         });
    //     });
    // } else {
    //     res.render("login");
    // }
});

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
    console.log(email , password);
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
    console.log("query =" ,req.query);
    const {batch} = req.query
    const query = req.query.name.toLocaleUpperCase();
    if(batch == "r20"){
        console.log("in the e20");
        const filteredNamesr20 = r20.values.filter(row => row[1].includes(query) || row[0].includes(query) ).map(row => [row[1],row[0] ,row[25]]);
        return res.json({"names" :filteredNamesr20});
    }
    else if(batch=="r21"){
        console.log("in r21");
        const filteredNamesr21 = r21.values.filter(row => row[1].toLocaleUpperCase().includes(query) || row[0].toLocaleUpperCase().includes(query) ).map(row => [row[0],row[1] ,row[8]]);
        console.log("for the name " ,query ,  filteredNamesr21);
        return res.json({"names" :filteredNamesr21});
    }
    var filteredNames = batch === "r20" ? filteredNamesr20 : filteredNamesr21;
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
    const {batch} = req.query;
    var NAME = req.query.name.split(',')[0];
    update_search_history(req.session.name , NAME);
    const searched_row =batch=="r20"? r20.query(r20['NAME'].eq(NAME)):r21.query(r21['NAME'].eq(NAME))
    if(!searched_row) return res.json({success : false});
    console.log("searchd rows" , searched_row);
    const email = searched_row? searched_row['EMAIL'].values[0]: undefined;
    // if(id == undefined) return json({success:false});
    var json_df = dfd.toJSON(searched_row, { format: 'row' });
    try{
        const bros = await Friend.findOne({
            email : req.session.email
        });
        const user = await Signup.findOne({
            email : req.session.email
        });
        if(bros) console.log("yes you can access everyon");
        const is_public_user =user? user.account_type:false;
        const searched_person = await Signup.findOne({
            email : email
        });
        const is_searched_person_public =searched_person? searched_person.account_type:false;

        if(!user) return res.json({success : false});
        if(req.session.email == email || bros || (is_public_user && is_searched_person_public)){
            console.log("sednting the json" , json_df);
            return res.json(json_df)
        }
        else res.json({
            success : false,
        });
    }catch(err){
        console.log(err.message);
        console.log("error Finding the friend");
    }
});

app.listen(port, () => {
    console.log('Server is running on port ' , port);
});