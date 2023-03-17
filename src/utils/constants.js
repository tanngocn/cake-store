const QUERY_API = {
  cakes: 'SELECT * FROM cake',
  cakes_detail: `SELECT * FROM cake WHERE id= $1`,
  users: 'SELECT * FROM users',
  add_users: 'INSERT INTO users(username, password) VALUES ($1, $2)',
};

module.exports = {
  QUERY_API,
};
