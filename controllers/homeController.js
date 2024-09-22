import jwt from 'jsonwebtoken';
import { get_name_by_email } from '../staticobjects/dataf.js';

export const getHome = (req, res) => {
    if (req.cookies.rkvbros) {
        jwt.verify(req.cookies.rkvbros, process.env.TOKEN_BRO, (err, decoded) => {
            if (err) {
                console.error("JWT Verification Error:", err.message);
                return res.status(401).send("Invalid token");
            }
            
            req.session.email = decoded.email;
            req.session.name = get_name_by_email(decoded.email);
            res.render("home", { email: req.session.email , isYou : req.session.email });
        });
    } else {
        res.render("login");
    }
};
