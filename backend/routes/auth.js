const express = require('express'); 
const router = express.Router(); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const User = require('../models/User'); 
// for register 

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //  validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        // check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // hash the password

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // create new user
        const User = new User({
            name,
            email,
            password: passwordHash,
            role : "user",
        });
        await newUser.save();

        // create token
        const token = jwt.sign({ id: User._id , role: User.role }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

    } catch (error) {
        console.error('Register error: ' , error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// for login

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }
        // check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // create token
        const token = jwt.sign({ id: user._id , role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });
        
        res.json({
            token,
            user : {
                id : user._id,
                name : user.name,
                email : user.email,
                role : user.role,
            }
        })

    } catch (error) {
        console.error('Login error: ' , error);
        res.status(500).json({ message: 'Internal server error' });
    }

});

module.exports = router;