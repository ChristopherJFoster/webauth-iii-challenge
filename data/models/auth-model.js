const db = require('../../utilities/dbConfig');
const bcrypt = require('bcryptjs');

const checkUsername = async username => {
  if (
    await db('users')
      .where({ username: username.toLowerCase() })
      .first()
  ) {
    return 'taken';
  } else {
    return 'available';
  }
};

const registerUser = async user => {
  const password = bcrypt.hashSync(user.password, 8);
  return db('users').insert({
    username: user.username.toLowerCase(),
    password,
    department: user.department
  });
};

const getUser = username => {
  return db('users')
    .where({ username })
    .first();
};

module.exports = {
  checkUsername,
  registerUser,
  getUser
};
