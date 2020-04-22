
const passport = require('passport')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const auth = require('../middleware/auth')

module.exports = app => {
    app.get('/auth/facebook',
        passport.authenticate('facebook'));


    app.get('/auth/facebook/callback', passport.authenticate('facebook'), (req, res) => {

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
                res.json({ token });
              }
        )
        console.log(payload)
        // res.redirect('/profile')
    })

    // app.get('/api/currentUser', auth, (req, res) => {
    //     console.log(req.user)
    //     res.send(req.user)
    // })

    // app.get('/api/logout', (req, res) => {
    //     req.logout()
    //     res.redirect('/')
    //     console.log('logout seccess')
    // })

}