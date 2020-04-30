
const auth = (req, res, next) => {
  try {
    const cookie = req.cookies.mycookie
    if(!cookie){
      return res.json({
        success: false,
        msg: 'Authorization Denied'
      })
    }
    req.user = cookie.user
    next()
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = auth
