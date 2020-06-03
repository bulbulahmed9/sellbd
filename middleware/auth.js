const jwt = require('jsonwebtoken')
require('dotenv').config()

const auth = (req, res, next) => {
  // get token from header 
  const token = req.header('x-auth-token')
  // check if not token
  if(!token){
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  // verify token 
  try {
    const decoded = jwt.verify(token, process.env.jwtSecret)
    req.user = decoded.payload.user
    next()
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
}

module.exports = auth
