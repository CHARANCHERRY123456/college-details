import Friend from '../models/friendModel.js'; // Import the Friend model

// Add or update friend logic
export const addFriend = async (req, res) => {
    try {
        const { email } = req.body; // Extract email from request body

        // Use findOneAndUpdate to either update or insert a new document
        const updatedFriend = await Friend.findOneAndUpdate(
            { email: email }, // Search criteria
            { $set: { email: email } }, // Data to update
            { new: true, upsert: true } // Create if doesn't exist
        );

        console.log("Friend added or updated:", updatedFriend);
        return res.redirect("/home"); // Redirect to home after updating
    } catch (error) {
        console.error("Error adding or updating friend:", error); // Log error
        return res.status(500).send("Something went wrong while adding friend");
    }
};
