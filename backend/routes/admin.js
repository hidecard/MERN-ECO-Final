const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const Category = require('../models/Category');
const Product = require('../models/Product');

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


// get all category 

router.get('/categories' ,  authMiddleware, adminMiddleware, async (req , res ) => {
    try{
        const categories = await Category.find();
        res.json(categories);
    }catch{
        res.status(500).json({ message: 'Failed to fetch categories' });
    }
});

// create category 

router.post('/categories' , authMiddleware , adminMiddleware , async (req , res) => {
  try{
      const { name , description  } = req.body;
      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
        return res.status(400).json({ message: 'Category already exists' });
      }
      const category = new Category({ name, description });
      await category.save();
      res.status(201).json(category);
  }catch{
      res.status(500).json({ message: 'Failed to create category' });
  }
})


// update category

router.put('/categories/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try{
      const { name, description } = req.body;



      const category = await Category.findByIdAndUpdate(
        req.params.id,
        { name, description },
        { new: true }
      );

      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.json(category);
  }catch{
      res.status(500).json({ message: 'Failed to update category' });
  }
});


// delete category

router.delete('/categories/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try{
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Category deleted' });
  }catch{
    res.status(500).json({ message: 'Failed to delete category' });
  }
});

// get product 

router.get('/products' , authMiddleware, adminMiddleware, async (req , res) => {
  try{
      const products = await Product.find();
      res.json(products);
  }catch{
      res.status(400).json({ message: 'Failed to fetch products' });
  }
});

//create product 

router.post('/products', authMiddleware , adminMiddleware , async ( req , res) => {
  try{
      const product = new Product(req.body);
      const existingProduct = await Product.findOne({ name: product.name });
      if (existingProduct) {
        return res.status(400).json({ message: 'Product already exists' });
      }
      await product.save();
      res.status(201).json(product);
  }catch{
      res.status(400).json({ message: 'Failed to create product' });
  }
})

// edit product

router.put('/products/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, description, price, category, stock , imageURLs} = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category, stock , imageURLs },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch{
    res.status(400).json({ message: 'Failed to update product' });
  }
});

// product delete


router.delete('/products/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try{
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  }catch{
    res.status(500).json({ message: 'Failed to delete product' });
  }
})

module.exports = router;