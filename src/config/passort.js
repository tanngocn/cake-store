const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(
  new LocalStrategy((username, password, done) => {
    // call db
    // check response db;

    return done(null, user);
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // to do deser
});
