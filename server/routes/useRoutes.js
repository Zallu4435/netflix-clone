const express = require('express');
const User = require('../models/userModel');
const router = express.Router();

// Route to create a new user
router.post('/signup', async (req, res) => { 
    try {
        const { username, email, password } = req.body;

        console.log(username, email, password);
        

        const existingUser = await User.findOne({email});

        if(existingUser) {
            return res.status(400).json({ message: "user already exists" })
        }
        
        const newUser = new User({ username, email, password });

        const savedUser = await newUser.save();  
        
        res.status(201).json(savedUser); 
    } catch (err) {
        res.status(400).json({ message: "Error saving user", error: err });
    }
});


// Route to check a user 

router.post('/signin', async (req, res) => {
    try { 
        const { email, password } = req.body;

        console.log(email, password, "sihsoqhs");
        

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Directly compare password (no hashing)
        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Send success response
        return res.status(200).json({ message: "Login successful", user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
});



module.exports = router;
