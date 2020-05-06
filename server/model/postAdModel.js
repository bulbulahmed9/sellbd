const mongoose = require('mongoose')

const postAdSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    images: {
        type: [],
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    isNegotiable: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('PostAd', postAdSchema)