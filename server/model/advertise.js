const mongoose = require('mongoose')


const advertiseSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text: String

})

module.exports = mongoose.model('Advertise', advertiseSchema)