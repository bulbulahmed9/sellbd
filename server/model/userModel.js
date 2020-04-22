const mongoose = require('mongoose')

// User Schema
const userSchema = new mongoose.Schema({
    provider: String,
    googleId: String,
    googleEmail: {
        type: String,
        trim: true
    },
    facebookId: String,
    facebookEmail: {
        type: String,
        trim: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String,
    },
    phone: {
        type: Number,
        trim: true,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: String
    },
    advertises: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Advertise'
        }
    ]
}, { timestamps: true })


module.exports = mongoose.model('User', userSchema)