const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const { getProfile, updateProfile, updateUserRole } = require('../controllers/userController');


router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);


router.put('/users/:id/role', authenticateToken, authorizeRoles('admin'), updateUserRole);

module.exports = router;
