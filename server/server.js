const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const passport = require("passport");
const cookieSession = require('cookie-session')
require('dotenv').config()
require('./model/userModel')
require('./services/passport')

const connectDB = require('./config/db')

// connect DB
connectDB();

// init middleware
app.use(express.json({ extended: true }))
app.use(cors())
app.use(morgan('dev'))

app.use(
    cookieSession({
        maxAge:30 * 24 * 60 * 60 *1000,
        keys:[process.env.cookieKey]
    })
)

app.use(passport.initialize());
app.use(passport.session())
require("./middleware/jwt")(passport);

// routes
require('./routes/OauthRoute')(app)


//=== 4 - CONFIGURE ROUTES
//Configure Route
require('./routes/index')(app);


// Start the Server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})