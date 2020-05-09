const User = require('../model/userModel')


const getProfile = async (req, res, next) => {
    try {
      const {id} = req.cookies.mycookie.user
      const user = await User.findById({ _id: id }).select('-password').select('-verificationCode')
      res.json(user)
    } catch (err) {
      console.log(err.message)
    }
  }

  module.exports = getProfile