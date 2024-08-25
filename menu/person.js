const mongoose = require('mongoose');
const userSchema = mongoose.Schema;

// schema for users
const userSchemaid = new userSchema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['Admin', 'User'], // Example roles
        default: 'User'
    }
});

const User = mongoose.model('User', userSchemaid);
module.exports = User;