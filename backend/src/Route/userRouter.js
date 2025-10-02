const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');

// User registration route
router.post('/register', userController.registerUser);  
// User login route
router.post('/login', userController.loginUser);  
router.patch('/', userController.getOneUser); 

// Update user profile route
router.put('/:id', userController.updateUserProfile);
// Delete user route
router.delete('/:id', userController.deleteUser);
// Get all users route
router.get('/', userController.getAllUsers);


module.exports = router;