
const passport = require('passport')
const jwt = require('jsonwebtoken')

module.exports = app => {
  app.get('/auth/facebook',
    passport.authenticate('facebook'));


  app.get('/auth/facebook/callback', passport.authenticate('facebook'), (req, res) => {

    const payload = {
      user: {
        id: req.user.id
      }
    };
    const token = jwt.sign({
      payload
    }, process.env.jwtSecret, { expiresIn: '7d' });
    res.clearCookie('mycookie')
    res.cookie('mycookie', token)
    res.redirect(`${process.env.clientURL}`)
  })
}