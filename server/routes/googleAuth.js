
const passport = require('passport')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = app => {
    app.get('/auth/google',
        passport.authenticate('google', { scope: ['profile', 'email'] }));


    app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {

        console.log(`Hello ${req.user}`)
        
        console.log(`Hello ${req.user.id}`)

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

    app.get('/api/currentUser', (req, res) => {
        res.send(req.user)
    })

    app.get('/api/logout', (req, res) => {
        req.logout()
        res.redirect('/')
        console.log('logout seccess')
    })

}