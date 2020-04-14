const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
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


// Google Strategy

passport.use(new GoogleStrategy({
    clientID: process.env.googleClientId,
    clientSecret: process.env.googleClientSecret,
    callbackURL: "/auth/google/callback"
},
    async (accessToken, refreshToken, profile, done) =>  {
        console.log("profile", profile)
        try {
            const user = await User.findOne( { userId: profile.id } );
      
            if (user) {
              return done(null, user);
            }
          } catch (err) {
            console.log(err);
          }
      
          try {
            const newUser = await new User({            
              userId: profile.id,
              email: profile.emails[0].value
            }).save();
            done(null, newUser);
          } catch (err) {
            console.log(err);
          }
    }
));


// Facebook Strategy

passport.use(new FacebookStrategy({
  clientID: 1016171375445204,
  clientSecret: "0e22d5f1f6a1c1dc5e9253d3046313db",
  callbackURL: "/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'photos', 'email', 'birthday']
},
async (accessToken, refreshToken, profile, done) =>  {
  console.log("profile", profile)
  try {
      const user = await User.findOne( { userId: profile.id } );

      if (user) {
        return done(null, user);
      }
    } catch (err) {
      console.log(err);
    }

    try {
      const newUser = await new User({            
        userId: profile.id,
      }).save();
      done(null, newUser);
    } catch (err) {
      console.log(err);
    }
}
));