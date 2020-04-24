
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

          jwt.sign(
            payload,
            `${process.env.jwtSecret}`,
            { expiresIn: 360000 },
            (err, token) => {
              if (err) throw err;
              res.cookie('mycookie', token)
              res.json({ token });
            }
          );
        // res.send('success')
    })

    app.get('/api/currentUser', (req, res) => {
        console.log(req.user)
        res.send(req.user)
    })

    app.get('/api/logout', (req, res) => {
        // req.logout()
        // res.redirect('/')
        console.log('logout seccess')
        res.clearCookie('mycookie')
        res.send('logout success')
    })

}