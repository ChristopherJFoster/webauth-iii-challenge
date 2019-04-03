const db = require('../../utilities/dbConfig');

const getUsers = department => {
  return db('users').where({ department });
};

module.exports = {
  getUsers
};
