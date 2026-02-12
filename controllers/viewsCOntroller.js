
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
    res.status(200).render('account', {
        title: 'User Account Details || Note Tracker 😎',
    });
}
