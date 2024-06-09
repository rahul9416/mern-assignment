const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        min:3,
        max:20,
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("mern-assingment", userSchema);