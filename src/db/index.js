const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Cake-store',
  password: '123456',
  port: 5432,
});

module.exports = {
  query: (text, params, callback) => {
    const start = Date.now();
    return pool.query(text, params, (err, res) => {
      const duration = Date.now() - start;
      console.log('executed query', { text, duration });
      callback(err, res.rows);
    });
  },
};
