const express = require('express')
const app = express()
const cors = require('cors')


const connectDB = require('./config/db')

// db
connectDB();

// init middleware
app.use(express.json({  extended: true }))
app.use(cors())

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})