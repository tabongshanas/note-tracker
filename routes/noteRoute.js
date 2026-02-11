const express = require('express');

const noteController = require('./../controllers/noteController');
const authController = require('./../controllers/authController');
const viewController = require('./../controllers/viewsCOntroller');

const router = express.Router();

router.get('/', noteController.getAllNote);
router.get('/details', viewController.details);
router.post('/createnote', 
    authController.protect, 
    noteController.createNote);

router.route('/:id')
    .get(noteController.getANote)
    .delete(authController.protect, noteController.deleteANote)
router.route('/delete-note/:title')
    .delete(authController.protect, noteController.deleteANote)

module.exports = router;