const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const homeRouter = require('./routes/home-router');
const store = session.MemoryStore();
const app = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');
app.use(express.static(path.resolve(__dirname, '../public')));

app.use(express.json());

app.use(
  session({
    secret: 'cake-store-secret',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: true,
      sameSite: 'none',
    },
    store,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', homeRouter);

app.use(cors());
const PORT = process.env.APP_PORT || 3000;

app.listen(PORT);
