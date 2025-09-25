const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');

// User registration route
router.post('/register', userController.registerUser);  
// User login route
router.post('/login', userController.loginUser);    
// Get user profile route
router.get('/profile/:id', userController.getUserProfile);
// Update user profile route
router.put('/profile/:id', userController.updateUserProfile);
// Delete user route
router.delete('/:id', userController.deleteUser);
// Get all users route
router.get('/', userController.getAllUsers);
// Search users route

module.exports = router;