const router = require('express').Router();
const restricted = require('../../utilities/restricted-middleware');

const Users = require('../models/users-model');

router.get('/', restricted, async (req, res) => {
  try {
    const users = await Users.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      error: `There was an error while retrieving the users data. ${err}`
    });
  }
});

module.exports = router;
