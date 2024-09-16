import mongoose from "mongoose";
const EmailRequestSchema = new mongoose.Schema({
  email: { type: String, required: true, unique:true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
});

const EmailRequest = mongoose.model('EmailRequest', EmailRequestSchema);

export default EmailRequest