const userModel = require('../Model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// User registration
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }       
};

// User login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.find({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }   
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }   
};

// Get user profile by ID
exports.getUserProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id).select('-password');       
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const updatedData = { name, email };
        if (password) {
            updatedData.password = await bcrypt.hash(password, 10);
        }
        const user = await userModel.findByIdAndUpdate(req.params.id, updatedData, { new: true }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }   
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

