const express = require('express')
const router = require('express-promise-router')()

const userController = require('../controllers/user')


// desc : User sign up
// Route : /signup
// Access : public
router.post('/signup', userController.signUp)


// desc : User sign In
// Route : /signin
// Access : public
router.post('/signin', userController.signIn)

// secret
router.get('/secret', userController.secret)

module.exports = router