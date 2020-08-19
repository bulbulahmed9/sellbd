const router = require('express').Router()
const auth = require('../middleware/auth')
const { postAd, getAllAds, getAdById, getAllAdsByUser, relatedAds, deleteAdById } = require('../controllers/advertiseController')
const upload = require('../utils/multer')

// @ route post: /api/postad
// @ desc post a advertise
// @ access private

router.post('/api/postad', auth, upload.array('image'), postAd)


// @ route post: /api/ads
// @ desc get all advertise depends on pagination, filtering, search
// @ access public

router.post('/api/ads', getAllAds)

// @ route get: /api/ads/:id
// @ desc get single ad by id
// @ access public

router.get('/api/ads/:id', getAdById)

// @ route get: /api/user/ads
// @ desc get user all ads
// @ access private

router.get('/api/user/ads',auth,  getAllAdsByUser)


// @ route post: /api/user/relatedads
// @ desc get user all ads based on title
// @ access public

router.post('/api/user/relatedads', relatedAds)


// delete ad by id
router.delete('/api/ads/:id',  deleteAdById)


module.exports = router