const db = require('../db');
const bcrypt = require('bcrypt');
const { QUERY_API } = require('../utils/constants');

class AuthController {
  checkValidationAccount(req, res, next) {
    const { confirm_password, password, username } = req.body || {};
    if (confirm_password !== password) {
      return res.status(400).render('register', { ...req.body, pass_error: 'password not match confirm password' });
    }

    db.query(QUERY_API.users, [], (err, result) => {
      const index = result.findIndex((f) => f.username === username);
      if (index === -1) {
        return next();
      }
      res.status(400).render('register', { error: 'User is exist', ...req.body });
      res.end();
    });
  }

  async register(req, res, next) {
    const { username, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    try {
      db.query(QUERY_API.add_users, [username, hash], (err, result) => {
        if (result) {
          res.status(200).redirect('login');
        }
      });
    } catch (error) {
      res.render('register', { error, ...req.body });
      res.status(500).send(`Something services wrong please check again, ${err}`);
    }
  }
}

module.exports = AuthController;
