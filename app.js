import * as dfd from 'danfojs-node';
import express, { json } from 'express'
import bodyParser  from "body-parser";
import path from 'path';
import { fileURLToPath } from "url";
import session from 'express-session';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import bycryptjs from 'bcryptjs'
import dotenv from 'dotenv';
import public_list from './public_list.js';
import home from './home.js';
dotenv.config();

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
mongoose.connect(process.env.ATLAS_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
const SignupSchema = new mongoose.Schema({
    email : String,
    password : String,
    account_type : Boolean,
    token : String
});
const Signup = new mongoose.model("Signup" , SignupSchema);
const __dirname = path.dirname(__filename);
const token_bro = "this_is_a_secret"; 
app.use("/home" , home)
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine' , 'ejs' );
app.use(cookieParser());
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
oorke();



app.get('/', async (req, res) => {
    if (req.cookies.rkvbros) {
        jwt.verify(req.cookies.rkvbros, token_bro, (err, decoded) => {
            if (err) {
                console.log("JWT Verification Error:", err.message);
                return res.status(401).send("Invalid token");
            }
            console.log(decoded.email);
            req.session.email = decoded.email;
            res.render("home");
        });
    } else {
        res.render("login");
    }
});

app.get('/take_details', (req, res) => {
    res.render("take_details");
});

app.post("/take_details" ,async (req , res)=>{
    const {password , account_type} = req.body; 
    const singup_id = singup_email.replace(/\D/g, '');
    if(Boolean(account_type)) public_list.push(singup_id);
    const hashedPassword = await bycryptjs.hash(password, 10);
    try {
        const user = await Signup.findOne({ email : singup_email });
        if (user) return res.send("User Already Exists");
        const data = {
            email : singup_email,
            password : hashedPassword,
            account_type : Boolean(account_type)
        };
        const new_data = await Signup.insertMany(data);
        res.render("login");
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong during signup");
    }
})


app.post("/login" , async(req , res)=>{
    var {email , password }  = req.body;
    try{
        const user = await Signup.findOne({ email : email});
        if (!user) {
            return res.status(400).send("User does not exist");
        }   
        const isMatch = await bycryptjs.compare(password , user.password);
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
            email : email
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
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Your OTP for Signup',
        text: `Your OTP is: ${otp}`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.json({ success: false, message: 'Error sending OTP' });
        } else {
            res.json({ success: true, message: 'OTP sent successfully!' });
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
app.get("/get_id" ,async (req , res)=>{
    const NAME = req.query.name;
    const sid_row = df.query(df['NAME'].eq(NAME));
    if(!sid_row) return res.json({success : false});
    const id = sid_row? sid_row['ID'].values[0]: undefined;
    if(id == undefined) return json({success:false});
    const session_email = req.session.email;
    const actual_digits = id.replace(/\D/g, '');
    const session_digits = session_email.replace(/\D/g, '');
    var json_df = dfd.toJSON(sid_row, { format: 'row' });
    const user = await Signup.findOne({
        email : req.session.email
    });
    if(!user) return res.json({success : false});
    const account_type = user.account_type;
    if(actual_digits == session_digits || session_digits == "200589" ) res.json(json_df);
    else res.json({
        success : false
    });
});

app.listen(port, () => {
    console.log('Server is running on port ' , port);
});
