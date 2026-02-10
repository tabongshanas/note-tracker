const mongoose = require('mongoose');

const app = require('./app');

const PORT = process.env.PORT || 2003;
const DB = process.env.DB_CONNECTION_STRING.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose.connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
})
.then(() => {
    console.log('Database has been connected...')
})
.catch((err) => {
    console.log(`Unable to connect: ${err}`)
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
})