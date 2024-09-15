import jwt from 'jsonwebtoken';

const tokenSecret = process.env.TOKEN_SECRET || 'this_is_a_secret';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.rkvbros;
  if (!token) return res.status(403).send("No token provided");

  jwt.verify(token, tokenSecret, (err, decoded) => {
    if (err) return res.status(401).send("Invalid token");

    req.session.user = decoded;
    next();
  });
};

export const verifyCharan = (req, res, next) => {
  const token = req.cookies.rkvbros;
  if (!token) return res.status(403).send("No token provided");

  jwt.verify(token, tokenSecret, (err, decoded) => {
    if (err) return res.status(401).send("Invalid token");
    if(decoded.email == "rr200589@rguktrkv.ac.in") 
    next();
  });
};
