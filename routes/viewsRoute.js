const express = require('express');

const viewsController = require('./../controllers/viewsCOntroller');
const authController = require('./../controllers/authController');

const router = express.Router();

router.get('/', viewsController.overview);

router.get('/signup', viewsController.signup);
router.get('/login', viewsController.login);

router.get('/dashboard', authController.protect, viewsController.dashborad);

module.exports = router;