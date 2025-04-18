const bcrypt = require('bcryptjs');
const { findUserById, updateUser } = require('../models/userModel');
const { validateEmail, validatePassword } = require('../utils/validators');

const getProfile = (req, res) => {
  const { id, username, email, role } = req.user;
  res.json({ id, username, email, role });
};

const updateProfile = async (req, res) => {
  const { email, password } = req.body;
  const updates = {};

  if (email) {
    if (!validateEmail(email)) return res.status(400).json({ message: 'Invalid email format' });
    updates.email = email;
  }

  if (password) {
    if (!validatePassword(password)) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters long and include 1 number and 1 special character',
      });
    }
    updates.password = await bcrypt.hash(password, 10);
  }

  const updatedUser = updateUser(req.user.id, updates);
  res.json({ message: 'Profile updated', user: { id: updatedUser.id, email: updatedUser.email } });
};

const updateUserRole = (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!['user', 'moderator', 'admin'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role specified' });
  }

  const user = updateUser(id, { role });
  if (!user) return res.status(404).json({ message: 'User not found' });

  res.json({ message: `User role updated to ${role}`, user: { id: user.id, role: user.role } });
};

module.exports = { getProfile, updateProfile, updateUserRole };
