const express = require('express');

const viewsController = require('./../controllers/viewsCOntroller');
const authController = require('./../controllers/authController');

const router = express.Router();

router.get('/', viewsController.overview);

router.get('/user/signup', viewsController.signup);
router.get('/user/login', viewsController.login);

router.get('/note/details', viewsController.details);

router.get('/dashboard', authController.protect, viewsController.dashborad);

module.exports = router;