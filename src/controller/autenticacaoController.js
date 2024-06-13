const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

const register = async (req, res) => {
  const { email, apelido, senha, pais } = req.body;
  const hashedPassword = await bcrypt.hash(senha, 10);

  const user = await db.run('INSERT INTO users (email, apelido, senha, pais) VALUES (?, ?, ?, ?)', [email, apelido, hashedPassword, pais]);
  
  res.status(201).json({ message: 'User registered successfully' });
};

const login = async (req, res) => {
  const { email, senha } = req.body;
  const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);

  if (!user || !(await bcrypt.compare(senha, user.senha))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  req.session.token = token;

  res.json({ message: 'Login successful' });
};

const logout = (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logout successful' });
};

const updateUser = async (req, res) => {
  const { email, apelido, pais } = req.body;
  const userId = req.user.id;

  await db.run('UPDATE users SET email = ?, apelido = ?, pais = ? WHERE id = ?', [email, apelido, pais, userId]);
  res.json({ message: 'User updated successfully' });
};

module.exports = { register, login, logout, updateUser };
