const passport = require("passport");
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../model/userModel')


passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    })
})

// Facebook Strategy

passport.use(new FacebookStrategy({
    clientID: process.env.fbAppId,
    clientSecret: process.env.fbAppSecret,
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email'],
    proxy: true
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            const user = await User.findOne({ facebookId: profile.id });

            if (user) {
                return done(null, user);
            }
        } catch (err) {
            console.log(err.message)
        }

        try {
            const newUser = await new User({
                provider: profile.provider,
                facebookId: profile.id,
                facebookEmail: profile.email ? profile.emails[0].value : null,
                name: profile.displayName,
                isVerified: true
            }).save();
            done(null, newUser);
        } catch (err) {
            console.log(err.message)
        }
    }
));