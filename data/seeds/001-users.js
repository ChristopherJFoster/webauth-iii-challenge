const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  return knex('users').insert([
    {
      username: 'chris'.toLowerCase(),
      password: bcrypt.hashSync('123', 8),
      department: 'cookware'
    }, // 1
    {
      username: 'andy'.toLowerCase(),
      password: bcrypt.hashSync('456', 8),
      department: 'home furnishings'
    }, // 2
    {
      username: 'blackcat'.toLowerCase(),
      password: bcrypt.hashSync('789', 8),
      department: 'candles'
    } // 3
  ]);
};
