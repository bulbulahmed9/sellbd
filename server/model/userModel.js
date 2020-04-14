const mongoose = require('mongoose')

// User Schema
const userSchema = new mongoose.Schema({
    userId: String,
    name: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        trim: true,
        // unique: true
    },
    password: {
        type: String,
    },
    // advertisements: {

    // }
}, { timestamps: true })



module.exports = mongoose.model('User', userSchema)