const db = require('../db');
const { QUERY_API } = require('../utils/constants');

class CakeController {
  filter(req, res, next) {
    const { name, price, type_id, page } = req.query || {};
    let query = QUERY_API.cakes_admin + 'JOIN cake_type ON cake.type_id = cake_type.id';
    let params = [];
    if (name && !price && !type_id) {
      query += 'WHERE name like $1';
      params.push(name);
    }
    if (!name && price && !type_id) {
      query += 'WHERE price $1';
      params.push(price);
    }
    if (!name && !price && type_id) {
      query += 'WHERE type_id=$1';
      params.push(type_id);
    }
    if (name && price && !type_id) {
      query += 'WHERE name like $1 AND price $2';
      params.push(name, price);
    }
    if (name && !price && type_id) {
      query += ' WHERE name like $1 AND type_id=$2';
      params.push(name, type_id);
    }
    if (!name && price && type_id) {
      query += 'WHERE price $1 AND type_id=$2';
      params.push(price, type_id);
    }
    if (name && price && type_id) {
      query += ' WHERE name like $1 AND price $2 AND type_id=$3';
      params.push(name, price, type_id);
    }
    if (page) {
      query += ' LIMIT $4 OFFSET $5';
      const offset = (page - 1) * 10;
      params.push(page, offset);
    } else {
      query += ` LIMIT 10 OFFSET 0 `;
    }
    req.queryFilter = query;
    req.paramsFilter = params;
    next();
  }
  total_cake(req, res, next) {
    db.query(QUERY_API.total_cake, [], (err, result) => {
      const totalPage = result && result[0] ? Math.floor(result[0].total / 10) + 1 : 0;
      const pages = [];
      for (let i = 0; i < totalPage; i++) {
        pages.push(i + 1);
      }
      req.pages = pages;
      next();
    });
  }
  checkCakeExisting(req, res, next) {
    db.query(QUERY_API.cakes_detail, [req.params.id], (err, result) => {
      if (err) {
        res.send(err);
        return;
      }
      if (!result) {
        res.status(404);
        return;
      }
      req.cakeDetail = result[0];
      next();
    });
  }
  cakes(req, res, next) {
    db.query(req.queryFilter, req.paramsFilter, (err, result) => {
      if (err) {
        res.send(err);
        return;
      }
      res.render('admin/cake', { title: 'Cakes', cakes: result, pages: req.pages });
    });
  }
  cake_types(req, res, next) {
    db.query(QUERY_API.cake_type, [], (err, result) => {
      if (err) {
        res.send(err);
        return;
      }
      console.log('dasdsa', result);
      req.cakeTypes = result;
      next();
    });
  }
}

module.exports = CakeController;
