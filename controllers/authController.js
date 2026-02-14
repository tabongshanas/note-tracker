const jwt = require('jsonwebtoken');

const AppError = require('./../utility/AppError');
const User = require('../models/userModel');

exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        // return next(new AppError('This route is protected, Please log in to access this route!', 401))
        return res.redirect('/login');
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET_STRING);
    const decodedUser = await User.findById(decoded.id);

    if (!decodedUser) {
        // return next(new AppError('This user do not longer exist, Please sign up.', 404));
        res.redirect('/')
    }
    
    req.user = decodedUser;

    // This code add the user (decoded user), to the pug file were this route is applied
    res.locals.user = decodedUser;

    next();
}