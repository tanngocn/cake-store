const express = require('express');

const db = require('../db');
const { QUERY_API } = require('../utils/constants');
const homeRouter = express.Router();
const AuthController = require('../controllers/AuthController');
const auth = new AuthController();

homeRouter.get('/login', async (req, res, next) => {
  res.render('login');
});
// register
homeRouter.get('/register', async (req, res, next) => {
  res.render('register');
});
homeRouter.post('/register', auth.checkValidationAccount, auth.register);

homeRouter.get('/:id', async (req, res, next) => {
  db.query(QUERY_API.cakes_detail, [req.params.id], (err, result) => {
    if (result) {
      res.render('cake-detail', { cake: result[0] });
    }
  });
});

homeRouter.get('/', async (req, res, next) => {
  db.query(QUERY_API.cakes, [], (err, result) => {
    if (result) {
      res.render('home', { cakes: result });
    }
  });
});

module.exports = homeRouter;
