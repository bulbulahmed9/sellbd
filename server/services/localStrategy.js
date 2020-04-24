var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const Test = require('../model/testModel')

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});


passport.use(new LocalStrategy(function(username, password, done) {
  Test.findOne({
      username: username
  }, function(err, user) {
      // This is how you handle error
      if (err) return done(err);
      // When user is not found
      if (!user) return done(null, false);
      // When password is not correct
      if (!user.authenticate(password)) return done(null, false);
      // When all things are good, we return the user
      return done(null, user);
   });
}));