// const JwtStrategy = require('passport-jwt').Strategy
// ExtractJwt = require('passport-jwt').ExtractJwt;
// require('dotenv').config()

// const User = require('../model/userModel')

// const opts = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: process.env.jwtSecret
// };

// module.exports = passport => {
//     passport.use(
//         new JwtStrategy(opts, (payload, done) => {
//             User.findById(payload.id)
//                 .then(user => {
//                     if (user) return done(null, user);
//                     return done(null, false);
//                 })
//                 .catch(err => {
//                     return done(err, false, {message: 'Server Error'});
//                 });
//         })
//     );
// };

const passport = require('passport');

const requireJwtAuth = passport.authenticate('jwt', { session: false });

module.exports = requireJwtAuth
