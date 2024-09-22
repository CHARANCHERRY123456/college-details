import Signup from '../models/Signup.js';

export const signup = async (req, res) => {
    const { password, cpassword, account_type } = req.body;

    if (password !== cpassword) return res.render("signup");

    try {
        const newUser = await Signup.findOneAndUpdate(
            { email: req.session.email },
            {
                $set: {
                    email: req.session.email,
                    password,
                    account_type: Boolean(account_type),
                },
            },
            { new: true, upsert: true }
        );

        console.log("New user added:", newUser);
        res.render("login");
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).send("Something went wrong during signup");
    }
};
