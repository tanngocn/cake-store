const QUERY_API = {
  cakes: 'SELECT * FROM cake',
  cakes_admin: 'SELECT cake.id, name, price, cake.quantity_in_shock, cake_type.type_name FROM cake ',
  total_cake: 'SELECT COUNT(*) as total FROM cake',
  cake_type: 'SELECT * FROM cake_type',
  cakes_detail: `SELECT * FROM cake WHERE id= $1`,
  users: 'SELECT * FROM users',
  user_detail: 'SELECT * FROM users WHERE username= $1',
  add_users: 'INSERT INTO users(username, password) VALUES ($1, $2)',
};

module.exports = {
  QUERY_API,
};
