const router = require('express').Router()

const auth = require('../middleware/auth')

const {getProfile, updatePhone} = require('../controllers/profileController')

// route get /api/user/profile
// desc get user profile
// access // private

router.get('/api/user/profile',auth, getProfile)

// route get /api/user/profile/updatePhone
// desc update user phone
// access // private

router.put('/api/user/profile/updatePhone',auth, updatePhone)


module.exports = router;