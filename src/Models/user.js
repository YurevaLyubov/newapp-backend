const mongoose = require('mongoose');

const { Schema } = mongoose;

const userScheme = new Schema(
    {
        login: { type: String, unique: true, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        name: { type: String },
        age: { type: String },
        gender: { type: String },
        role: { type: String },
    },
    { versionKey: false },
);

module.exports = mongoose.model('User', userScheme);
