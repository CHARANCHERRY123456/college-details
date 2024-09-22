// import User from '../models/User.js';  // Assuming User is the user model
import User from '../models/Signup.js'
import jwt from 'jsonwebtoken';

// Fetch user profile based on JWT token
export const getUserProfile = async (req, res) => {
    try {
        const token = req.cookies.rkvbros;
        if (!token) return res.status(401).send("No token provided");

        jwt.verify(token, process.env.TOKEN_BRO, async (err, decoded) => {
            if (err) {
                return res.status(401).send("Invalid token");
            }

            const user = await User.findOne({ email: decoded.email });
            if (!user) {
                return res.status(404).send("User not found");
            }

            res.render("profile", { user });
        });
    } catch (err) {
        console.error("Error fetching user profile:", err);
        res.status(500).send("Something went wrong while fetching profile");
    }
};

// Update user details (name, password, account_type, etc.)
export const updateUserDetails = async (req, res) => {
    const { name, password, account_type } = req.body;

    try {
        const token = req.cookies.rkvbros;
        if (!token) return res.status(401).send("No token provided");

        jwt.verify(token, process.env.TOKEN_BRO, async (err, decoded) => {
            if (err) return res.status(401).send("Invalid token");

            const updatedUser = await User.findOneAndUpdate(
                { email: decoded.email },
                {
                    $set: {
                        name: name || req.session.name,
                        password: password || req.session.password,
                        account_type: account_type !== undefined ? account_type : req.session.account_type,
                    }
                },
                { new: true }
            );

            req.session.name = updatedUser.name;
            req.session.account_type = updatedUser.account_type;
            console.log("User updated:", updatedUser);
            res.redirect("/profile");
        });
    } catch (err) {
        console.error("Error updating user details:", err);
        res.status(500).send("Something went wrong while updating user details");
    }
};

// Delete user (optional)
export const deleteUser = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOneAndDelete({ email });
        if (!user) {
            return res.status(404).send("User not found");
        }
        console.log("User deleted:", user);
        res.json({ success: true, message: "User deleted successfully" });
    } catch (err) {
        console.error("Error deleting user:", err);
        res.status(500).send("Something went wrong while deleting user");
    }
};
