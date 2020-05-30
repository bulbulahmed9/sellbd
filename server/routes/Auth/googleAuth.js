
const passport = require('passport')
const jwt = require('jsonwebtoken')

module.exports = app => {
  app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));


  app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {

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