const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator')

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "User's full name is required"]
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "User's email MUST be unique"],
        validate: [validator.isEmail, 'Please provide a valid email.']
    },
    photo: {
        type: String,
        default: 'default-user.webp'
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    phonenumber: {
        type: Number,
        required: [true, "User's phone number is required"]
    },
    gender: {
        type: String,
        required: [true, "User's gender is required"]
    },
    purpose: {
        type: String,
        required: [true, "User's purpose is required"]
    },
    password: {
        type: String,
        min: 8,
        required: [true, "User's password is required"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

userSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 12)

    next();
})

userSchema.methods.compareUserPassword = async function(userPassword) {
    return await bcrypt.compare(userPassword, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;