const mongoose = require('mongoose');
const express = require('express');

const app = express();
const cors = require('cors');
const userRouter = require('./src/Routes/user.routes');

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 4000;
mongoose.connect(
    'mongodb://localhost:27017/registration',
    { useUnifiedTopology: true, useNewUrlParser: true },
    function (err) {
        if (err) return console.log(err);
        app.listen(port, function () {
            console.log('Сервер ожидает подключения на порту ', port);
        });
    },
);

app.use('/api', userRouter);
