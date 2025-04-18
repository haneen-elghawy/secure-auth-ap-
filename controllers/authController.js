const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { createUser, findUserByEmail } = require('../models/userModel');
const { validateEmail, validatePassword } = require('../utils/validators');

const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!validateEmail(email)) return res.status(400).json({ message: 'Invalid email format' });
  if (!validatePassword(password)) {
    return res.status(400).json({
      message: 'Password must be at least 8 characters long, include one number and one special character',
    });
  }
  if (findUserByEmail(email)) return res.status(409).json({ message: 'Email already in use' });

  const user = await createUser({ username, email, password, role });
  res.status(201).json({ message: 'User registered successfully', user: { id: user.id, username, email, role } });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = findUserByEmail(email);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

module.exports = { register, login };
