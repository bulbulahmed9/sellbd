const mongoose = require('mongoose')

// advertise schema
const advertiseSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    division: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    images: {
        type: [],
        required: true
    },
    category: {
        type: String,
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
}, { timestamps: true })

// Indexing

advertiseSchema.index({ division: 1, area: 1, category: 1, title: 1, price: 1 });

module.exports = mongoose.model('Advertise', advertiseSchema)