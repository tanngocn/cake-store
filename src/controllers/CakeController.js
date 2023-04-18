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
    console.log(req.params.id);
    db.query(QUERY_API.cakes_detail, [req.params.id], (err, result) => {
      if (err) {
        res.send(err);
        return;
      }
      if (!result) {
        res.status(404);
        return;
      }
      req.cake_detail = result[0];
      next();
    });
  }
  checkValidation(req, res, next) {
    const params = Object.keys(req.body);
    const errors = [];
    params.map(param => {
      if (['file', 'description'].indexOf(param) === -1 && !req.body[param]) {
        errors.push(`${param} is required`)
      }
    })
    if (errors.length > 0) {
      res.status(400).render('admin/add-cake', { title: 'Create cake', types: req.cakeTypes, cake: { ...req.body } });
      return;
    }

    next();
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
  add_cake_action(req, res, next) {
    const { name, type_id, price, quantity_in_shock, image, description } = req.body;
    db.query(QUERY_API.add_cake, [name, type_id, price, quantity_in_shock, image, description], (err, result) => {
      if (err) {
        res.status(500).send(`some thing wrong please check function, ${err}`);
        return;
      }
      res.status(200).render('admin/cake', { title: 'Cakes', cakes: result, pages: req.pages });
    });
  }


  update_cake_action(req, res, next) {
    console.log('vao day roi ah', req.body);
    const { file, name, type_id, price, quantity_in_shock, image, description } = req.body;
    let query = '';
    if (file && image) {
      query += 'image  = $1'
    }
  }

}

module.exports = CakeController;
