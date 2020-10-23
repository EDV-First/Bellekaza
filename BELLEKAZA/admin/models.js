const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    name: String,
    password: String,
    email : String,
    gender : String,
    bithday : String,
});

let User = mongoose.model('User', usersSchema, 'users')

module.exports = User