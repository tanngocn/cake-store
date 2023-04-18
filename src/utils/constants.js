const QUERY_API = {
  cakes: 'SELECT * FROM cake',
  add_cake: 'INSERT INTO cake( name, type_id, price, quantity_in_shock, image, description) values ($1, $2, $3, $4, $5, $6)',
  cakes_admin: 'SELECT cake.id, name, price, cake.quantity_in_shock, cake_type.type_name FROM cake ',
  total_cake: 'SELECT COUNT(*) as total FROM cake',
  cake_type: 'SELECT * FROM cake_type',
  cakes_detail: `SELECT * FROM cake WHERE id= $1`,
  users: 'SELECT * FROM users',
  user_detail: 'SELECT * FROM users WHERE username= $1',
  add_users: 'INSERT INTO users(username, password) VALUES ($1, $2)',
  update_cake: 'UPDATE cake SET name = $1,   '
};

module.exports = {
  QUERY_API,
};
