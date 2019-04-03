const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Joi = require('joi');

const generateToken = require('../../utilities/generate-token');
const Auth = require('../models/auth-model');

const registerSchema = Joi.object().keys({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(64)
    .required(),
  password: Joi.string()
    .min(12)
    .max(128)
    .required(),
  department: Joi.string()
    .alphanum()
    .max(64)
    .required()
});

const loginSchema = Joi.object().keys({
  username: Joi.required(),
  password: Joi.required()
});

router.post('/register', async (req, res) => {
  const { username, password, department } = req.body;
  const result = Joi.validate(
    { username, password, department },
    registerSchema
  );
  if (result.error) {
    res.status(400).json({ error: `${result.error}` });
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
  const result = Joi.validate({ username, password }, loginSchema);
  if (result.error) {
    res.status(400).json({ error: `${result.error}` });
  } else {
    try {
      const user = await Auth.getUserForLogin(username.toLowerCase());
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
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

// router.get('/logout', (req, res) => {
//   if (req.session.user) {
//     const username = req.session.user.username;
//     req.session.destroy(err => {
//       if (err) {
//         res
//           .status(500)
//           .json({ error: 'There was an error while logging out the user.' });
//       } else {
//         res.status(200).json({ message: `See you next time, ${username}!` });
//       }
//     });
//   } else {
//     res.status(400).json({ message: 'No one was logged in.' });
//   }
// });

module.exports = router;
