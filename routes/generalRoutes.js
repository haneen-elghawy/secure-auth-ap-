const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.get('/public', (req, res) => {
  res.json({ message: 'This is a public route' });
});

router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, you are authenticated.` });
});

router.get('/moderator', authenticateToken, authorizeRoles('moderator', 'admin'), (req, res) => {
  res.json({ message: `Welcome, ${req.user.role}` });
});

router.get('/admin', authenticateToken, authorizeRoles('admin'), (req, res) => {
  res.json({ message: `Hello Admin ${req.user.username}` });
});

module.exports = router;
