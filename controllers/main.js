const jwt = require('jsonwebtoken');

const { BadRequestError } = require('../errors');

const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.status(200).json({ msd: 'user created', token });
};

const dashboard = (req, res) => {
  const { username } = req.user;
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({ msg: `Hello ${username}`, secret: luckyNumber });
};

module.exports = { login, dashboard };
