const express = require('express');
const multer = require('multer');
const path = require('path');

const userController = require('./../controllers/userController');
const uploadImage = require('./../controllers/userController');

const router = express.Router();

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, 'public/img/users/'))
//     },
//     filename: (req, file, cb) => {
//         const ext = file.mimetype.split('/')[1];
//         cb(null, `user-${new Date()}.${ext}`)
//     }
// })

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'img/users/')
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        const time = new Date().getTime();
        cb(null, `user-${time}.${ext}`);
    }
})

const upload = multer({ storage });

router.get('/', userController.getAllUser);

router.post('/signup', upload.single('photo'), userController.signup);
router.post('/login', userController.login);

module.exports = router;