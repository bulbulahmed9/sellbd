const mongoose = require('mongoose')

// User Schema
const userSchema = new mongoose.Schema({
    userId: String,
    logByOauth: {
        type: Boolean,
        default: false
    },
    provider: String,
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true
    },
    password: {
        type: String,
    },
    phone: {
        type: Number,
        trim: true,
        default: null
    }
}, { timestamps: true })



module.exports = mongoose.model('User', userSchema)