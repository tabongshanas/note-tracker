const AppError = require('../utility/AppError');
const Note = require('./../models/noteModule');

exports.createNote = async (req, res, next) => {

    const { title, note } = req.body;
    if (!title || !note) {
        return next(new AppError('Sorry, creating a note requires all fields ☺', 401))
    }

    const createdNote = await Note.create({ ...req.body, user: req.user.id });

    res.status(201).json({
        status: 'success',
        data: {
            createdNote
        }
    })
}

exports.getAllNote = async (req, res) => {
    const notes = await Note.find();

    res.status(201).json({
        status: 'success',
        results: notes.length,
        data: {
            notes
        }
    })
}

exports.getANote = async (req, res) => {
    const note = await Note.findById(req.params.id);

    res.status(201).json({
        status: 'success',
        data: {
            note
        }
    })
}

exports.deleteANote = async (req, res) => {
    try {
        await Note.findOneAndDelete({ title: req.params.title });

        res.status(204).json({
            status: 'success',
            data: null
        })

    } catch (err) {
        console.log(err)
    }
}