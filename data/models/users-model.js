const db = require('../../utilities/dbConfig');

const getUsers = () => {
  return db('users');
};

module.exports = {
  getUsers
};
