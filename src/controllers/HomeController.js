const db = require('../db');
const { QUERY_API } = require('../utils/constants');

class HomeController {
  cakes(req, res, next) {
    db.query(QUERY_API.cakes, [], (err, result) => {
      if (result) {
        res.render('home', { cakes: result, user: req.user ? req.user[0] : '' });
      }
    });
  }
  cake_detail(req, res, next) {
    db.query(QUERY_API.cakes_detail, [req.params.id], (err, result) => {
      if (result) {
        res.render('cake-detail', { cake: result[0] });
      }
    });
  }
}

module.exports = HomeController;
