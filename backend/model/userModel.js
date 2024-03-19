const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        min:3,
        max:20,
    },
    lastName: {
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
    mobileNumber: {
        type: String,
        required: true,
        length: 10,
    },
    projectDetail: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model("mern-assingment", userSchema);