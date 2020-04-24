const mongoose = require('mongoose')

// User Schema
const testSchema = new mongoose.Schema({
    username: String,
    password: String
}, { timestamps: true })


module.exports = mongoose.model('Test', testSchema)