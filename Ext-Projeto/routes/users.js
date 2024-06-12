const express = require('express');
const router = express.Router();
const db = require('../models/user');

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await db.getUserByEmailAndPassword(email, password);
  if (user) {
    req.session.userId = user.id;
    res.redirect('/products');
  } else {
    res.render('login', { error: 'Invalid email or password' });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/users/login');
});

router.get('/update', async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/users/login');
  }
  const user = await db.getUserById(req.session.userId);
  res.render('update', { user });
});

router.post('/update', async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/users/login');
  }
  const { email, nickname, password, country } = req.body;
  await db.updateUser(req.session.userId, email, nickname, password, country);
  res.redirect('/products');
});

module.exports = router;
