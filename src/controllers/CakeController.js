const db = require('../db');
const { QUERY_API } = require('../utils/constants');

class CakeController {
  filter(req, res, next) {
    const { name, price, type_id } = req.query || {};
    let query = QUERY_API.cakes + 'JOIN cake_type ON cake.type_id = cake_type.id';
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
    req.queryFilter = query;
    req.paramsFilter = params;
    next();
  }
  cakes(req, res, next) {
    db.query(req.queryFilter, req.paramsFilter, (err, result) => {
      res.render('admin/cake', { cakes: result.rows });
    });
  }
}

module.exports = CakeController;
