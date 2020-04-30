
const passport = require('passport')
require('dotenv').config()

module.exports = app => {
    app.get('/auth/facebook',
        passport.authenticate('facebook'));


    app.get('/auth/facebook/callback', passport.authenticate('facebook'), (req, res) => {

      const payload = {
        user: {
          id: req.user.id
        }
      };
      res.clearCookie('mycookie')
      res.cookie('mycookie', payload, { maxAge: 900000 })
      res.send('login success');
    })
}