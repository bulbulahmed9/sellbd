const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        
        await mongoose.connect(`mongodb+srv://${process.env.dbUsername}:${process.env.dbPassword}@cluster0-iishs.mongodb.net/test?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log("Database connected")
    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}

module.exports = connectDB;