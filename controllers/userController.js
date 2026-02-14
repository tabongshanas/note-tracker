const jwt = require('jsonwebtoken');

const User = require('./../models/userModel');
const AppError = require('./../utility/AppError');
const sendMail = require('./../utility/sendMail');

const signjwt = async (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_STRING, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}


const sendCookie = (res, token) => {

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 10 * 24 * 60 * 60 * 1000
    });
}

exports.signup = async (req, res, next) => {
    try {
        // console.log({ ...req.body })

        const checkUser = await User.findOne({ email: req.body.email })
        if (checkUser) {
            return next(new AppError('Sorry, this user already exist, kindly use another email.', 400))
        }

        // sending user a message after signing up
        // await sendMail.sendMail({email: req.body.email});

        const user = await User.create({...req.body});
        const token = await signjwt(user._id);

        sendCookie(res, token);

        res.status(201).json({
            status: 'success',
            token,
            data: {
                user
            }
        })

    } catch (err) {
        return next(new AppError('Please, all fields are required or Network issue, TRY again later.', 400))
    }
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('Please provide your email and password, Invalid email or password', 400));
    }

    const user = await User.findOne({ email });
    if (!user) {
        return next(new AppError('This user does not exist, Please try another email.', 404));
    }

    const isMatch = await user.compareUserPassword(password);
    if (!isMatch) {
        return next(new AppError('Sorry, your password is incorrect', 400));
    }

    const token = await signjwt(user._id);

    sendCookie(res, token);

    res.status(200).json({
        status: 'success',
        token
    })
}

exports.logout = async (req, res, next) => {
    res.cookie('jwt', '');

    res.status(200).json({
        status: 'success',
        data: null
    })
}

exports.getAllUser = async (req, res) => {
    const users = await User.find();

    res.status(201).json({
        status: 'success',
        results: users.length,
        data: {
            users
        }
    })
}