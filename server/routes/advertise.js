const router = require('express').Router()

const Advertise = require('../model/advertise')

const passport = require('passport')

const auth = require('../middleware/auth')

const sendEmail = require('../utils/index')

router.post('/user/post', async (req, res) => {
    try {
        const userId = req.user.id
        advertise = new Advertise({
            user: userId,
            text: req.body.text
        })
        await advertise.save();
        res.send("advertise successfull")
    } catch (error) {
        console.log(error.message)
    }
})

router.get('/user/post', auth,   async (req, res) => {
    // console.log(`requested user id ${req.user.id}`)
    try {
        const userId = req.user.id
        const advertise = await Advertise.find({ user: userId })
        console.log(advertise.length)
        res.json({ advertise })
        console.log(req.user)
    } catch (error) {
        console.log(error.message)
    }
})

// router.get('/test', async (req, res) => {
//     try {
//         await sendEmail()
//         res.send('success')
//     } catch (err) {
//         console.log(err.message)
//     }
// })

module.exports = router