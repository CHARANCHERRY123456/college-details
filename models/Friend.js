import mongoose from 'mongoose';

const FriendSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }
});

const Friend = mongoose.model("Friend", FriendSchema);
export default Friend;
