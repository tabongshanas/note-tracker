
const AppError = require('../utility/AppError');
const Note = require('./../models/noteModule');


exports.signup = (req, res) => {
    res.status(200).render('base', {
        title: 'Sign up || Welcome -- Note Tracker 😎'
    });
}

exports.dashborad = async (req, res) => {
    const notes = await Note.find({ user: req.user._id });
    const loggedInUser = req.user;
    let totalNote = notes.length < 10 ? `0${notes.length}` : notes.length;

    res.status(200).render('dashboard', {
        title: 'dash-board',
        notes,
        loggedInUser,
        totalNote
    });
}

exports.login = async (req, res) => {
    res.status(200).render('login', {
        title: 'Log in || Welcome Back -- Note Tracker 😎',
    });
}

exports.details = async (req, res) => {
    res.status(200).render('note-details', {
        title: 'Details || Welcome Back -- Note Tracker 😎',
    });
}

exports.overview = async (req, res) => {
    res.status(200).render('overview', {
        title: 'overview || Welcome -- Note Tracker 😎',
    });
}

exports.account = async (req, res) => {
    const loggedInUser = req.user;

    res.status(200).render('account', {
        title: 'User Account Details || Note Tracker 😎',
        loggedInUser
    });
}

exports.updateMe = async (req, res, next) => {
    if (req.file) {
        req.user.photo = req.file.filename;
    }

    if (req.body.fullname) req.user.fullname = req.body.fullname;
    if (req.body.email) req.user.email = req.body.email;
    if (req.body.phonenumber) req.user.phonenumber = req.body.phonenumber;
    if (req.body.gender) req.user.gender = req.body.gender;
    if (req.body.purpose) req.user.purpose = req.body.purpose;

    await req.user.save();

    res.status(200).json({
        status: 'success',
        data: {  }
    });
}


exports.getANoteByTitle = async (req, res, next) => {
    const loggedInUser = req.user;

    res.status(200).render('note-details', {
        title: 'Note details || Note Tracker 😎',
        loggedInUser
    })
    // try {
        
    // } catch (err) {
    //     return next(new AppError('There was a problem fetching this note.', 400));
    // }
}