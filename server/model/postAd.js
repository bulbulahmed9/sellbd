const mongoose = require('mongoose')

const postAdSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {
        type: String,
        
    },
    subCategory: {
        type: String,
        
    },
    image: [
        {
            type: String,
            
        }
    ],
    condition: {
        type: String,
        
    },
    title: {
        type: String,
        
    },
    description: {
        type: String,
        
    },
    price: {
        type: Number,
        
    },
    isNegotiable: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('PostAd', postAdSchema)