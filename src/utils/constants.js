const QUERY_API = {
  cakes: 'SELECT * FROM cake',
  cake_type: 'SELECT * FROM cake_type',
  cakes_detail: `SELECT * FROM cake WHERE id= $1`,
  users: 'SELECT * FROM users',
  user_detail: 'SELECT * FROM users WHERE username= $1',
  add_users: 'INSERT INTO users(username, password) VALUES ($1, $2)',
};

module.exports = {
  QUERY_API,
};
