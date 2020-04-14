const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config()
const User = require('../model/userModel')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    })
})

passport.use(new GoogleStrategy({
    clientID: process.env.googleClientId,
    clientSecret: process.env.googleClientSecret,
    callbackURL: "/auth/google/callback"
},
    async (accessToken, refreshToken, profile, done) =>  {
        console.log("profile", profile)
        // User.findOne(profile.email)
        //     .then(user => {
        //         if (user) {
        //             return done(null, user)
        //         } else {
        //             new User({
        //                 googleId: profile.id,
        //                 email: profile.emails[0].value
        //             }).save()
        //                 .then(user => {
        //                     done(null, user)
        //                 })
        //         }
        //     })
        try {
            const user = await User.findOne( { googleId: profile.id } );
      
            if (user) {
              return done(null, user);
            }
          } catch (err) {
            console.log(err);
          }
      
          try {
            const newUser = await new User({            
              googleId: profile.id,
              email: profile.emails[0].value
            }).save();
            done(null, newUser);
          } catch (err) {
            console.log(err);
          }
    }
));