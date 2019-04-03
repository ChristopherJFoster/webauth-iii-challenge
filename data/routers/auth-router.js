const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Auth = require('../models/auth-model');

router.post('/register', async (req, res) => {
  const { username, password, department } = req.body;
  if (!username || !password || !department) {
    res.status(400).json({
      error:
        'You must provide a username, password, and department to register.'
    });
  } else if (
    username.length > 64 ||
    password.length > 128 ||
    department.length > 64
  ) {
    res.status(400).json({
      error:
        'Your username and department may not exceed 64 characters each. Your password may not exceed 128 characters.'
    });
  } else {
    try {
      const checkUsername = await Auth.checkUsername(username);
      if (checkUsername === 'taken') {
        res.status(400).json({
          error: 'That username is already taken. Please try another.'
        });
      } else {
        try {
          await Auth.registerUser(req.body);
          res.status(201).json({ message: `The user has been registered.` });
        } catch (err) {
          res.status(500).json({
            error: `There was an error while registering the user. ${err}`
          });
        }
      }
    } catch (err) {
      res.status(500).json({
        error: `There was an error while checking the username. ${err}`
      });
    }
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({
      error: 'You must provide a username and password to login.'
    });
  } else {
    try {
      const user = await Auth.getUser(username.toLowerCase());
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.status(200).json({
          message: `Welcome ${user.username}!`
        });
      } else {
        res.status(401).json({
          error:
            'You shall not pass (because you provided invalid credentials)!'
        });
      }
    } catch (err) {
      res.status(500).json({
        error: `There was an error while logging in the user. ${err}`
      });
    }
  }
});

router.get('/logout', (req, res) => {
  if (req.session.user) {
    const username = req.session.user.username;
    req.session.destroy(err => {
      if (err) {
        res
          .status(500)
          .json({ error: 'There was an error while logging out the user.' });
      } else {
        res.status(200).json({ message: `See you next time, ${username}!` });
      }
    });
  } else {
    res.status(400).json({ message: 'No one was logged in.' });
  }
});

module.exports = router;
