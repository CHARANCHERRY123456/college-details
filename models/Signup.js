import mongoose from 'mongoose';

const SignupSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  account_type: { type: Boolean, default: false },
  token: { type: String }
});

const Signup = mongoose.model("Signup", SignupSchema);
export default Signup;
