const express = require('express');
const db = require('../db');
const { QUERY_API } = require('../utils/constants');
const homeRouter = express.Router();

// homeRouter.use('/', (req, res, next) => {
//   db.query(QUERY_API.cakes, [], (err, result) => {
//     if (result) {
//       console.log(result);
//     }
//   });
// });
homeRouter.get('/', async (req, res, next) => {
  db.query(QUERY_API.cakes, [], (err, result) => {
    if (result) {
      res.render('home', { cakes: result });
    }
  });
});

module.exports = homeRouter;
