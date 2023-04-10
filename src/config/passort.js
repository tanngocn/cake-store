const passport = require('passport');
const bcrypt = require('bcrypt');
const { QUERY_API } = require('../utils/constants');
const db = require('../db');
const LocalStrategy = require('passport-local').Strategy;

passport.use(
  new LocalStrategy(async (username, password, done) => {
    db.query(QUERY_API.user_detail, [username], async (err, user) => {
      if (err) return done(err);
      if (!user) return done({ error: 'account not exist' }, false);

      const isMatched = user && user[0] && (await bcrypt.compare(password, user[0].password));
      if (!isMatched) return done({ error: 'username or password not right' }, false);
      return done(null, user);
    });
  })
);

passport.serializeUser((user, done) => {
  return done(null, user[0].username);
});

passport.deserializeUser((id, done) => {
  db.query(QUERY_API.user_detail, [id], (err, user) => {
    if (err) {
      console.log(err);
      return done(err);
    }
    return done(null, user);
  });
});
