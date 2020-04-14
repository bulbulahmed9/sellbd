const mongoose = require('mongoose')

// User Schema
const userSchema = new mongoose.Schema({
    googleId: String
    // name: {
    //     type: String,
    //     trim: true,
    //     required: true
    // },
    // email: {
    //     type: String,
    //     trim: true,
    //     required: true,
    //     unique: true
    // },
    // password: {
    //     type: String,
    // },
    // photo: {
    //     type: String,
    //     required: true,
    //     default:
    //         "https://res.cloudinary.com/geekysrm/image/upload/v1542221619/default-user.png"
    // }
    // advertisements: {

    // }
}, { timestamps: true })



module.exports = mongoose.model('User', userSchema)