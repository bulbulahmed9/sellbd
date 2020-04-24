const jwt = require("jsonwebtoken");

require('dotenv').config();

const auth = (req, res, next) => {
  const token = req.cookies.mycookie
  if (!token) {
    return res.send("Authorization Denied")
  }
  const decoded = jwt.verify(token, `${process.env.jwtSecret}`);
    req.user = decoded.user
  next()
}

module.exports = auth

// module.exports = function(req, res, next) {
//   // get token from header
//   const token = req.header("x-auth-token");

//   // Check if not token
//   if (!token) {
//     return res.status(401).json({ msg: "No token, authorization denied" });
//   }

//   // Verify Token
//   try {
//     const decoded = jwt.verify(token, `${process.env.secret}`);
//     req.user = decoded.user;
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: "Token is not valid" });
//   }
// };