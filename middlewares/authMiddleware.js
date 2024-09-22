import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.rkvbros;
  if (!token) {
    return res.status(403).send('Token not provided');
  }

  jwt.verify(token, process.env.TOKEN_BRO, (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid token');
    }
    console.log("decoded.emal == " , decoded.email);

    req.user = decoded;
    next();
  });
};

export const verifyCharan = (req, res, next) => {
  const token = req.cookies.rkvbros;
  if (!token) {
    return res.status(403).send('Token not provided');
  }

  jwt.verify(token, process.env.TOKEN_BRO, (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid token');
    }
    if(decoded.email != "rr200589@rguktrkv.ac.in"){
      return
    }

    req.user = decoded;
    next();
  });
};
