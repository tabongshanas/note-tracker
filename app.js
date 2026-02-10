const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const userRoute = require('./routes/userRoute');
const noteRoute = require('./routes/noteRoute');
const viewsRoute = require('./routes/viewsRoute');
const errorController = require('./controllers/errorController');

const app = express();

// GLOBAL MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// SERVING STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api/v1/users', userRoute);
app.use('/api/v1/notes', noteRoute);
app.use('/', viewsRoute);

app.all('*', (req, res, next) => {
    res.status(401).json({
        status: 'fail',
        message: `The URL ${req.originalUrl} is not defined!`
    })
})

app.use(errorController)

module.exports = app;