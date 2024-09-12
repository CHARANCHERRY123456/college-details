import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Signup from '../models/Signup.js';
import nodemailer from 'nodemailer';

const tokenSecret = process.env.TOKEN_SECRET || "this_is_a_secret";

export const signup = async (req, res) => {
  const { password, cpassword, account_type, email } = req.body;

  if (password !== cpassword) return res.render("signup");

  try {
    // const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Signup.findOneAndUpdate(
      { email },
      {
        $set: {
          email,
          password: password,
          account_type: Boolean(account_type)
        }
      },
      { new: true, upsert: true }
    );
    res.render("login");
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).send("Something went wrong during signup");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Signup.findOne({ email });
    if (!user) return res.status(400).send("User does not exist");
    const isMatch =    password ==  user.password
    // const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");

    const token = jwt.sign({ email }, tokenSecret, { expiresIn: '30d' });
    // user.token = token;
    await user.save();

    res.cookie('rkvbros', token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.render("home", { isYou: email });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Something went wrong during login");
  }
};

export const sendOtp = (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
  req.session.otp = otp;
  req.session.email = email;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Your OTP for Signup',
    text: `Your OTP is from the RKVBros is : ${otp}`
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error("OTP send error:", error);
      res.json({ success: false, message: 'Error sending OTP' });
    } else {
      res.json({ success: true, message: 'OTP sent successfully!' });
    }
  });
};

export const verifyOtp = (req, res) => {
  const { otp } = req.body;
  if (req.session.otp === parseInt(otp, 10)) {
    res.json({ success: true, message: 'OTP verified! Signup successful.' });
  } else {
    res.json({ success: false, message: 'Invalid OTP. Please try again.' });
  }
};
