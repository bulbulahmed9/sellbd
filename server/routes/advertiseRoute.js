const router = require('express').Router()
const auth = require('../middleware/auth')
const { postAd, getAllAds, getAdById, getAllAdsByUser, relatedAds } = require('../controllers/advertiseController')
const upload = require('../utils/multer')

// @ route post: /api/postad
// @ desc post a advertise
// @ access private

router.post('/api/postad', auth, upload.array('image'), postAd)


// @ route get: /api/ads
// @ desc get all advertise depends on pagination, filtering, search
// @ access public

router.get('/api/ads', getAllAds)

// @ route get: /api/ads/:id
// @ desc get single ad by id
// @ access public

router.get('/api/ads/:id', getAdById)

// @ route get: /api/user/ads
// @ desc get user all ads
// @ access private

router.get('/api/user/ads',auth,  getAllAdsByUser)


// @ route get: /api/user/relatedads
// @ desc get user all ads
// @ access private

router.get('/api/user/relatedads', relatedAds)


module.exports = router