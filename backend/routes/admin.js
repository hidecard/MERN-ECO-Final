const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Get all users
router.get('/users', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select('-passwordHash');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// Create user
router.post('/users', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.error('User already exists');
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = new User({ name, email, passwordHash, role });
    await user.save();

    const userResponse = await User.findById(user._id).select('-passwordHash');
    res.status(201).json(userResponse);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ message: 'Failed to create user' });
  }
});

// Update user
router.put('/users/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !role) {
      return res.status(400).json({ message: 'Name, email, and role are required' });
    }

    const updateData = { name, email, role };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.passwordHash = await bcrypt.hash(password, salt);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true }).select('-passwordHash');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Failed to update user' });
  }
});

// Delete user
router.delete('/users/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.role === 'admin') {
      return res.status(400).json({ message: 'Admin user cannot be deleted' });
    }
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Failed to delete user' });
  }
});

module.exports = router;