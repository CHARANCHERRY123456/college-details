import mongoose from 'mongoose';

// Define the schema for a Friend
const friendSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,  // Ensures email is unique
        trim: true,    // Trims any leading/trailing spaces
        lowercase: true // Converts the email to lowercase before saving
    },
    addedAt: {
        type: Date,
        default: Date.now // Automatically sets the date when a friend is added
    }
});

// Create and export the Friend model
const Friend = mongoose.model('Friend', friendSchema);
export default Friend;
