const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const User = require('./../models/userModel');
const AppError = require('./../utility/AppError');
const sendMail = require('./../utility/sendMail');

const signjwt = async (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_STRING, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

let cookieOption = {
    httpOnly: true,
    maxAge: 10 * 24 * 60 * 60 * 1000
}

if (process.env.NODE_ENV === 'production') {
    cookieOption.secure = true
}

const sendCookie = (res, token) => {
    res.cookie('jwt', token, cookieOption)
}

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, 'public/img/users'))
//     },
//     filename: (req, file, cb) => {
//         const ext = file.mimetype.split('/')[1];
//         cb(null, `user-${new Date()}.${ext}`)
//     }
// })

// const upload = multer({ storage });

// exports.uploadImage = upload;

exports.signup = async (req, res, next) => {
    try {
        console.log({ ...req.body })
        console.log(req.file)

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
        console.log(err)
        return next(new AppError('Please, all fields are required or Network issue, TRY again later.', 400))
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(401).json({
            status: 'fail',
            message: 'Please provide your email and password, Invalid email or password'
        })
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.compareUserPassword(password))) {
        return res.status(404).json({
            status: 'fail',
            message: 'Sorry invalid input or, Invalid email or password'
        })
    }

    const token = await signjwt(user._id);

    sendCookie(res, token);

    res.status(200).json({
        status: 'success',
        token
    })

    // console.log(await user.compareUserPassword(password))
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
