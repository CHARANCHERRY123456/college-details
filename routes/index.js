import { verifyToken } from "../middlewares/authMiddleware";

app.get('/', verifyToken ,  async (req, res) => {
    if (req.cookies.rkvbros) {
        jwt.verify(req.cookies.rkvbros, token_bro, (err, decoded) => {
            if (err) {
                console.log("JWT Verification Error:", err.message);
                return res.status(401).send("Invalid token");
            }
            console.log(decoded.email);
            req.session.email = decoded.email;
            req.session.name = get_name_by_email(decoded.email);
            console.log(req.session.name);

            res.redirect('/home')
        });
    } else {
        res.render("login");
    }
});