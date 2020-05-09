const router = require('express').Router()

const auth = require('../middleware/auth')

const getProfile = require('../controllers/profileController')

// route get /api/user/profile
// desc get user profile
// access // private

router.get('/api/user/profile',auth, getProfile)


module.exports = router;