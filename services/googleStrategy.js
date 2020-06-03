const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
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
    callbackURL: "/auth/google/callback",
    proxy: true
},
    async (accessToken, refreshToken, profile, done) => {
        console.log("profile", profile)
        try {
            const user = await User.findOne({ googleId: profile.id });

            if (user) {
                return done(null, user);
            }
        } catch (err) {
            console.log(err.message)
        }

        try {
            const newUser = await new User({
                provider: profile.provider,
                googleId: profile.id,
                googleEmail: profile.emails[0].value,
                name: profile.displayName,
                isVerified: true
            }).save();
            done(null, newUser);
        } catch (err) {
            console.log(err.message)
        }
    }
));  