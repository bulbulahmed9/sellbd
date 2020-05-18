const User = require('../model/userModel')


// get user profile
const getProfile = async (req, res, next) => {
    try {
        const { id } = req.user
        const user = await User.findById(id).select('-password').select('-verificationCode')
        res.json(user)
    } catch (err) {
        console.log(err.message)
    }
}

// update user phone
const updatePhone = async (req, res) => {
    try {
        const { id } = req.user
        const { phone } = req.body
        if (!phone) {
            return res.json({
                msg: 'please provide a phone number'
            })
        }

        const user = await User.findById(id)
        user.phone = phone;
        await user.save();
        res.status(201).json({
            msg: 'Phone updated'
        })
    } catch (err) {
        console.log(err.message)
    }
}

// update user profile



module.exports = { getProfile, updatePhone }