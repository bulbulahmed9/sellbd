const router = require('express').Router()
const auth = require('../middleware/auth')
const { postAd, getAllAds } = require('../controllers/advertiseController')
const upload = require('../utils/multer')

// @ route post: /api/postad
// @ desc post a advertise
// @ access private

router.post('/api/postad', auth, upload.array('image'), postAd)


// @ route get: /api/ads
// @ desc get all advertise
// @ access public

router.get('/api/ads', getAllAds)



module.exports = router