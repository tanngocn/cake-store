const express = require('express');
const passport = require('passport');
const homeRouter = express.Router();
const AuthController = require('../controllers/AuthController');
const HomeController = require('../controllers/HomeController');
const auth = new AuthController();
const home = new HomeController();

homeRouter.get('/login', async (req, res, next) => {
  res.render('login');
});
homeRouter.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
  }),
  (req, res) => {
    res.redirect('/');
  }
);
homeRouter.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});
// register
homeRouter.get('/register', async (req, res, next) => {
  res.render('register');
});
homeRouter.post('/register', auth.checkValidationAccount, auth.register);

homeRouter.get('/', home.cakes);
homeRouter.get('/:id', home.cake_detail);
module.exports = homeRouter;
