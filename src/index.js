const express = require('express');

const cors = require('cors');
const path = require('path');

const homeRouter = require('./routes/home-router');
const adminRouter = require('./routes/admin-router');

const app = express();
app.use(cors());
const passport = require('passport');
const session = require('express-session');
const store = session.MemoryStore();

// path static
const publicPath = path.join(__dirname, '../public');
const controllerPath = path.join(__dirname, './controllers');
const componentsPath = path.join(__dirname, './components');

console.log(path.resolve('src/views'));

console.log(path.resolve(__dirname, 'views'));

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(publicPath));
app.use(express.static(controllerPath));
app.use(express.static(componentsPath));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: 'cake-store-secret',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 30,
      // secure: true, using https
      // sameSite: 'none',
    },
    store,
  })
);
app.use(passport.initialize());
app.use(passport.session());
require('./config/passort');

app.use('/', homeRouter);
app.use('/admin', adminRouter);

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT);
