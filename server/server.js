const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const passport = require("passport");
require('dotenv').config()

const connectDB = require('./config/db')

// connect DB
connectDB();

// init middleware
app.use(express.json({ extended: true }))
app.use(cors())
app.use(morgan('dev'))
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/users', require('./routes/user') )


// Start the Server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})