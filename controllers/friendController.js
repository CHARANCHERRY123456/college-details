import Friend from '../models/Friend.js';

export const addOrUpdateFriend = async (req, res) => {
    const { email } = req.body;
    try {
        const updatedFriend = await Friend.findOneAndUpdate(
            { email },
            { $set: { email } },
            { new: true, upsert: true }
        );

        console.log("Friend added or updated:", updatedFriend);
        res.redirect("/home");
    } catch (error) {
        console.error("Error adding/updating friend:", error);
        res.status(500).send("Error while adding or updating friend");
    }
};
