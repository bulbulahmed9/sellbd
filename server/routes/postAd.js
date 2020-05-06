const router = require('express').Router()
const auth = require('../middleware/auth')
const postAdController = require('../controllers/postAd')
const postAd = require('../model/postAd')
const upload = require('../utils/multer')

// route post /api/postad
// desc post a advertise
// access private

router.post('/api/postad', auth, upload.array('image'), postAdController)

router.get('/api/data', auth, async (req, res) => {
    try {
        const result = await postAd.find({ category: "ss", subCategory: "photo" })
        res.send(result)
    } catch (err) {
        console.log(err.message);
        
    }
})



module.exports = router