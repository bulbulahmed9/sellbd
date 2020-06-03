const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const passport = require("passport");
const cookieParser = require('cookie-parser')
require('dotenv').config()


// connect DB
const connectDB = require('./config/db')
connectDB();


// init middleware
app.use(cookieParser());
app.use(express.json({ extended: true }))
app.use(cors())
app.use(morgan('dev'))

// initialize passport for OAuth
app.use(passport.initialize());
app.use(passport.session())
require('./services/googleStrategy')
require('./services/facebookStrategy')



// routes for oAuth
require('./routes/Auth/googleAuth')(app)
require('./routes/Auth/facebookAuth')(app)



// general route 
app.use('/', require('./routes/Auth/localAuth'))
app.use('/', require('./routes/advertiseRoute'))
app.use('/', require('./routes/profileRoute'))

// Error Handling Middleware
app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        msg: error.message
    })
})

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Start the Server
const PORT = process.env.PORT || 5000


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})