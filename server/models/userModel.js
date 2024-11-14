const mongoose = require('mongoose');

const userShema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true 
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
    createdAt: {
        type: Date, 
        default: Date.now
    }
});

const User = mongoose.model('User', userShema);

module.exports = User;