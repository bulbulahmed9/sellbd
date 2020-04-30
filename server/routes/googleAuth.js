
const passport = require('passport')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const auth = require('../middleware/auth')

module.exports = app => {
    app.get('/auth/google',
        passport.authenticate('google', { scope: ['profile', 'email'] }));


    app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {

        const payload = {
            user: {
              id: req.user.id
            }
          };
          res.clearCookie('mycookie')
          res.cookie('mycookie', payload, { maxAge: 9000000 })
          res.send('login success');
    })
}