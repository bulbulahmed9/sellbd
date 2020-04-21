
const passport = require('passport')

module.exports = app => {
    app.get('/auth/google',
        passport.authenticate('google', { scope: ['profile', 'email'] }));

    app.get('/auth/facebook',
        passport.authenticate('facebook', { scope: ['email',] }));

    app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
        res.redirect('/profile')
    })

    app.get('/auth/facebook/callback', passport.authenticate('facebook'), (req, res) => {
        res.redirect('/profile')
    })


    app.get('/api/currentUser', (req, res) => {
        res.send(req.user)
    })

    app.get('/api/logout', (req, res) => {
        req.logout()
        res.redirect('/')
    })

}