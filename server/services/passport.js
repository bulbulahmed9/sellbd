const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config()
const User = require('../model/userModel')


// passport.serializeUser((user, done) => {
//     done(null, user.id)
// })

// passport.deserializeUser((id, done) => {
//     User.findById(id).then(user => {
//         done(null, user)
//     })
// })

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user)
    })
})

passport.use(new GoogleStrategy({
    clientID: process.env.googleClientId,
    clientSecret: process.env.googleClientSecret,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log("profile", profile)
    User.findOne({ googleId: profile.id })
        .then(user => {
            if(user){
                done(null, user)
            } else{
                new User({
                    googleId: profile.id
                }).save()
                .then(user => {
                    done(null, user)
                })
            }
        })
        
  }
));