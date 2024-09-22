import jwt from 'jsonwebtoken';
import Signup from '../models/Signup.js';
import transporter  from '../config/nodemailer.js'; // Assuming nodemailer config is placed here
import { get_name_by_email } from '../staticobjects/dataf.js';

export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const user = await Signup.findOne({ email });
        if (!user) {
            return res.status(400).send("User does not exist");
        }

        const isMatch = password === user.password;
        if (!isMatch) {
            return res.status(400).send("Invalid credentials");
        }

        const token = jwt.sign({ email }, process.env.TOKEN_BRO, { expiresIn: "30d" });
        user.token = token;
        await user.save();
        res.cookie('rkvbros', token, {
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            httpOnly: true
        });

        req.session.email = email;
        res.render("home", { isYou: email });
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong in login");
    }
};

export const sendOtp = (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);
    req.session.otp = otp;
    req.session.email = email;

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Your OTP for Signup',
        text: `Your OTP is: ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.json({ success: false, message: 'Error sending OTP' });
        } else {
            res.json({ success: true, message: 'OTP sent successfully!' });
        }
    });
};

export const verifyOtp = (req, res) => {
    const { otp } = req.body;

    if (req.session.otp && req.session.otp == otp) {
        res.json({ success: true, message: 'OTP verified! Signup successful.' });
    } else {
        res.json({ success: false, message: 'Invalid OTP. Please try again.' });
    }
};


