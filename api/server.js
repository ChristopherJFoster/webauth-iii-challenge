const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('../data/routers/auth-router');
const usersRouter = require('../data/routers/users-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.send('Server running...');
});

module.exports = server;
