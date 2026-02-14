const express = require('express');
const multer = require('multer');

const viewsController = require('./../controllers/viewsCOntroller');
const noteController = require('./../controllers/noteController');
const authController = require('./../controllers/authController');

const router = express.Router();


// 2) MULTER CONFIG
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/users');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `user-${Date.now()}.${ext}`);
    }
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload only images.'), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

router.get('/', viewsController.overview);

router.get('/signup', viewsController.signup);
router.get('/login', viewsController.login);

// router.get('/note/details', viewsController.details);

router.get('/dashboard', 
    authController.protect, 
    viewsController.dashborad);

router.get('/account', 
    authController.protect, 
    viewsController.account);

router.get('/note/details',
    authController.protect, 
    viewsController.getANoteByTitle);

router.patch('/update-me', 
    authController.protect,
    upload.single('photo'), 
    viewsController.updateMe);

module.exports = router;